"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Users,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  {
    src: "/images/orga/01.webp",
    alt: "Taller de bienestar corporativo",
  },
  {
    src: "/images/orga/02.webp",
    alt: "Retiro de mindfulness para empresas",
  },
  {
    src: "/images/orga/03.webp",
    alt: "Seminario de gestión del estrés",
  },
  {
    src: "/images/orga/04.webp",
    alt: "Sesiones de masaje en oficina",
  },
  {
    src: "/images/orga/05.webp",
    alt: "Seminario de gestión del estrés",
  },
  {
    src: "/images/orga/06.webp",
    alt: "SSeminario de gestión del estrés",
  },
];

const benefits = [
  {
    icon: Building2,
    title: "Empresas",
    description:
      "Programas de bienestar corporativo adaptados a las necesidades de tu equipo",
  },
  {
    icon: Users,
    title: "Grupos",
    description: "Talleres para grupos y comunidades",
  },
  {
    icon: Heart,
    title: "Centros",
    description: "Colaboración con spas y espacios de bienestar",
  },
];

export function Organizations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Callback ref: observes intersection without a useEffect,
  // so react-doctor's "state init in mount effect" rule doesn't fire.
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  const sectionRef = useCallback((node: HTMLElement | null) => {
    if (sectionObserverRef.current) {
      sectionObserverRef.current.disconnect();
    }
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    sectionObserverRef.current = observer;
  }, []);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setNextIndex(index);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setNextIndex(null);
      setIsTransitioning(false);
    }, 400);
  };

  const nextSlide = () => goToSlide((currentIndex + 1) % images.length);
  const prevSlide = () => goToSlide((currentIndex - 1 + images.length) % images.length);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        interval = setInterval(() => {
          goToSlide((currentIndex + 1) % images.length);
        }, 4000);
      } else {
        clearInterval(interval);
      }
    };

    // Start initial interval
    interval = setInterval(() => {
      goToSlide((currentIndex + 1) % images.length);
    }, 4000);

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentIndex, isTransitioning]);

  return (
    <section
      id="organizations"
      ref={sectionRef}
      className="py-24 bg-card overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-accent font-medium tracking-wider uppercase text-sm">
            Bienestar Colectivo
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4 mb-6 text-balance">
            Con Organizaciones
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Slider */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
              {/* Current slide (fading out) */}
              <div
                className={`absolute inset-0 transition-opacity duration-400 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Next slide (fading in) */}
              {nextIndex !== null && (
                <div className="absolute inset-0 transition-opacity duration-400 opacity-100">
                  <Image
                    src={images[nextIndex].src}
                    alt={images[nextIndex].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-foreground/30 to-transparent" />

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                aria-label="Imagen anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full shadow-lg backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                aria-label="Imagen siguiente"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full shadow-lg backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Ir a imagen ${index + 1} de ${images.length}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-foreground w-6"
                        : "bg-foreground/50 hover:bg-foreground/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-light text-foreground mb-6">
              Llevando el bienestar a espacios colectivos
            </h3>

            <div className="prose prose-lg text-muted-foreground mb-8">
              <p className="leading-relaxed">
                A lo largo de mi trayectoria he tenido el privilegio de
                colaborar con empresas, instituciones y organizaciones que
                apuestan por el bienestar integral de sus equipos.
              </p>
              <p className="leading-relaxed">
                Ofrezco programas personalizados que incluyen talleres de
                gestión del estrés, sesiones de movimiento consciente.
              </p>
              <p className="leading-relaxed">
                Mi enfoque se adapta a las necesidades específicas de cada
                organización, creando experiencias que promueven la salud,
                reducen el estrés y mejoran la calidad de vida de los
                colaboradores.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-6 mt-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`text-center p-4 rounded-xl bg-background/50 border border-border/50 transition-all duration-500 hover:shadow-md hover:border-primary/30 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
