"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toJpeg } from "html-to-image";
import { ArrowLeft, CalendarIcon, Download, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import {
  VoucherCard,
  type VoucherData,
  type Motivo,
  type Tipo,
} from "./voucher-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const MOTIVOS: { value: Motivo; label: string }[] = [
  { value: "cumpleaños", label: "🎂 Cumpleaños" },
  { value: "san-valentin", label: "💝 San Valentín" },
  { value: "algo-especial", label: "✨ Algo especial" },
];

const BACKGROUNDS = [
  { id: "rose", label: "Rosé" },
  { id: "sage", label: "Salvia" },
  { id: "gold", label: "Dorado" },
  { id: "lavender", label: "Lavanda" },
  { id: "ocean", label: "Océano" },
  { id: "manteca", label: "Manteca" },
  { id: "blanco", label: "Blanco" },
  { id: "cielo", label: "Cielo" },
  { id: "arena", label: "Arena" },
];

interface FormValues {
  destinatario: string;
  origen: string;
  motivo: Motivo;
  tipo: Tipo;
  mensaje: string;
  fecha: Date;
}

export default function GeneradorTargetas() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [background, setBackground] = useState("rose");
  const [downloading, setDownloading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      destinatario: "",
      origen: "",
      motivo: "cumpleaños",
      tipo: "uno",
      mensaje: "",
      fecha: new Date(),
    },
  });

  const values = form.watch();
  const preview: VoucherData = {
    destinatario: values.destinatario || "Nombre del destinatario",
    origen: values.origen || "Tu nombre",
    motivo: values.motivo,
    tipo: values.tipo,
    mensaje: values.mensaje || undefined,
    fecha: values.fecha ?? new Date(),
    background,
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toJpeg(cardRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `vale-${preview.destinatario.replace(/\s+/g, "-").toLowerCase() || "regalo"}.jpg`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            <Sparkles className="w-3 h-3" /> Romina · Masajes
          </div>
          <h1 className="font-display text-5xl md:text-6xl italic">
            Vale de regalo
          </h1>
          <p className="text-muted-foreground mt-3">
            Creá un vale único y descargalo en segundos.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-2xl italic">
                Datos del vale
              </CardTitle>
              <CardAction>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="sr-only">Volver</span>
                  </Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="destinatario"
                    rules={{
                      required: "Requerido",
                      maxLength: { value: 40, message: "Máx 40 caracteres" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destinatario</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Para quién es el regalo"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="origen"
                    rules={{
                      required: "Requerido",
                      maxLength: { value: 40, message: "Máx 40 caracteres" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origen</FormLabel>
                        <FormControl>
                          <Input placeholder="De parte de" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="motivo"
                    rules={{ required: "Requerido" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motivo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Elegí un motivo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MOTIVOS.map((m) => (
                              <SelectItem key={m.value} value={m.value}>
                                {m.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tipo"
                    rules={{ required: "Requerido" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>¿Quién regala?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Elegí una opción" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="uno">
                              Solo una persona
                            </SelectItem>
                            <SelectItem value="varios">Somos varios</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mensaje"
                    rules={{
                      maxLength: { value: 120, message: "Máx 120 caracteres" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje Adicional</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Un mensajito opcional"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fecha"
                    rules={{ required: "Requerido" }}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? format(field.value, "PPP", { locale: es })
                                  : "Elegí una fecha"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              locale={es}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label>Fondo</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {BACKGROUNDS.map((bg) => (
                        <button
                          key={bg.id}
                          type="button"
                          onClick={() => setBackground(bg.id)}
                          className={cn(
                            "h-16 rounded-lg border-2 transition-all relative overflow-hidden",
                            background === bg.id
                              ? "border-primary scale-[1.02]"
                              : "border-transparent hover:border-border",
                          )}
                          style={{ background: `var(--bg-${bg.id})` }}
                          aria-label={bg.label}
                        >
                          <span className="absolute bottom-1 left-0 right-0 text-[10px] text-white drop-shadow font-medium mix-blend-difference">
                            {bg.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleDownload}
                      disabled={downloading}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {downloading ? "..." : "Descargar Vale"}
                    </Button>
                  </div>
                </div>
              </Form>
            </CardContent>
          </Card>

          <div className="flex justify-center md:sticky md:top-12">
            <VoucherCard ref={cardRef} data={preview} />
          </div>
        </div>
      </div>
    </main>
  );
}
