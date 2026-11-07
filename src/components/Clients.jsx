import { useReveal } from '../hooks/useReveal'

const CLIENTS = [
  'Duke Energy',
  'USPTO',
  'United Airlines',
  'Cisco',
  'CMS',
  'Qualcomm',
  'Georgia Technology Authority',
]

export default function Clients() {
  const headRef = useReveal()
  const introRef = useReveal()
  const rowRef = useReveal()

  return (
    <section id="clients">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <span className="section-num">03</span>
          <div>
            <h2>Where I Earned It</h2>
            <div className="rule" />
          </div>
        </div>
        <p className="clients-intro reveal" ref={introRef}>
          Enterprise and government engagements across energy, aviation,
          and telecom, before I started building my own.
        </p>
        <div className="client-row reveal" ref={rowRef}>
          {CLIENTS.map((client) => (
            <div className="client" key={client}>
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
