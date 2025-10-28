import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

async function ensureWebpForPngs(imagesDir) {
  const entries = await readdir(imagesDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(imagesDir, entry.name);
    if (entry.isDirectory()) {
      await ensureWebpForPngs(fullPath);
      continue;
    }
    if (!entry.name.toLowerCase().endsWith('.png')) continue;

    const webpPath = fullPath.replace(/\.png$/i, '.webp');
    try {
      await stat(webpPath);
      // WebP already exists, skip
      continue;
    } catch (_) {
      // not exists → convert
    }

    const input = await readFile(fullPath);
    const output = await sharp(input)
      .webp({ quality: 82, effort: 4 })
      .toBuffer();
    await writeFile(webpPath, output);
    // eslint-disable-next-line no-console
    console.log(`Created: ${webpPath}`);
  }
}

const IMAGES_DIR = join(process.cwd(), 'public', 'images');
await ensureWebpForPngs(IMAGES_DIR);
// eslint-disable-next-line no-console
console.log('PNG → WebP conversion finished.');


