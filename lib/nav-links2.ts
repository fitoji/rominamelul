// ─── Types ────────────────────────────────────────────────────────────────────

type NavChild = {
  href: string;
  label: string;
  description?: string;
};

export type NavItem = {
  href?: string;
  label: string;
  children?: NavChild[];
};

export const navLinks: NavItem[] = [
  { href: "#inicio", label: "Inicio" },
  {
    label: "Sobre la Terapia",
    children: [
      {
        href: "#sobre-mi",
        label: "Sobre Mí",
        description: "Conoce mi formación y enfoque terapéutico",
      },
      {
        href: "#terapia",
        label: "La Terapia",
        description: "Cómo funciona el proceso terapéutico",
      },
      {
        href: "#filosofia",
        label: "Filosofía",
        description: "Los principios que guían mi trabajo",
      },
    ],
  },
  {
    label: "Servicios",
    children: [
      {
        href: "#servicios",
        label: "Individuales",
        description: "Sesiones personalizadas para tu bienestar",
      },
      {
        href: "#organizations",
        label: "Organizaciones",
        description: "Programas de bienestar para equipos",
      },
    ],
  },
  {
    label: "Recursos",
    children: [
      {
        href: "#videos",
        label: "Videos",
        description: "Contenido audiovisual gratuito",
      }
      // {
      //   href: "#testimonios",
      //   label: "Testimonios",
      //   description: "Experiencias de quienes ya confiaron",
      // },
    ],
  },
];