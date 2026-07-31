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
          <span className="section-num">02</span>
          <div>
            <h2>Who I've Worked With</h2>
            <div className="rule" />
          </div>
        </div>
        <p className="clients-intro reveal" ref={introRef}>
          Trusted by enterprises and agencies across energy, aviation,
          government, and telecom.
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
