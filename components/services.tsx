'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Heart, Sparkles, User, Users } from 'lucide-react'
import Image from 'next/image'

type ServiceDetail = {
  title: string
  description: string
  modality: string
  icon: typeof User
  image: string
  fullDescription: string
}

export function Services() {
  const services: ServiceDetail[] = [
    {
      title: 'Masaje Terapéutico',
      description:
        'Ayuda a movilizar y flexibilizar trabas corporales que aprisionan y debilitan. Libera la energía retenida y recupera la fuerza y alegría de vivir.',
      modality: 'Sesión Individual',
      icon: User,
      image: '/images/therapy-1.jpg',
      fullDescription: `Moviliza trayendo a la superficie trabas corporales que aprisionan y debilitan.
Libera la energía vital retenida recuperando la fuerza y la alegría de vivir.

El masaje es:
• De contacto
• Fluido
• Correctivo
• Expresivo
• Energético
• Descontracturante

Nos enseña a vivir un estado de relajación natural y necesario, limpiando capa por capa niveles de estrés que enferman debilitando nuestro sistema nervioso e inmunológico.

El trabajo es siempre en todo el cuerpo y me gusta decir que es una reorganización cuerpo-mente.`,
    },
    {
      title: 'Trabajo sobre Sí',
      description:
        'El hilo conductor de las distintas técnicas utilizadas en la terapia es el Trabajo sobre Sí, que reconoce el auto-conocimiento y la auto-transformación como poder sanador del ser humano.',
      modality: 'Sesión Grupal',
      icon: Users,
      image: '/images/therapy-2.jpg',
      fullDescription: `El Movimiento Vital Expresivo es una práctica que invita a reconectarte con tu cuerpo de manera profunda y transformadora.

A través de la música, secuencias de movimiento, expresiones corporales y respiraciones conscientes, este trabajo facilita:

• El encuentro contigo mismo: explorando sensaciones, emociones y patrones corporales.
• La expresión auténtica: permitiendo que el cuerpo habla sin filtros ni juicios.
• La conexión con el otro: en un espacio grupal donde la presencia y la escucha son fundamentales.
• La liberación emocional: moviendo lo que está guardado en el cuerpo.
• El fortalecimiento del vínculo cuerpo-mente: integrando movimiento y conciencia.

Es un espacio de探検 (exploración) personal donde cada persona encuentra su propio ritmo y camino hacia el bienestar.`,
    },
  ]

  const complements = [
    {
      title: 'Lectura Corporal',
      description:
        'Fundamento y técnicas para comprender los mensajes del cuerpo.',
      icon: Heart,
    },
    {
      title: 'Yoga',
      description: 'Práctica milenaria para el equilibrio cuerpo-mente.',
      icon: Sparkles,
      image: '/icons8-yoga-64.png',
    },
    {
      title: 'Flores de Bach',
      description: 'Terapia floral para el equilibrio emocional.',
      icon: Sparkles,
      image: '/icons8-massage-oil-64.png',
    },
  ]

  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-medium tracking-widest uppercase text-sm">
            Servicios
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Técnicas de Abordaje
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            La TPI utiliza principalmente dos técnicas de abordaje que se
            complementan entre sí
          </p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <Dialog key={service.title}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-card cursor-pointer hover:scale-[1.02]">
                  <div className="relative h-64">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm">
                      <service.icon className="h-4 w-4" />
                      {service.modality}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl text-foreground">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {service.description}
                    </CardDescription>
                    <p className="text-sm text-primary mt-4 font-medium">
                      Clic para ver más información →
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {service.title}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-2 mt-2">
                    <service.icon className="h-4 w-4" />
                    {service.modality}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4 text-muted-foreground whitespace-pre-line leading-relaxed">
                  {service.fullDescription}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Complementary Practices */}
        <div className="bg-secondary/50 rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Prácticas Complementarias
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {complements.map((complement) => (
              <div
                key={complement.title}
                className="text-center p-6 bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {complement.image ? (
                    <Image
                      src={complement.image}
                      alt={complement.title}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  ) : (
                    <complement.icon className="h-6 w-6 text-accent" />
                  )}
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {complement.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {complement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
