import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import heroWebp from '../assets/mesrikanthreddy.webp'
import heroPng from '../assets/mesrikanthreddy.png'
import { supportsWebGL } from '../lib/webgl'
import SceneBoundary from './SceneBoundary'

// three.js is ~300 kB gzipped — keep it out of the initial bundle so the flat
// hero image paints immediately, then upgrade to the 3D scene once it lands.
const HeroScene = lazy(() => import('./HeroScene'))

const heroAlt =
  'A storm splitting in two: on the left, a collapsing data center tangled in dead cables and red warning glyphs beneath a dark storm; on the right, the same sky reborn as a teal-and-amber aurora forming a glowing network of light, with a bright coral spark marking the turning point'

function FlatHeroImage() {
  return (
    <picture>
      <source srcSet={heroWebp} type="image/webp" />
      <img
        src={heroPng}
        alt={heroAlt}
        width="1024"
        height="1024"
        loading="eager"
      />
    </picture>
  )
}

export default function Hero() {
  const wrapRef = useRef(null)
  const driftRef = useRef(null)
  const [use3D, setUse3D] = useState(() => supportsWebGL())
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

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
    if (reducedMotion) return

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
  }, [reducedMotion])

  return (
    <section className="hero" id="top">
      <div className={`hero-img-wrap${use3D ? ' is-3d' : ''}`} ref={wrapRef}>
        {use3D ? (
          <SceneBoundary fallback={<FlatHeroImage />}>
            <Suspense fallback={<FlatHeroImage />}>
              <HeroScene
                webpSrc={heroWebp}
                reducedMotion={reducedMotion}
                onContextLost={() => setUse3D(false)}
              />
            </Suspense>
          </SceneBoundary>
        ) : (
          <FlatHeroImage />
        )}
        <span className="sr-only">{heroAlt}</span>
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
          <strong>AI/ML Specialist</strong> ·{' '}
          <strong>Forward Deployed Engineer</strong> ·{' '}
          <strong>Agentic AI Developer</strong>
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
