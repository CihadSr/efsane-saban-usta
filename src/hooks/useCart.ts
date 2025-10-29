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

  // Load
  useEffect(() => {
    try { setCart(JSON.parse(localStorage.getItem('cart') || '[]')) } catch { setCart([]) }
    try {
      const s = localStorage.getItem('orderInfo')
      if (s) setInfo(JSON.parse(s))
    } catch {}
  }, [])

  // Persist
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('orderInfo', JSON.stringify(info)) }, [info])

  function add(id: string) {
    const it = ITEMS.find(i => i.id === id)
    if (!it) return
    setCart(p => {
      const idx = p.findIndex(x => x.id === id)
      if (idx > -1) {
        const n = [...p]
        n[idx] = { ...n[idx], qty: n[idx].qty + 1 }
        return n
      }
      return [...p, { id, name: it.name, price: it.price, qty: 1 }]
    })
  }
  function inc(i: number) {
    setCart(p => { const n = [...p]; n[i] = { ...n[i], qty: n[i].qty + 1 }; return n })
  }
  function dec(i: number) {
    setCart(p => { const n = [...p]; n[i] = { ...n[i], qty: Math.max(1, n[i].qty - 1) }; return n })
  }
  function rm(i: number) { setCart(p => p.filter((_, idx) => idx !== i)) }

  const total = useMemo(() => cart.reduce((s, i) => s + i.qty * i.price, 0), [cart])
  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]) // badge için

  // İşletme WhatsApp numarası (alıcı)
  const waPhone = '905530625173' // 90 ile başlar, boşluk yok

  // Basit TR telefon doğrulama
  function isValidPhone(v: string) {
    const digits = (v || '').replace(/\D/g, '')
    return digits.length >= 10
  }

  function openWA() {
    // Sepette telefon zorunlu
    if (!isValidPhone(info.phone)) {
      window.alert('Lütfen geçerli bir telefon numarası girin.')
      return
    }
    if (info.type === 'paket' && !info.address?.trim()) {
      window.alert('Paket servis için adres gerekli.')
      return
    }

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

    const url = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener')
  }

  // Global add event
  useEffect(() => {
    const h = (e: any) => add(e.detail.id)
    document.addEventListener('cart:add', h as any)
    return () => document.removeEventListener('cart:add', h as any)
  }, [])

  return { cart, total, count, add, inc, dec, rm, openWA, info, setInfo, isValidPhone }
}
