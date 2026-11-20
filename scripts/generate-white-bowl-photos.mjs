#!/usr/bin/env node
// generate-white-bowl-photos.mjs
// ------------------------------------------------------------
// Produces white‑bowl photos for every dish listed in the
// menu‑popup manifest and overwrites the existing images.
//
// Usage (in the project root):
//   node scripts/generate-white-bowl-photos.mjs
// ------------------------------------------------------------

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

// ------------------------------------------------------------------
// 1️⃣  Load the manifest
// ------------------------------------------------------------------
const manifestPath = join(
  import.meta.dirname,
  '..',
  'assets',
  'menu-popup',
  'generated',
  'meal-boxes',
  'manifest.json'
);
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

// ------------------------------------------------------------------
// 2️⃣  Helper: invoke the image‑generator sub‑agent via the agy CLI
// ------------------------------------------------------------------
function generateImage(dishName) {
  const prompt = `
Generate a photorealistic commercial food photograph of the Polish dish:
"${dishName}" served **in a modern, shallow white ceramic bowl**.
Style: natural, appetizing, top‑down 45° angle, soft daylight,
realistic textures, 640×430 crop, no text, no logo, no watermarks,
no cutlery, no hands.
Save the image to a temporary file and return its absolute path.
`;
  // Execute the built‑in image‑generator sub‑agent via the agy CLI.
  const result = execSync(`agy image-generator "${prompt.replace(/\n/g, ' ')}"`, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
  return result;
}

// ------------------------------------------------------------------
// 3️⃣  Main loop – generate & overwrite each image
// ------------------------------------------------------------------
(async () => {
  console.log(`🖼️  Starting generation for ${manifest.length} dishes…`);
  for (let i = 0; i < manifest.length; i++) {
    const rec = manifest[i];
    const dish = rec.fullDishName;
    const targetPath = join(import.meta.dirname, '..', rec.webPath);
    try {
      const tempPath = generateImage(dish);
      execSync(`mv "${tempPath}" "${targetPath}"`);
      console.log(`✅  ${i + 1}/${manifest.length} – ${dish}`);
    } catch (err) {
      console.error(`❌  Failed for ${dish}:`, err.message);
    }
    // Gentle pause to avoid hitting generation quota
    await new Promise(r => setTimeout(r, 500));
  }
  // (Optional) rewrite the manifest – unchanged contents
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('🎉  All images generated and saved.');
})();
