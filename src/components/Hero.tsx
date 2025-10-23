// src/components/Hero.tsx  // [UPDATED]
'use client'

export default function Hero() {
  return (
    <section id="top" className="relative h-[100svh] flex items-center overflow-hidden">
      {/* Arka plan video */}
     <video
  className="absolute inset-0 w-full h-full object-cover opacity-80"  // %90 opak
  src="/media/hero.mp4"
  autoPlay
  muted
  loop
  playsInline
/>

      {/* Çok hafif karartma (videoyu kapatmaz) */}
      <div className="absolute inset-0 bg-black/05 pointer-events-none" />

      {/* Metin bloğu — kutu yok, sadece tipografi */}
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="max-w-xl">
          <p className="text-xs md:text-sm text-white/80 drop-shadow">
            EFSANE ŞABAN USTA’nın elinden
          </p>

          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
            Malzemesi makul.{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              Et ağırlıklı lezzetler
            </span>
            .
          </h1>

          <p className="mt-3 text-sm md:text-base text-white/85 drop-shadow">
            Ustalıkla mangalda pişen tatlar. Karaburun / İskele Mevkii.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-2xl bg-white text-neutral-900 px-5 py-3 font-semibold"
            >
              Menüyü Gör
            </a>
            <a
              href="#contact"
              className="rounded-2xl bg-amber-500 hover:bg-amber-600 px-5 py-3 font-semibold text-white"
            >
              Konum & İletişim
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
