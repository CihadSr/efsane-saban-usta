'use client'
import useCart from '@/hooks/useCart'

export default function MobileBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { cart } = useCart()
  const count = cart.reduce((s, i) => s + i.qty, 0)
  const WA_BUSINESS = '905530625173'

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      {/* arka cam panel */}
      <div className="mx-auto max-w-7xl px-3 pb-3">
        <div
          className="
            rounded-2xl border border-white/10
            bg-neutral-900/55 backdrop-blur-xl
            shadow-[0_8px_30px_rgb(0_0_0_/_0.25)]
            overflow-hidden
          "
        >
          {/* üçlü grid + ayraçlar */}
          <div className="grid grid-cols-3 divide-x divide-white/15">
            {/* Ara */}
            <a
              href="tel:+905530625173"
              className="
                flex items-center justify-center gap-2 py-3
                text-white/90 active:scale-[0.99]
                hover:bg-white/5
              "
              aria-label="Ara"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22 16.92v2a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.11 4.18 2 2 0 0 1 5.11 2h2a2 2 0 0 1 2 1.72c.12.9.31 1.77.57 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.14a2 2 0 0 1 2.11-.45c.83.26 1.7.45 2.6.57A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium">Ara</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WA_BUSINESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-2 py-3
                text-white/90 active:scale-[0.99]
                hover:bg-white/5
              "
              aria-label="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M19.6 17.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.8-.1.1-.3.1-.5 0s-1-.4-1.9-1.2c-.7-.6-1.2-1.3-1.3-1.5-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3 0-.1 0-.2 0-.3 0-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.3 0-.5.2-.2.2-.7.6-.7 1.6s.7 1.9.8 2 .1 0 .2.1c.1.1.2.4.5.8.3.4.9 1.2 2 1.9.7.4 1.3.7 1.7.8.7.3 1.3.3 1.8.2.6-.1 1.3-.6 1.5-1.1.2-.5.2-1 .2-1.1-.1-.1-.2-.1-.4-.2Z" fill="currentColor"/>
                <path d="M27.5 14.6c0 6.6-5.4 12-12 12-2.1 0-4.1-.6-5.8-1.6L4.5 26l1.1-5.1c-1.2-2-1.9-4.2-1.9-6.6C3.7 7.7 9.1 2.3 15.7 2.3s11.8 5.4 11.8 12.3Z" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              <span className="text-sm font-medium">WhatsApp</span>
            </a>

            {/* Sepet */}
            <button
              data-cart-anchor
              onClick={onOpenCart}
              className="
                relative flex items-center justify-center gap-2 py-3
                text-white/90 active:scale-[0.99]
                hover:bg-white/5
              "
              aria-label="Sepeti aç"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 3h2l2.2 10.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6l1.3-6.8H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="18" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <span className="text-sm font-semibold">Sepet</span>

              {count > 0 && (
                <span
                  className="
                    absolute right-3 top-2
                    min-w-[1.1rem] h-5 px-1
                    rounded-full bg-emerald-500 text-black
                    text-[11px] font-extrabold
                    inline-flex items-center justify-center
                    border border-black/10
                  "
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
