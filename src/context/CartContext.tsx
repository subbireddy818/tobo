'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  variant: string
  price: number // in cents
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number // in cents
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'alc_cart_items_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch {
      // Ignore localStorage errors
    }
    setMounted(true)
  }, [])

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [items, mounted])

  const addItem = (itemData: Omit<CartItem, 'id' | 'quantity'>, qty = 1) => {
    setItems((prev) => {
      const id = `${itemData.slug}-${itemData.variant}`
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + qty } : i
        )
      }
      return [...prev, { ...itemData, id, quantity: qty }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => {
    setItems([])
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // Ignore
      }
    }
  }

  const totalItems = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0
  const subtotal = mounted ? items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0

  return (
    <CartContext.Provider
      value={{
        items: mounted ? items : [],
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
