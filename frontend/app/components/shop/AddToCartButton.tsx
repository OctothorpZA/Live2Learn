// /frontend/app/components/shop/AddToCartButton.tsx
'use client'

import { useCartStore, type CartItem } from '@/app/store/cart'

// Define the type for the props this component will accept
type AddToCartButtonProps = {
  product: Omit<CartItem, 'quantity'>
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  // Get the addItem function from our Zustand cart store
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(product)
  }

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={handleAddToCart}
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to Cart
      </button>
    </div>
  )
}
