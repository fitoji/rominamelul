import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, User, Sparkles, Heart } from "lucide-react"

export function Services() {
  const services = [
    {
      title: "Masaje Terapéutico",
      description: "Ayuda a movilizar y flexibilizar trabas corporales que aprisionan y debilitan. Libera la energía retenida y recupera la fuerza y alegría de vivir.",
      modality: "Sesión Individual",
      icon: User,
      image: "/images/therapy-1.jpg"
    },
    {
      title: "Movimiento Vital Expresivo",
      description: "Tiene por objeto facilitar el encuentro de cada uno consigo y con los otros, utilizando la música, la secuencia de movimientos, las expresiones y respiraciones.",
      modality: "Sesión Grupal",
      icon: Users,
      image: "/images/therapy-2.jpg"
    }
  ]

  const complements = [
    {
      title: "Lectura Corporal",
      description: "Fundamento y técnicas para comprender los mensajes del cuerpo.",
      icon: Heart
    },
    {
      title: "Yoga",
      description: "Práctica milenaria para el equilibrio cuerpo-mente.",
      icon: Sparkles
    },
    {
      title: "Flores de Bach",
      description: "Terapia floral para el equilibrio emocional.",
      icon: Sparkles
    }
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
            La TPI utiliza principalmente dos técnicas de abordaje que se complementan entre sí
          </p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <Card 
              key={service.title}
              className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card"
            >
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
                <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
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
                  <complement.icon className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{complement.title}</h4>
                <p className="text-sm text-muted-foreground">{complement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
