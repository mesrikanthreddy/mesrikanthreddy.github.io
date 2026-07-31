import { useReveal } from '../hooks/useReveal'

const REASONS = [
  {
    title: 'Full lifecycle execution',
    text: 'From design through deployment — I own the whole path, not just a slice of it.',
  },
  {
    title: 'Proven impact',
    text: 'Cut deployment time by 75% and held system uptime at 99.9% in production environments.',
  },
  {
    title: 'Clear communication',
    text: 'Weekly check-ins and long-term support — you always know where things stand.',
  },
  {
    title: 'Built to last',
    text: 'Focused on clean architecture, performance, and scalability from day one.',
  },
]

export default function WhyMe() {
  const headRef = useReveal()
  const listRef = useReveal()

  return (
    <section id="why">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <span className="section-num">03</span>
          <div>
            <h2>Why Work With Me</h2>
            <div className="rule" />
          </div>
        </div>
        <div className="why-list reveal" ref={listRef}>
          {REASONS.map((reason, i) => (
            <div className="why-item" key={reason.title}>
              <div className="why-mark">{String(i + 1).padStart(2, '0')}</div>
              <div className="why-text">
                <strong>{reason.title}</strong>
                <span>{reason.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
