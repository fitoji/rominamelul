import { About } from "@/components/about";
import { AboutMe } from "@/components/about-me";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { GiftMassage } from "@/components/gift-massage";
import { Header } from "@/components/header2";
import { Hero } from "@/components/hero";
import { Organizations } from "@/components/organizations";
import { Philosophy } from "@/components/philosophy";
import { Services } from "@/components/services";
//import { Testimonials } from "@/components/testimonials";
import { Videos } from "@/components/videos";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Header /> */}
      <Header />
      <Hero />
      <About />
      <Services />
      
      <AboutMe />
      <Videos />
      <Philosophy />
      {/* <Testimonials /> */}
      <Organizations />
      <GiftMassage />
      <Contact />
      <Footer />
    </main>
  );
}
