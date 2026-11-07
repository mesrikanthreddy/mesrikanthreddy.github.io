import { Link } from 'react-router-dom'
import { posts } from '../content/writing'

export default function Hero() {
  const latest = posts.find((post) => post.meta.type)

  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <div className="eyebrow">Technical Founder · YTT Global</div>
        <h1>
          <span className="surname">Bollampally</span>, Srikanth Reddy
        </h1>
        <p className="role">
          <strong>Technical Founder</strong> · Full-Stack · DevSecOps ·{' '}
          <strong>AI/ML</strong> · <strong>Agentic AI</strong>
        </p>
        <p className="lede">
          I founded YTT Global to build products and ship them myself, from
          the first schema to the production deploy. <strong>Twelve years</strong>{' '}
          of enterprise cloud and machine learning work taught me what holds
          up in production. Now I build for founders, and for my own
          ventures.
        </p>
        <div className="status-row">
          <a
            className="current-role"
            href="https://ytt.global"
            target="_blank"
            rel="noopener"
          >
            <span className="dot" /> Founder, YTT Global{' '}
            <span className="arrow">↗</span>
          </a>
          <div className="current-role is-static">
            <span className="dot" /> Building a stealth healthcare startup, YTT
            Global
          </div>
          {latest && (
            <Link className="current-role" to={`/writing/${latest.slug}`}>
              <span className="dot is-new" /> New {latest.meta.type}:{' '}
              {latest.meta.title} <span className="arrow">→</span>
            </Link>
          )}
        </div>
        <div className="scroll-cue">
          <span />
          Scroll
        </div>
      </div>
    </section>
  )
}
