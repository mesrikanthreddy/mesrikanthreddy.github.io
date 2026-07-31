import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    title: 'kShield',
    href: 'https://ytt-global.github.io/kshield/',
    status: 'live',
    statusLabel: 'Live',
    desc: 'A security-focused tooling project built under the YTT Global banner.',
  },
  {
    title: 'Project-TEC',
    href: 'https://ytt.global/project-tec',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'An ed-tech initiative that launches students into real technical careers — live projects and open-source contributions, mentored by industry practitioners instead of scripted tutorials.',
  },
  {
    title: 'HU-INT',
    href: 'https://ytt.global/huint',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'A containerized delivery platform for screened technical practitioners — deployed on-shore, near-shore, and off-shore to give clients precise control over engagement budget.',
  },
  {
    title: 'QGA Cancer Therapeutics',
    href: 'https://ytt-global.github.io/qga-cancer-therapeutics/',
    status: 'pre',
    statusLabel: 'Research POC',
    desc: 'A research proof-of-concept applying a quantum genetic algorithm (NVIDIA CUDA-Q) to multi-drug cancer therapy selection — scoring candidate combinations for efficacy, synergy, and toxicity against a mock dataset.',
  },
  {
    title: 'Synapse',
    href: 'https://synapse.ytt.global',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'A pilot product helping SMBs, startups, and community leaders go to market — content, leads, messaging, and site publishing in one console.',
  },
]

export default function Projects() {
  const headRef = useReveal()
  const introRef = useReveal()
  const gridRef = useReveal()

  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <span className="section-num">04</span>
          <div>
            <h2>Personal Projects</h2>
            <div className="rule" />
          </div>
        </div>
        <p className="projects-intro reveal" ref={introRef}>
          Independent builds under the YTT Global banner, aimed at real
          problems rather than portfolio filler.
        </p>
        <div className="proj-grid reveal" ref={gridRef}>
          {PROJECTS.map((p) => (
            <a
              className="proj"
              href={p.href}
              target="_blank"
              rel="noopener"
              key={p.title}
            >
              <div className="proj-top">
                <span className="proj-title">{p.title}</span>
                <span className="proj-arrow">↗</span>
              </div>
              <span className={`proj-status ${p.status}`}>
                {p.statusLabel}
              </span>
              <p className="proj-desc">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
