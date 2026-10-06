// Per-post static HTML for link previews.
//
// The site is a client-rendered SPA on GitHub Pages: link-preview crawlers
// (LinkedIn, X, Slack, WhatsApp) don't run JavaScript, so every URL would show
// the homepage card. After `vite build`, this writes dist/writing/<slug>/index.html
// as a copy of dist/index.html with that post's title/description/image in the
// <head>. The SPA still boots normally and routes by path.
import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://mesrikanthreddy.github.io'
const SITE_NAME = 'Bollampally, Srikanth Reddy'
const root = process.cwd()
const contentDir = path.join(root, 'src/content/writing')
const distDir = path.join(root, 'dist')
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')

const esc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function readMeta(raw) {
  const m = raw.match(/export const meta = (\{[\s\S]*?\n\})/)
  if (!m) return null
  // Post meta is author-controlled object-literal data in this repo.
  return new Function(`return (${m[1]})`)()
}

function setMeta(html, key, value) {
  const re = new RegExp(`<meta\\s+(?:name|property)="${key}"\\s+content="[^"]*"\\s*/>`)
  const tag = `<meta ${key.includes(':') && !key.startsWith('twitter') ? 'property' : 'name'}="${key}" content="${esc(value)}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

let count = 0
for (const file of fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))) {
  const slug = file.replace(/\.mdx$/, '')
  const meta = readMeta(fs.readFileSync(path.join(contentDir, file), 'utf8'))
  if (!meta || meta.draft) continue

  const url = `${SITE_URL}/writing/${slug}`
  const title = `${meta.title} — ${SITE_NAME}`
  const description = meta.excerpt || ''
  const ogFile = path.join(root, 'public/og', `${slug}.png`)
  const image = fs.existsSync(ogFile) ? `${SITE_URL}/og/${slug}.png` : `${SITE_URL}/og-image.png`

  let html = template
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
  html = setMeta(html, 'description', description)
  html = setMeta(html, 'og:type', 'article')
  html = setMeta(html, 'og:title', title)
  html = setMeta(html, 'og:description', description)
  html = setMeta(html, 'og:url', url)
  html = setMeta(html, 'og:image', image)
  html = setMeta(html, 'twitter:title', title)
  html = setMeta(html, 'twitter:description', description)
  html = setMeta(html, 'twitter:image', image)

  const outDir = path.join(distDir, 'writing', slug)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
  count++
}
console.log(`Generated ${count} per-post HTML page(s) for link previews`)
