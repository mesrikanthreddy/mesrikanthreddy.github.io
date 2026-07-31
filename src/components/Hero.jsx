import { useEffect, useRef } from 'react'
import kalkiWebp from '../assets/mesrikanthreddy.webp'
import kalkiJpg from '../assets/mesrikanthreddy.jpg'

export default function Hero() {
  const wrapRef = useRef(null)
  const driftRef = useRef(null)

  // Ember particles
  useEffect(() => {
    const drift = driftRef.current
    if (!drift) return
    const count = window.innerWidth < 820 ? 12 : 22
    const nodes = []
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span')
      s.style.left = Math.random() * 100 + '%'
      s.style.setProperty('--drift', Math.random() * 40 - 20 + 'px')
      s.style.animationDuration = 7 + Math.random() * 8 + 's'
      s.style.animationDelay = Math.random() * 10 + 's'
      drift.appendChild(s)
      nodes.push(s)
    }
    return () => nodes.forEach((n) => n.remove())
  }, [])

  // Subtle hero parallax
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY
          if (y < window.innerHeight && wrapRef.current) {
            wrapRef.current.style.transform = `translateY(${y * 0.12}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero-img-wrap" ref={wrapRef}>
        <picture>
          <source srcSet={kalkiWebp} type="image/webp" />
          <img
            src={kalkiJpg}
            alt="Kalki, a blue-skinned warrior astride a white horse, wielding a flaming sword amid storm clouds and embers"
            width="1024"
            height="1024"
            loading="eager"
          />
        </picture>
      </div>
      <div className="hero-scrim" />
      <div className="ember-drift" ref={driftRef} aria-hidden="true" />
      <div className="wind-streaks" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="hero-content">
        <div className="eyebrow">Full-Stack · DevOps · AI/ML</div>
        <h1>Srikanth&nbsp;Reddy</h1>
        <p className="role">
          Full-Stack Developer · Full-Stack DevOps Leader ·{' '}
          <strong>AI/ML Specialist</strong>
        </p>
        <p className="lede">
          I help startups and enterprises transform ideas into intelligent
          solutions — systems forged to last, fast, scalable, and built end
          to end. <strong>Eleven years</strong> turning brittle legacy
          pipelines into modern cloud infrastructure, and shipping machine
          learning made for production, not demos.
        </p>
        <a
          className="current-role"
          href="https://ytt.global"
          target="_blank"
          rel="noopener"
        >
          <span className="dot" /> Principal Technical Consultant, YTT Global{' '}
          <span className="arrow">↗</span>
        </a>
        <div className="scroll-cue">
          <span />
          Scroll
        </div>
      </div>
    </section>
  )
}
