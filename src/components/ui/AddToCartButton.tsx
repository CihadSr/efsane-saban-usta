// src/components/ui/AddToCartButton.tsx
'use client'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
  size?: 'sm' | 'md'
}

export default function AddToCartButton({
  label = 'Sepete Ekle',
  size = 'md',
  className,
  disabled,
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl whitespace-nowrap enabled:active:scale-[0.99] enabled:hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
  const sizes =
    size === 'sm'
      ? 'min-w-[104px] px-3 py-1.5 text-xs font-semibold'
      : 'min-w-[128px] px-3.5 py-2 text-sm font-medium'

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(base, sizes, className)}
      {...rest}
    >
      <svg width={size === 'sm' ? 12 : 14} height={size === 'sm' ? 12 : 14} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  )
}

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(' ')
}
