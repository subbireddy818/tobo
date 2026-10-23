import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | American Leaf Co.',
  description: 'Get in touch with American Leaf Co. customer support.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal">
        <div className="container-xl py-12">
          <h1 className="heading-xl text-white">Contact Us</h1>
          <p className="text-white/50 mt-2">We&apos;re here to help with any questions about our products and services.</p>
        </div>
      </div>
      <div className="container-xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="heading-lg mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
          <div className="space-y-6">
            <h2 className="heading-lg">Contact Information</h2>
            <p className="text-secondary text-sm">Reach out to our customer care team via email, phone, or visit our headquarters.</p>
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'support@americanleaf.com' },
                { icon: Phone, label: 'Phone', value: '(800) 555-0199' },
                { icon: MapPin, label: 'Location', value: 'Richmond, Virginia, USA' },
                { icon: Clock, label: 'Hours', value: 'Monday – Friday: 9:00 AM – 5:00 PM EST' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card p-4 flex items-start gap-3">
                  <Icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-charcoal font-semibold text-sm">{label}</p>
                    <p className="text-secondary text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
