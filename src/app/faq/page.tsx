import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about American Leaf Co.',
}

const faqs = [
  { q: 'What is American Leaf Co.?', a: 'American Leaf Co. is a demonstration e-commerce platform built for US tobacco retail. All products, brands, and pricing shown are fictional and for illustration purposes only.' },
  { q: 'Can I purchase products?', a: 'No. The platform is currently in catalogue/demo mode. Purchasing will not be available until all required business licensing, compliance review, payment processing, and legal counsel have been completed.' },
  { q: 'Why do I need to verify my age?', a: 'US federal law requires that you must be 21 years or older to purchase tobacco products. Our platform enforces age verification on every visit as a compliance requirement.' },
  { q: 'Are the brands real?', a: 'No. All brand names shown (Appalachian Reserve, Coronado Leaf, Blue Ridge Smoke, Canyon Creek, etc.) are entirely fictional and created for demonstration purposes only.' },
  { q: 'What types of tobacco products are covered?', a: 'Our catalogue covers cigarettes, cigars, cigarillos, pipe tobacco, rolling tobacco, hookah/shisha tobacco, smokeless tobacco (chew, dip, snuff, snus), nicotine pouches, and accessories (pipes, lighters, humidors, papers, filters).' },
  { q: 'Do you ship to all US states?', a: 'Shipping availability varies by product type and destination state. Individual state tobacco shipping laws, carrier policies, and licensing requirements determine eligibility. All shipping rules must be verified before real sales commence.' },
  { q: 'How does the compliance engine work?', a: 'Our jurisdiction-aware compliance engine validates product eligibility, minimum age requirements, shipping restrictions, and tax obligations for each destination. Rules are configurable by administrators and must be reviewed by qualified legal counsel.' },
  { q: 'What payment methods will be accepted?', a: 'Payment processing requires approval from a tobacco-friendly payment provider. Standard payment processors may not permit tobacco transactions. Payment methods will be listed once merchant approval is obtained.' },
  { q: 'How do I create an account?', a: 'Account registration is available through the Account page. Accounts allow order tracking, address management, and order history once purchasing is enabled.' },
  { q: 'Who should I contact for questions?', a: 'Visit our Contact page. Note that contact details shown are demonstration placeholders.' },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal">
        <div className="container-xl py-12">
          <h1 className="heading-xl text-white">Frequently Asked Questions</h1>
          <p className="text-white/50 mt-2">{faqs.length} questions answered</p>
        </div>
      </div>
      <div className="container-xl py-10">
        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group card">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                <span className="text-charcoal font-semibold text-sm pr-4">{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-secondary flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="px-5 pb-5 -mt-1">
                <p className="text-secondary text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
        <div className="mt-8 max-w-3xl">
          <p className="text-secondary text-sm">Still have questions? <Link href="/contact" className="text-gold hover:text-gold-dark font-medium">Contact us</Link>.</p>
        </div>
      </div>
    </div>
  )
}
