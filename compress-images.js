const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'img');
const maxWidth = 1200;
const quality = 30;
const maxSize = 350 * 1024; // 350KB

const images = [
  'card-img1.webp',
  'card-img2.webp',
  'card-img3.webp',
  'card-img4.webp',
  'card-img5.webp',
  'card-img6.webp',
  'hand-img.png',
];

async function compressImage(file) {
  const inputPath = path.join(imgDir, file);
  const ext = path.extname(file).toLowerCase();
  const isWebp = ext === '.webp';
  const isPng = ext === '.png';
  const tempPath = inputPath + '.tmp';

  let pipeline = sharp(inputPath).resize({ width: maxWidth, withoutEnlargement: true });
  if (isWebp) {
    pipeline = pipeline.webp({ quality });
  } else if (isPng) {
    pipeline = pipeline.png({ quality });
  } else {
    return;
  }
  await pipeline.toFile(tempPath);
  fs.renameSync(tempPath, inputPath);

  // Check size, if still too large, try lower quality
  let stats = fs.statSync(inputPath);
  if (stats.size > maxSize && isWebp) {
    await sharp(inputPath).resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality: 20 }).toFile(tempPath);
    fs.renameSync(tempPath, inputPath);
  }
}

(async () => {
  for (const img of images) {
    if (fs.existsSync(path.join(imgDir, img))) {
      try {
        await compressImage(img);
        console.log(`Compressed: ${img}`);
      } catch (e) {
        console.error(`Failed: ${img}`, e);
      }
    }
  }
  console.log('All images processed.');
})(); 