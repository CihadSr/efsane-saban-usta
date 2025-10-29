'use client'
import useCart from '@/hooks/useCart'

export default function Navbar({ onOpenCart }:{ onOpenCart: ()=>void }){
  const { cart } = useCart()
  const count = cart.reduce((s,i)=>s+i.qty,0)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        <a href="#top" className="inline-flex items-center justify-center">
          <span className="px-3 py-1 rounded-xl bg-black/40 backdrop-blur text-white font-extrabold tracking-tight text-base md:text-lg text-center">
            EFSANE ŞABAN USTA
          </span>
        </a>

        <div className="flex items-center gap-3">
          <button
            id="cart-anchor"
            data-cart-anchor
            type="button"
            onClick={onOpenCart}
            className="relative inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            aria-label="Sepeti aç"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 3h2l2.2 10.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6l1.3-6.8H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="18" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            {count>0 && (
              <span className="cart-badge absolute -top-1 -right-1 min-w-[1.25rem] h-5 rounded-full bg-emerald-400 text-black text-xs font-bold flex items-center justify-center px-1">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
