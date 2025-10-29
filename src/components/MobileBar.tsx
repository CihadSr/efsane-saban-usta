// src/components/MobileBar.tsx
'use client'
import useCart from '@/hooks/useCart'

export default function MobileBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { count } = useCart()
  const WA_BUSINESS = '905530625173'

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      <div className="mx-auto max-w-7xl px-3 pb-3">
        <div className="rounded-2xl bg-neutral-900/80 backdrop-blur border border-white/10 flex items-center justify-between overflow-hidden">
          <a href="tel:+905530625173" className="w-1/3 text-center py-3 active:scale-[0.99]">Ara</a>
          <a
            href={`https://wa.me/${WA_BUSINESS}?text=${encodeURIComponent('Merhaba, rezervasyon için yazıyorum.')}`}
            target="_blank" rel="noopener noreferrer"
            className="w-1/3 bg-green-600 hover:bg-green-500 py-3 font-semibold text-white text-center"
          >
            WhatsApp
          </a>
          <button onClick={onOpenCart} className="w-1/3 text-center py-3 relative active:scale-[0.99]">
            Sepet
            <span className="absolute right-3 top-2 min-w-[1.25rem] h-5 px-1 rounded-full text-xs bg-emerald-600 text-white inline-flex items-center justify-center">
              {count}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
