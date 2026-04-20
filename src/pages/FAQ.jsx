import React, { useState } from 'react';
import SEO from '@/components/SEO';
import {
  ShieldCheck,
  Truck,
  Info,
  RotateCcw,
  Plus,
  Minus,
  Search,
  ArrowRight,
  HelpCircle,
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
    icon: <Truck size={20} />,
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
    icon: <Info size={20} />,
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
    icon: <RotateCcw size={20} />,
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
    <div className="bg-white font-['Poppins'] text-slate-900">
      <SEO
        title="FAQ | Support & Guidance"
        description="Find answers to common questions about orders, shipping, and printer information."
      />

      {/* Hero Section */}
      <section className="relative pt-15 pb-16 md:pt-20 md:pb-24 bg-gray-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -ml-20 -mb-20" />
        
        <div className="max-w-[1820px] mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-800 text-[12px]  uppercase tracking-[0.2em] rounded-full mb-6">
              Knowledge Base
            </span>
            <h1 className="text-[40px] md:text-[60px]  text-slate-900 leading-tight mb-8">
              Common <span className="text-blue-800">Questions.</span>
            </h1>
            <p className="text-gray-500 text-[16px] md:text-[18px] leading-relaxed max-w-[700px] mx-auto">
              Find instant answers about orders, shipping, and printer setups. 
              We've organized everything to make your experience smoother.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1820px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sidebar: Categories */}
            <aside className="lg:col-span-4 space-y-10">
              <div>
                <h2 className="text-[28px]  text-slate-900 mb-6 flex items-center gap-3">
                  <HelpCircle className="text-blue-800" size={28} />
                  Categories
                </h2>
                <div className="flex flex-col gap-2">
                  {faqs.map((f) => (
                    <button
                      key={f.category}
                      onClick={() => {
                        setActiveCategory(f.category);
                        setActiveIdx(null);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left border transition-all duration-300',
                        activeCategory === f.category
                          ? 'bg-blue-800 border-blue-800 text-white shadow-xl shadow-blue-100'
                          : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-slate-900'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center',
                          activeCategory === f.category ? 'bg-white/20' : 'bg-gray-50 text-blue-800'
                        )}>
                          {f.icon}
                        </div>
                        <span className="text-[15px] font-bold">{f.category}</span>
                      </div>
                      {activeCategory === f.category && <ArrowRight size={18} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Still Have Questions Box */}
              <div className="bg-slate-900 rounded-[2.5rem] p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
                <h3 className="text-white text-[24px]  mb-4 relative z-10">Still Unsure?</h3>
                <p className="text-white/60 text-[14px] leading-relaxed mb-8 relative z-10">
                  If you couldn't find your answer here, our team is happy to help you personally.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-white  text-[12px] uppercase tracking-wider relative z-10 hover:gap-3 transition-all">
                  Contact Support <ArrowRight size={16} />
                </Link>
              </div>
            </aside>

            {/* Main: Accordion Area */}
            <main className="lg:col-span-8">
              <div className="mb-12">
                <h3 className="text-[12px]  uppercase tracking-[0.3em] text-blue-800 mb-4">Questions For</h3>
                <h2 className="text-[32px] md:text-[42px] text-slate-900 leading-tight">
                  {activeCategory}
                </h2>
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-3xl border transition-all duration-300",
                      activeIdx === i ? "border-blue-800 bg-blue-50/30 shadow-sm" : "border-gray-100 bg-white"
                    )}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between gap-6 px-8 py-7 text-left"
                    >
                      <span className={cn(
                        "text-[16px] md:text-[19px] font-bold leading-tight pr-6",
                        activeIdx === i ? "text-blue-800" : "text-slate-900"
                      )}>
                        {faq.q}
                      </span>

                      <div className={cn(
                        "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        activeIdx === i ? "bg-blue-800 text-white rotate-180" : "bg-gray-50 text-gray-400"
                      )}>
                        {activeIdx === i ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {activeIdx === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8">
                            <div className="h-px w-12 bg-blue-200 mb-6" />
                            <p className="text-[15px] md:text-[16px] text-gray-500 leading-relaxed max-w-3xl">
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

      {/* CTA Bottom Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-[1820px] mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 text-center border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
            <h2 className="text-[32px] md:text-[48px]  text-slate-900 mb-8 relative z-10">
              Need More Assistance?
            </h2>
            <p className="text-gray-500 text-[16px] md:text-[18px] max-w-[600px] mx-auto mb-12 relative z-10">
              Our professional support team is available round the clock to help you with 
              your printer setups and order inquiries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Link
                to="/contact"
                className="w-full sm:w-auto h-16 px-12 bg-blue-800 text-white  text-[14px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
              >
                Message Support <ArrowRight size={20} />
              </Link>
              <Link
                to="/shop"
                className="text-slate-900  text-[14px] uppercase tracking-widest hover:text-blue-800 transition-colors"
              >
                Go Back to Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
