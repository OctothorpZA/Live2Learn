// /frontend/app/store/cart.ts
import { create } from 'zustand'
import { toast } from 'sonner'

// Define the type for a single item in the cart
export type CartItem = {
  _id: string
  productName?: string | null
  image?: any
  price?: number | null
  quantity: number
}

// Define the state and actions for our cart store
type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  // Action to add an item to the cart
  addItem: (newItem) => {
    const existingItem = get().items.find((item) => item._id === newItem._id)

    if (existingItem) {
      // If item already exists, just increase its quantity
      get().updateQuantity(newItem._id, existingItem.quantity + 1)
    } else {
      // Otherwise, add the new item with a quantity of 1
      set((state) => ({
        items: [...state.items, { ...newItem, quantity: 1 }],
      }))
      toast.success(`${newItem.productName} has been added to your cart.`)
    }
  },

  // Action to remove an item from the cart
  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item._id !== itemId),
    }))
    toast.error('Item has been removed from your cart.')
  },

  // Action to update the quantity of a specific item
  updateQuantity: (itemId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item._id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
      ),
    }))
  },

  // Action to clear the entire cart
  clearCart: () => set({ items: [] }),

  // Function to calculate the total number of items in the cart
  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  // Function to calculate the total price of all items in the cart
  totalPrice: () => {
    return get().items.reduce(
      (total, item) => total + (item.price ?? 0) * item.quantity,
      0
    )
  },
}))
