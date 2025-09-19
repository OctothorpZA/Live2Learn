// /frontend/app/components/shop/Cart.tsx
'use client'

import { useState } from 'react'
import { useCartStore } from '@/app/store/cart'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'
// Import the server action and the new form data type
import { processCheckout, type PayFastFormData } from '@/app/actions'
import { toast } from 'sonner'

// Helper function to dynamically create and submit the PayFast form
function submitPayFastForm(formData: PayFastFormData) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = formData.actionUrl
  form.style.display = 'none'

  formData.inputs.forEach((input) => {
    const inputElement = document.createElement('input')
    inputElement.type = 'hidden'
    inputElement.name = input.name
    inputElement.value = input.value
    form.appendChild(inputElement)
  })

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

type CartProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()
  // State to manage the loading status of the checkout button
  const [isProcessing, setIsProcessing] = useState(false)

  const formattedTotalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalPrice())

  // Function to handle the checkout process
  const handleCheckout = async () => {
    setIsProcessing(true)
    try {
      // FIX: Build the correct payload object to send to the server action
      const payload = {
        orderId: `LTL-${Date.now()}`,
        amount: totalPrice(),
        itemName: 'LTL E-Shop Purchase',
        itemDescription: items
          .map((i) => `${i.productName} (x${i.quantity})`)
          .join(', '),
      }

      const formData = await processCheckout(payload)
      // Call the helper function to submit the form
      submitPayFastForm(formData)
    } catch (error) {
      console.error(error)
      toast.error('Could not process payment. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Slide-over Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button onClick={onClose} className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item._id} className="flex py-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        // FIX: Provide a valid placeholder URL instead of an empty string
                        src={
                          urlForImage(item.image)?.url() ||
                          'https://placehold.co/96x96/EEE/31343C?text=No+Image'
                        }
                        alt={item.productName || 'Product Image'}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.productName}</h3>
                          <p className="ml-4">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(item.price ?? 0)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            className="px-2"
                          >
                            -
                          </button>
                          <p className="text-gray-500">Qty {item.quantity}</p>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="px-2"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeItem(item._id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{formattedTotalPrice}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                disabled={items.length === 0 || isProcessing}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
