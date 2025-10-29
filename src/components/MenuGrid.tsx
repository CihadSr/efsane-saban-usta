// src/components/MenuGrid.tsx
'use client'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { Item } from '@/data/items'
import useCart from '@/hooks/useCart'

type Props = { items: Item[]; onAdd: (id: string) => void }

/** Görseli #cart-anchor noktasına doğru küçük uçuş animasyonu (sade) */
function flyToCart(fromEl: HTMLElement | null) {
  if (!fromEl) return
  const cart = document.getElementById('cart-anchor')
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
    zIndex: '50',
    opacity: '1',
    transition: 'transform 420ms cubic-bezier(.2,.8,.2,1), opacity 420ms ease',
  } as CSSStyleDeclaration)
  document.body.appendChild(ghost)
  const dx = to.left + to.width / 2 - (from.left + from.width / 2)
  const dy = to.top + to.height / 2 - (from.top + from.height / 2)
  requestAnimationFrame(() => {
    ghost.style.transform = `translate(${dx}px, ${dy}px) scale(.2)`
    ghost.style.opacity = '0.15'
  })
  setTimeout(() => ghost.remove(), 440)
}

export default function MenuGrid({ items, onAdd }: Props) {
  const { cart } = useCart()
  const qtyMap = useMemo(() => {
    const m: Record<string, number> = {}
    for (const c of cart) m[c.id] = c.qty
    return m
  }, [cart])

  const [added, setAdded] = useState<Record<string, boolean>>({})

  return (
    <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => {
        const qty = qtyMap[it.id] || 0
        const isAddedFlash = !!added[it.id]
        return (
          <article
            key={it.id}
            className={`group rounded-2xl border p-4 bg-neutral-900/60 transition-colors
              ${qty > 0 ? 'border-emerald-400/30 bg-emerald-900/10' : 'border-white/10'}`}
          >
            <div className="flex gap-3">
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  id={`img-${it.id}`}
                  src={it.img}
                  alt={it.name}
                  fill
                  className="rounded-xl object-cover border border-white/10"
                  sizes="64px"
                  priority={false}
                />
                {/* Köşede adet rozeti */}
                {qty > 0 && (
                  <span
                    className="absolute -top-1 -right-1 rounded-full bg-emerald-600 text-white text-[10px] px-2 py-1 shadow-sm animate-fadein"
                    aria-live="polite"
                    title={`Sepette ${qty} adet`}
                  >
                    {qty}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base md:text-lg font-semibold truncate">{it.name}</h3>
                  <span className="font-semibold text-sm md:text-base shrink-0">{it.price} TL</span>
                </div>

                {it.desc && <p className="mt-1 text-xs md:text-sm text-neutral-400 line-clamp-2">{it.desc}</p>}

                <button
                  onClick={() => {
                    onAdd(it.id)
                    const img = document.getElementById(`img-${it.id}`) as HTMLElement | null
                    flyToCart(img)
                    if ('vibrate' in navigator) { try { (navigator as any).vibrate(12) } catch {} }
                    setAdded((s) => ({ ...s, [it.id]: true }))
                    setTimeout(() => setAdded((s) => ({ ...s, [it.id]: false })), 1100)
                  }}
                  className={`mt-3 w-full rounded-lg px-3 py-2 text-sm transition border will-change-transform
                    ${isAddedFlash
                      ? 'border-emerald-400/40 bg-emerald-700/20 text-emerald-100 animate-pop'
                      : 'border-white/15 bg-white/5 hover:bg-white/10 active:scale-[0.98]'
                    }`}
                  aria-label={`${it.name} sepete ekle`}
                  title={qty > 0 ? `Sepette ${qty} adet var` : 'Sepete ekle'}
                >
                  {isAddedFlash ? 'Eklendi ✓' : (qty > 0 ? 'Bir tane daha ekle' : 'Sepete Ekle')}
                </button>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
