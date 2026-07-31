import { useReveal } from '../hooks/useReveal'

const CAPS = [
  {
    title: 'Full-Stack Development',
    tags: ['React', 'Next.js', 'Node.js', 'Python', 'Flask', 'FastAPI'],
  },
  {
    title: 'Cloud & DevOps',
    tags: [
      'AWS',
      'Azure',
      'GCP',
      'Docker',
      'Kubernetes',
      'Terraform',
      'CI/CD',
      'Ansible',
      'Helm',
      'ArgoCD',
      'GitHub Actions',
      'Nginx',
    ],
  },
  {
    title: 'AI / ML',
    tags: [
      'Custom ML Models',
      'NLP',
      'Computer Vision',
      'MLOps',
      'GenAI Tooling',
      'Agentic AI',
      'A2A',
      'MCP',
      'RAG',
      'ADK',
    ],
  },
  {
    title: 'Monitoring & SRE',
    tags: ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog'],
  },
  {
    title: 'Databases',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
  },
  {
    title: 'Leadership & Delivery',
    tags: [
      'Agile / Scrum',
      'Roadmapping',
      'Stakeholder Mgmt',
      'Cross-functional Leadership',
      'Risk Mgmt',
      'Technical Program Mgmt',
    ],
  },
]

export default function Capabilities() {
  const headRef = useReveal()
  const gridRef = useReveal()

  return (
    <section id="bring">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <span className="section-num">01</span>
          <div>
            <h2>What I Bring</h2>
            <div className="rule" />
          </div>
        </div>
        <div className="grid reveal" ref={gridRef}>
          {CAPS.map((cap) => (
            <div
              className="cap"
              key={cap.title}
              style={cap.full ? { gridColumn: '1 / -1' } : undefined}
            >
              <div className="cap-title">{cap.title}</div>
              <div className="tags">
                {cap.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
