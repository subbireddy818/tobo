'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Zap, Check, ShieldCheck, Truck } from 'lucide-react'
import { useCart } from '@/context/CartContext'

interface Variant {
  name: string
  price: number
}

interface ProductActionsProps {
  slug: string
  name: string
  brand: string
  category: string
  variants: Variant[]
  basePrice: number
}

export function ProductActions({
  slug,
  name,
  brand,
  category,
  variants,
  basePrice,
}: ProductActionsProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0] || { name: 'Standard', price: basePrice })
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`

  const handleAddToCart = () => {
    addItem(
      {
        slug,
        name,
        brand,
        category,
        variant: selectedVariant.name,
        price: selectedVariant.price,
      },
      quantity
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const handleBuyNow = () => {
    addItem(
      {
        slug,
        name,
        brand,
        category,
        variant: selectedVariant.name,
        price: selectedVariant.price,
      },
      quantity
    )
    router.push('/checkout')
  }

  return (
    <div className="space-y-6">
      {/* Current Price Display */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold font-serif text-charcoal">
          {formatPrice(selectedVariant.price * quantity)}
        </span>
        {quantity > 1 && (
          <span className="text-secondary text-sm">
            ({formatPrice(selectedVariant.price)} each)
          </span>
        )}
      </div>

      {/* Variant Selection */}
      {variants.length > 0 && (
        <div>
          <label className="block text-charcoal font-semibold text-xs uppercase tracking-wider mb-2.5">
            Select Option / Size
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {variants.map((v) => {
              const isSelected = selectedVariant.name === v.name
              return (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`text-left p-3 rounded-lg border text-sm transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#22C55E] bg-emerald-50/60 ring-2 ring-[#22C55E]/30 text-charcoal shadow-sm'
                      : 'border-border bg-white text-charcoal hover:border-charcoal/30 hover:bg-neutral-50'
                  }`}
                >
                  <div className="font-semibold text-xs leading-snug">{v.name}</div>
                  <div className={`text-xs mt-1 font-medium ${isSelected ? 'text-[#16A34A]' : 'text-secondary'}`}>
                    {formatPrice(v.price)}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Quantity & Action Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-border rounded-lg bg-white overflow-hidden shadow-xs h-12">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="px-3.5 h-full text-charcoal hover:bg-neutral-100 disabled:opacity-40 transition-colors font-semibold"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 min-w-[36px] text-center font-bold text-sm text-charcoal">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-3.5 h-full text-charcoal hover:bg-neutral-100 transition-colors font-semibold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 h-12 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer ${
              added
                ? 'bg-[#16A34A] text-white ring-2 ring-[#16A34A]/30 scale-[0.99]'
                : 'bg-charcoal text-white hover:bg-black active:scale-[0.99]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>

        {/* Buy Now Button */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full h-12 px-6 rounded-lg font-semibold text-sm bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-white" />
          Buy Now — Proceed to Checkout
        </button>
      </div>

      {/* Trust Badges */}
      <div className="pt-4 border-t border-border/80 space-y-2 text-xs text-secondary">
        <div className="flex items-center gap-2 text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] inline-block animate-pulse" />
          <span className="font-medium">In Stock &bull; Ships within 24 hours</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
          <span>Compliant carrier delivery &bull; Free shipping on orders $100+</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
          <span>Strict 21+ adult signature verification required upon receipt</span>
        </div>
      </div>
    </div>
  )
}
