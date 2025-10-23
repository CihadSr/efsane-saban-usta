// src/components/MobileBar.tsx  // [UPDATED]
'use client'
import useCart from '@/hooks/useCart'
export default function MobileBar({ onOpenCart }:{ onOpenCart: ()=>void }){
  const { openWA } = useCart()
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden"> {/* z-50 -> z-40 */}
      <div className="mx-auto max-w-7xl px-3 pb-3">
        <div className="rounded-2xl bg-neutral-900/80 backdrop-blur border border-white/10 flex items-center justify-between overflow-hidden">
          <a href="tel:+905530625173" className="w-1/3 text-center py-3 active:scale-[0.99]">Ara</a>
          <button onClick={openWA} className="w-1/3 bg-green-600 hover:bg-green-500 py-3 font-semibold">WhatsApp</button>
          <button onClick={onOpenCart} className="w-1/3 text-center py-3 active:scale-[0.99]">Sepet</button>
        </div>
      </div>
    </div>
  )
}
