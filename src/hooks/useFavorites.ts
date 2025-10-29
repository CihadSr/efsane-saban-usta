// src/hooks/useFavorites.ts
'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ITEMS } from '@/data/items'
import type { Item } from '@/data/items'

export type FavItem = { id: string; qty: number }
export type FavRow = { id: string; qty: number; item: Item }

let __favsApplyingRemote = false

function readJSON<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback } catch { return fallback }
}
function isRow(x: { id: string; qty: number; item?: Item }): x is FavRow {
  return !!x.item
}
function sanitize(list: FavItem[]) {
  // var olmayan id’leri at
  const set = new Set(ITEMS.map(i => i.id))
  return list.filter(f => set.has(f.id) && (f.qty|0) > 0)
}
function merge(a: FavItem[], b: FavItem[]) {
  const map = new Map<string, number>()
  for (const f of a) map.set(f.id, (map.get(f.id) || 0) + f.qty)
  for (const f of b) map.set(f.id, (map.get(f.id) || 0) + f.qty)
  return Array.from(map, ([id, qty]) => ({ id, qty }))
}

export default function useFavorites() {
  const [favs, setFavs] = useState<FavItem[]>([])
  const importedOnce = useRef(false)

  // Kalıcılık iste (tarayıcı temizlemelerini azaltır)
  useEffect(() => {
    try { (navigator as any).storage?.persist?.() } catch {}
  }, [])

  // Load
  useEffect(() => { setFavs(sanitize(readJSON<FavItem[]>('favorites', []))) }, [])

  // URL'den bir kere içe aktar (?favs=base64json)
  useEffect(() => {
    if (importedOnce.current) return
    try {
      const url = new URL(window.location.href)
      const q = url.searchParams.get('favs')
      if (q) {
        const decoded = JSON.parse(atob(q)) as FavItem[]
        const clean = sanitize(decoded)
        if (clean.length) {
          setFavs(p => sanitize(merge(p, clean)))
          // query’yi temizle
          url.searchParams.delete('favs')
          window.history.replaceState({}, '', url.toString())
        }
      }
    } catch {}
    importedOnce.current = true
  }, [])

  // Persist
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favs)) }, [favs])

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'favorites') return
      try {
        const next = sanitize(JSON.parse(e.newValue || '[]') as FavItem[])
        __favsApplyingRemote = true
        setFavs(next)
        __favsApplyingRemote = false
      } catch {}
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Same-tab publish
  useEffect(() => {
    if (__favsApplyingRemote) return
    try { document.dispatchEvent(new CustomEvent('favs:sync', { detail: favs })) } catch {}
  }, [favs])

  // Same-tab subscribe
  useEffect(() => {
    const h = (e: Event) => {
      const ev = e as CustomEvent<FavItem[]>
      const next = ev.detail
      __favsApplyingRemote = true
      setFavs(prev => (prev === next ? prev : next))
      __favsApplyingRemote = false
    }
    document.addEventListener('favs:sync', h as any)
    return () => document.removeEventListener('favs:sync', h as any)
  }, [])

  // Derived
  const totalQty = useMemo(() => favs.reduce((s, f) => s + f.qty, 0), [favs])
  const detailed = useMemo(() => {
    const map = new Map(ITEMS.map(it => [it.id, it] as const))
    return favs
      .map(f => ({ id: f.id, qty: f.qty, item: map.get(f.id) }))
      .filter(isRow)
  }, [favs])

  // Actions
  function isFav(id: string) { return favs.some(f => f.id === id) }
  function add(id: string, qty = 1) {
    setFavs(p => {
      const i = p.findIndex(f => f.id === id)
      if (i > -1) { const n = p.slice(); n[i] = { ...n[i], qty: n[i].qty + qty }; return n }
      return [...p, { id, qty }]
    })
  }
  function remove(id: string) { setFavs(p => p.filter(f => f.id !== id)) }
  function toggle(id: string) { isFav(id) ? remove(id) : add(id, 1) }
  function setQty(id: string, qty: number) {
    setFavs(p => p.map(f => f.id === id ? { ...f, qty: Math.max(1, qty | 0) } : f))
  }
  function inc(id: string) { add(id, 1) }
  function dec(id: string) {
    setFavs(p => p.flatMap(f => f.id === id ? (f.qty > 1 ? [{ ...f, qty: f.qty - 1 }] : []) : [f]))
  }
  function clear() { setFavs([]) }

  // Paylaşılabilir bağlantı (base64 json)
  function exportLink(origin = window.location.origin) {
    const payload = btoa(JSON.stringify(favs))
    return `${origin}?favs=${payload}`
  }
  // Dışarıdan metin içe aktar (örn. paste)
  function importFrom(text: string) {
    try {
      const arr = JSON.parse(text) as FavItem[]
      setFavs(p => sanitize(merge(p, sanitize(arr))))
      return true
    } catch { return false }
  }

  return { favs, detailed, totalQty, isFav, toggle, add, remove, setQty, inc, dec, clear, exportLink, importFrom }
}
