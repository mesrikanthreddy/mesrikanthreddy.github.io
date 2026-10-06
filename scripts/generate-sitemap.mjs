import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://mesrikanthreddy.github.io'
const contentDir = path.join(process.cwd(), 'src/content/writing')
const sitemapOutPath = path.join(process.cwd(), 'public/sitemap.xml')
const readingTimeOutPath = path.join(
  process.cwd(),
  'src/content/writing/reading-times.generated.json',
)

const WORDS_PER_MINUTE = 200

function estimateReadingTime(raw) {
  const body = raw
    .replace(/export const meta[\s\S]*?\n}\n?/, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '') // illustrations are markup, not reading
    .replace(/<[^>]+>/g, ' ')
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

const postFiles = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

const posts = postFiles.map((file) => {
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf8')
  const dateMatch = raw.match(/date:\s*['"]([\d-]+)['"]/)
  const isDraft = /draft:\s*true/.test(raw)
  return {
    slug: file.replace(/\.mdx$/, ''),
    date: dateMatch ? dateMatch[1] : null,
    isDraft,
    readingTime: estimateReadingTime(raw),
  }
})

// sitemap.xml — regenerated on every build, gitignored
const staticRoutes = [
  { loc: `${SITE_URL}/`, priority: '1.0' },
  { loc: `${SITE_URL}/writing`, priority: '0.8' },
]
const postRoutes = posts
  .filter((post) => !post.isDraft)
  .map((post) => ({
    loc: `${SITE_URL}/writing/${post.slug}`,
    priority: '0.6',
    lastmod: post.date,
  }))
const urls = [...staticRoutes, ...postRoutes]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
fs.writeFileSync(sitemapOutPath, xml)
console.log(`Generated sitemap.xml with ${urls.length} URLs`)

// reading-times.generated.json — slug -> minutes, read by content/writing/index.js.
// Computed here (plain Node fs) rather than via import.meta.glob + "?raw" in the
// browser bundle, because @mdx-js/rollup intercepts .mdx requests regardless of
// query string and compiles them instead of returning raw text.
const readingTimes = Object.fromEntries(
  posts.map((post) => [post.slug, post.readingTime]),
)
fs.writeFileSync(readingTimeOutPath, JSON.stringify(readingTimes, null, 2))
console.log(`Generated reading-times.generated.json for ${posts.length} posts`)
