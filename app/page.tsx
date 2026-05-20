import { About } from '@/components/about'
import { AboutMe } from '@/components/about-me'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Philosophy } from '@/components/philosophy'
import { Services } from '@/components/services'
import { Videos } from "@/components/videos"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutMe />
      <About />
      <Services />
      <Videos />
      <Philosophy />
      <Contact />
      <Footer />
    </main>
  )
}
