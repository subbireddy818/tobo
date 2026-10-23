'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, Trash2, ShieldCheck, Truck, ArrowRight, Tag, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, totalItems } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null)
  const [promoError, setPromoError] = useState('')

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`

  // Calculations
  const shippingCents = subtotal >= 10000 || subtotal === 0 ? 0 : 995
  const discountCents = appliedPromo ? Math.round(subtotal * (appliedPromo.discountPercent / 100)) : 0
  const taxableSubtotal = Math.max(0, subtotal - discountCents)
  const estimatedTaxCents = Math.round(taxableSubtotal * 0.0725) // ~7.25% average state excise/sales tax
  const grandTotalCents = taxableSubtotal + shippingCents + estimatedTaxCents

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    setPromoError('')
    const clean = promoCode.trim().toUpperCase()
    if (!clean) return

    if (clean === 'WELCOME10' || clean === 'SAVE10' || clean === 'FIRSTORDER') {
      setAppliedPromo({ code: clean, discountPercent: 10 })
      setPromoCode('')
    } else {
      setPromoError('Invalid promo code. Try "WELCOME10" for 10% off.')
    }
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header Banner */}
      <div className="bg-charcoal text-white border-b border-white/10">
        <div className="container-xl py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">
                Shopping Cart
              </span>
              <h1 className="heading-xl text-white mt-1">Review Your Order</h1>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="max-w-xl mx-auto text-center py-16 bg-white border border-border/80 rounded-2xl p-8 shadow-card">
            <div className="w-20 h-20 rounded-full bg-neutral-100 border border-border/60 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-9 h-9 text-secondary/60" aria-hidden="true" />
            </div>
            <h2 className="heading-md text-charcoal mb-2">Your cart is currently empty</h2>
            <p className="text-secondary text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              Explore our curated selection of premium cigars, fine pipe tobaccos, cigarettes, and artisan accessories.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/shop" className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2">
                Browse All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/collections/cigars" className="btn-secondary w-full sm:w-auto text-center">
                View Cigars
              </Link>
            </div>
          </div>
        ) : (
          /* Active Cart with Items */
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-border/80 rounded-2xl shadow-card overflow-hidden">
                <div className="p-5 border-b border-border/70 flex items-center justify-between">
                  <h2 className="text-charcoal font-semibold text-base">
                    Cart Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </h2>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-border/60">
                  {items.map((item) => (
                    <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* Item Avatar & Details */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-charcoal text-gold font-serif font-bold text-xl flex items-center justify-center border border-border/80 flex-shrink-0">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-secondary text-xs uppercase tracking-wider font-medium">{item.brand}</p>
                          <Link
                            href={`/products/${item.slug}`}
                            className="text-charcoal font-semibold text-sm hover:text-[#22C55E] transition-colors leading-snug"
                          >
                            {item.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-secondary bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                              {item.variant}
                            </span>
                            <span className="text-xs font-semibold text-charcoal">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                        <div className="flex items-center border border-border rounded-lg bg-white overflow-hidden shadow-xs h-9">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 h-full text-charcoal hover:bg-neutral-100 transition-colors font-semibold"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-3 min-w-[32px] text-center font-bold text-xs text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 h-full text-charcoal hover:bg-neutral-100 transition-colors font-semibold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right min-w-[70px]">
                          <span className="font-bold text-charcoal text-base">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-secondary/60 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  {subtotal >= 10000 ? (
                    <span className="font-semibold text-emerald-800">You unlocked Free Standard Shipping!</span>
                  ) : (
                    <span>
                      Add <strong>{formatPrice(10000 - subtotal)}</strong> more to get <strong>Free Standard Shipping</strong>!
                    </span>
                  )}
                </div>
                <Link href="/shop" className="text-emerald-700 font-semibold hover:underline">
                  Add Items &rarr;
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-border/80 rounded-2xl p-6 shadow-card space-y-5">
                <h2 className="text-charcoal font-semibold text-base border-b border-border/70 pb-3">
                  Order Summary
                </h2>

                {/* Pricing rows */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-secondary">
                    <span>Items Subtotal</span>
                    <span className="text-charcoal font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo ({appliedPromo.code} - {appliedPromo.discountPercent}%)</span>
                      <span className="font-semibold">-{formatPrice(discountCents)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-secondary">
                    <span>Standard Shipping</span>
                    <span className="text-charcoal font-medium">
                      {shippingCents === 0 ? (
                        <span className="text-emerald-700 font-semibold">FREE</span>
                      ) : (
                        formatPrice(shippingCents)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-secondary">
                    <span>Estimated Tax (Excise &amp; Sales)</span>
                    <span className="text-charcoal font-medium">{formatPrice(estimatedTaxCents)}</span>
                  </div>

                  <div className="border-t border-border/80 pt-3 flex justify-between items-baseline">
                    <span className="text-base font-bold text-charcoal">Estimated Total</span>
                    <span className="text-2xl font-bold font-serif text-charcoal">
                      {formatPrice(grandTotalCents)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-secondary/60 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code (e.g. WELCOME10)"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-border rounded-lg uppercase placeholder:normal-case focus:outline-none focus:border-[#22C55E]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-border text-charcoal text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-600 text-[11px] mt-1.5">{promoError}</p>
                  )}
                  {appliedPromo && (
                    <p className="text-emerald-700 text-[11px] mt-1.5 flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" /> Code {appliedPromo.code} applied!
                    </p>
                  )}
                </form>

                {/* Proceed to Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full h-12 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99]"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Trust Highlights */}
                <div className="pt-4 border-t border-border/80 space-y-2 text-[11px] text-secondary">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>21+ Age verification confirmed at checkout.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Discreet, tamper-evident packaging.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
