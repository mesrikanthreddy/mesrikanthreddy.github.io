import { Link } from 'react-router-dom'
import { RocketLaunch, Code, ShieldCheck, Brain, Robot } from '@phosphor-icons/react'
import { posts } from '../content/writing'

// Each focus area routes to the matching service page on ytt.global.
const FOCUS = [
  { Icon: RocketLaunch, label: 'Technical Founder', href: 'https://ytt.global/about' },
  { Icon: Code, label: 'Full-Stack', href: 'https://ytt.global/services/custom-software-development' },
  { Icon: ShieldCheck, label: 'DevSecOps', href: 'https://ytt.global/services/devops-cloud-infrastructure#cloud-security' },
  { Icon: Brain, label: 'AI/ML', href: 'https://ytt.global/services/machine-learning-development' },
  { Icon: Robot, label: 'Agentic AI', href: 'https://ytt.global/services/machine-learning-development#agentic-workflows' },
]

export default function Hero() {
  const latest = posts.find((post) => post.meta.type)

  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <div className="eyebrow">Technical Founder · YTT Global</div>
        <h1>
          <span className="surname">Bollampally</span>, Srikanth Reddy
        </h1>
        <nav className="focus-row" aria-label="Focus areas">
          {FOCUS.map(({ Icon, label, href }) => (
            <a className="focus-link" href={href} target="_blank" rel="noopener" key={label}>
              <Icon size={26} weight="duotone" aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>
        <p className="lede">
          I run YTT Global with a small, senior team on a mission to build
          private SaaS, agentic AI, and every service listed on ytt.global.
          Bring us your requirements and <strong>we deliver the product
          together</strong>, from first schema to production deploy.
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
