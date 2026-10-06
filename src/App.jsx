import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import WritingIndex from './pages/WritingIndex'
import WritingPost from './pages/WritingPost'
import NotFound from './pages/NotFound'

// React Router keeps the old scroll position between pages. Start each new page at
// the top, or at the section named in the URL (#projects etc.): the browser's own
// jump to a #section runs before React has rendered it, so we do it here.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    const target = id ? document.getElementById(id) : null
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writing" element={<WritingIndex />} />
        <Route path="/writing/:slug" element={<WritingPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
