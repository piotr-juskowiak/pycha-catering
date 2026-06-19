const MENU_KEY = 'pycha-catering:weekly-menu';
const MAX_BODY_SIZE = 1024 * 1024;

function getRedisConfig() {
  return {
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
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
    const error = new Error('Magazyn menu nie został jeszcze skonfigurowany.');
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

  if (!result.ok) throw new Error(`Magazyn menu zwrócił błąd ${result.status}.`);

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

function isValidMenu(menu) {
  return Boolean(
    menu &&
    typeof menu === 'object' &&
    !Array.isArray(menu) &&
    menu.weeklyMenu &&
    typeof menu.weeklyMenu === 'object' &&
    Array.isArray(menu.sandwiches)
  );
}

async function readRequestBody(request) {
  if (request.body && typeof request.body === 'object') return request.body;
  if (typeof request.body === 'string') return JSON.parse(request.body);

  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body, 'utf8') > MAX_BODY_SIZE) {
      const error = new Error('Menu jest zbyt duże.');
      error.code = 'BODY_TOO_LARGE';
      throw error;
    }
  }
  return JSON.parse(body || '{}');
}

module.exports = async function menuHandler(request, response) {
  if (request.method === 'GET') {
    try {
      const storedValue = await redisCommand(['GET', MENU_KEY]);

      if (!storedValue) {
        return sendJson(response, 404, {
          status: 'empty',
          message: 'Nie zapisano jeszcze internetowej wersji menu.',
        });
      }

      const storedMenu = typeof storedValue === 'string'
        ? JSON.parse(storedValue)
        : storedValue;

      return sendJson(response, 200, {
        status: 'success',
        menu: storedMenu.menu || storedMenu,
        updatedAt: storedMenu.updatedAt || null,
      });
    } catch (error) {
      return sendJson(response, error.code === 'STORAGE_NOT_CONFIGURED' ? 503 : 500, {
        status: 'error',
        message: error.message,
      });
    }
  }

  if (request.method === 'POST') {
    const adminPassword = process.env.MENU_ADMIN_PASSWORD;

    if (!adminPassword) {
      return sendJson(response, 503, {
        status: 'error',
        message: 'Ustaw zmienną MENU_ADMIN_PASSWORD w konfiguracji Vercela.',
      });
    }

    if (parseBasicPassword(request) !== adminPassword) {
      response.setHeader('WWW-Authenticate', 'Basic realm="Edycja menu Pycha Catering"');
      return sendJson(response, 401, {
        status: 'error',
        message: 'Nieprawidłowe hasło do edycji menu.',
      });
    }

    try {
      const menu = await readRequestBody(request);
      if (!isValidMenu(menu)) {
        return sendJson(response, 400, {
          status: 'error',
          message: 'Przesłane dane menu mają nieprawidłowy format.',
        });
      }

      const savedRecord = { menu, updatedAt: new Date().toISOString() };
      await redisCommand(['SET', MENU_KEY, JSON.stringify(savedRecord)]);

      return sendJson(response, 200, {
        status: 'success',
        updatedAt: savedRecord.updatedAt,
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

  response.setHeader('Allow', 'GET, POST');
  return sendJson(response, 405, {
    status: 'error',
    message: 'Ta metoda nie jest obsługiwana.',
  });
};
