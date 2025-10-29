// src/app/page.tsx
'use client'
import { useMemo, useState } from 'react'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import MenuGrid from '@/components/MenuGrid'
import CartSheet from '@/components/CartSheet'
import FavoritesSheet from '@/components/FavoritesSheet'
import MobileBar from '@/components/MobileBar'
import { ITEMS, type Cat } from '@/data/items'
import useCart from '@/hooks/useCart'

export default function Page(){
  const { add } = useCart()
  const [filter, setFilter] = useState<'all'|Cat>('all')
  const filtered = useMemo(()=> filter==='all'? ITEMS : ITEMS.filter(i=>i.cat===filter), [filter])
  const [cartOpen, setCartOpen] = useState(false)
  const [favsOpen, setFavsOpen] = useState(false)

  // SEO: tek bir görünmez H1 ile yerel sinyal
  const H1 = () => <h1 className="sr-only">Karaburun İskele’de ızgara et ve meze — Efsane Şaban Usta</h1>

  // FAQ schema (opsiyonel)
  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Karaburun’da ızgara et nerede yenir?', acceptedAnswer: { '@type': 'Answer', text: 'Efsane Şaban Usta, Karaburun İskele Mevkii’nde ızgara et ve köfte servis eder.' } },
      { '@type': 'Question', name: 'Rezervasyon nasıl yapılır?', acceptedAnswer: { '@type': 'Answer', text: 'Telefon veya WhatsApp ile hızlı rezervasyon yapabilirsiniz.' } },
    ],
  }

  return (
    <main className="pb-28">
      <H1 />
      <Navbar onOpenCart={()=>setCartOpen(true)} onOpenFavs={()=>setFavsOpen(true)} />
      <Hero />

      <section id="menu" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold">Menü</h2>
            <p className="mt-2 text-neutral-300">İzmir Karaburun İskele mevkiinde ızgara et, köfte ve meze servis ediyoruz.</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-neutral-400">Pişmiş kilo satış fiyatları</p>
            <p className="text-lg font-semibold">Kilo Et: 1500 TL • Kilo Köfte: 1100 TL</p>
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto whitespace-nowrap snap-x snap-mandatory">
          {(['all','meze','et','kofte','sicak','tatli','icecek'] as const).map(k => (
            <button
              key={k}
              onClick={()=>setFilter(k)}
              className={`snap-start rounded-xl border border-white/10 px-4 py-2 text-sm md:text-base ${filter===k ? 'bg-white/10 ring-1 ring-white/20' : ''}`}
            >
              {k==='all'?'Tümü':k[0].toUpperCase()+k.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-yellow-500/30 bg-yellow-500/15">
          <div className="ticker">
            <div className="ticker__content text-yellow-300 font-semibold">
              <span>🍖 Kilo Et 1500 TL</span>
              <span>🥩 Kilo Köfte 1100 TL</span>
              <span>Rakını al gel</span>
              <span>Karaburun • İskele Mevkii</span>
              <span>🍖 Kilo Et 1500 TL</span>
              <span>🥩 Kilo Köfte 1100 TL</span>
              <span>BYOB: Rakını al gel</span>
              <span>Karaburun • İskele Mevkii</span>
            </div>
          </div>
        </div>

        <MenuGrid
          items={filtered}
          onAdd={(id)=>{
            document.dispatchEvent(new CustomEvent('cart:add',{detail:{id}}))
            if ('vibrate' in navigator) try{ (navigator as any).vibrate(15) }catch{}
          }}
        />
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">Galeri</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1,2,3,4].map(n => (
            <img key={n} src={`/media/galeri/${n}.jpg`} className="rounded-2xl h-40 w-full object-cover border border-white/10" alt="galeri" />
          ))}
        </div>
      </section>

      <section id="contact" className="bg-neutral-900/40 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold">İletişim</h2>
            <div className="mt-4 space-y-3 text-neutral-300">
              <p><strong>Adres:</strong> Karaburun, İskele Mevkii, İzmir</p>
              <p><strong>Telefon:</strong> <a className="underline" href="tel:+905530625173">+90 553 062 51 73</a></p>
              <p><strong>Çalışma saatleri:</strong> 09:00 – 00:00</p>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="tel:+905530625173" className="rounded-2xl bg-sky-500 hover:bg-sky-600 px-5 py-3 font-semibold text-white">Hemen Ara</a>
              <a href="#menu" className="rounded-2xl border border-white/20 px-5 py-3 font-semibold">Menü</a>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-white/10 min-h-[320px]">
            <iframe
              title="EFSANE ŞABAN USTA — Konum"
              className="w-full h-full min-h-[320px] map-embed"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=EFSANE%20%C5%9EABAN%20USTA%20Karaburun%20%C4%B0skele%20Mevkii&z=16&output=embed">
            </iframe>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />

      <CartSheet open={cartOpen} onClose={()=>setCartOpen(false)} />
      <FavoritesSheet open={favsOpen} onClose={()=>setFavsOpen(false)} />
      <MobileBar onOpenCart={()=>setCartOpen(true)} />
    </main>
  )
}
