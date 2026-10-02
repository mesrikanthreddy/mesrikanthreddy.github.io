import { Link, useParams } from 'react-router-dom'
import { getPost, formatDate } from '../content/writing'
import NotFound from './NotFound'

export default function WritingPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) {
    return <NotFound />
  }

  const { Component, meta } = post

  return (
    <main id="main" className="page-wrap">
      <article className="wrap post-article">
        <Link className="post-back" to="/writing">
          ← All writing
        </Link>
        <h1 className="post-article-title">{meta.title}</h1>
        <time className="post-date" dateTime={meta.date}>
          {formatDate(meta.date)}
        </time>
        <div className="prose">
          <Component />
        </div>
      </article>
    </main>
  )
}
