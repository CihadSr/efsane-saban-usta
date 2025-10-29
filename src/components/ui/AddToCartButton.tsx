// src/components/ui/AddToCartButton.tsx
'use client'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
}

export default function AddToCartButton({ label = 'Sepete Ekle', className, disabled, ...rest }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium',
        'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
        'shadow-sm ring-1 ring-white/15 transition-transform duration-150 ease-out',
        'hover:brightness-110 hover:-translate-y-0.5',
        'active:translate-y-0 active:scale-[0.98]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        className
      )}
      {...rest}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>{label}</span>
    </button>
  )
}

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(' ')
}
