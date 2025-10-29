// src/lib/flyToCart.ts
export function flyToCart(fromEl: HTMLElement | null, targetId = 'cart-anchor') {
  if (!fromEl) return
  const target = document.getElementById(targetId)
  if (!target) return

  const from = fromEl.getBoundingClientRect()
  const to = target.getBoundingClientRect()

  const ghost = fromEl.cloneNode(true) as HTMLElement
  Object.assign(ghost.style, {
    position: 'fixed',
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    borderRadius: getComputedStyle(fromEl).borderRadius || '12px',
    pointerEvents: 'none',
    zIndex: '9999',
    opacity: '1',
    transform: 'translate(0,0) scale(1)',
    transition: 'transform 420ms cubic-bezier(.2, .8, .2, 1), opacity 420ms ease',
    boxShadow: '0 6px 20px rgba(0,0,0,.25)',
  } as CSSStyleDeclaration)

  document.body.appendChild(ghost)

  const dx = to.left + to.width / 2 - (from.left + from.width / 2)
  const dy = to.top + to.height / 2 - (from.top + from.height / 2)

  requestAnimationFrame(() => {
    ghost.style.transform = `translate(${dx}px, ${dy}px) scale(.2)`
    ghost.style.opacity = '0.15'
  })

  setTimeout(() => ghost.remove(), 460)
}
