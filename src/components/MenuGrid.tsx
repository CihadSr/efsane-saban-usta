// src/components/MenuGrid.tsx  // [CHECK]
'use client'
import type { Item } from '@/data/items'
export default function MenuGrid({ items, onAdd }:{ items: Item[]; onAdd:(id:string)=>void }){
  return (
    <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(it => (
        <article key={it.id} className="group rounded-2xl border border-white/10 bg-neutral-900/60 p-4">
          <div className="flex gap-3">
            <img src={it.img} alt={it.name} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="text-base md:text-lg font-semibold">{it.name}</h3>
                <span className="font-semibold text-sm md:text-base">{it.price} TL</span>
              </div>
              {it.desc && <p className="mt-1 text-xs md:text-sm text-neutral-400">{it.desc}</p>}
             <button
  onClick={()=>onAdd(it.id)}
 className="mt-3 w-full rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-2 text-sm"

>
  Sepete Ekle
</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
