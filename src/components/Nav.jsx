import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

// Below this width the full link row no longer fits, so it collapses into a menu.
// Keep in sync with --menu-bp in index.css.
const MENU_MIN_WIDTH = 1240

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const toggleRef = useRef(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  // Close after any navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  // While open: Escape and outside-tap close it, growing to desktop width closes
  // it, and the page behind doesn't scroll.
  useEffect(() => {
    if (!open) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    const mql = window.matchMedia(`(min-width: ${MENU_MIN_WIDTH}px)`)
    const onWidthChange = () => {
      if (mql.matches) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    mql.addEventListener('change', onWidthChange)
    document.documentElement.classList.add('nav-open')

    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
      mql.removeEventListener('change', onWidthChange)
      document.documentElement.classList.remove('nav-open')
    }
  }, [open])

  // Any link tapped inside the menu closes it (hash links don't change the route).
  const onMenuClick = (event) => {
    if (event.target.closest('a')) setOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={`topnav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}
      aria-label="Primary"
    >
      <a className="brand" href="/">
        <span className="brand-title">Mr</span>
        <span className="brand-name">Bollampally</span>
      </a>
      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="nav-toggle-bars" aria-hidden="true" />
      </button>
      <div
        id="site-menu"
        className={`navlinks${open ? ' open' : ''}`}
        onClick={onMenuClick}
      >
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
