"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // resolvedTheme is `undefined` until mount (next-themes defers hydration);
  // gate on `mounted` so SSR and first client render produce identical HTML.
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      aria-pressed={isDark}
      className="rounded-xl"
    >
      {isDark ? (
        <Sun aria-hidden suppressHydrationWarning />
      ) : (
        <Moon aria-hidden suppressHydrationWarning />
      )}
    </Button>
  );
}
