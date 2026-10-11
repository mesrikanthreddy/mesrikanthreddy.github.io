import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { entries, formatDate } from '../content/writing'

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

          <Link className="post-item" to="/tasks">
            <div className="post-item-top">
              <span className="post-title">
                <span className="post-type" data-type="Interactive">Interactive</span>
                The Periodic Table of ML Tasks
              </span>
              <span className="proj-arrow">↗</span>
            </div>
            <p className="post-excerpt">
              All 47 Hugging Face tasks in one table. Hover for the meaning, click for a toy animation and a real-world case.
            </p>
          </Link>

          {entries.length === 0 ? (
            <p className="projects-intro">Nothing published yet — check back soon.</p>
          ) : (
            <div className="post-list reveal" ref={listRef}>
              {entries.map((post) => (
                <Link className="post-item" to={post.href} key={post.key}>
                  <div className="post-item-top">
                    <span className="post-title">
                      {post.meta.type && (
                        <span className="post-type" data-type={post.meta.type}>
                          {post.meta.type}
                        </span>
                      )}
                      {post.meta.title}
                    </span>
                    <span className="proj-arrow">↗</span>
                  </div>
                  <div className="post-meta">
                    <time dateTime={post.meta.date}>
                      {formatDate(post.meta.date)}
                    </time>
                    <span className="post-meta-dot" aria-hidden="true" />
                    <span>{post.isSeries ? `${post.partCount} parts · ${post.readingTime} min total` : `${post.readingTime} min read`}</span>
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
