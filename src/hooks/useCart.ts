// src/hooks/useCart.ts
'use client'
import { useEffect, useMemo, useState } from 'react'
import { ITEMS } from '@/data/items'

export type CartItem = { id: string; name: string; price: number; qty: number }
export type OrderType = 'gel-al' | 'masada' | 'paket'
export type OrderInfo = {
  name: string
  phone: string
  type: OrderType
  table?: string
  address?: string
  note?: string
}

/** Aynı sekmede birden fazla useCart örneği varsa senkron için hafif yayın/dinle */
let __cartApplyingRemote = false

function sumQty(list: CartItem[]) {
  return list.reduce((s, i) => s + i.qty, 0)
}
function mergeById(a: CartItem[], b: CartItem[]) {
  const map = new Map<string, CartItem>()
  for (const it of a) map.set(it.id, { ...it })
  for (const it of b) {
    const cur = map.get(it.id)
    if (cur) map.set(it.id, { ...cur, qty: cur.qty + it.qty })
    else map.set(it.id, { ...it })
  }
  return Array.from(map.values())
}
function readJSON<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key)
    if (!s) return fallback
    return JSON.parse(s) as T
  } catch {
    return fallback
  }
}

export default function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [info, setInfo] = useState<OrderInfo>({
    name: '',
    phone: '',
    type: 'gel-al',
    table: '',
    address: '',
    note: '',
  })

  // “Son sipariş” yereli
  const [lastCount, setLastCount] = useState<number>(0)
  function loadLast(): CartItem[] {
    return readJSON<CartItem[]>('lastOrder', [])
  }
  function saveLastFromCurrent() {
    localStorage.setItem('lastOrder', JSON.stringify(cart))
    setLastCount(sumQty(cart))
  }
  function repeatLast(): number {
    const last = loadLast()
    const added = sumQty(last)
    if (added === 0) return 0
    setCart((p) => mergeById(p, last))
    // görsel geri bildirim
    try {
      const el = document.getElementById('cart-anchor')
      el?.classList.add('animate-[focusGlow_900ms_ease-out_1]')
      setTimeout(() => el?.classList.remove('animate-[focusGlow_900ms_ease-out_1]'), 950)
    } catch {}
    return added
  }

  // Load
  useEffect(() => {
    setCart(readJSON<CartItem[]>('cart', []))
    setInfo(readJSON<OrderInfo>('orderInfo', {
      name: '',
      phone: '',
      type: 'gel-al',
    } as OrderInfo))
    setLastCount(sumQty(loadLast()))
  }, [])

  // Persist
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('orderInfo', JSON.stringify(info)) }, [info])

  // Cross-tab sync via storage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cart') {
        try {
          const next = JSON.parse(e.newValue || '[]') as CartItem[]
          __cartApplyingRemote = true
          setCart(next)
          __cartApplyingRemote = false
        } catch {}
      }
      if (e.key === 'orderInfo') {
        try {
          const next = JSON.parse(e.newValue || 'null') as OrderInfo | null
          if (next) setInfo(next)
        } catch {}
      }
      if (e.key === 'lastOrder') {
        try {
          const next = JSON.parse(e.newValue || '[]') as CartItem[]
          setLastCount(sumQty(next))
        } catch {}
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Same-tab publish
  useEffect(() => {
    if (__cartApplyingRemote) return
    try { document.dispatchEvent(new CustomEvent('cart:sync', { detail: cart })) } catch {}
  }, [cart])

  // Same-tab subscribe
  useEffect(() => {
    const h = (e: Event) => {
      const ev = e as CustomEvent<CartItem[]>
      const next = ev.detail
      __cartApplyingRemote = true
      setCart(prev => (prev === next ? prev : next))
      __cartApplyingRemote = false
    }
    document.addEventListener('cart:sync', h as any)
    return () => document.removeEventListener('cart:sync', h as any)
  }, [])

  // Actions
  function add(id: string) {
    const it = ITEMS.find(i => i.id === id)
    if (!it) return
    setCart(p => {
      const idx = p.findIndex(x => x.id === id)
      if (idx > -1) {
        const n = p.slice()
        n[idx] = { ...n[idx], qty: n[idx].qty + 1 }
        return n
      } else {
        return [...p, { id, name: it.name, price: it.price, qty: 1 }]
      }
    })
  }
  function inc(i: number) {
    setCart(p => {
      if (i < 0 || i >= p.length) return p
      const n = p.slice()
      n[i] = { ...n[i], qty: n[i].qty + 1 }
      return n
    })
  }
  function dec(i: number) {
    setCart(p => {
      if (i < 0 || i >= p.length) return p
      const n = p.slice()
      const cur = n[i]
      const nextQty = Math.max(0, cur.qty - 1)
      if (nextQty === 0) return n.filter((_, idx) => idx !== i)
      n[i] = { ...cur, qty: nextQty }
      return n
    })
  }
  function rm(i: number) {
    setCart(p => p.filter((_, idx) => idx !== i))
  }

  const total = useMemo(() => cart.reduce((s, i) => s + i.qty * i.price, 0), [cart])
  const count = useMemo(() => sumQty(cart), [cart])

  // WhatsApp gönder ve “son sipariş”i kaydet
  const waPhone = '905530625173'
  function isValidPhone(v: string) {
    const digits = (v || '').replace(/\D/g, '')
    return digits.length >= 10
  }
  function openWA() {
    if (!isValidPhone(info.phone)) { window.alert('Lütfen geçerli bir telefon numarası girin.'); return }
    if (info.type === 'paket' && !info.address?.trim()) { window.alert('Paket servis için adres gerekli.'); return }

    const head = [
      `Müşteri: ${info.name || '-'}`,
      `Telefon: ${info.phone}`,
      `Tür: ${info.type === 'gel-al' ? 'Gel-Al' : info.type === 'masada' ? 'Masada' : 'Paket Servis'}`,
      info.table ? `Masa: ${info.table}` : null,
      info.address ? `Adres: ${info.address}` : null,
      info.note ? `Not: ${info.note}` : null,
    ].filter(Boolean).join('\n')

    const items = cart.length
      ? cart.map(ci => `• ${ci.name} x ${ci.qty} = ${(ci.qty * ci.price).toFixed(0)} TL`).join('\n')
      : ''

    const text = cart.length
      ? `Merhaba, EFSANE ŞABAN USTA siparişim:\n${head}\n${items}\nToplam: ${total.toFixed(0)} TL`
      : `Merhaba, sipariş vermek istiyorum.\n${head}`

    // son siparişi kaydet
    try { saveLastFromCurrent() } catch {}

    const url = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener')
  }

  return {
    cart, total, count,
    add, inc, dec, rm,
    openWA, info, setInfo, isValidPhone,
    // yeni
    repeatLast, lastCount, saveLastFromCurrent,
  }
}
