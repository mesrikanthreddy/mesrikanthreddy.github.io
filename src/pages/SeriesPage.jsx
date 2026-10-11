import { Link, useParams } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { getSeries, formatDate } from '../content/writing'
import NotFound from './NotFound'

// "Part K: From Keras to K-Means" -> "From Keras to K-Means"
const partTitle = (title) => title.replace(/^.*?Part\s+\w+:\s*/, '')

export default function SeriesPage() {
  const { slug } = useParams()
  const series = getSeries(slug)
  const listRef = useReveal()
  useDocumentMeta(series ? { title: series.name, description: series.excerpt } : undefined)

  if (!series) return <NotFound />

  return (
    <main id="main" className="page-wrap">
      <section>
        <div className="wrap">
          <Link className="post-back" to="/writing">
            ← All writing
          </Link>
          <span className="post-type post-type-block" data-type={series.type}>
            {series.type}
          </span>
          <h1 className="post-article-title">{series.name}</h1>
          <p className="post-subtitle">{series.subtitle}</p>
          <div className="post-meta">
            <span>{series.parts.length} parts</span>
            <span className="post-meta-dot" aria-hidden="true" />
            <span>{series.readingTime} min in total</span>
          </div>

          <ol className="series-list reveal" ref={listRef}>
            {series.parts.map((post) => (
              <li key={post.slug}>
                <Link className="post-item series-item" to={`/writing/${post.slug}`}>
                  <span className="series-letter" aria-hidden="true">
                    {post.slug.replace('ml-glossary-', '').toUpperCase()}
                  </span>
                  <span className="series-body">
                    <span className="post-title">{partTitle(post.meta.title)}</span>
                    <span className="post-meta">
                      <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
                      <span className="post-meta-dot" aria-hidden="true" />
                      <span>{post.readingTime} min read</span>
                    </span>
                  </span>
                  <span className="proj-arrow">↗</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="post-subtitle">Y has no entries in Google’s glossary, so there is no Part Y.</p>
        </div>
      </section>
    </main>
  )
}
