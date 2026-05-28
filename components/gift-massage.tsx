"use client";

import Image from "next/image";
import {
  Gift,
  Calendar,
  User,
  MapPin,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    icon: MessageCircle,
    title: "1. Contáctame",
    description:
      "Escríbeme por WhatsApp para iniciar el proceso. Cuéntame a quién quieres regalar esta experiencia de bienestar.",
  },
  {
    icon: User,
    title: "2. Datos del destinatario",
    description:
      "Comparte conmigo el nombre de la persona que recibirá el regalo y cualquier detalle especial que deba conocer.",
  },
  {
    icon: Calendar,
    title: "3. Elige la fecha",
    description:
      "Coordinamos juntos la fecha y hora ideal para la sesión, adaptándonos a la disponibilidad del destinatario.",
  },
  {
    icon: MapPin,
    title: "4. Define el lugar",
    description:
      "El masaje se realiza a domicilio. Indicame la dirección donde se llevará a cabo la sesión (Barcelona o Costa Brava).",
  },
  {
    icon: CreditCard,
    title: "5. Confirma tu regalo",
    description:
      "Acordamos la forma de pago y te envío un certificado de regalo personalizado para entregar a tu ser querido.",
  },
];

const backgroundImages = [
  "/images/gift-bg-1.jpg",
  "/images/gift-bg-2.jpg",
  "/images/gift-bg-3.jpg",
];

export function GiftMassage() {
  const whatsappMessage = encodeURIComponent(
    "Hola Romina! Me gustaría regalar un masaje a alguien especial. ¿Podrías darme más información sobre el proceso?",
  );

  return (
    <section id="regala" className="py-24 relative overflow-hidden">
      {/* Background Images Grid — softened with blur */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
        {backgroundImages.map((img, index) => (
          <div key={index} className="relative h-full overflow-hidden">
            <div className="absolute inset-0 scale-105">
              <Image
                src={img}
                alt=""
                aria-hidden="true"
                fill
                className="object-cover blur-sm"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Overlay — softer now that blur does part of the work */}
      <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/75 to-background/80" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 bg-accent backdrop-blur-sm px-5 py-2 rounded-full mb-6">
            <Gift className="h-5 w-5 text-accent-foreground" />
            <span className="text-accent-foreground font-medium">
              Regala Bienestar
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance">
            Regala un <span className="text-primary">Masaje</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Sorprende a alguien especial con una experiencia de bienestar única.
            Un regalo que nutre el cuerpo y el alma, perfecto para cumpleaños,
            aniversarios, o simplemente para demostrar cuánto te importa.
          </p>
        </div>

        {/* Two Column Layout: Steps + Images */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          {/* Steps Column */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-linear-to-b from-primary via-accent to-primary hidden md:block" />

            <div className="space-y-5">
              {steps.map((step, index) => (
                <div key={index} className="transition-all duration-500">
                  <div className="flex gap-5 items-start">
                    {/* Icon */}
                    <div className="relative z-10 shrink-0">
                      <div className="w-16 h-16 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-border hover:border-primary transition-colors">
                        <step.icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-card/90 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-border hover:border-primary/30 transition-all hover:shadow-md">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images Column */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/romi02-masajes.webp"
                  alt="Masaje relajante"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  style={{ willChange: 'transform' }}
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gift-bg-2.jpg"
                  alt="Costa Brava paisaje"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  style={{ willChange: 'transform' }}
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gift-bg-3.jpg"
                  alt="Spa wellness"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  style={{ willChange: 'transform' }}
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/romi-masajes.webp"
                  alt="Terapia corporal"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  style={{ willChange: 'transform' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-card/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-border max-w-2xl mx-auto hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <Gift className="h-12 w-12 text-accent mx-auto mb-6" aria-hidden="true" />
            <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              Haz feliz a alguien especial
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Contáctame por WhatsApp y te guiaré en todo el proceso para crear
              un regalo inolvidable de bienestar y relajación.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-6 text-lg shadow-lg"
            >
              <Link
                href={`https://wa.me/34688807366?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Regalar un Masaje
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
