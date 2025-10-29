// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "EFSANE ŞABAN USTA | Karaburun İskele'de Et Restoranı | Rakını al gel",
  description: "İzmir Karaburun İskele Mevkii'nde et ağırlıklı uygun fiyatlı restoran. BYOB: Rakını al gel. Pişmiş kilo et/köfte.",
  metadataBase: new URL('https://alanadiniz.com'),                 // <- alan adını güncelle
  alternates: { canonical: 'https://alanadiniz.com/' },            // <- alan adını güncelle
  openGraph: {
    title: "EFSANE ŞABAN USTA | Karaburun İskele'de Et Restoranı",
    description: 'Malzemesi bol, uygun fiyatlı. Alkol satışı yok; rakını al gel. Pişmiş kilo et/köfte.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://alanadiniz.com/',                                // <- alan adını güncelle
    siteName: 'EFSANE ŞABAN USTA',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Karaburun İskele Et Restoranı' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "EFSANE ŞABAN USTA | Karaburun İskele'de Et Restoranı",
    description: 'İzmir Karaburun’da ızgara et ve meze.',
    images: ['/api/og'],
  },
  robots: { index: true, follow: true },
  keywords: ['Karaburun et','İzmir Karaburun restoran','Karaburun ızgara','Karaburun köfte','Karaburun İskele meze'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'EFSANE ŞABAN USTA',
    description: "İzmir Karaburun İskele Mevkii'nde et ağırlıklı uygun fiyatlı restoran. BYOB: Rakını al gel.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'İskele Mevkii',
      addressLocality: 'Karaburun',
      addressRegion: 'İzmir',
      postalCode: '35960',
      addressCountry: 'TR',
    },
    telephone: '+90 553 062 51 73',                                // <- güncelle
    openingHours: 'Mo-Su 09:00-24:00',
    servesCuisine: ['Türk','Izgara','Et'],
    priceRange: '₺₺',
    acceptsReservations: 'Yes',
    url: 'https://alanadiniz.com/',                                // <- güncelle
    // geo: { '@type': 'GeoCoordinates', latitude: 38.639, longitude: 26.512 }, // opsiyonel
  }

  return (
    <html lang="tr">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}
