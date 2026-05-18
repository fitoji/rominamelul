import { About } from '@/components/about'
import { AboutMe } from '@/components/about-me'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Philosophy } from '@/components/philosophy'
import { Services } from '@/components/services'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutMe />
      <About />
      <Services />
      <Philosophy />
      <Contact />
      <Footer />
    </main>
  )
}
