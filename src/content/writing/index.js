import readingTimes from './reading-times.generated.json'

const modules = import.meta.glob('./*.mdx', { eager: true })

export const posts = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.replace('./', '').replace('.mdx', '')
    return {
      slug,
      meta: mod.meta,
      Component: mod.default,
      readingTime: readingTimes[slug] || 1,
    }
  })
  .filter((post) => post.meta && !post.meta.draft)
  .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))

export function getPost(slug) {
  return posts.find((post) => post.slug === slug)
}

export function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ── Series ────────────────────────────────────────────────────────────────
// Posts that share meta.series are shown as ONE card on the writing lists and
// get their own page listing every part (route: /series/<slug>).
const seriesInfo = {
  'ML Glossary A to Z': {
    slug: 'ml-glossary-a-to-z',
    type: 'Meme Feast',
    subtitle:
      'Google’s machine learning glossary retold over chai by two friends, with an original animated meme and a real-world case for every term.',
    excerpt:
      'The complete A to Z: 25 parts, 147 machine learning terms, each with a source you can open. Start anywhere, or read it in order.',
  },
}

export function seriesSlug(name) {
  return (seriesInfo[name] && seriesInfo[name].slug) || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export function getSeries(slug) {
  const name = Object.keys(seriesInfo).find((n) => seriesSlug(n) === slug)
  if (!name) return null
  const parts = posts
    .filter((p) => p.meta.series === name)
    .sort((a, b) => (a.meta.part || 0) - (b.meta.part || 0))
  if (parts.length === 0) return null
  const readingTime = parts.reduce((n, p) => n + p.readingTime, 0)
  return { name, slug, ...seriesInfo[name], parts, readingTime, date: parts[parts.length - 1].meta.date }
}

// What the writing lists show: standalone posts plus one entry per series,
// newest first. Every entry has an href, so cards don't care which kind it is.
export const entries = (() => {
  const seen = new Set()
  const out = []
  for (const post of posts) {
    const name = post.meta.series
    if (name && seriesInfo[name]) {
      if (seen.has(name)) continue
      seen.add(name)
      const s = getSeries(seriesSlug(name))
      out.push({
        key: `series-${s.slug}`,
        href: `/series/${s.slug}`,
        isSeries: true,
        partCount: s.parts.length,
        readingTime: s.readingTime,
        meta: { type: s.type, title: s.name, subtitle: s.subtitle, excerpt: s.excerpt, date: s.date },
      })
    } else {
      out.push({ key: post.slug, href: `/writing/${post.slug}`, isSeries: false, readingTime: post.readingTime, meta: post.meta })
    }
  }
  return out.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
})()
