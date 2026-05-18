import Image from 'next/image'

export function AboutMe() {
  return (
    <section id="sobre-mi" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-accent font-sans text-sm tracking-widest uppercase">
              Conóceme
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mt-3">
              Sobre Mí
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Image - Columna más estrecha */}
            <div className="lg:col-span-4 order-1 lg:order-1 relative">
              {/* Background rotated element */}
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform -rotate-3" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/romina-profile.jpg"
                  alt="Romina Claudia Melul - Terapeuta Psicocorporal"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content - Columna más ancha */}
            <div className="lg:col-span-8 order-2 lg:order-2 space-y-6">
              {/* Intro */}
              <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
                Soy Romina Claudia Melul, terapeuta psico-corporal especializada
                en bienestar integral y acompañamiento cuerpo-mente.
              </p>

              {/* Timeline paragraphs */}
              <div className="space-y-5 text-muted-foreground font-sans leading-relaxed">
                <p>
                  Mi camino comenzó hace más de 25 años, impulsado por una
                  búsqueda profunda de autoconocimiento y comprensión humana.
                  Desde entonces me he formado en disciplinas como Hatha Yoga,
                  técnicas de masaje, Flores de Bach, movimiento vital expresivo
                  y lectura corporal, integrando diferentes herramientas
                  orientadas al equilibrio físico, emocional y energético.
                </p>
                <p>
                  En 2005 abrí mi primer espacio terapéutico en Buenos Aires,
                  donde desarrollé una mirada centrada en la conexión entre
                  cuerpo y conciencia, acompañando procesos personales desde una
                  escucha sensible, respetuosa y transformadora.
                </p>
                <p>
                  En 2011 cofundé{' '}
                  <span className="text-foreground font-medium">
                    Espacio Satsanga
                  </span>
                  , un espacio dedicado al bienestar y la práctica consciente en
                  el centro de la ciudad. Durante años fue un refugio de calma
                  en medio del ritmo urbano, acogiendo a decenas de estudiantes
                  y personas en búsqueda de una conexión más genuina consigo
                  mismas.
                </p>
                <p>
                  En 2020, el proyecto evolucionó hacia un formato online,
                  continuando el acompañamiento a muchas personas a través de
                  clases y encuentros virtuales.
                </p>
                <p>
                  Actualmente trabajo en Barcelona y la Costa Brava, ofreciendo
                  principalmente masajes y terapias a domicilio, creando
                  experiencias de bienestar personalizadas en la comodidad del
                  hogar.
                </p>
              </div>

              {/* Quote */}
              <div className="relative mt-10 p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border-l-4 border-accent">
                <p className="text-xl text-foreground italic leading-relaxed font-serif">
                  &ldquo;Escuchar, sentir y usar tu inteligencia cuerpo-mente
                  como camino hacia la salud&rdquo;
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-border/50">
                <div className="text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-light text-primary">
                    +25
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Años de experiencia
                  </p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-light text-primary">
                    2005
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Inicio profesional
                  </p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-light text-primary">
                    BCN
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Barcelona
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
