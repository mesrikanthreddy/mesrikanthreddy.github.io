import { Link, useParams } from 'react-router-dom'
import { getPost, formatDate } from '../content/writing'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import NotFound from './NotFound'

export default function WritingPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  useDocumentMeta(
    post ? { title: post.meta.title, description: post.meta.excerpt } : undefined,
  )

  if (!post) {
    return <NotFound />
  }

  const { Component, meta, readingTime } = post

  return (
    <main id="main" className="page-wrap">
      <article className="wrap post-article">
        <Link className="post-back" to="/writing">
          ← All writing
        </Link>
        <h1 className="post-article-title">{meta.title}</h1>
        <div className="post-meta">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          <span className="post-meta-dot" aria-hidden="true" />
          <span>{readingTime} min read</span>
        </div>
        <div className="prose">
          <Component />
        </div>
      </article>
    </main>
  )
}
