import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    title: 'Synapse',
    href: 'https://synapse.ytt.global',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'A pilot product helping SMBs, startups, and community leaders go to market. Content, leads, messaging, and site publishing in one console.',
  },
  {
    title: 'Vidya',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'A multi-tenant school management platform for Indian K-12 schools. WhatsApp-first parent communication, English and Telugu, with AI-drafted circulars and alerts. Priced per student per month.',
  },
  {
    title: 'Project-TEC',
    href: 'https://ytt.global/project-tec',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'An ed-tech initiative that launches students into real technical careers through live projects and open-source contributions, mentored by industry practitioners instead of scripted tutorials.',
  },
  {
    title: 'HU-INT',
    href: 'https://ytt.global/huint',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'A containerized delivery platform for screened technical practitioners, deployed on-shore, near-shore, and off-shore to give clients precise control over engagement budget.',
  },
  {
    title: 'kShield',
    href: 'https://ytt-global.github.io/kshield/',
    status: 'live',
    statusLabel: 'Live',
    desc: 'A security-focused tooling project built under the YTT Global banner.',
  },
  {
    title: 'Axon',
    status: 'pre',
    statusLabel: 'Early Build',
    desc: 'A CRM for SMBs and solo operators. Postgres for core records, a graph database for relationship paths, and an AI service for lead scoring.',
  },
  {
    title: 'Vahk',
    status: 'pre',
    statusLabel: 'In Development',
    desc: 'A real-time voice agent built piece by piece from the ground up, aimed at taking calls and notes for small businesses.',
  },
  {
    title: 'DataFuse',
    status: 'pre',
    statusLabel: 'In Development',
    desc: 'An open-source analytics platform. A manifest-driven Python ingestion engine feeds a browser-native OLAP layer running DuckDB WASM.',
  },
  {
    title: 'YTT Payments',
    status: 'pre',
    statusLabel: 'In Development',
    desc: 'One payments backbone for every YTT product. Products call a versioned API instead of each embedding their own Stripe or Razorpay integration.',
  },
  {
    title: 'Jodhpur Sweets',
    status: 'pre',
    statusLabel: 'Pre-Production',
    desc: 'A quick-commerce app for Indian sweets. Flutter front end, FastAPI and Postgres back end, real-time inventory, and UPI payments through Razorpay.',
  },
  {
    title: 'QGA Cancer Therapeutics',
    href: 'https://ytt-global.github.io/qga-cancer-therapeutics/',
    status: 'pre',
    statusLabel: 'Research POC',
    desc: 'A research proof-of-concept applying a quantum genetic algorithm (NVIDIA CUDA-Q) to multi-drug cancer therapy selection, scoring candidate combinations for efficacy, synergy, and toxicity against a mock dataset.',
  },
  {
    title: 'IDP',
    href: 'https://github.com/mesrikanthreddy/Search-AI',
    status: 'pre',
    statusLabel: 'MVP',
    desc: 'A document intelligence engine with a hand-written TF-IDF and cosine-similarity ranking algorithm. No LLMs or external AI APIs in the search path, verified against scikit-learn for correctness.',
  },
  {
    title: 'Cross-Border Patient Portal',
    status: 'pre',
    statusLabel: 'In Design',
    desc: 'A patient portal for a stealth healthcare startup, built for care that crosses borders. Designed around HIPAA (US), GDPR (EU), and DPDP (India) requirements, with an end-to-end encrypted document docket, consent captured per country, and separate patient, coordinator, and admin logins.',
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
          Everything we are building at YTT Global, from products in market to
          research proofs of concept. Each one is labeled with its real stage.
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
