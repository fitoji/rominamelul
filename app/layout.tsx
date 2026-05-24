import { TooltipProvider } from '@/components/ui/tooltip'
import {
  ogImage,
  organizationStructuredData,
  personStructuredData,
  siteDescription,
  siteUrl,
} from '@/lib/seo'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Lora, Nunito } from 'next/font/google'
import './globals.css'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body
        className={`${lora.variable} ${nunito.variable} font-sans antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>

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
