import Nav from './components/Nav'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import Clients from './components/Clients'
import WhyMe from './components/WhyMe'
import Projects from './components/Projects'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <Hero />
      <main id="main">
        <Capabilities />
        <Clients />
        <WhyMe />
        <Projects />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
