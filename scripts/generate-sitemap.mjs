import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://mesrikanthreddy.github.io'
const contentDir = path.join(process.cwd(), 'src/content/writing')
const outPath = path.join(process.cwd(), 'public/sitemap.xml')

const staticRoutes = [
  { loc: `${SITE_URL}/`, priority: '1.0' },
  { loc: `${SITE_URL}/writing`, priority: '0.8' },
]

const postFiles = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

const postRoutes = postFiles
  .map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf8')
    const dateMatch = raw.match(/date:\s*['"]([\d-]+)['"]/)
    const isDraft = /draft:\s*true/.test(raw)
    return {
      slug: file.replace(/\.mdx$/, ''),
      date: dateMatch ? dateMatch[1] : null,
      isDraft,
    }
  })
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

fs.writeFileSync(outPath, xml)
console.log(`Generated sitemap.xml with ${urls.length} URLs`)
