const PROMO_KEY = 'pycha-catering:promo';
const MAX_BODY_SIZE = 4 * 1024 * 1024; // 4MB

function getRedisConfig() {
  return {
    url: process.env.UPSTASH_REDIS_REST_URL
      || process.env.KV_REST_API_URL
      || process.env.UPSTASH_REDIS_REST_KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
      || process.env.KV_REST_API_TOKEN
      || process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
  };
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store, max-age=0');
  response.end(JSON.stringify(payload));
}

async function redisCommand(command) {
  const { url, token } = getRedisConfig();

  if (!url || !token) {
    const error = new Error('Magazyn bazy danych nie został jeszcze skonfigurowany.');
    error.code = 'STORAGE_NOT_CONFIGURED';
    throw error;
  }

  const result = await fetch(url.replace(/\/$/, ''), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  if (!result.ok) throw new Error(`Magazyn zwrócił błąd ${result.status}.`);

  const payload = await result.json();
  if (payload.error) throw new Error(payload.error);
  return payload.result;
}

function parseBasicPassword(request) {
  const header = request.headers.authorization || '';
  if (!header.startsWith('Basic ')) return '';

  try {
    const credentials = Buffer.from(header.slice(6), 'base64').toString('utf8');
    const separator = credentials.indexOf(':');
    return separator === -1 ? '' : credentials.slice(separator + 1);
  } catch {
    return '';
  }
}

async function readRequestBody(request) {
  if (request.body && typeof request.body === 'object') return request.body;
  if (typeof request.body === 'string') return JSON.parse(request.body);

  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body, 'utf8') > MAX_BODY_SIZE) {
      const error = new Error('Plik graficzny jest zbyt duży (maks. 4MB).');
      error.code = 'BODY_TOO_LARGE';
      throw error;
    }
  }
  return JSON.parse(body || '{}');
}

module.exports = async function promoHandler(request, response) {
  if (request.method === 'GET') {
    try {
      const { url, token } = getRedisConfig();
      if (!url || !token) {
        return sendJson(response, 200, {
          status: 'empty',
          promo: null,
          message: 'Baza nie jest skonfigurowana lokalnie.',
        });
      }

      const storedValue = await redisCommand(['GET', PROMO_KEY]);
      if (!storedValue) {
        return sendJson(response, 200, {
          status: 'empty',
          promo: null,
          message: 'Brak aktywnej promocji.',
        });
      }

      const promoData = typeof storedValue === 'string'
        ? JSON.parse(storedValue)
        : storedValue;

      return sendJson(response, 200, {
        status: 'success',
        promo: promoData,
      });
    } catch (error) {
      return sendJson(response, 200, {
        status: 'error',
        promo: null,
        message: error.message,
      });
    }
  }

  if (request.method === 'POST') {
    const adminPassword = process.env.MENU_ADMIN_PASSWORD;

    if (adminPassword && parseBasicPassword(request) !== adminPassword) {
      response.setHeader('WWW-Authenticate', 'Basic realm="Edycja promocji Pycha Catering"');
      return sendJson(response, 401, {
        status: 'error',
        message: 'Nieprawidłowe hasło administratora.',
      });
    }

    try {
      const payload = await readRequestBody(request);
      if (!payload || (!payload.image && !payload.remove)) {
        return sendJson(response, 400, {
          status: 'error',
          message: 'Brak danych grafiki promocyjnej.',
        });
      }

      const updatedAt = new Date().toISOString();
      const record = {
        active: payload.remove ? false : (payload.active !== false),
        image: payload.remove ? null : payload.image,
        title: payload.title || 'Aktualna promocja',
        updatedAt,
      };

      await redisCommand(['SET', PROMO_KEY, JSON.stringify(record)]);

      return sendJson(response, 200, {
        status: 'success',
        promo: record,
        updatedAt,
      });
    } catch (error) {
      const statusCode = error.code === 'BODY_TOO_LARGE'
        ? 413
        : error.code === 'STORAGE_NOT_CONFIGURED'
          ? 503
          : 500;

      return sendJson(response, statusCode, {
        status: 'error',
        message: error.message,
      });
    }
  }

  if (request.method === 'DELETE') {
    const adminPassword = process.env.MENU_ADMIN_PASSWORD;

    if (adminPassword && parseBasicPassword(request) !== adminPassword) {
      response.setHeader('WWW-Authenticate', 'Basic realm="Edycja promocji Pycha Catering"');
      return sendJson(response, 401, {
        status: 'error',
        message: 'Nieprawidłowe hasło administratora.',
      });
    }

    try {
      await redisCommand(['DEL', PROMO_KEY]);
      return sendJson(response, 200, {
        status: 'success',
        message: 'Promocja została usunięta.',
      });
    } catch (error) {
      return sendJson(response, 500, {
        status: 'error',
        message: error.message,
      });
    }
  }

  response.setHeader('Allow', 'GET, POST, DELETE');
  return sendJson(response, 405, {
    status: 'error',
    message: 'Ta metoda nie jest obsługiwana.',
  });
};
