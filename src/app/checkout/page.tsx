'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ShoppingBag,
  Printer,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
]

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()

  // Form states
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [dobMonth, setDobMonth] = useState('')
  const [dobDay, setDobDay] = useState('')
  const [dobYear, setDobYear] = useState('')
  const [ageCertified, setAgeCertified] = useState(false)

  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('Virginia')
  const [zip, setZip] = useState('')
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard')

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string
    date: string
    email: string
    name: string
    address: string
    total: number
    items: typeof items
  } | null>(null)

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`

  // Shipping & Tax calculations
  const shippingCents = shippingMethod === 'express' ? 1995 : (subtotal >= 10000 || subtotal === 0 ? 0 : 995)
  const estimatedTaxCents = Math.round(subtotal * 0.0725)
  const grandTotalCents = subtotal + shippingCents + estimatedTaxCents

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    // Basic Validation
    if (!email || !firstName || !lastName || !phone) {
      setErrorMessage('Please fill in all contact information.')
      return
    }

    // Age validation
    const birthYear = parseInt(dobYear, 10)
    const currentYear = new Date().getFullYear()
    if (!birthYear || currentYear - birthYear < 21) {
      setErrorMessage('You must be at least 21 years old to purchase tobacco products.')
      return
    }

    if (!ageCertified) {
      setErrorMessage('You must certify that you are 21 years of age or older.')
      return
    }

    if (!address || !city || !zip) {
      setErrorMessage('Please complete all shipping address fields.')
      return
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardExp || !cardCvc || !cardName)) {
      setErrorMessage('Please enter all payment card details.')
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      const orderId = `ALC-${Math.floor(100000 + Math.random() * 900000)}`
      const orderData = {
        orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        email,
        name: `${firstName} ${lastName}`,
        address: `${address}${apartment ? `, ${apartment}` : ''}, ${city}, ${state} ${zip}`,
        total: grandTotalCents,
        items: [...items],
      }
      setCompletedOrder(orderData)
      clearCart()
      setIsSubmitting(false)
    }, 1200)
  }

  // If order is completed, show the confirmation screen
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-ivory py-16">
        <div className="container-xl max-w-2xl mx-auto">
          <div className="bg-white border border-border/80 rounded-2xl p-8 sm:p-10 shadow-card text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5 text-[#22C55E]">
              <CheckCircle className="w-9 h-9" />
            </div>

            <span className="badge-gold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
              Order Confirmed
            </span>
            <h1 className="heading-xl text-charcoal mb-2">Thank You For Your Order!</h1>
            <p className="text-secondary text-sm mb-6">
              Your order <strong className="text-charcoal font-semibold">{completedOrder.orderId}</strong> has been received and is being prepared for adult signature delivery.
            </p>

            {/* Receipt Summary Box */}
            <div className="bg-neutral-50 border border-border/80 rounded-xl p-5 text-left mb-8 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-secondary">Order Number:</span>
                <span className="font-bold text-charcoal">{completedOrder.orderId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-secondary">Order Date:</span>
                <span className="font-medium text-charcoal">{completedOrder.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-secondary">Recipient:</span>
                <span className="font-medium text-charcoal">{completedOrder.name} ({completedOrder.email})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-secondary">Shipping To:</span>
                <span className="font-medium text-charcoal">{completedOrder.address}</span>
              </div>
              <div className="flex justify-between py-1 pt-2">
                <span className="text-secondary font-semibold text-sm">Total Paid:</span>
                <span className="font-bold text-charcoal text-base">{formatPrice(completedOrder.total)}</span>
              </div>
            </div>

            {/* Adult Signature Delivery Notice */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 text-left mb-8 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-0.5">Adult Signature (21+) Required</p>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  Federal regulations mandate an adult aged 21 or older with valid government-issued photo ID must sign upon delivery.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/shop" className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2">
                Continue Shopping
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If cart is empty and no completed order
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center bg-white border border-border/80 rounded-2xl p-8 shadow-card">
          <div className="w-16 h-16 rounded-full bg-neutral-100 border border-border/60 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-secondary/60" />
          </div>
          <h1 className="heading-lg text-charcoal mb-2">No Items in Checkout</h1>
          <p className="text-secondary text-sm mb-6">
            Please add your desired tobacco or accessory products to the cart before checking out.
          </p>
          <Link href="/shop" className="btn-primary w-full inline-flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Explore Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Checkout Header */}
      <div className="bg-charcoal text-white border-b border-white/10">
        <div className="container-xl py-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">
                Secure Checkout
              </span>
              <h1 className="heading-xl text-white mt-1">Complete Your Order</h1>
            </div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        <form onSubmit={handleSubmitOrder} className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Form */}
          <div className="lg:col-span-8 space-y-6">
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Step 1: Customer Contact & Age Verification */}
            <div className="bg-white border border-border/80 rounded-2xl p-6 sm:p-7 shadow-card space-y-5">
              <div className="flex items-center gap-3 border-b border-border/70 pb-4">
                <div className="w-7 h-7 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                  1
                </div>
                <div>
                  <h2 className="text-charcoal font-semibold text-base">Contact &amp; 21+ Age Verification</h2>
                  <p className="text-secondary text-xs">Required by state and federal tobacco laws</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@example.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Phone (for Delivery SMS)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
              </div>

              {/* Date of Birth Verification */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Date of Birth (Must be 21+)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder="MM"
                    min="1"
                    max="12"
                    required
                    value={dobMonth}
                    onChange={(e) => setDobMonth(e.target.value)}
                    className="px-3 py-2 text-sm border border-border rounded-lg text-center focus:outline-none focus:border-[#22C55E]"
                  />
                  <input
                    type="number"
                    placeholder="DD"
                    min="1"
                    max="31"
                    required
                    value={dobDay}
                    onChange={(e) => setDobDay(e.target.value)}
                    className="px-3 py-2 text-sm border border-border rounded-lg text-center focus:outline-none focus:border-[#22C55E]"
                  />
                  <input
                    type="number"
                    placeholder="YYYY (e.g. 1995)"
                    min="1900"
                    max={new Date().getFullYear() - 21}
                    required
                    value={dobYear}
                    onChange={(e) => setDobYear(e.target.value)}
                    className="px-3 py-2 text-sm border border-border rounded-lg text-center focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
              </div>

              {/* Age Certification Checkbox */}
              <label className="flex items-start gap-3 p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={ageCertified}
                  onChange={(e) => setAgeCertified(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#22C55E] focus:ring-[#22C55E] rounded border-border"
                />
                <span className="text-xs text-secondary leading-snug">
                  I certify under penalty of perjury that I am at least 21 years of age, legally eligible to purchase tobacco products in my jurisdiction, and understand adult signature photo ID is required upon delivery.
                </span>
              </label>
            </div>

            {/* Step 2: Shipping Address & Carrier */}
            <div className="bg-white border border-border/80 rounded-2xl p-6 sm:p-7 shadow-card space-y-5">
              <div className="flex items-center gap-3 border-b border-border/70 pb-4">
                <div className="w-7 h-7 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <div>
                  <h2 className="text-charcoal font-semibold text-base">Shipping Address</h2>
                  <p className="text-secondary text-xs">Direct adult signature delivery</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="1234 Heritage Way"
                    className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Apt / Suite (Optional)</label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Apt 4B"
                      className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Richmond"
                      className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">State</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-white focus:outline-none focus:border-[#22C55E]"
                    >
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="23219"
                    className="w-full max-w-xs px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                  />
                </div>

                {/* Shipping Method Selection */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-charcoal mb-2">Shipping Method</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <label
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        shippingMethod === 'standard'
                          ? 'border-[#22C55E] bg-emerald-50/50 ring-1 ring-[#22C55E]'
                          : 'border-border bg-white hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="text-[#22C55E]"
                        />
                        <div>
                          <p className="text-xs font-semibold text-charcoal">Standard Ground (3-5 days)</p>
                          <p className="text-[11px] text-secondary">Compliant adult signature</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-charcoal">
                        {subtotal >= 10000 ? 'FREE' : '$9.95'}
                      </span>
                    </label>

                    <label
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        shippingMethod === 'express'
                          ? 'border-[#22C55E] bg-emerald-50/50 ring-1 ring-[#22C55E]'
                          : 'border-border bg-white hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="text-[#22C55E]"
                        />
                        <div>
                          <p className="text-xs font-semibold text-charcoal">Priority Express (1-2 days)</p>
                          <p className="text-[11px] text-secondary">Expedited carrier transit</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-charcoal">$19.95</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Details */}
            <div className="bg-white border border-border/80 rounded-2xl p-6 sm:p-7 shadow-card space-y-5">
              <div className="flex items-center gap-3 border-b border-border/70 pb-4">
                <div className="w-7 h-7 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                  3
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h2 className="text-charcoal font-semibold text-base">Payment Method</h2>
                    <p className="text-secondary text-xs">256-bit encrypted SSL checkout</p>
                  </div>
                  <Lock className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="flex gap-2 border-b border-border/60 pb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'bg-charcoal text-white'
                      : 'bg-neutral-100 text-charcoal hover:bg-neutral-200'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                    paymentMethod === 'cod'
                      ? 'bg-charcoal text-white'
                      : 'bg-neutral-100 text-charcoal hover:bg-neutral-200'
                  }`}
                >
                  Cash on Delivery / In-Store
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="•••• •••• •••• ••••"
                      maxLength={19}
                      className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Security Code (CVC)</label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:border-[#22C55E]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-secondary leading-relaxed">
                  You will pay upon authorized adult signature receipt or during local fulfillment pickup. A valid 21+ government photo ID is strictly required.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Order Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-border/80 rounded-2xl p-6 shadow-card space-y-5 sticky top-24">
              <h2 className="text-charcoal font-semibold text-base border-b border-border/70 pb-3">
                Order Review ({items.length} {items.length === 1 ? 'item' : 'items'})
              </h2>

              {/* Items mini list */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-border/50">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-charcoal leading-snug">{item.name}</p>
                      <p className="text-secondary text-[11px]">{item.variant} &times; {item.quantity}</p>
                    </div>
                    <span className="font-bold text-charcoal ml-2">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="border-t border-border/80 pt-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-secondary">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Shipping</span>
                  <span className="text-charcoal font-medium">
                    {shippingCents === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : formatPrice(shippingCents)}
                  </span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Estimated Tax</span>
                  <span className="text-charcoal font-medium">{formatPrice(estimatedTaxCents)}</span>
                </div>
                <div className="border-t border-border/80 pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-charcoal">Total</span>
                  <span className="text-2xl font-bold font-serif text-charcoal">
                    {formatPrice(grandTotalCents)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] disabled:opacity-50 text-white flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Place Order &bull; {formatPrice(grandTotalCents)}
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-secondary flex items-center justify-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  Adult Signature Delivery Guaranteed
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
