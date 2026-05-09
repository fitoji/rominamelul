import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden md:pt-20 "
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-b from-secondary/30 via-background to-background" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 pt-30 md:pt:20 lg:pt-1 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-medium tracking-widest uppercase text-sm">
                Terapia Psicocorporal Integradora
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance">
                Reconecta con tu <span className="text-primary">cuerpo</span>,{' '}
                <span className="text-accent">mente</span> y{' '}
                <span className="text-primary">espíritu</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                La TPI vincula el cuerpo físico con los procesos emocionales,
                psíquicos y sensoriales del ser humano, facilitando el camino
                hacia la armonía y el bienestar integral.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              >
                <Link href="#contacto">Agenda tu Sesión</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
              >
                <Link href="#sobre-mi">Conoce más</Link>
              </Button>
            </div>
          </div>

          {/* Logo/Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/40 rounded-3xl blur-2xl transform -rotate-3" />
              <Image
                src="/images/logo.png"
                alt="Terapia Psicocorporal - Equilibrio y Armonía"
                width={450}
                height={450}
                className="relative rounded-3xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link
            href="#sobre-mi"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowDown className="h-8 w-8" />
          </Link>
        </div>
      </div>
    </section>
  )
}
