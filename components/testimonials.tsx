"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Testimonial = {
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "María García",
    location: "Barcelona",
    text: "Las sesiones con Romina han sido transformadoras. Su capacidad de escucha y la forma en que integra el trabajo corporal con la conciencia emocional me han ayudado a reconectar conmigo misma de una manera profunda.",
    rating: 5,
    avatar: "/images/avatar-1.jpg",
  },
  {
    name: "Carlos Martínez",
    location: "Costa Brava",
    text: "Después de años con tensión crónica en la espalda, encontré en la terapia psicocorporal una forma de entender y liberar el origen emocional de mi dolor. Romina tiene un don especial para crear un espacio seguro de sanación.",
    rating: 5,
    // avatar: "/images/avatar-3.jpg",
  },
  {
    name: "Laura Fernández",
    location: "Barcelona",
    text: "El movimiento vital expresivo me abrió una puerta que no sabía que existía. Aprendí a expresar emociones que llevaba guardadas durante años. Cada sesión es un regalo para el alma.",
    rating: 5,
    // avatar: "/images/avatar-2.jpg",
  },
  {
    name: "Andrea López",
    location: "Girona",
    text: "Romina combina profesionalismo con una calidez humana única. Sus masajes terapéuticos no solo relajan el cuerpo, sino que tocan el alma. Muy recomendable para quien busca bienestar integral.",
    rating: 5,
    avatar: "/images/avatar-4.jpg",
  },
  {
    name: "Pablo Sánchez",
    location: "Barcelona",
    text: "Las clases de yoga online durante la pandemia fueron mi ancla de calma. Romina tiene una forma especial de guiar que te hace sentir acompañado incluso a través de una pantalla.",
    rating: 5,
    avatar: "/images/avatar-5.jpg",
  },
];

function TestimonialAvatar({ name, avatar }: Pick<Testimonial, "name" | "avatar">) {
  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 shadow-md">
      {avatar ? (
        <Image
          src={avatar}
          alt=""
          width={64}
          height={64}
          className="h-full w-full object-cover"
          aria-hidden
        />
      ) : (
        <span className="text-2xl font-semibold text-primary" aria-hidden>
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}

function TestimonialSlide({ testimonial }: { testimonial: Testimonial }) {
  return (
    <>
      <div className="mb-6 flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 animate-in fill-accent text-accent zoom-in duration-300"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      <blockquote className="mb-8 text-xl leading-relaxed text-foreground italic md:text-2xl">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      <div className="flex items-center gap-4">
        <TestimonialAvatar name={testimonial.name} avatar={testimonial.avatar} />
        <div>
          <p className="text-lg font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-muted-foreground">{testimonial.location}</p>
        </div>
      </div>
    </>
  );
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonios"
      className="py-24 bg-secondary/30 overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-6 text-balance">
            Lo que dicen quienes han vivido la experiencia
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada testimonio refleja un camino de transformación personal y
            reconexión con el ser
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative bg-card rounded-3xl shadow-xl p-8 md:p-12 border border-border/50">
            {/* Decorative Quote */}
            <div className="absolute -top-6 left-8 md:left-12">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="mt-4">
              <div
                key={currentIndex}
                className="animate-in fade-in slide-in-from-right-4 duration-500"
              >
                <TestimonialSlide testimonial={testimonials[currentIndex]} />
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full bg-card shadow-lg border-border/50 hover:bg-secondary hover:scale-110 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="sr-only">Anterior</span>
              </Button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6">
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full bg-card shadow-lg border-border/50 hover:bg-secondary hover:scale-110 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
                <span className="sr-only">Siguiente</span>
              </Button>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-3 bg-primary"
                    : "w-3 h-3 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute right-0 bottom-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
}
