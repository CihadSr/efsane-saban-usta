// src/components/Navbar.tsx  // [UPDATED]
'use client'
import useCart from '@/hooks/useCart'
export default function Navbar({ onOpenCart }:{ onOpenCart: ()=>void }){
  const { cart } = useCart()
  const count = cart.reduce((s,i)=>s+i.qty,0)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        {/* BRAND */}
        <a href="#top" className="inline-flex items-center justify-center">
          <span className="px-3 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-white font-extrabold tracking-tight text-base md:text-lg text-center">
            EFSANE ŞABAN USTA
          </span>
        </a>

        {/* LINKS + CART */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-3">
            <a href="#menu">Menü</a>
            <a href="#gallery">Galeri</a>
            <a href="#contact">İletişim</a>
          </div>

          {/* Mini sepet ikonu */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Sepeti aç"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 hover:bg-black/40"
          >
            {/* basit svg ikon */}
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
            {count>0 && (
              <span className="cart-badge absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center animate-[badgepop_.24s_ease]">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
