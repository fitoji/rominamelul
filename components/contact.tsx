import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Escríbeme y te responderé lo antes posible',
      value: 'rominamelul@gmail.com',
      href: 'mailto:rominamelul@gmail.com',
      buttonText: 'Enviar Email',
      color: 'primary',
    },
    {
      icon: (
        <img
          src="/icons8-whatsapp-100.png"
          alt="WhatsApp"
          className="h-16 w-16"
        />
      ),
      title: 'WhatsApp',
      description: 'Contáctame directamente por WhatsApp',
      value: '(+34) 632 73 61 33',
      href: 'https://wa.me/34632736133?text=Hola%20Romina,%20me%20gustaría%20obtener%20información%20sobre%20la%20Terapia%20Psicocorporal',
      buttonText: 'Enviar WhatsApp',
      color: 'accent',
      isCustomIcon: true,
    },
  ]

  return (
    <section id="contacto" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-medium tracking-widest uppercase text-sm">
            Contacto
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Comienza tu Camino
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Estoy aquí para acompañarte en tu proceso de sanación y
            autoconocimiento. No dudes en contactarme para resolver cualquier
            duda o agendar tu primera sesión.
          </p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {contactMethods.map((method) => (
            <Card
              key={method.title}
              className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-card group"
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                    method.color === 'primary'
                      ? 'bg-primary/10'
                      : 'bg-emerald-500'
                  }`}
                >
                  {method.isCustomIcon ? (
                    method.icon
                  ) : (
                    <method.icon
                      className={`h-12 w-12 ${
                        method.color === 'primary'
                          ? 'text-primary'
                          : 'text-slate-100'
                      }`}
                    />
                  )}
                </div>
                <CardTitle className="text-2xl text-foreground">
                  {method.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {method.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-lg font-medium text-foreground">
                  {method.value}
                </p>
                <Button
                  asChild
                  size="lg"
                  className={`w-full ${
                    method.color === 'primary'
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-slate-100 '
                  }`}
                >
                  <Link
                    href={method.href}
                    target={
                      method.href.startsWith('http') ? '_blank' : undefined
                    }
                  >
                    {method.isCustomIcon ? (
                      <img
                        src="/icons8-whatsapp-100.png"
                        alt="WhatsApp"
                        className="h-12 w-12 mr-2"
                      />
                    ) : (
                      <method.icon className="h-5 w-5 mr-2" />
                    )}
                    {method.buttonText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/50 rounded-full">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-foreground">
              También puedes llamar al <strong>632 73 61 33</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
