import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/theme-provider'
import {
  ogImage,
  organizationStructuredData,
  personStructuredData,
  siteDescription,
  siteUrl,
} from '@/lib/seo'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lora, Nunito } from 'next/font/google'
import './globals.css'

// Inline script that runs before first paint to apply the persisted theme
// to <html> and avoid a flash of the wrong colors. Wrapped in try/catch so
// private-mode / sandboxed contexts (where localStorage throws) silently
// fall back to the light default.
// On first visit (no saved theme), detects prefers-color-scheme and saves it
// so the system preference is checked exactly ONCE.
const NO_FOUC_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';localStorage.setItem('theme',t)}var d=t==='dark';document.documentElement.classList[d?'add':'remove']('dark');document.documentElement.style.colorScheme=t}catch(e){}})()`

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Romina Melul | Terapeuta Psicocorporal',
    template: '%s | Romina Melul',
  },
  description: siteDescription,
  keywords: [
    'terapia psicocorporal',
    'masaje terapéutico',
    'movimiento vital expresivo',
    'terapeuta corporal',
    'sanación cuerpo-mente',
    'Barcelona',
    'Costa Brava',
  ],
  authors: [{ name: 'Romina Melul' }],
  creator: 'Romina Melul',
  publisher: 'Romina Melul',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/images/rom-1260.webp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'Romina Melul',
    title: 'Romina Melul | Terapeuta Psicocorporal',
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Romina Melul | Terapeuta Psicocorporal',
    description: siteDescription,
    images: [ogImage.url],
    creator: '@rominamelul',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FOUC_SCRIPT }} />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
      </head>
      <body
        className={`${lora.variable} ${nunito.variable} font-sans antialiased`}
      >
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TooltipProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
