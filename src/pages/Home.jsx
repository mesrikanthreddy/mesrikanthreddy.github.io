import Hero from '../components/Hero'
import Capabilities from '../components/Capabilities'
import Clients from '../components/Clients'
import WhyMe from '../components/WhyMe'
import Projects from '../components/Projects'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <main id="main">
        <Capabilities />
        <Clients />
        <WhyMe />
        <Projects />
        <CTA />
      </main>
    </>
  )
}
