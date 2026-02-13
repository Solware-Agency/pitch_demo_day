/**
 * Quita el fondo negro de emprende-tech.png haciendo transparentes los píxeles oscuros.
 * Uso: node scripts/remove-black-bg.mjs
 */
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const inputPath = join(__dirname, '../public/emprende-tech.png')
const outputPath = join(__dirname, '../public/emprende-tech-transparent.png')

const BLACK_THRESHOLD = 45 // píxeles con R,G,B < esto se hacen transparentes

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info

for (let i = 0; i < data.length; i += channels) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  if (r < BLACK_THRESHOLD && g < BLACK_THRESHOLD && b < BLACK_THRESHOLD) {
    data[i + 3] = 0
  }
}

await sharp(Buffer.from(data), { raw: { width, height, channels } })
  .png()
  .toFile(outputPath)

console.log('Logo con fondo transparente guardado en:', outputPath)
