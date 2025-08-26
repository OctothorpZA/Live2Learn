// /frontend/app/components/shop/CartIcon.tsx
'use client'

import { useState } from 'react'
import { useCartStore } from '@/app/store/cart'
import Cart from './Cart'

export default function CartIcon() {
  const { totalItems } = useCartStore()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const itemCount = totalItems()

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2"
        aria-label={`Open shopping cart with ${itemCount} items`}
      >
        {/* Shopping Cart SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {/* Item Count Badge */}
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {itemCount}
          </span>
        )}
      </button>

      {/* The Cart slide-over panel */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
