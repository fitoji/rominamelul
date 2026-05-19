import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#sobre-mi', label: 'Sobre Mí' },
    { href: '#terapia', label: 'Sobre la Terapia' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#filosofia', label: 'Filosofía' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Name */}
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Image
              src="/images/logo.png"
              alt="Romina Melul - Terapia Psicocorporal"
              width={60}
              height={60}
              className="rounded-lg h-12 w-auto"
            />
            <div>
              <p className="text-lg font-semibold text-foreground">
                Romina Melul
              </p>
              <p className="text-sm text-muted-foreground">
                Terapeuta Psicocorporal
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="text-center md:text-right space-y-1">
            <p className="text-sm text-muted-foreground">
              rominamelul@gmail.com
            </p>
            <p className="text-sm text-muted-foreground">(+34) 632 73 61 33</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Romina Melul. Todos los derechos reservados.</p>
            <p>
              Icons by{' '}
              <Link target="_blank" href="https://icons8.com">
                Icons8
              </Link>
            </p>
            <p className="flex items-center gap-1">
              Hecho con <Heart className="h-4 w-4 text-accent fill-accent" />{' '}
              para tu bienestar
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
