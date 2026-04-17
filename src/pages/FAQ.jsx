import React, { useState } from 'react';
import SEO from '@/components/SEO';
import {
  ShieldCheck,
  Truck,
  Info,
  RotateCcw,
  Plus,
  Minus,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: 'Orders & Purchasing',
    icon: <ShieldCheck size={18} />,
    questions: [
      {
        q: 'How do I place an order for a printer?',
        a: 'To place an order, select your preferred printer, add it to your cart, and complete checkout with your shipping and payment details.',
      },
      {
        q: 'Is an account required to shop?',
        a: 'No, you can place an order as a guest. Creating an account simply makes it easier to manage future orders and preferences.',
      },
      {
        q: 'How can I check my order status?',
        a: 'After placing your order, you will receive confirmation details. You can also use the order tracking option available on the website.',
      },
      {
        q: 'What payment methods are supported?',
        a: 'We accept major payment methods through secure checkout so your transactions remain protected and dependable.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    icon: <Truck size={18} />,
    questions: [
      {
        q: 'Where do you ship to?',
        a: 'We currently offer shipping across the United States for both residential and business locations.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery usually takes around 3 to 7 business days depending on your location and order details.',
      },
      {
        q: 'How can I track my shipment?',
        a: 'Once your order is dispatched, tracking details are shared so you can follow the shipment status.',
      },
    ],
  },
  {
    category: 'Printer Information',
    icon: <Info size={18} />,
    questions: [
      {
        q: 'Are all printers original and new?',
        a: 'Yes, we provide brand-new printers in original packaging so customers receive products in proper condition.',
      },
      {
        q: 'Is there a warranty provided?',
        a: 'Most printers include manufacturer warranty coverage. Warranty details may vary depending on the specific product model.',
      },
      {
        q: 'Are original ink and toner available?',
        a: 'Yes, we also offer printing supplies for many of the models available in our catalog.',
      },
    ],
  },
  {
    category: 'Returns & Support',
    icon: <RotateCcw size={18} />,
    questions: [
      {
        q: 'What is your return policy?',
        a: 'Unused products in original condition may be returned within the allowed return window, subject to our return policy terms.',
      },
      {
        q: 'What if the machine arrives with issues?',
        a: 'If your order arrives damaged or has a problem, please contact support as soon as possible so we can guide you through the next steps.',
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
    <div className="pt-20 bg-[#fbf8f5] font-['Poppins'] text-[#111111]">
      <SEO
        title="FAQ | Support & Guidance"
        description="Find answers to common questions about orders, shipping, and printer information."
      />

      {/* Hero */}
      <section className="bg-[#f4eeea] border-b border-[#e8dfd6]">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-14 md:py-18 lg:py-20 text-center">
          <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-4">
            Knowledge Base
          </span>

          <h1 className="text-[34px] md:text-[48px] lg:text-[58px] font-semibold text-[#241812] leading-[1.02]">
            Frequently Asked
            <br className="hidden md:block" />
            Questions
          </h1>

          <p className="max-w-[760px] mx-auto mt-4 text-[#6b5d54] text-[14px] md:text-[16px] leading-8">
            Find simple answers about ordering, shipping, printer details, and support
            so you can shop with more confidence.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-12 md:py-14 lg:py-16">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-8 lg:gap-10">
            {/* Left Categories */}
            <aside>
              <div className="rounded-[28px] border border-[#e8dfd6] bg-white p-5 md:p-6">
                <div className="mb-5">
                  <span className="inline-block text-[11px] uppercase tracking-[3px] text-[#8b7768] mb-2">
                    Topics
                  </span>
                  <h3 className="text-[24px] md:text-[28px] font-semibold text-[#241812] leading-tight">
                    Browse by Category
                  </h3>
                </div>

                <div className="space-y-3">
                  {faqs.map((f) => (
                    <button
                      key={f.category}
                      onClick={() => {
                        setActiveCategory(f.category);
                        setActiveIdx(null);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between gap-4 rounded-[20px] px-4 py-4 text-left border transition-all duration-300',
                        activeCategory === f.category
                          ? 'bg-[#7a4320] border-[#7a4320] text-white'
                          : 'bg-[#fcfaf7] border-[#ece2d9] text-[#5b4a40] hover:bg-white'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center',
                            activeCategory === f.category
                              ? 'bg-white/10 text-white'
                              : 'bg-[#f6ede6] text-[#7a4320]'
                          )}
                        >
                          {f.icon}
                        </div>
                        <span className="text-[14px] font-medium">{f.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right FAQ */}
            <main className="rounded-[30px] border border-[#e8dfd6] bg-white p-6 md:p-8 lg:p-10">
              <div className="mb-8 md:mb-10 text-center lg:text-left">
                <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-3">
                  Showing Questions For
                </span>
                <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-semibold text-[#241812] leading-tight">
                  {activeCategory}
                </h2>
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-[22px] border border-[#ebe1d8] bg-[#fcfaf7] overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between gap-6 px-5 md:px-6 py-5 text-left"
                    >
                      <span className="text-[15px] md:text-[18px] font-medium text-[#241812] leading-7 pr-6">
                        {faq.q}
                      </span>

                      <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-[#eadfd6] flex items-center justify-center text-[#7a4320]">
                        {activeIdx === i ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {activeIdx === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 pb-6">
                            <p className="text-[14px] md:text-[15px] text-[#6b5d54] leading-7 max-w-4xl">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-14 md:pb-16 lg:pb-20 px-4">
        <div className="max-w-[1700px] mx-auto">
          <div className="rounded-[32px] border border-[#e8dfd6] bg-[#2d1a11] px-6 md:px-10 lg:px-14 py-10 md:py-12 text-center">
            <h2 className="text-[30px] md:text-[40px] font-semibold text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-white/70 max-w-[720px] mx-auto mb-8 text-[14px] md:text-[15px] leading-7">
              Our team is ready to assist with printer questions, order help, and product guidance.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center h-[48px] px-7 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition"
              >
                Contact Support
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center h-[48px] px-7 rounded-xl border border-white/20 text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-white hover:text-[#241812] transition"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}