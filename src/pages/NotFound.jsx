import { Link } from 'react-router-dom'

export default function NotFound() {
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
