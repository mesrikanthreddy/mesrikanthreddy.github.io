import Hero from '../components/Hero'
import Capabilities from '../components/Capabilities'
import Clients from '../components/Clients'
import WhyMe from '../components/WhyMe'
import Projects from '../components/Projects'
import LatestWriting from '../components/LatestWriting'
import CTA from '../components/CTA'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Home() {
  useDocumentMeta({
    description:
      'Technical Founder of YTT Global. 12+ years building cloud infrastructure and production ML systems for enterprises like Duke Energy, USPTO, and Cisco, now building and shipping my own products.',
  })

  return (
    <>
      <Hero />
      <main id="main">
        <Projects />
        <Capabilities />
        <Clients />
        <WhyMe />
        <LatestWriting />
        <CTA />
      </main>
    </>
  )
}
