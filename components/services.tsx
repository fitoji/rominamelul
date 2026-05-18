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
      image: '/images/romi-masajes.webp',
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

Es un espacio de exploración personal donde cada persona encuentra su propio ritmo y camino hacia el bienestar.`,
    },
  ]

  const complements = [
    {
      title: 'Lectura Corporal',
      description:
        'Fundamento y técnicas para comprender los mensajes del cuerpo.',
      image: '/icons8-body-64.png',
      icon: Heart,
      heroImage: '/images/therapy-1.jpg',
      fullDescription: `Es un lenguaje que nos permite decodificar las señales del cuerpo en correspondencia con la mente, las emociones y las experiencias pasadas.

Nos permite ver un mapa de nosotros mismos y nuestro posicionamiento en la vida hoy, de forma integral.

En sí misma tiene una gran y variada propuesta en cuanto a terapéutica siguiendo la premisa de que la cura viene de la mano del disfrute y la alegría.`,
    },
    {
      title: 'Yoga',
      description: 'Práctica milenaria para el equilibrio cuerpo-mente.',
      icon: Sparkles,
      image: '/icons8-yoga-64.png',
      heroImage: '/images/therapy-2.jpg',
      fullDescription: `He comprobado en mi experiencia personal y en la experiencia clínica en el consultorio que la práctica de Hatha Yoga junto con el massage mantienen el cuerpo-mente flexible, fuerte, elástico y adaptable al cambio. Este trabajo en conjunto potencia nuestra capacidad de manejar niveles de estrés con un estado vital, alegre y armónico.

A su vez podemos comprobar con mayor rapidez cómo se corrigen posturas, se desarman vicios posturales y se concientiza la respiración.

También por sí sola, la práctica de Hatha Yoga es un gran aliado en la vida, que sumada al trabajo consciente con la TPI, resultan un dúoo muy provechoso.`,
    },
    {
      title: 'Flores de Bach',
      description: 'Terapia floral para el equilibrio emocional.',
      icon: Sparkles,
      image: '/icons8-massage-oil-64.png',
      heroImage: '/images/flores-de-bach-kit.webp',
      fullDescription: `Las esencias florales representan virtudes que todos tenemos. En nuestra experiencia de vida podemos encontrarlas desarmonizadas, a veces por exceso o por desuso.

En la entrevista preparamos una fórmula floral que equilibra de forma natural un desequilibrio de base emocional.

La terapia floral por si sola es una herramienta muy valiosa en la sanación de uno mismo. Sumada al trabajo corporal que te propongo en la TPI, resulta un bálsamo complementario muy poderoso para cicatrizar heridas, elaborar traumas, duelos y condicionamientos profundos.

Resultan muy efectivas tanto para las personas como para los mascotas.`,
    },
    {
      title: 'Movimiento Vital Expresivo',
      description:
        'Actividad lúdica, expresiva, creativa y terapéutica grupal.',
      icon: Sparkles,
      image: '/icons8-dance-64.png',
      heroImage: '/images/therapy-2.jpg',
      fullDescription: `Es una actividad lúdica, expresiva, creativa y terapéutica. Facilita el encuentro de la persona consigo misma y con los otros. Para ello utiliza la música, la secuencia de movimientos, las expresiones corporales, emocionales y la respiración.`,
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
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 bg-card border-none rounded-2xl">
                {/* Hero Image */}
                <div className="relative h-56 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <DialogTitle className="text-3xl font-semibold text-foreground">
                      {service.title}
                    </DialogTitle>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <service.icon className="h-4 w-4" />
                      {service.modality}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pb-8">
                  <div className="prose prose-stone max-w-none">
                    <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
                      {service.fullDescription}
                    </div>
                  </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complements.map((complement) => {
              // Flores de Bach tiene modal
              if (complement.fullDescription) {
                return (
                  <Dialog key={complement.title}>
                    <DialogTrigger asChild>
                      <div className="text-center p-6 bg-card rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]">
                        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Image
                            src={complement.image || ''}
                            alt={complement.title}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {complement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {complement.description}
                        </p>
                        <p className="text-xs text-primary mt-3 font-medium">
                          Clic para ver más →
                        </p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 bg-card border-none rounded-2xl">
                      <div className="relative h-56 w-full">
                        <Image
                          src={complement.heroImage || '/images/therapy-1.jpg'}
                          alt={complement.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <DialogTitle className="text-3xl font-semibold text-foreground">
                            {complement.title}
                          </DialogTitle>
                        </div>
                      </div>
                      <div className="p-6 pb-8">
                        <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
                          {complement.fullDescription}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )
              }

              // Los otros dos son cards simples
              return (
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
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
