#!/usr/bin/env node
/**
 * Generate SEO-ready favicons for both Next.js apps from assets/brand/logo-source.jpg.
 *
 * Outputs per app:
 *   src/app/     favicon.ico (16–96), icon.png (48), icon1.png (96), apple-icon.png (180)
 *   public/      icon-192.png, icon-512.png (web manifest / Android)
 *
 * Google Search: square icon ≥48×48, multiples of 48 recommended.
 * Re-run after updating the source image: pnpm favicons:generate
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '../..');
const SOURCE = path.join(ROOT, 'assets/brand/logo-source.jpg');

/** ICO frames — covers browser tabs and Google’s 48px+ guidance via multi-size ICO. */
const ICO_SIZES = [16, 32, 48, 96];

const APPS = [
  { name: 'frontend-main', dir: 'apps/frontend-main' },
  { name: 'frontend-admin', dir: 'apps/frontend-admin' },
];

async function resizePng(size, { rgba = false } = {}) {
  let pipeline = sharp(SOURCE).resize(size, size, {
    fit: 'cover',
    kernel: sharp.kernel.lanczos3,
  });
  if (rgba) {
    pipeline = pipeline.ensureAlpha();
  }
  return pipeline.png({ compressionLevel: 9 }).toBuffer();
}

/** Build a multi-size favicon.ico from PNG buffers (PNG-in-ICO, Vista+). */
function encodeIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  const imageOffsets = [];
  let offset = headerSize;
  for (const buf of pngBuffers) {
    imageOffsets.push(offset);
    offset += buf.length;
  }

  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);

  let entryOffset = 6;
  for (let i = 0; i < count; i++) {
    const dim = sizes[i];
    const w = dim >= 256 ? 0 : dim;
    const h = w;
    out.writeUInt8(w, entryOffset);
    out.writeUInt8(h, entryOffset + 1);
    out.writeUInt8(0, entryOffset + 2);
    out.writeUInt8(0, entryOffset + 3);
    out.writeUInt16LE(1, entryOffset + 4);
    out.writeUInt16LE(32, entryOffset + 6);
    out.writeUInt32LE(pngBuffers[i].length, entryOffset + 8);
    out.writeUInt32LE(imageOffsets[i], entryOffset + 12);
    entryOffset += 16;
  }

  let dataOffset = headerSize;
  for (const buf of pngBuffers) {
    buf.copy(out, dataOffset);
    dataOffset += buf.length;
  }

  return out;
}

/** Open Graph / social preview for frontend-main (1200×630). */
async function generateOgImage() {
  const width = 1200;
  const height = 630;
  const logoSize = 200;
  const logo = await sharp(SOURCE)
    .resize(logoSize, logoSize, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0a1628"/>
  <text x="80" y="200" fill="#f8fafc" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700">Ashikur Rahman</text>
  <text x="80" y="270" fill="#94a3b8" font-family="Arial, Helvetica, sans-serif" font-size="28">Software Developer in Canada</text>
  <text x="80" y="330" fill="#cbd5e1" font-family="Arial, Helvetica, sans-serif" font-size="24">Backend · Full-Stack · Data Structures &amp; Algorithms</text>
  <text x="80" y="380" fill="#64748b" font-family="Arial, Helvetica, sans-serif" font-size="22">Ottawa, Ontario, Canada</text>
</svg>`;

  const textLayer = await sharp(Buffer.from(svg)).png().toBuffer();

  const out = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: '#0a1628',
    },
  })
    .composite([
      { input: textLayer, top: 0, left: 0 },
      { input: logo, top: 80, left: width - logoSize - 80 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  const publicDir = path.join(ROOT, 'apps/frontend-main/public');
  await mkdir(publicDir, { recursive: true });
  await writeFile(path.join(publicDir, 'og-image.png'), out);
  console.log('Wrote og-image.png → apps/frontend-main/public/');
}

async function generateIcons() {
  const [icoBuffers, icon48, icon96, applePng, icon192, icon512] = await Promise.all([
    Promise.all(ICO_SIZES.map((size) => resizePng(size, { rgba: true }))),
    resizePng(48),
    resizePng(96),
    resizePng(180),
    resizePng(192),
    resizePng(512),
  ]);

  const faviconIco = encodeIco(icoBuffers, ICO_SIZES);

  for (const { dir } of APPS) {
    const appDir = path.join(ROOT, dir, 'src/app');
    const publicDir = path.join(ROOT, dir, 'public');
    await mkdir(appDir, { recursive: true });
    await mkdir(publicDir, { recursive: true });

    await Promise.all([
      writeFile(path.join(appDir, 'favicon.ico'), faviconIco),
      writeFile(path.join(appDir, 'icon.png'), icon48),
      writeFile(path.join(appDir, 'icon1.png'), icon96),
      writeFile(path.join(appDir, 'apple-icon.png'), applePng),
      writeFile(path.join(publicDir, 'icon-192.png'), icon192),
      writeFile(path.join(publicDir, 'icon-512.png'), icon512),
    ]);
    console.log(`Wrote icons → ${dir}/`);
  }

  console.log(`Done (${APPS.length} apps, ICO sizes: ${ICO_SIZES.join(', ')})`);
  await generateOgImage();
}

generateIcons().catch((err) => {
  console.error('favicon generation failed:', err);
  process.exit(1);
});
