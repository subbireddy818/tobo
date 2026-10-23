'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center bg-white border border-border rounded-lg">
        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" aria-hidden="true" />
        </div>
        <h3 className="heading-md text-charcoal mb-2">Message Received</h3>
        <p className="text-secondary text-sm mb-6 max-w-sm mx-auto">
          Thank you for getting in touch. A customer service representative will respond within 1 business day.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn-secondary text-sm"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="label">Full Name</label>
          <input id="contact-name" required className="input" placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="contact-email" className="label">Email</label>
          <input id="contact-email" type="email" required className="input" placeholder="john@example.com" />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="label">Subject</label>
        <input id="contact-subject" required className="input" placeholder="How can we help?" />
      </div>
      <div>
        <label htmlFor="contact-message" className="label">Message</label>
        <textarea id="contact-message" rows={5} required className="input" placeholder="Your message…" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
