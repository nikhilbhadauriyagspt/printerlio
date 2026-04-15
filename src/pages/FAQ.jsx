import React, { useState } from 'react';
import SEO from '@/components/SEO';
import {
  ChevronDown,
  ShieldCheck,
  Truck,
  Info,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: 'Orders & Purchasing',
    icon: <ShieldCheck size={20} />,
    questions: [
      {
        q: 'How do I place an order for a printer?',
        a: 'To place an order, select your preferred printer, add it to your cart, and complete the checkout process with your shipping and payment details.',
      },
      {
        q: 'Is an account required to shop?',
        a: 'No, you can place an order as a guest. Creating an account can make it easier to manage orders and preferences later.',
      },
      {
        q: 'How can I check my order status?',
        a: 'Once your order is placed, you will receive confirmation details. You can also use the order tracking option available on the website.',
      },
      {
        q: 'What payment methods are supported?',
        a: 'We accept major payment methods through secure checkout so your transactions remain protected and reliable.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    icon: <Truck size={20} />,
    questions: [
      {
        q: 'Where do you ship to?',
        a: 'We currently offer shipping across the United States for both homes and business locations.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery usually takes around 3 to 7 business days depending on your location and order details.',
      },
      {
        q: 'How can I track my shipment?',
        a: 'After your order is dispatched, you will receive tracking details so you can follow your shipment status.',
      },
    ],
  },
  {
    category: 'Printer Information',
    icon: <Info size={20} />,
    questions: [
      {
        q: 'Are all printers original and new?',
        a: 'Yes, we provide brand-new printers in original packaging so customers receive products in proper condition.',
      },
      {
        q: 'Is there a warranty provided?',
        a: 'Most printers include manufacturer warranty coverage. Warranty details may vary depending on the product model.',
      },
      {
        q: 'Are original ink and toner available?',
        a: 'Yes, we also offer compatible printing supplies for many of the models available in our catalog.',
      },
    ],
  },
  {
    category: 'Returns & Support',
    icon: <RotateCcw size={20} />,
    questions: [
      {
        q: 'What is your return policy?',
        a: 'Unused products in original condition may be returned within the allowed return window, subject to our return policy terms.',
      },
      {
        q: 'What if the machine arrives with issues?',
        a: 'If your order arrives damaged or has a problem, please contact support as soon as possible so we can help with the next steps.',
      },
    ],
  },
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const currentCategoryData = faqs.find((f) => f.category === activeCategory);
  const filteredFaqs = currentCategoryData?.questions || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Poppins'] text-black">
      <SEO
        title="FAQ | Printistan"
        description="Find answers to common questions about our printers, delivery, and support."
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 bg-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
        </div>

        <div className="relative max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-4xl mx-auto text-center">
            <p className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-blue-700">
              FAQ
            </p>

            <h1 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ">
              <span className="text-black">Frequently Asked</span>{' '}
              <span className="text-blue-600">Questions</span>
            </h1>

            <p className="mt-5 text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
              Find quick answers to common questions about orders, shipping,
              printer details, and customer support.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* LEFT SIDE */}
            <aside className="xl:col-span-4">
              <div className="sticky top-24 rounded-[30px] border border-black/10 bg-white p-5 md:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                <div className="mb-6">
                  <p className="text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-blue-700 mb-2">
                    Categories
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                    <span className="text-black">Browse by</span>{' '}
                    <span className="text-blue-600">Topic</span>
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {faqs.map((f) => (
                    <button
                      key={f.category}
                      onClick={() => {
                        setActiveCategory(f.category);
                        setActiveIdx(null);
                      }}
                      className={cn(
                        'group w-full text-left px-4 md:px-5 py-4 rounded-[20px] border flex items-center gap-4 transition-all duration-300',
                        activeCategory === f.category
                          ? 'bg-black text-white border-black shadow-[0_12px_30px_rgba(0,0,0,0.10)]'
                          : 'bg-white text-black border-black/10 hover:border-blue-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.08)]'
                      )}
                    >
                      <div
                        className={cn(
                          'h-11 w-11 rounded-[14px] flex items-center justify-center shrink-0 transition-all duration-300',
                          activeCategory === f.category
                            ? 'bg-white/10 text-white'
                            : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                        )}
                      >
                        {f.icon}
                      </div>

                      <span className="text-sm md:text-[15px] font-semibold leading-snug">
                        {f.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* RIGHT SIDE */}
            <main className="xl:col-span-8">
              <div className="rounded-[30px] border border-black/10 bg-white p-5 md:p-6 lg:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <p className="text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-blue-700 mb-2">
                      Selected Category
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                      <span className="text-black">{activeCategory.split(' ')[0]}</span>{' '}
                      <span className="text-blue-600">
                        {activeCategory.split(' ').slice(1).join(' ')}
                      </span>
                    </h2>
                  </div>

                  <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                    {filteredFaqs.length} Questions
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className="rounded-[24px] border border-black/10 bg-[#fbfcff] overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)]"
                    >
                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                      >
                        <span className="text-sm md:text-base font-semibold text-black pr-6 leading-relaxed">
                          {faq.q}
                        </span>

                        <div
                          className={cn(
                            'h-10 w-10 rounded-full border border-black/10 bg-white flex items-center justify-center shrink-0 transition-all duration-300',
                            activeIdx === i
                              ? 'rotate-180 border-blue-200 bg-blue-50 text-blue-600'
                              : 'text-black/50'
                          )}
                        >
                          <ChevronDown size={18} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {activeIdx === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                          >
                            <div className="px-5 md:px-6 pb-5 md:pb-6">
                              <div className="h-px w-full bg-black/10 mb-4" />
                              <p className="text-sm md:text-[15px] text-black/65 leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-white p-8 md:p-12 text-center shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
            </div>

            <div className="relative max-w-3xl mx-auto">
              <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-blue-700 mb-3">
                Need More Help
              </p>

              <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
                <span className="text-black">Still Have</span>{' '}
                <span className="text-blue-600">Questions?</span>
              </h2>

              <p className="text-sm md:text-base lg:text-lg text-black/60 leading-relaxed mb-8 md:mb-10">
                Our support team is here to help you with product questions,
                order concerns, or anything else you need.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.18)]"
                >
                  Contact Us
                </Link>

                <Link
                  to="/shop"
                  className="px-8 py-3 rounded-[16px] border border-black/10 bg-white text-black text-sm font-semibold transition-all duration-300 hover:border-blue-200 hover:text-blue-600 hover:-translate-y-0.5"
                >
                  View Printers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}