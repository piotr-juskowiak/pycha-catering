import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'menu.html'), 'utf8');
const outputDir = path.join(root, 'assets/menu-popup/generated/meal-boxes');

const decodeHtml = (value) => String(value || '')
  .replace(/&quot;/g, '"')
  .replace(/&#039;/g, "'")
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const fold = (value) => decodeHtml(value)
  .replace(/[łŁ]/g, 'l')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('pl-PL')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const slugify = (value) => fold(value).replace(/\s+/g, '-').slice(0, 118).replace(/-+$/g, '');

const genericDescription = (description) => /^(Dania mięsne|Dania wege|Zupy|Mączne|Desery|Sałatki|Makaron|Stałe pozycje) z menu Pycha Catering\.$/i.test(description);

const categoryScene = {
  'Dania mięsne': 'a matte black rectangular three-compartment catering meal-prep box, with the meat or fish in the large compartment and the named sides neatly separated',
  'Dania wege': 'a matte black rectangular three-compartment catering meal-prep box, with the vegetarian main in the large compartment and any named sides neatly separated',
  'Zupy': 'a premium matte black rectangular catering tray with a fitted round soup insert filled with the named soup, plus only a small appropriate side compartment when naturally suitable',
  'Mączne': 'a matte black rectangular two-compartment catering meal-prep box, with the named dumplings, pancakes or flour-based dish arranged naturally',
  'Desery': 'a compact premium matte black rectangular catering dessert box holding one realistic individual portion of the named dessert',
  'Sałatki': 'a premium matte black rectangular catering salad box filled generously with the named salad, ingredients clearly visible and naturally mixed',
  'Makaron': 'a matte black rectangular catering meal-prep box filled with the named pasta dish, with a clean appetizing presentation',
  'Stałe codziennie': 'a premium matte black divided catering meal-prep box presenting a small varied daily catering selection',
};

const records = new Map();
const cardPattern = /<article class="menu-dish-card"[\s\S]*?data-category="([^"]+)"[\s\S]*?data-title="([^"]+)"[\s\S]*?data-description="([^"]*)"[\s\S]*?<div class="menu-dish-media"><img src="([^"]+)"/g;

for (const match of html.matchAll(cardPattern)) {
  const category = decodeHtml(match[1]);
  const title = decodeHtml(match[2]);
  const rawDescription = decodeHtml(match[3]);
  const description = genericDescription(rawDescription) ? '' : rawDescription;
  const key = fold(title);
  if (records.has(key)) continue;

  const fullDishName = description ? `${title}, ${description}` : title;
  const categorySlug = slugify(category);
  const fileName = `${slugify(fullDishName)}.jpg`;
  const webPath = `assets/menu-popup/generated/meal-boxes/${categorySlug}/${fileName}`;
  const scene = categoryScene[category] || categoryScene['Dania mięsne'];

  records.set(key, {
    key,
    category,
    title,
    description,
    fullDishName,
    webPath,
    prompt: [
      'Use case: product-mockup',
      'Asset type: website menu card photograph',
      `Primary request: photorealistic product photo of the Polish catering dish "${fullDishName}" served in a catering box`,
      'Scene/backdrop: clean warm cream studio tabletop with a very subtle natural texture and no additional props',
      `Subject: ${scene}; the food must visibly and accurately match "${fullDishName}"`,
      'Style/medium: premium photorealistic commercial food photography, realistic portion, natural food texture, consistent catalog series',
      'Composition/framing: landscape 3:2, consistent 45-degree overhead view, the entire box visible and centered, generous even padding, suitable for a 640x430 website crop',
      'Lighting/mood: soft diffused daylight, appetizing but natural colors, gentle controlled shadow',
      'Constraints: exactly one catering box; no ceramic plate; no text; no logo; no watermark; no hands; no cutlery; no napkin; no packaging lid; no extra dishes; no unrelated garnish',
    ].join('\n'),
  });
}

const manifest = [...records.values()].sort((left, right) => left.category.localeCompare(right.category, 'pl') || left.title.localeCompare(right.title, 'pl'));
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

const photoMap = Object.fromEntries(manifest.map((record) => [record.key, record.webPath]));
fs.writeFileSync(
  path.join(root, 'assets/menu-dish-photo-map.js'),
  `window.PYCHA_DISH_PHOTOS = ${JSON.stringify(photoMap, null, 2)};\n`,
);

process.stdout.write(`${manifest.length}\n`);
