import { useEffect, useState } from 'react'
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
      <a className="brand" href="#top">
        Srikanth <span>Reddy</span>
      </a>
      <div className="navlinks">
        <a href="#bring">Capabilities</a>
        <a href="#projects">Projects</a>
        <a href="#clients">Clients</a>
        <a href="#why">Why Me</a>
        <a
          href="https://github.com/mesrikanthreddy"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
        <a href="#contact" className="nav-cta">
          Let's Talk
        </a>
        <ThemeToggle />
      </div>
    </nav>
  )
}
