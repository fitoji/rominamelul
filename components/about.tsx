import Image from 'next/image'

export function About() {
  const purposes = [
    {
      title: 'Reconocer',
      description:
        'Reconocer y elaborar las trabas psicofísicas que mantienen a la persona aprisionada en conductas repetitivas o mecánicas.',
    },
    {
      title: 'Expresar',
      description:
        'Expresar y concienciar los aspectos no conducentes de la personalidad.',
    },
    {
      title: 'Conectar',
      description:
        'Contactar a la persona con su Yo profundo, desbloqueando su capacidad de armonización en todos los planos de la existencia.',
    },
  ]

  return (
    <section id="sobre-mi" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-medium tracking-widest uppercase text-sm">
            Sobre la Terapia
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Terapia Psicocorporal Integradora
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform -rotate-3" />
            <Image
              src="/images/therapy-1.jpg"
              alt="Sesión de Terapia Psicocorporal"
              width={600}
              height={450}
              className="relative rounded-2xl shadow-xl object-cover w-full h-100"
            />
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              La{' '}
              <strong className="text-foreground">
                Terapia Psicocorporal Integradora (TPI)
              </strong>{' '}
              vincula el cuerpo físico (forma, síntomas, desórdenes) con los
              procesos emocionales, psíquicos y sensoriales del ser humano.
            </p>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">
                Tiene como propósitos:
              </h3>
              <div className="space-y-6">
                {purposes.map((purpose, index) => (
                  <div
                    key={purpose.title}
                    className="flex gap-4 items-start p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {purpose.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {purpose.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
