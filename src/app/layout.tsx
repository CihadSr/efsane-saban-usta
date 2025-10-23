// src/app/layout.tsx  // [UPDATED]
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "EFSANE ŞABAN USTA | Karaburun İskele'de Et Restoranı | Rakını al gel",
  description: "İzmir Karaburun İskele Mevkii'nde et ağırlıklı uygun fiyatlı restoran. BYOB: Rakını al gel. Pişmiş kilo et/köfte.",
  openGraph: {
    title: "EFSANE ŞABAN USTA | Karaburun İskele'de Et Restoranı",
    description: 'Malzemesi bol, uygun fiyatlı. Alkol satışı yok; rakını al gel. Pişmiş kilo et/köfte.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://ornek-domain.com/',
    siteName: 'EFSANE ŞABAN USTA',
  },
  metadataBase: new URL('https://ornek-domain.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'EFSANE ŞABAN USTA',
              description: "İzmir Karaburun İskele Mevkii'nde et ağırlıklı uygun fiyatlı restoran. BYOB: Rakını al gel.",
              address: { '@type': 'PostalAddress', addressLocality: 'Karaburun', addressRegion: 'İzmir', streetAddress: 'İskele Mevkii' },
              telephone: '+90 553 062 51 73',
              openingHours: 'Mo-Su 09:00-24:00',
              servesCuisine: ['Türk','Izgara','Et'],
              priceRange: '₺₺',
              acceptsReservations: 'Yes',
            }),
          }}
        />
      </body>
    </html>
  )
}
