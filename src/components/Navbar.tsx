// src/components/Navbar.tsx
'use client'
import useCart from '@/hooks/useCart'
import useFavorites from '@/hooks/useFavorites'

export default function Navbar({ onOpenCart, onOpenFavs }:{ onOpenCart: ()=>void; onOpenFavs: ()=>void }){
  const { cart } = useCart()
  const { totalQty } = useFavorites()
  const count = cart.reduce((s,i)=>s+i.qty,0)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        <a href="#top" className="inline-flex items-center justify-center">
          <span className="px-3 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-white font-extrabold tracking-tight text-base md:text-lg text-center">
            EFSANE ŞABAN USTA
          </span>
        </a>

        <div className="flex items-center gap-2">
          {/* Favoriler */}
          <button
            type="button"
            onClick={onOpenFavs}
            aria-label="Favorileri aç"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 hover:bg-black/40"
            title="Favoriler"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-rose-400" fill="currentColor" aria-hidden="true">
              <path d="M12.1 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12.1 21.35Z"/>
            </svg>
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-rose-500 text-black text-xs font-extrabold flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </button>

          {/* Sepet */}
          <button
            id="cart-anchor"
            type="button"
            onClick={onOpenCart}
            aria-label="Sepeti aç"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 hover:bg-black/40"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
            {count>0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-emerald-500 text-black text-xs font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
