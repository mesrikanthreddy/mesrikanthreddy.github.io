import { useReveal } from '../hooks/useReveal'

export default function CTA() {
  const innerRef = useReveal()

  return (
    <section className="cta" id="contact">
      <div className="wrap cta-inner reveal" ref={innerRef}>
        <h2>Let's collaborate on your next big project.</h2>
        <p>
          Available for implementation projects — backed by a small, senior
          team that runs from kickoff to production with minimal oversight
          needed. Open to freelance, contract, and fixed-scope work. Also open
          to joining as a founding engineer with startups that have solid
          ideas and need someone to help take them from concept to launch.
        </p>
        <div className="btn-row">
          <a
            className="btn btn-primary"
            href="https://calendly.com/srbollampally-ytt/30min"
            target="_blank"
            rel="noopener"
          >
            Book a Call
          </a>
          <a
            className="btn btn-ghost"
            href="https://ytt.global"
            target="_blank"
            rel="noopener"
          >
            Visit YTT Global
          </a>
        </div>
      </div>
    </section>
  )
}
