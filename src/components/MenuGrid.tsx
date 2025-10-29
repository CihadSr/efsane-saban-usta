// src/components/MenuGrid.tsx
'use client'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { Item } from '@/data/items'
import useCart from '@/hooks/useCart'
import useFavorites from '@/hooks/useFavorites'
import AddToCartButton from '@/components/ui/AddToCartButton'

type Props = { items: Item[]; onAdd: (id: string) => void }

function getVisibleCartAnchor(): HTMLElement | null {
  const cands = Array.from(document.querySelectorAll<HTMLElement>('[data-cart-anchor], #cart-anchor'))
  const vpH = window.innerHeight || document.documentElement.clientHeight
  const visible = cands.filter(el => {
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vpH
  })
  return visible[0] || cands[0] || null
}

function flyToCart(fromEl: HTMLElement | null) {
  if (!fromEl) return
  const cart = getVisibleCartAnchor()
  if (!cart) return
  const from = fromEl.getBoundingClientRect()
  const to = cart.getBoundingClientRect()
  const ghost = fromEl.cloneNode(true) as HTMLElement
  Object.assign(ghost.style, {
    position: 'fixed',
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    borderRadius: getComputedStyle(fromEl).borderRadius,
    pointerEvents: 'none',
    zIndex: '9999',
    opacity: '1',
    transformOrigin: 'center',
    willChange: 'transform, opacity',
    transition: 'transform 420ms cubic-bezier(.2,.8,.2,1), opacity 420ms ease',
  } as Partial<CSSStyleDeclaration>)
  document.body.appendChild(ghost)
  const dx = to.left + to.width / 2 - (from.left + from.width / 2)
  const dy = to.top + to.height / 2 - (from.top + from.height / 2)
  requestAnimationFrame(() => {
    ghost.style.transform = `translate(${dx}px, ${dy}px) scale(.6)`
    ghost.style.opacity = '0.15'
  })
  setTimeout(() => ghost.remove(), 460)
}

export default function MenuGrid({ items, onAdd }: Props) {
  const { cart, add } = useCart()
  const { isFav, toggle } = useFavorites()
  const [added, setAdded] = useState<Record<string, boolean>>({})

  const qtyMap = useMemo(() => {
    const m: Record<string, number> = {}
    for (const c of cart) m[c.id] = c.qty
    return m
  }, [cart])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it) => {
        const qty = qtyMap[it.id] || 0
        const isAddedFlash = !!added[it.id]
        const fav = isFav(it.id)
        return (
          <article key={it.id} className="rounded-2xl border border-white/10 bg-white/5 p-3 flex gap-3">
            <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-white/10">
              <Image src={it.img} alt={it.name} fill className="object-cover" sizes="120px" />
            </div>

            <div className="flex-1 min-w-0">
              {/* İsim + kalp + rozet aynı satırda */}
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="font-semibold truncate">{it.name}</h3>

                <button
                  type="button"
                  onClick={()=>toggle(it.id)}
                  aria-label={fav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                  className={`shrink-0 rounded-md px-1.5 py-0.5 border ${fav ? 'border-rose-500/40 bg-rose-500/15' : 'border-white/10 bg-white/5'} hover:bg-white/10`}
                  title={fav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                >
                  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${fav ? 'text-rose-400' : 'text-white/70'}`} fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M12.1 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12.1 21.35Z"/>
                  </svg>
                </button>

                {qty > 0 && (
                  <span className="shrink-0 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                    Sepette {qty} adet
                  </span>
                )}
              </div>

              {/* Fiyat + buton */}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-emerald-400 font-bold whitespace-nowrap">{it.price.toFixed(2)}₺</span>

                <AddToCartButton
                  size="sm"
                  aria-label="Sepete ekle"
                  title="Sepete ekle"
                  label={qty > 0 ? '1 daha ekle' : 'Sepete Ekle'}
                  onClick={(e) => {
                    add(it.id)
                    onAdd(it.id)
                    const card = (e.currentTarget as HTMLElement).closest('article')
                    const img = card?.querySelector<HTMLElement>('div.relative')
                    flyToCart(img || (e.currentTarget as HTMLElement))
                    if ('vibrate' in navigator) { try { (navigator as any).vibrate(12) } catch {} }
                    setAdded((s) => ({ ...s, [it.id]: true }))
                    setTimeout(() => setAdded((s) => ({ ...s, [it.id]: false })), 900)
                  }}
                />
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
