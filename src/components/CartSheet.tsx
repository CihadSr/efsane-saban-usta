'use client'
import { useEffect, useState } from 'react'
import useCart, { type CartItem } from '@/hooks/useCart'

export default function CartSheet({ open, onClose }:{ open:boolean; onClose:()=>void }){
  const { cart, total, inc, dec, rm, openWA, info, setInfo } = useCart()
  const [showInfo, setShowInfo] = useState(false)

  // scroll lock
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'     // [UPDATED]
    return () => { document.documentElement.style.overflow = prev }
  }, [open])

  if (!open) return null

  return (
    <aside
      role="dialog" aria-modal="true" aria-labelledby="cart-title"
      className="fixed top-0 right-0 h-full w-full max-w-md md:max-w-lg z-50 flex flex-col pb-24
                 bg-emerald-950/85 backdrop-blur-sm border-l border-emerald-800/30"
      onWheel={(e)=>e.stopPropagation()} onTouchMove={(e)=>e.stopPropagation()}  // [UPDATED]
    >
      {/* Header */}
      <div className="p-4 border-b border-emerald-800/30 flex items-center justify-between">
        <h3 id="cart-title" className="text-xl font-bold">Sepet</h3>
        <button type="button" onClick={onClose} className="rounded-xl px-3 py-1 hover:bg-white/10">Kapat</button>
      </div>

      {/* Müşteri Bilgileri (katlanabilir) */}
      <div className="border-b border-emerald-800/30">
        <button
          type="button"
          onClick={()=>setShowInfo(v=>!v)}
          className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/5"
        >
          <span className="font-semibold">Müşteri Bilgileri</span>
          <span className="text-sm opacity-80">{showInfo ? 'Gizle' : 'Düzenle'}</span>
        </button>

        {showInfo && ( // [UPDATED]
          <div className="px-4 pb-4 grid grid-cols-2 gap-3">
            <input
              value={info.name}
              onChange={e => setInfo(i => ({ ...i, name: e.target.value }))}
              placeholder="Ad Soyad"
              className="col-span-2 rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm"
            />
            <input
              value={info.phone}
              onChange={e => setInfo(i => ({ ...i, phone: e.target.value }))}
              placeholder="Telefon (zorunlu)"
              inputMode="tel"
              className="col-span-2 rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm"
            />
            <div className="col-span-2 grid grid-cols-3 gap-2 text-sm">
              <label className={`text-center rounded-xl px-3 py-2 border ${info.type === 'gel-al' ? 'bg-white/10 border-white/30' : 'border-white/10'}`}>
                <input type="radio" name="otype" className="hidden" checked={info.type === 'gel-al'} onChange={() => setInfo(i => ({ ...i, type: 'gel-al' }))} />
                Gel-Al
              </label>
              <label className={`text-center rounded-xl px-3 py-2 border ${info.type === 'masada' ? 'bg-white/10 border-white/30' : 'border-white/10'}`}>
                <input type="radio" name="otype" className="hidden" checked={info.type === 'masada'} onChange={() => setInfo(i => ({ ...i, type: 'masada' }))} />
                Masada
              </label>
              <label className={`text-center rounded-xl px-3 py-2 border ${info.type === 'paket' ? 'bg-white/10 border-white/30' : 'border-white/10'}`}>
                <input type="radio" name="otype" className="hidden" checked={info.type === 'paket'} onChange={() => setInfo(i => ({ ...i, type: 'paket' }))} />
                Paket
              </label>
            </div>
            {info.type === 'masada' && (
              <input
                value={info.table || ''}
                onChange={e => setInfo(i => ({ ...i, table: e.target.value }))}
                placeholder="Masa No (opsiyonel)"
                className="col-span-2 rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm"
              />
            )}
            {info.type === 'paket' && (
              <textarea
                value={info.address || ''}
                onChange={e => setInfo(i => ({ ...i, address: e.target.value }))}
                placeholder="Adres (paket için zorunlu)"
                className="col-span-2 rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm min-h-[88px]"
              />
            )}
            <input
              value={info.note || ''}
              onChange={e => setInfo(i => ({ ...i, note: e.target.value }))}
              placeholder="Not (acı/az pişmiş vb.)"
              className="col-span-2 rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm"
            />
          </div>
        )}
      </div>

      {/* Ürün listesi — geniş, rahat kaydırma alanı */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll"> {/* [UPDATED] */}
        {cart.length === 0 ? (
          <p className="text-neutral-300/80">Sepet boş.</p>
        ) : (
          cart.map((ci: CartItem, idx: number) => (
            <div
              key={ci.id}
              className="flex items-center justify-between gap-4 rounded-xl p-4
                         bg-emerald-900/30 border border-emerald-800/30"  // [UPDATED]
            >
              <div className="min-w-0">
                <p className="font-semibold truncate">{ci.name}</p>
                <p className="text-sm text-neutral-300/80">{ci.price} TL x {ci.qty}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" onClick={()=>dec(idx)} className="rounded-lg px-3 py-2 bg-white/10 text-base">–</button>
                <span className="w-8 text-center font-semibold">{ci.qty}</span>
                <button type="button" onClick={()=>inc(idx)} className="rounded-lg px-3 py-2 bg-white/10 text-base">+</button>
                <button type="button" onClick={()=>rm(idx)} className="rounded-lg px-3 py-2 bg-white/10 text-base">Sil</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 z-50 p-4 border-t border-emerald-800/30 bg-emerald-950/85 backdrop-blur-sm space-y-3">
        <div className="flex items-center justify-between text-lg">
          <span>Toplam</span><span>{total.toFixed(0)} TL</span>
        </div>
        <button
          type="button"
          onClick={openWA}
          className="w-full rounded-xl bg-green-500 hover:bg-green-600 px-5 py-4 font-semibold text-white text-base"
        >
          WhatsApp ile Gönder
        </button>
      </div>
    </aside>
  )
}
