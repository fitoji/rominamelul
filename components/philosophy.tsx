import Image from "next/image"
import { Quote } from "lucide-react"

export function Philosophy() {
  return (
    <section id="filosofia" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-medium tracking-widest uppercase text-sm">
            Filosofía
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Nuestra Visión de la Salud
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Quote */}
            <div className="relative bg-primary/5 rounded-2xl p-8">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/30" />
              <blockquote className="text-xl italic text-foreground leading-relaxed pl-8">
                {`"La TPI comprende que el sufrimiento físico ocurre para liberar impulsos y flujos de energía vital estancados o viciados."`}
              </blockquote>
            </div>

            {/* Philosophy Points */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                  <span className="w-3 h-3 bg-primary rounded-full" />
                  La Salud
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Es el estado de armonía y coherencia entre el <strong className="text-foreground">Sentir</strong> y el <strong className="text-foreground">Expresar</strong>.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border bg-background hover:border-accent/50 transition-colors">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                  <span className="w-3 h-3 bg-accent rounded-full" />
                  La Enfermedad
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Es un instrumento de <strong className="text-foreground">purificación</strong> y de reconquista de la Salud.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                  <span className="w-3 h-3 bg-primary rounded-full" />
                  El Ser Humano
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Concebido como un <strong className="text-foreground">Todo</strong> cuyas partes (cuerpo-mente-espíritu) se hallan en constante interacción.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl transform rotate-3" />
            <Image
              src="/images/therapy-3.jpg"
              alt="Filosofía de la Terapia Psicocorporal"
              width={600}
              height={500}
              className="relative rounded-2xl shadow-xl object-cover w-full h-[500px]"
            />
          </div>
        </div>

        {/* Compatibility Note */}
        <div className="mt-16 text-center p-8 bg-secondary/50 rounded-2xl">
          <p className="text-lg text-foreground leading-relaxed max-w-3xl mx-auto">
            El trabajo vivencial con la Terapia Psicocorporal Integradora puede ser{" "}
            <strong>complemento de otros enfoques de salud</strong> que la persona ya esté 
            realizando, como psicoterapia verbal, medicina natural o medicina alopática.
          </p>
        </div>
      </div>
    </section>
  )
}
