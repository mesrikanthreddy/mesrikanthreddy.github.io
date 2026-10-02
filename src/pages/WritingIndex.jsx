import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { posts, formatDate } from '../content/writing'

export default function WritingIndex() {
  const headRef = useReveal()
  const listRef = useReveal()
  useDocumentMeta({
    title: 'Writing',
    description:
      'Longer-form writing on engineering, AI, and building production systems, from Bollampally, Srikanth Reddy.',
  })

  return (
    <main id="main" className="page-wrap">
      <section>
        <div className="wrap">
          <div className="section-head reveal" ref={headRef}>
            <span className="section-num">05</span>
            <div>
              <h2>Writing</h2>
              <div className="rule" />
            </div>
          </div>

          {posts.length === 0 ? (
            <p className="projects-intro">Nothing published yet — check back soon.</p>
          ) : (
            <div className="post-list reveal" ref={listRef}>
              {posts.map((post) => (
                <Link className="post-item" to={`/writing/${post.slug}`} key={post.slug}>
                  <div className="post-item-top">
                    <span className="post-title">{post.meta.title}</span>
                    <span className="proj-arrow">↗</span>
                  </div>
                  <div className="post-meta">
                    <time dateTime={post.meta.date}>
                      {formatDate(post.meta.date)}
                    </time>
                    <span className="post-meta-dot" aria-hidden="true" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  {post.meta.excerpt && (
                    <p className="post-excerpt">{post.meta.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
