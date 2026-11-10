import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    title: 'Synapse',
    href: 'https://synapse.ytt.global',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'One console for content, leads, messaging, and site publishing.',
  },
  {
    title: 'Vidya',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'School management and parent messaging for Indian schools.',
  },
  {
    title: 'Project-TEC',
    href: 'https://ytt.global/project-tec',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'Students learn through live projects with industry mentors.',
  },
  {
    title: 'HU-INT',
    href: 'https://ytt.global/huint',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'Screened technical practitioners, delivered on-shore, near-shore, or off-shore.',
  },
  {
    title: 'kShield',
    href: 'https://ytt-global.github.io/kshield/',
    status: 'live',
    statusLabel: 'Live',
    desc: 'A security tool that scans code before it is committed.',
  },
  {
    title: 'Axon',
    status: 'pre',
    statusLabel: 'Early Build',
    desc: 'A CRM for small businesses and solo operators.',
  },
  {
    title: 'Vahk',
    status: 'pre',
    statusLabel: 'In Development',
    desc: 'A voice agent that answers calls and takes notes.',
  },
  {
    title: 'DataFuse',
    status: 'pre',
    statusLabel: 'In Development',
    desc: 'An open-source platform for ingesting and analyzing data.',
  },
  {
    title: 'YTT Payments',
    status: 'pre',
    statusLabel: 'In Development',
    desc: 'One payments service shared by all YTT products.',
  },
  {
    title: 'Jodhpur Sweets',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'A quick-commerce app for ordering Indian sweets.',
  },
  {
    title: 'QGA Cancer Therapeutics',
    href: 'https://ytt-global.github.io/qga-cancer-therapeutics/',
    status: 'pre',
    statusLabel: 'Research POC',
    desc: 'Research on picking cancer drug combinations with quantum computing.',
  },
  {
    title: 'IDP',
    href: 'https://github.com/mesrikanthreddy/Search-AI',
    status: 'pre',
    statusLabel: 'MVP',
    desc: 'Search across uploaded documents, with no AI services involved.',
  },
  {
    title: 'Cross-Border Patient Portal',
    status: 'pre',
    statusLabel: 'In Design',
    desc: 'A secure patient portal for a stealth healthcare startup, in design with HIPAA, GDPR, and DPDP in mind.',
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
          <span className="section-num">01</span>
          <div>
            <h2>What I'm Building</h2>
            <div className="rule" />
          </div>
        </div>
        <p className="projects-intro reveal" ref={introRef}>
          What we are building, and where each one stands.
        </p>
        <div className="proj-grid reveal" ref={gridRef}>
          {PROJECTS.map((p) => {
            const body = (
              <>
                <div className="proj-top">
                  <span className="proj-title">{p.title}</span>
                  {p.href && <span className="proj-arrow">↗</span>}
                </div>
                <span className={`proj-status ${p.status}`}>
                  {p.statusLabel}
                </span>
                <p className="proj-desc">{p.desc}</p>
              </>
            )
            return p.href ? (
              <a
                className="proj"
                href={p.href}
                target="_blank"
                rel="noopener"
                key={p.title}
              >
                {body}
              </a>
            ) : (
              <div className="proj" key={p.title}>
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
