import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ArrowRight, MessageSquare, ShieldCheck, Truck, RotateCcw, Info, LayoutGrid, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Purchasing",
    icon: <ShieldCheck size={20} />,
    questions: [
      { q: "How do I place an order for a printer?", a: "To place an order, select your desired model from our inventory and add it to your cart. Follow the secure checkout process to provide your shipping and payment information." },     
      { q: "Is an account required to shop?", a: "No, we offer a guest checkout option. However, creating an account allows you to track your order history and manage your preferences more efficiently." },
      { q: "How can I check my order status?", a: "Upon completing your purchase, an order confirmation will be sent immediately. You can also use the 'Track Order' feature available in the main navigation." },
      { q: "What payment methods are supported?", a: "We accept all major credit cards and PayPal. All transactions are processed through encrypted, secure gateways." }
    ]
  },
  {
    category: "Shipping & Delivery",
    icon: <Truck size={20} />,
    questions: [
      { q: "Where do you ship to?", a: "We provide nationwide shipping across the United States, serving both residential and business locations." },
      { q: "How long does delivery take?", a: "Standard delivery typically takes between 3 to 7 business days. You will receive a precise tracking reference once your unit is dispatched." },
      { q: "How can I track my shipment?", a: "A tracking number will be provided via email as soon as your order leaves our facility. You can monitor the real-time progress through our logistics partner's portal." }
    ]
  },
  {
    category: "Printer Information",
    icon: <Info size={20} />,
    questions: [
      { q: "Are all printers original and new?", a: "Yes, we exclusively provide brand-new, authentic printers in original manufacturer packaging with all factory seals intact." },
      { q: "Is there a warranty provided?", a: "All printers include a full manufacturer's warranty, ensuring you have access to official support and repairs if required." },
      { q: "Are original ink and toner available?", a: "We maintain a comprehensive inventory of original ink and toner cartridges for all models we carry to ensure optimal performance." }
    ]
  },
  {
    category: "Returns & Support",
    icon: <RotateCcw size={20} />,
    questions: [
      { q: "What is your return policy?", a: "Unused products in their original, unopened packaging may be returned within 14 days of delivery for a full refund." },
      { q: "What if the machine arrives with issues?", a: "In the unlikely event of shipping damage or mechanical issues, please report it immediately. We will arrange for a replacement." }
    ]
  },
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const currentCategoryData = faqs.find(f => f.category === activeCategory);
  const filteredFaqs = currentCategoryData?.questions || [];

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900">
      <SEO 
        title="FAQ | Printer Loop" 
        description="Find answers to common questions about our printers and delivery."
      />

      {/* --- PROFESSIONAL CENTERED HEADER --- */}
      <section className="pt-32 md:pt-25 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-blue-600" />
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Support Center</span>
            <div className="h-px w-8 bg-blue-600" />
          </motion.div>
          
          <div className="flex flex-col items-center gap-4">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-slate-900  leading-none mb-4"
            >
              Frequently Asked <span className="text-blue-600 ">Questions</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-base md:text-lg font-bold leading-relaxed max-w-2xl mx-auto"
            >
              Quick resolutions to common inquiries regarding our industrial-grade printer models and specialized logistics.
            </motion.p>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-1.5 bg-blue-600 rounded-full mt-6"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-slate-50/30">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* LEFT: CATEGORY NAV */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="flex flex-col gap-2">
                <h4 className="text-[11px] font-black uppercase tracking-[3px] text-slate-400 mb-4 px-4">Support Domains</h4>
                {faqs.map((f) => (
                  <button
                    key={f.category}
                    onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                    className={cn(
                      "w-full text-left px-8 py-5 rounded-[2rem] text-[13px] font-black transition-all flex items-center gap-5 group border transition-all duration-500",
                      activeCategory === f.category 
                        ? "bg-slate-900 text-white border-slate-900 shadow-2xl" 
                        : "bg-white border-slate-100 text-slate-500 hover:border-blue-200 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-600/5"
                    )}
                  >
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500",
                      activeCategory === f.category ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                    )}>
                      {f.icon}
                    </div>
                    <span className="uppercase  leading-none">{f.category}</span>
                  </button>
                ))}
              </div>

              
            </aside>

            {/* RIGHT: ACCORDION PANEL */}
            <main className="lg:col-span-8">
              <div className="mb-12 flex items-center gap-4">
                <div className="h-12 w-12 rounded-[1.25rem] bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                  {currentCategoryData?.icon}
                </div>
                <div className="h-px flex-1 bg-slate-200" />
                <h2 className="text-2xl font-black text-slate-900 uppercase  ml-4">{activeCategory}</h2>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {filteredFaqs.map((faq, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "bg-white rounded-[2rem] transition-all duration-700 overflow-hidden border transition-all",
                        activeIdx === i ? "border-blue-600 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]" : "border-slate-100 hover:border-slate-300"
                      )}
                    >
                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between p-8 md:p-10 text-left group"
                      >
                        <span className={cn(
                          "text-[16px] md:text-[18px] font-black uppercase  transition-colors leading-tight pr-10",
                          activeIdx === i ? "text-blue-600" : "text-slate-800 group-hover:text-blue-600"
                        )}>
                          {faq.q}
                        </span>
                        <div className={cn(
                          "h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 shrink-0",
                          activeIdx === i ? "bg-blue-600 text-white border-blue-600 rotate-180 shadow-lg shadow-blue-500/20" : "bg-white border-slate-100 text-slate-300 group-hover:border-blue-600 group-hover:text-blue-600"
                        )}>
                          <ChevronDown size={22} strokeWidth={3} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {activeIdx === i && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                          >
                            <div className="px-8 md:px-10 pb-10 pt-0">
                              <div className="h-[2px] w-full bg-slate-50 mb-8 rounded-full" />
                              <p className="text-slate-500 text-[15px] md:text-[16px] font-medium leading-relaxed max-w-3xl">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </main>

          </div>
        </div>
      </section>

      {/* --- PREMIUM CTA --- */}
      <section className="py-32 text-center bg-white border-t border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-50/20 -z-10" />
        <div className="w-full px-4 max-w-4xl mx-auto space-y-10 relative z-10">
          <div className="flex flex-col items-center gap-4">
             <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
             <h2 className="text-4xl md:text-4xl font-black text-slate-900  uppercase leading-none">Unresolved Inquiry?</h2>
          </div>
          <p className="text-slate-500 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">Our support specialized departments are ready to provide any assistance you require.</p>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <Link 
              to="/contact" 
              className="bg-slate-900 text-white h-16 px-14 rounded-2xl flex items-center justify-center font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-2xl active:scale-95 group"
            >
              Contact Support
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/shop" 
              className="bg-white border-2 border-slate-900 text-slate-900 h-16 px-14 rounded-2xl flex items-center justify-center font-black text-[11px] uppercase tracking-[3px] hover:bg-slate-900 hover:text-white transition-all active:scale-95"
            >
              Browse Inventory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
