import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function NotFound() {
  useDocumentMeta({ title: 'Page Not Found', noindex: true })

  return (
    <main id="main" className="page-wrap">
      <div className="wrap">
        <h1>Page not found</h1>
        <p className="lede" style={{ marginTop: 16 }}>
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </main>
  )
}
