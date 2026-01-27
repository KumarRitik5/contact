import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');

const SOURCE_SVG = path.join(PUBLIC_DIR, 'favicon.svg');

const PNG_TARGETS = [
  { filename: 'favicon-16x16.png', size: 16 },
  { filename: 'favicon-32x32.png', size: 32 },
  { filename: 'apple-touch-icon.png', size: 180 },
  { filename: 'android-chrome-192x192.png', size: 192 },
  { filename: 'android-chrome-512x512.png', size: 512 },
];

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await fileExists(SOURCE_SVG))) {
    throw new Error(`Missing source icon: ${SOURCE_SVG}`);
  }

  const svgBuffer = await fs.readFile(SOURCE_SVG);

  // Generate PNG assets
  for (const { filename, size } of PNG_TARGETS) {
    const outPath = path.join(PUBLIC_DIR, filename);
    const png = await sharp(svgBuffer)
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();

    await fs.writeFile(outPath, png);
  }

  // Generate favicon.ico (include common sizes)
  const icoSizes = [16, 32, 48];
  const icoPngBuffers = await Promise.all(
    icoSizes.map((size) =>
      sharp(svgBuffer)
        .resize(size, size, { fit: 'cover' })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer(),
    ),
  );

  const ico = await pngToIco(icoPngBuffers);
  await fs.writeFile(path.join(PUBLIC_DIR, 'favicon.ico'), ico);

  console.log('Generated icons in /public:');
  console.log(
    ['favicon.ico', ...PNG_TARGETS.map((t) => t.filename)]
      .map((f) => `- ${f}`)
      .join('\n'),
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
