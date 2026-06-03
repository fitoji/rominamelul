"use client";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { format, addYears } from "date-fns";
import { es } from "date-fns/locale";

export type Motivo = "cumpleaños" | "san-valentin" | "algo-especial";

const MOTIVOS: Record<Motivo, { titulo: string; emoji: string }> = {
  cumpleaños: { titulo: "Feliz cumpleaños", emoji: "💝" },
  "san-valentin": { titulo: "Feliz San Valentín", emoji: "💞" },
  "algo-especial": { titulo: "", emoji: "✨" },
};

export type Tipo = "uno" | "varios";

export interface VoucherData {
  destinatario: string;
  origen: string;
  motivo: Motivo;
  tipo: Tipo;
  mensaje?: string;
  fecha: Date;
  background: string;
  showCartoon?: boolean;
}

interface Props {
  data: VoucherData;
  ref?: React.Ref<HTMLDivElement>;
}

export function VoucherCard({ data, ref }: Props) {
  const expiracion = addYears(data.fecha, 1);
  const isSiteDark = useSyncExternalStore(
    (onStoreChange) => {
      const observer = new MutationObserver(onStoreChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
  const isDark =
      (isSiteDark && data.background !== "blanco") ||
      data.background === "noir" ||
      data.background === "ocean";
    const textColor = isDark ? "oklch(0.98 0.01 80)" : "oklch(0.2 0.02 30)";
    const subColor = isDark ? "oklch(0.85 0.02 60)" : "oklch(0.35 0.03 30)";
    const motivo = MOTIVOS[data.motivo];

    return (
      <div
        ref={ref}
        className="relative w-[400px] h-[560px] rounded-3xl overflow-hidden shadow-2xl p-10 flex flex-col justify-between"
        style={{ background: `var(--bg-${data.background})`, color: textColor }}
      >
        <div
          className="absolute inset-4 border rounded-2xl pointer-events-none"
          style={{
            borderColor: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)",
          }}
        />

        <div className="relative text-center">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: subColor }}
          >
            Vale de regalo
          </p>
          <h1 className="font-display text-4xl leading-tight">
            {motivo.emoji} {motivo.titulo}
          </h1>
          <p className="font-display text-4xl mt-1 font-semibold">
            {data.destinatario}
          </p>
        </div>

        <div className="relative text-center space-y-4">
          {data.showCartoon !== false && (
            <div
              className="absolute bottom-0 right-0 w-56 h-44 pointer-events-none select-none -z-10"
              aria-hidden="true"
              style={{
                maskImage:
                  "radial-gradient(ellipse 70% 60% at 70% 80%, black 30%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 60% at 70% 80%, black 30%, transparent 72%)",
              }}
            >
              <Image
                src="/images/cartoon-massage.svg"
                alt=""
                width={280}
                height={217}
                className="absolute -bottom-6 -right-6 opacity-[0.14] object-contain"
              />
            </div>
          )}
          <p className="text-sm" style={{ color: subColor }}>
            De parte de
          </p>
          <p className="font-display text-2xl">{data.origen}</p>
          <div
            className="h-px w-16 mx-auto my-4"
            style={{
              background: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
            }}
          />
          <p className="text-xl leading-relaxed px-2">
            {data.tipo === "uno" ? "Quiero" : "Queremos"} regalarte un{" "}
            <span className="font-display">masaje</span> con Romina.
          </p>
          {data.mensaje && (
            <p className="text-base italic" style={{ color: subColor }}>
              &ldquo;{data.mensaje}&rdquo;
            </p>
          )}
        </div>

        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm"
          style={{
            background: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
          }}
        >
          <Image
            src="/images/romina-logo2-reduced.webp"
            alt="Romina"
            width={70}
            height={70}
            className="shrink-0 rounded-full opacity-80"
          />
          <div className="text-center flex-1 space-y-0.5">
            {/*<p
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: subColor }}
            >
              Utilizá este vale para canjearlo
            </p>*/}
            <p className="text-[11px] font-semibold">
              Válido hasta:{" "}
              {format(expiracion, "d 'de' MMMM yyyy", { locale: es })}
            </p>
            <p>www.rominamelul.com</p>
            <p>632 736 133</p>
          </div>
        </div>
      </div>
    );
  }
