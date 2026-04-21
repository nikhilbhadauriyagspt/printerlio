import React, { useState } from 'react';
import SEO from '@/components/SEO';
import {
  ShieldCheck,
  Truck,
  Info,
  RotateCcw,
  ChevronRight,
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
    <div className="bg-white font-['Poppins'] text-[#001e3c]">
      <SEO
        title="FAQ | Support & Guidance"
        description="Find answers to common questions about orders, shipping, and printer information."
      />

      {/* 1. Centered Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-20 md:pb-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full opacity-5 pointer-events-none">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#fbb124] rounded-full blur-[120px]" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#001e3c] rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-[1820px] mx-auto px-4 md:px-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-3 mb-6 bg-white px-5 py-2 rounded-full shadow-sm border border-gray-100">
              <span className="h-[2px] w-8 bg-[#001e3c]"></span>
              <span className="text-[#001e3c] text-[12px] font-bold uppercase tracking-[0.2em]">Knowledge Base</span>
              <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            </div>
            <h1 className="text-[40px] md:text-[40px] font-semibold text-[#001e3c] leading-tight mb-8  tracking-tight">
              Answers for <span className="text-[#fbb124]">Your Questions.</span>
            </h1>
            <p className="text-gray-500 text-[18px] md:text-[20px] leading-relaxed max-w-[750px] mx-auto">
              Find detailed solutions and expert insights about orders, shipping, 
              and technical printer configurations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Content: Categories & Accordion */}
      <section className="py-24 px-4 md:px-10">
        <div className="max-w-[1820px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Category Selection */}
            <aside className="lg:col-span-4 space-y-12">
              <div className="text-center lg:text-left">
                <h2 className="text-[28px] font-semibold text-[#001e3c] mb-8 border-b border-gray-100 pb-4">Categories</h2>
                <div className="flex flex-col gap-3">
                  {faqs.map((f) => (
                    <button
                      key={f.category}
                      onClick={() => {
                        setActiveCategory(f.category);
                        setActiveIdx(null);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between gap-4 rounded-[1.5rem] px-8 py-6 text-left transition-all duration-500 group',
                        activeCategory === f.category
                          ? 'bg-[#001e3c] text-white shadow-2xl'
                          : 'bg-slate-50 text-[#001e3c]/60 hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-center gap-5">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
                          activeCategory === f.category ? 'bg-white text-[#001e3c]' : 'bg-white text-[#001e3c] shadow-sm'
                        )}>
                          {f.icon}
                        </div>
                        <span className="text-[16px] font-bold uppercase tracking-wide">{f.category}</span>
                      </div>
                      <ChevronRight size={18} className={cn('transition-transform duration-500', activeCategory === f.category ? 'opacity-100' : 'opacity-0')} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Still Need Help Box */}
              <div className="bg-[#001e3c] rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbb124] rounded-full blur-[80px] opacity-20" />
                <h3 className="text-white text-[24px] font-semibold mb-3 relative z-10">Unresolved?</h3>
                <p className="text-white/50 text-[14px] leading-relaxed mb-8 relative z-10">
                  If your question remains unanswered, our dedicated support staff is ready to assist.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-3 h-12 px-8 bg-[#fbb124] text-[#001e3c] font-bold rounded-xl text-[12px] uppercase tracking-widest relative z-10 transition-all hover:bg-white active:scale-95 shadow-lg">
                  Contact Support <ArrowRight size={16} />
                </Link>
              </div>
            </aside>

            {/* Right Column: Accordion */}
            <main className="lg:col-span-8">
              <div className="mb-14 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fbb124]/10 rounded-full mb-4">
                   <HelpCircle size={14} className="text-[#fbb124]" />
                   <span className="text-[11px] font-black uppercase tracking-widest text-[#fbb124]">Viewing Section</span>
                </div>
                <h2 className="text-[32px] md:text-[42px] font-semibold text-[#001e3c] leading-tight">
                  {activeCategory}
                </h2>
              </div>

              <div className="space-y-6">
                {filteredFaqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "rounded-[2rem] border transition-all duration-500 overflow-hidden",
                      activeIdx === i ? "border-[#001e3c] bg-white shadow-[0_20px_50px_rgba(0,30,60,0.08)]" : "border-gray-100 bg-slate-50"
                    )}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between gap-6 px-10 py-8 text-left"
                    >
                      <span className={cn(
                        "text-[17px] md:text-[20px] font-semibold leading-tight pr-6",
                        activeIdx === i ? "text-[#001e3c]" : "text-[#001e3c]/80"
                      )}>
                        {faq.q}
                      </span>

                      <div className={cn(
                        "shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500",
                        activeIdx === i ? "bg-[#001e3c] text-[#fbb124] rotate-180" : "bg-white text-[#001e3c] shadow-sm"
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
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <div className="px-10 pb-10">
                            <div className="h-[2px] w-16 bg-[#fbb124] mb-8 rounded-full" />
                            <p className="text-[16px] md:text-[17px] text-gray-500 leading-relaxed max-w-3xl font-medium">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* 3. Bottom CTA: Centered & Impactful */}
      <section className="py-24 px-4 md:px-10 bg-slate-50">
        <div className="max-w-[1820px] mx-auto">
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3.5rem] p-12 md:p-24 text-center border border-gray-100 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fbb124]/10 rounded-full blur-[100px]" />
            <h2 className="text-[34px] md:text-[56px] font-semibold text-[#001e3c] mb-8 relative z-10 leading-tight">
              Need Personal <span className="text-[#fbb124]">Assistance?</span>
            </h2>
            <p className="text-gray-500 text-[18px] md:text-[20px] max-w-[700px] mx-auto mb-14 relative z-10 font-medium">
              Our professional support experts are available to guide you through 
              product choices, technical setups, and order tracking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
              <Link
                to="/contact"
                className="w-full sm:w-auto h-16 px-14 bg-[#001e3c] text-white font-bold rounded-2xl flex items-center justify-center gap-4 hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-xl uppercase tracking-widest text-[13px] active:scale-95"
              >
                Send Support Message <ArrowRight size={20} />
              </Link>
              <Link
                to="/shop"
                className="text-[#001e3c]/50 font-bold uppercase tracking-widest text-[13px] hover:text-[#001e3c] transition-colors"
              >
                Return to Shop
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
