const modules = import.meta.glob('./*.mdx', { eager: true })

export const posts = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.replace('./', '').replace('.mdx', ''),
    meta: mod.meta,
    Component: mod.default,
  }))
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
