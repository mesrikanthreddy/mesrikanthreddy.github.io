import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { posts, formatDate } from '../content/writing'

// Newest post gets the featured card; this many older ones are listed below it.
const MORE_COUNT = 1

export default function LatestWriting() {
  const headRef = useReveal()
  const introRef = useReveal()
  const featuredRef = useReveal()
  const moreRef = useReveal()

  if (posts.length === 0) return null

  const [featured, ...rest] = posts
  const more = rest.slice(0, MORE_COUNT)
  const { meta } = featured

  return (
    <section id="writing">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <span className="section-num">05</span>
          <div>
            <h2>Writing</h2>
            <div className="rule" />
          </div>
        </div>
        <p className="projects-intro reveal" ref={introRef}>
          Longer-form pieces on engineering, AI, and building systems that last
          in production.
        </p>

        <Link
          className="feature-post reveal"
          to={`/writing/${featured.slug}`}
          data-type={meta.type}
          ref={featuredRef}
        >
          {meta.type && (
            <span className="post-type" data-type={meta.type}>
              {meta.type}
            </span>
          )}
          <span className="feature-title">{meta.title}</span>
          {meta.subtitle && <span className="feature-sub">{meta.subtitle}</span>}
          {meta.excerpt && <span className="feature-excerpt">{meta.excerpt}</span>}
          <span className="feature-foot">
            <span className="post-meta">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              <span className="post-meta-dot" aria-hidden="true" />
              <span>{featured.readingTime} min read</span>
            </span>
            <span className="feature-cta">
              Read the {meta.type ? meta.type.toLowerCase() : 'post'} →
            </span>
          </span>
        </Link>

        {more.length > 0 && (
          <div className="post-list reveal" ref={moreRef}>
            {more.map((post) => (
              <Link className="post-item" to={`/writing/${post.slug}`} key={post.slug}>
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
                  <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
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

        <Link className="writing-all" to="/writing">
          All writing →
        </Link>
      </div>
    </section>
  )
}
