'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function GiftAccessButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);

  const handleChange = (value: string) => {
    if (value.length === 4) {
      if (value === "7777") {
        setOpen(false);
        router.push("/generador");
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setOpen(false);
          setKey((k) => k + 1);
        }, 900);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          <Gift className="w-4 h-4" />
          Vale de regalo
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-center font-display italic text-2xl">
            Acceso privado
          </DialogTitle>
          <DialogDescription className="text-center">
            Ingresá el código de 4 dígitos para acceder al generador de vales.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <InputOTP key={key} maxLength={4} onChange={handleChange} autoFocus>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && (
          <p className="text-center text-sm text-destructive animate-pulse">
            Código incorrecto
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
