'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export interface ProductCardProps {
  slug: string
  name: string
  brand: string
  type: string
  price: number | string // can be cents (e.g. 1895) or formatted string (e.g. '$18.95')
  category?: string
}

export function ProductCard({
  slug,
  name,
  brand,
  type,
  price,
  category = 'tobacco',
}: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  // Normalize price to cents and formatted string
  let priceCents: number
  let displayPrice: string

  if (typeof price === 'number') {
    priceCents = price
    displayPrice = `$${(price / 100).toFixed(2)}`
  } else {
    const numeric = parseFloat(price.replace(/[^0-9.]/g, ''))
    priceCents = Math.round((numeric || 0) * 100)
    displayPrice = price
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      slug,
      name,
      brand,
      category,
      variant: 'Standard',
      price: priceCents,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="group relative bg-white rounded-xl border border-border/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Clickable Image Section */}
      <Link href={`/products/${slug}`} className="block relative aspect-square bg-gradient-to-br from-charcoal-800 via-charcoal to-charcoal-900 flex items-center justify-center overflow-hidden">
        {/* Subtle green hover overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Icon & Initial */}
        <div className="relative z-0 text-center px-4 transform transition-transform duration-300 ease-out group-hover:scale-105">
          <div className="w-14 h-14 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center mx-auto mb-2.5 shadow-inner transition-colors duration-300 group-hover:border-gold group-hover:bg-gold/20">
            <span className="text-gold font-serif text-xl font-bold">
              {name.charAt(0)}
            </span>
          </div>
          <span className="text-white/40 text-[11px] uppercase tracking-wider font-medium">{type}</span>
        </div>
      </Link>

      {/* Info & Add to Cart Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-secondary text-[11px] uppercase tracking-wider font-medium mb-1">{brand}</p>
          <Link
            href={`/products/${slug}`}
            className="block text-charcoal text-sm sm:text-base font-serif font-semibold leading-snug mb-3 line-clamp-2 hover:text-[#22C55E] transition-colors"
          >
            {name}
          </Link>
        </div>

        <div className="space-y-3 pt-3 border-t border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-charcoal font-bold text-base sm:text-lg">{displayPrice}</span>
            <span className="badge-gray text-[11px] px-2.5 py-0.5 rounded-full">{type}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs ${
              added
                ? 'bg-[#16A34A] text-white ring-2 ring-[#16A34A]/30'
                : 'bg-charcoal text-white hover:bg-[#22C55E] active:scale-[0.98]'
            }`}
            aria-label={`Add ${name} to cart`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
