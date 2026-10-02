import Hero from '../components/Hero'
import Capabilities from '../components/Capabilities'
import Clients from '../components/Clients'
import WhyMe from '../components/WhyMe'
import Projects from '../components/Projects'
import CTA from '../components/CTA'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Home() {
  useDocumentMeta({
    description:
      'Full-Stack Developer, DevOps Leader, and AI/ML Specialist with 12+ years building cloud infrastructure and production ML systems for enterprises like Duke Energy, USPTO, and Cisco.',
  })

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
