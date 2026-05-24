export const siteUrl = 'https://rominamelul.com'

export const siteDescription =
  'Terapia Psicocorporal Integradora en Barcelona y Costa Brava. Masaje terapéutico, californiano, esalen y movimiento vital expresivo. Reconecta con tu cuerpo, mente y espíritu.'

export const ogImage = {
  url: '/images/rom-1260.webp',
  width: 1260,
  height: 630,
  alt: 'Romina Melul - Terapeuta Psicocorporal',
} as const

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'Romina Melul',
  description: siteDescription,
  image: `${siteUrl}/images/rom-1260.webp`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barcelona',
    addressRegion: 'Cataluña',
    addressCountry: 'ES',
  },
  areaServed: ['Barcelona', 'Costa Brava'],
  url: siteUrl,
  telephone: '+34326327361',
  priceRange: '€€',
}

export const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Romina Melul',
  jobTitle: 'Terapeuta Psicocorporal',
  image: `${siteUrl}/images/rom-1260.webp`,
  url: siteUrl,
  worksFor: {
    '@type': 'HealthAndBeautyBusiness',
    name: 'Romina Melul',
  },
}