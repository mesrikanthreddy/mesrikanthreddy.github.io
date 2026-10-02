import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`topnav${scrolled ? ' scrolled' : ''}`} aria-label="Primary">
      <a className="brand" href="/">
        <span className="brand-title">Mr</span>
        <span className="brand-name">Bollampally</span>
      </a>
      <div className="navlinks">
        <a href="/#bring">Capabilities</a>
        <a href="/#projects">Projects</a>
        <a href="/#clients">Clients</a>
        <a href="/#why">Why Me</a>
        <Link to="/writing">Writing</Link>
        <a
          href="/mesrikanthreddy-resume.pdf"
          target="_blank"
          rel="noopener"
          download="Bollampally-Srikanth-Reddy-Resume.pdf"
        >
          Resume
        </a>
        <a
          href="https://github.com/mesrikanthreddy"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
        <a href="/#contact" className="nav-cta">
          Let's Talk
        </a>
        <ThemeToggle />
      </div>
    </nav>
  )
}
