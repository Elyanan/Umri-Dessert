import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = (file) => fileURLToPath(new URL(`../assets/originals/${file}`, import.meta.url));
const target = (file) => fileURLToPath(new URL(`../public/images/${file}`, import.meta.url));

await Promise.all(['hero', 'ingredients', 'gallery'].map((folder) => mkdir(target(folder), { recursive: true })));

const galleryPanels = [
  { label: 'chocolate', left: 2, width: 503 },
  { label: 'strawberry', left: 512, width: 512 },
  { label: 'coffee', left: 1030, width: 503 },
];

const grainSize = 128;
const grain = Buffer.alloc(grainSize * grainSize);
let seed = 91753;
for (let index = 0; index < grain.length; index++) {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  grain[index] = 64 + (seed & 127);
}

await Promise.all([
  sharp(grain, { raw: { width: grainSize, height: grainSize, channels: 1 } }).webp({ quality: 62 }).toFile(target('grain.webp')),
  ...['chocolate', 'strawberry'].map((flavor) => sharp(source(`${flavor}.png`))
    .resize({ width: 1440 })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(target(`hero/${flavor}.webp`))),
  sharp(source('macro.png')).webp({ quality: 86 }).toFile(target('hero/macro.webp')),
  sharp(source('ingredients.png')).extract({ left: 12, top: 0, width: 730, height: 810 })
    .resize({ width: 360 }).webp({ quality: 86, alphaQuality: 100 }).toFile(target('ingredients/strawberry.webp')),
  sharp(source('ingredients.png')).extract({ left: 1100, top: 73, width: 785, height: 717 })
    .resize({ width: 420 }).webp({ quality: 86, alphaQuality: 100 }).toFile(target('ingredients/chocolate.webp')),
  ...galleryPanels.map(({ label, left, width }) => sharp(source('editorial.png'))
    .extract({ left, top: 0, width, height: 1024 }).webp({ quality: 87 }).toFile(target(`gallery/${label}.webp`))),
  ...['caramel', 'table', 'berry-detail', 'cocoa'].map((scene) => sharp(source(`${scene}.png`))
    .resize({ width: 1536, withoutEnlargement: true }).modulate({ saturation: 0.96 }).sharpen({ sigma: 0.55 })
    .webp({ quality: 85 }).toFile(target(`gallery/${scene}.webp`))),
  sharp(source('pexels-2144112.jpg')).autoOrient().resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 }).toFile(target('gallery/experience.webp')),
]);
