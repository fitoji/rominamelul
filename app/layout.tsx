import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { organizationStructuredData, personStructuredData } from '@/lib/seo'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rominamelul.com'),
  title: {
    default: 'Romina Melul | Terapeuta Psicocorporal',
    template: '%s | Romina Melul',
  },
  description: 'Terapia Psicocorporal Integradora - Reconecta con tu cuerpo, mente y espíritu. Masaje terapéutico y movimiento vital expresivo en Buenos Aires.',
  keywords: ['terapia psicocorporal', 'masaje terapéutico', 'movimiento vital expresivo', 'terapeuta corporal', 'sanación cuerpo-mente', 'Buenos Aires'],
  authors: [{ name: 'Romina Melul' }],
  creator: 'Romina Melul',
  publisher: 'Romina Melul',
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
    locale: 'es_AR',
    url: 'https://rominamelul.com',
    siteName: 'Romina Melul',
    title: 'Romina Melul | Terapeuta Psicocorporal',
    description: 'Terapia Psicocorporal Integradora - Reconecta con tu cuerpo, mente y espíritu.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Romina Melul - Terapeuta Psicocorporal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Romina Melul | Terapeuta Psicocorporal',
    description: 'Terapia Psicocorporal Integradora - Reconecta con tu cuerpo, mente y espíritu.',
    images: ['/images/logo.png'],
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
      <body className={`${cormorant.variable} ${inter.variable} font-serif antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
