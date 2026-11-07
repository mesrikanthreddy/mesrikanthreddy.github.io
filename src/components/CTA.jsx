import { useReveal } from '../hooks/useReveal'

export default function CTA() {
  const innerRef = useReveal()

  return (
    <section className="cta" id="contact">
      <div className="wrap cta-inner reveal" ref={innerRef}>
        <h2>Building something? Let's talk.</h2>
        <p>
          I take on fixed-scope builds through YTT Global, backed by a small
          senior team that runs from kickoff to production. I also work with
          early-stage founders as a technical partner or founding engineer,
          taking an idea from concept to launch.
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
