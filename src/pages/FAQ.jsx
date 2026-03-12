import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on MaxPrinter?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },     
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations arenâ€™t possible." },   
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on MaxPrinter secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }      
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3â€“7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. Youâ€™ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & Availability",
    questions: [
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We specialize in a wide range of premium printing solutions, including printers and accessories from various trusted brands." },
      { q: "How can I choose the right printer?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and weâ€™ll notify you as soon as it becomes available." },
      { q: "Can I compare products before buying?", a: "Yes. Use our Compare feature to check specs, features, and pricing side by side." }
    ]
  },
  {
    category: "Warranty & Support",
    questions: [
      { q: "Do your products come with a manufacturer's warranty?", a: "Yes. Every product includes full brand-backed warranty with repair/replacement coverage." },
      { q: "How do I claim warranty for HP products?", a: "You can contact HP Support directly or reach out to us for guidance and warranty assistance." },
      { q: "What if my printer arrives damaged?", a: "Contact us within 48 hours with photos/videos. Weâ€™ll arrange a replacement or initiate a claim." },
      { q: "Do you provide technical support?", a: "Yes. We offer setup help, troubleshooting, installation support, and product-related guidance." },
      { q: "How do I contact customer support?", a: "You can reach us via email, chat, or our contact form. Support is available 7 days a week." }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "What is your return policy?", a: "We accept returns for eligible products within 7â€“14 days of delivery, depending on the item category." },
      { q: "How do I request a return or replacement?", a: "Submit a request through your My Orders section or contact our support team." },
      { q: "How long does a refund take?", a: "Refunds are processed within 5â€“7 business days after inspection." },
      { q: "What products are eligible for return?", a: "Products must be unused, in original condition, and returned with complete accessories and packaging." },
      { q: "What if my item is defective or missing parts?", a: "Report the issue within 48 hours, and we will arrange a replacement or resolve the issue immediately." }
    ]
  },
  {
    category: "Account & Profile",
    questions: [
      { q: "How do I create an account?", a: "Click Sign Up, enter your details, and verify your email." },
      { q: "I forgot my password â€” what should I do?", a: "Use the Forgot Password option to reset it instantly via email." },
      { q: "How can I update my profile details?", a: "Go to My Account â†’ Profile Info to edit your name, address, phone number, etc." },
      { q: "Can I view my past orders?", a: "Yes. All previous orders are listed in your Order History." }
    ]
  },
  {
    category: "Printer & Ink",
    questions: [
      { q: "How do I choose the right printer?", a: "Consider your usage â€” home, office, photos, or bulk printing â€” and our team can recommend the best match." },
      { q: "Do you sell original HP ink and toner?", a: "Yes. We sell 100% original HP ink and toner, plus compatible options for other brands." },
      { q: "Why is my printer showing â€œOfflineâ€?", a: "This usually indicates a driver issue or Wi-Fi interruption. Our support team can fix this quickly." },
      { q: "How do I improve print quality?", a: "Try cleaning printheads, using genuine supplies, adjusting paper settings, or contacting support." }
    ]
  },
  {
    category: "Payment & Security",
    questions: [
      { q: "Is my payment information secure?", a: "Yes. All payments are encrypted and processed through secure, trusted gateways." },
      { q: "Why was my payment declined?", a: "This could be due to bank restrictions, incorrect details, or insufficient balance. Try again or check with your bank." },
      { q: "Do you store my billing information?", a: "No. Sensitive information is never stored â€” itâ€™s processed securely by our payment partners." },
      { q: "Can I get a tax/GST invoice?", a: "Yes. You can download your invoice directly from the My Orders section." }
    ]
  },
  {
    category: "Business Orders",
    questions: [
      { q: "Do you offer corporate or bulk discounts?", a: "Yes. Contact us for custom pricing on large orders." },
      { q: "Can businesses request custom quotes?", a: "Absolutely. Our team provides quotes for offices, institutions, and resellers." },
      { q: "Do you offer managed printing or device solutions?", a: "Yes. We support businesses with printer fleet management and bulk supply programs." }
    ]
  },
  {
    category: "General Info",
    questions: [
      { q: "Are all products brand new and sealed?", a: "Yes. Every product is brand new, sealed, and delivered with full warranty." },
      { q: "Do you offer customer support on weekends?", a: "Yes. Our support team is available 7 days a week." },
      { q: "How can I contact MaxPrinter?", a: "You can reach us through email, live chat, or the contact form on our website." },
      { q: "Do you offer discount codes or promotions?", a: "Yes. Keep an eye on our homepage banners and newsletter for active offers." }
    ]
  }
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const filteredFaqs = faqs.find(f => f.category === activeCategory)?.questions || [];

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      <SEO 
        title="FAQ | MaxPrinter" 
        description="Find answers to common questions about ordering, shipping, and returns at MaxPrinter."
      />

      {/* --- PAGE HEADER --- */}
      <div className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col space-y-2 mb-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 ">
              Help Center
            </h1>
            <p className="text-slate-400 text-sm font-bold tracking-wide max-w-2xl mx-auto lg:mx-0">
              Everything you need to know about our hardware, deployment, and how we help you scale your office infrastructure.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* --- CATEGORY NAVIGATION --- */}
          <div className="lg:col-span-4 flex lg:flex-col gap-1 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
            {faqs.map((f) => (
              <button
                key={f.category}
                onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                className={cn(
                  "px-6 py-4 text-[13px] font-bold transition-all rounded-xl whitespace-nowrap text-left flex items-center justify-between group border border-transparent",
                  activeCategory === f.category 
                    ? "bg-blue-50 text-blue-600 border-blue-100 shadow-sm" 
                    : "text-slate-400 hover:text-slate-900 hover:bg-gray-50"
                )}
              >
                {f.category}
                <ArrowRight size={14} className={cn("transition-transform duration-300", activeCategory === f.category ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")} />
              </button>
            ))}
          </div>

          {/* --- ACCORDION PANEL --- */}
          <div className="lg:col-span-8 space-y-3">
            {filteredFaqs.map((faq, i) => (
              <div 
                key={i}
                className={cn(
                  "border rounded-xl transition-all duration-500 overflow-hidden",
                  activeIdx === i ? "border-blue-600/30 bg-white" : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                )}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <span className={cn(
                    "text-lg font-black transition-colors leading-tight",
                    activeIdx === i ? "text-blue-600" : "text-slate-900"
                  )}>
                    {faq.q}
                  </span>
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-500 shrink-0 ml-6",
                    activeIdx === i ? "bg-blue-600 text-white rotate-180" : "bg-white text-slate-400 border border-gray-100 group-hover:border-blue-600/20 group-hover:text-blue-600"
                  )}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {activeIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8">
                        <div className="h-px w-full bg-gray-100 mb-6" />
                        <p className="text-slate-500 text-sm md:text-base font-bold leading-relaxed max-w-3xl">
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
      </div>

      {/* --- CONTACT CTA: ARCHITECTURAL --- */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-[1920px] mx-auto">
          <div className="relative bg-gray-50 border border-gray-100 rounded-2xl p-12 lg:p-20 overflow-hidden flex flex-col items-center text-center group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/10 transition-all duration-700" />
            
            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="h-14 w-14 bg-white rounded-xl border border-gray-100 flex items-center justify-center mx-auto text-blue-600 shadow-sm">
                <MessageCircle size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Still have a question?
              </h2>
              <p className="text-slate-500 text-base font-bold tracking-wide">
                Our support team is available 7 days a week to provide expert guidance and order assistance.
              </p>
              <div className="pt-4">
                <Link to="/contact" className="inline-flex items-center gap-4 bg-black text-white h-14 px-12 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-black/5">
                  Contact us
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
