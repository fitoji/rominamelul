'use client'
import Image from "next/image";
import { forwardRef } from "react";
import { format, addYears } from "date-fns";
import { es } from "date-fns/locale";

export type Motivo = "cumpleaños" | "san-valentin" | "algo-especial";

const MOTIVOS: Record<Motivo, { titulo: string; emoji: string }> = {
  "cumpleaños": { titulo: "Feliz cumpleaños", emoji: "🎂" },
  "san-valentin": { titulo: "Feliz San Valentín", emoji: "💝" },
  "algo-especial": { titulo: "Algo especial", emoji: "✨" },
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
}

interface Props {
  data: VoucherData;
}

export const VoucherCard = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    const expiracion = addYears(data.fecha, 1);
    const isDark = data.background === "noir" || data.background === "ocean";
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
          <h1 className="font-display text-4xl leading-tight italic">
            {motivo.emoji} {motivo.titulo}
          </h1>
          <p className="font-display text-3xl mt-1 font-semibold">
            {data.destinatario}
          </p>
        </div>

        <div className="relative text-center space-y-4">
          <p className="text-sm" style={{ color: subColor }}>
            De parte de
          </p>
          <p className="font-display text-2xl italic">{data.origen}</p>
          <div
            className="h-px w-16 mx-auto my-4"
            style={{
              background: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
            }}
          />
          <p className="text-base leading-relaxed px-2">
            {data.tipo === "uno" ? "Quiero" : "Queremos"} regalarte un{" "}
            <span className="font-display italic text-xl">masaje</span> con
            Romina.
          </p>
          {data.mensaje && (
            <p className="text-xs italic" style={{ color: subColor }}>
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
            width={52}
            height={52}
            className="shrink-0 rounded-full opacity-80"
          />
          <div className="text-center flex-1 space-y-0.5">
            <p
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: subColor }}
            >
              Utilizá este vale para canjearlo
            </p>
            <p className="text-[11px] font-semibold">
              Válido hasta:{" "}
              {format(expiracion, "d 'de' MMMM yyyy", { locale: es })}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

VoucherCard.displayName = "VoucherCard";
