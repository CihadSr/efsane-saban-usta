// src/components/FavoritesSheet.tsx
'use client'
import useFavorites from '@/hooks/useFavorites'
import useCart from '@/hooks/useCart'

export default function FavoritesSheet({ open, onClose }:{ open:boolean; onClose:()=>void }) {
  const { detailed, totalQty, inc, dec, setQty, remove, clear, exportLink, importFrom } = useFavorites()
  const { add } = useCart()
  if (!open) return null

  function addAllToCart() {
    for (const f of detailed) for (let k = 0; k < f.qty; k++) add(f.item.id)
    onClose()
    try {
      const el = document.getElementById('cart-anchor')
      el?.classList.add('animate-[focusGlow_900ms_ease-out_1]')
      setTimeout(() => el?.classList.remove('animate-[focusGlow_900ms_ease-out_1]'), 950)
    } catch {}
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(exportLink())
      alert('Favori bağlantısı kopyalandı. Her cihazda bu link ile açabilirsin.')
    } catch {
      prompt('Kopyalayın:', exportLink())
    }
  }

  function importFromPrompt() {
    const v = prompt('JSON yapıştır (dışa aktarımdan):')
    if (!v) return
    const ok = importFrom(v)
    alert(ok ? 'İçe aktarıldı.' : 'Geçersiz içerik.')
  }

  return (
    <aside
      role="dialog" aria-modal="true" aria-labelledby="fav-title"
      className="fixed top-0 right-0 h-full w-full max-w-md z-60 flex flex-col pb-28
                 bg-neutral-950/80 backdrop-blur-md border-l border-white/10"
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 id="fav-title" className="text-xl font-bold">Favoriler</h3>
        <div className="flex items-center gap-2">
          <button type="button" onClick={copyLink} className="rounded-xl px-3 py-1 border border-white/20 hover:bg-white/10 text-sm">Bağlantı</button>
          <button type="button" onClick={importFromPrompt} className="rounded-xl px-3 py-1 border border-white/20 hover:bg-white/10 text-sm">İçe aktar</button>
          <button type="button" onClick={onClose} className="rounded-xl px-3 py-1 hover:bg-white/10">Kapat</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll">
        {detailed.length === 0 ? (
          <p className="text-neutral-300/80">Henüz favori yok. Menüde kalp ikonuna dokunarak ekleyebilirsin.</p>
        ) : detailed.map(f => (
          <div key={f.item.id} className="flex items-center justify-between gap-3 rounded-xl p-3 bg-white/5 border border-white/10">
            <div className="min-w-0">
              <p className="font-semibold truncate">{f.item.name}</p>
              <p className="text-xs text-neutral-400">{f.item.price} TL</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button type="button" onClick={()=>dec(f.item.id)} className="rounded-lg px-3 py-2 bg-white/10 text-base">–</button>
              <div className="flex items-center">
                <label htmlFor={`fav-qty-${f.item.id}`} className="sr-only">Adet</label>
                <input
                  id={`fav-qty-${f.item.id}`} type="number" min={1} value={f.qty}
                  onChange={e=>setQty(f.item.id, Number(e.target.value))}
                  className="w-12 text-center rounded-lg bg-white/10 py-1" aria-label="Adet"
                  inputMode="numeric" pattern="[0-9]*" title="Adet"
                />
              </div>
              <button type="button" onClick={()=>inc(f.item.id)} className="rounded-lg px-3 py-2 bg-white/10 text-base">+</button>
              <button type="button" onClick={()=>remove(f.item.id)} className="rounded-lg px-3 py-2 text-sm border border-white/20">Sil</button>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 z-50 p-4 border-t border-white/10 bg-neutral-950/80 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between text-sm text-neutral-300">
          <span>Toplam favori adet</span><span>{totalQty}</span>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={addAllToCart} className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-5 py-3 font-semibold text-white">
            Favorileri sepete ekle
          </button>
          <button type="button" onClick={clear} className="rounded-xl border border-white/20 px-4 py-3 font-semibold">
            Temizle
          </button>
        </div>
      </div>
    </aside>
  )
}
