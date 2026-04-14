import React, { useState } from 'react';
import SEO from '@/components/SEO';
import {
  ChevronDown,
  ShieldCheck,
  Truck,
  Info,
  RotateCcw
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
        a: 'To place an order, select your preferred printer, add it to your cart, and complete the checkout process with your shipping and payment details.'
      },
      {
        q: 'Is an account required to shop?',
        a: 'No, you can place an order as a guest. Creating an account can make it easier to manage orders and preferences later.'
      },
      {
        q: 'How can I check my order status?',
        a: 'Once your order is placed, you will receive confirmation details. You can also use the order tracking option available on the website.'
      },
      {
        q: 'What payment methods are supported?',
        a: 'We accept major payment methods through secure checkout so your transactions remain protected and reliable.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery',
    icon: <Truck size={20} />,
    questions: [
      {
        q: 'Where do you ship to?',
        a: 'We currently offer shipping across the United States for both homes and business locations.'
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery usually takes around 3 to 7 business days depending on your location and order details.'
      },
      {
        q: 'How can I track my shipment?',
        a: 'After your order is dispatched, you will receive tracking details so you can follow your shipment status.'
      }
    ]
  },
  {
    category: 'Printer Information',
    icon: <Info size={20} />,
    questions: [
      {
        q: 'Are all printers original and new?',
        a: 'Yes, we provide brand-new printers in original packaging so customers receive products in proper condition.'
      },
      {
        q: 'Is there a warranty provided?',
        a: 'Most printers include manufacturer warranty coverage. Warranty details may vary depending on the product model.'
      },
      {
        q: 'Are original ink and toner available?',
        a: 'Yes, we also offer compatible printing supplies for many of the models available in our catalog.'
      }
    ]
  },
  {
    category: 'Returns & Support',
    icon: <RotateCcw size={20} />,
    questions: [
      {
        q: 'What is your return policy?',
        a: 'Unused products in original condition may be returned within the allowed return window, subject to our return policy terms.'
      },
      {
        q: 'What if the machine arrives with issues?',
        a: 'If your order arrives damaged or has a problem, please contact support as soon as possible so we can help with the next steps.'
      }
    ]
  }
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
    <div className="bg-white min-h-screen font-['Poppins'] text-black">
      <SEO
        title="FAQ | Printing State"
        description="Find answers to common questions about our printers, delivery, and support."
      />

      {/* HEADER */}
      <section className="pt-32 pb-16 md:pb-20 border-b border-black/10 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
              FAQ
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-black">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
              Find quick answers to common questions about orders, shipping, printer details, and customer support.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* LEFT: CATEGORIES */}
            <aside className="lg:col-span-4">
              <div className="rounded-[28px] border border-black/10 bg-white p-5 md:p-6">
                <h3 className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-4">
                  Select Category
                </h3>

                <div className="flex flex-col gap-2">
                  {faqs.map((f) => (
                    <button
                      key={f.category}
                      onClick={() => {
                        setActiveCategory(f.category);
                        setActiveIdx(null);
                      }}
                      className={cn(
                        'w-full text-left px-4 md:px-5 py-4 rounded-[18px] border flex items-center gap-4 transition-none',
                        activeCategory === f.category
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black/10'
                      )}
                    >
                      <div className="shrink-0">
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

            {/* RIGHT: QUESTIONS */}
            <main className="lg:col-span-8">
              <div className="rounded-[30px] border border-black/10 bg-white p-5 md:p-6 lg:p-8">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    {activeCategory}
                  </h2>
                  <p className="text-sm md:text-base text-black/60 mt-2">
                    Browse answers related to this topic.
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className="rounded-[22px] border border-black/10 bg-white overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                      >
                        <span className="text-sm md:text-base font-semibold text-black pr-6 leading-relaxed">
                          {faq.q}
                        </span>

                        <ChevronDown
                          size={18}
                          className={cn(
                            'shrink-0 transition-transform duration-300 text-black/50',
                            activeIdx === i ? 'rotate-180' : ''
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {activeIdx === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="px-5 md:px-6 pb-5 md:pb-6">
                              <div className="h-px w-full bg-black/10 mb-4" />
                              <p className="text-sm md:text-[15px] text-black/60 leading-relaxed">
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
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="rounded-[30px] border border-black/10 bg-white p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
                Need More Help
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-5">
                Still Have Questions?
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-black/60 leading-relaxed mb-8 md:mb-10">
                Our support team is here to help you with product questions, order concerns, or anything else you need.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold"
                >
                  Contact Us
                </Link>
                <Link
                  to="/shop"
                  className="px-8 py-3 rounded-[16px] border border-black/10 bg-white text-black text-sm font-semibold"
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