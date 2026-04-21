import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  Mail,
  CheckCircle2,
  Loader2,
  Send,
  Link,
  MapPin,
  ChevronDown,
  Phone,
  Clock3,
  ArrowRight,
  Headphones,
  MessagesSquare,
} from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white font-['Poppins'] text-[#001e3c]">
      <SEO
        title="Contact Us | Printer Lio Support"
        description="Connect with our professional support team for printer inquiries and order assistance."
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
              <span className="text-[#001e3c] text-[12px] font-bold uppercase tracking-[0.2em]">Support Hub</span>
              <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            </div>
            <h1 className="text-[40px] md:text-[40px] font-semibold text-[#001e3c] leading-tight mb-8  tracking-tight">
              We're Here for <span className="text-[#fbb124]">Your Solutions.</span>
            </h1>
            <p className="text-gray-500 text-[18px] md:text-[20px] leading-relaxed max-w-[750px] mx-auto">
              Whether you have technical questions or need order assistance, 
              our dedicated team is standing by to provide expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Content: Info Cards & Form */}
      <section className="py-24 px-4 md:px-10">
        <div className="max-w-[1820px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Quick Info */}
            <div className="lg:col-span-4 space-y-12">
              <div className="text-center lg:text-left">
                <h2 className="text-[32px] md:text-[42px] font-semibold text-[#001e3c] mb-6">Get in <span className="text-[#fbb124]">Touch</span></h2>
                <p className="text-gray-500 text-[16px] leading-relaxed">
                  We prioritize excellence in communication. Connect with us through 
                  our professional channels for rapid response times.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  { icon: Mail, label: 'Email Support', val: 'info@printerlio.shop', link: 'mailto:info@printerlio.shop' },
                  { icon: MapPin, label: 'Headquarters', val: '4352 13th Ave S, Fargo, ND 58103, USA' },
                  { icon: Clock3, label: 'Operational Hours', val: '24/7 Digital Assistance' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-slate-50 border border-gray-100 group hover:bg-[#001e3c] transition-all duration-500">
                    <div className="w-16 h-16 rounded-full bg-white text-[#001e3c] flex items-center justify-center shrink-0 shadow-lg group-hover:bg-[#fbb124] transition-all">
                      <item.icon size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1 group-hover:text-white/50 transition-colors">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} className="text-[18px] font-semibold text-[#001e3c] group-hover:text-white transition-colors">{item.val}</a>
                      ) : (
                        <p className="text-[18px] font-semibold text-[#001e3c] group-hover:text-white transition-colors leading-snug">{item.val}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[3.5rem] p-8 md:p-12 lg:p-16 border border-gray-100 shadow-[0_30px_100px_rgba(0,0,0,0.05)]">
                <div className="mb-14 text-center">
                  <h3 className="text-[28px] md:text-[40px] font-semibold text-[#001e3c] mb-4">Send a <span className="text-[#fbb124]">Message</span></h3>
                  <p className="text-gray-500 max-w-[500px] mx-auto">Fill out the secure form below and our specialists will reach out to you shortly.</p>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16 px-8"
                    >
                      <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <CheckCircle2 size={48} />
                      </div>
                      <h4 className="text-[36px] font-semibold mb-4">Inquiry Received</h4>
                      <p className="text-gray-500 max-w-md mx-auto mb-12 text-[17px] leading-relaxed font-medium">
                        Your message has been logged into our support queue. We will provide a response within 24 business hours.
                      </p>
                      <button
                        onClick={() => setStatus(null)}
                        className="h-14 px-10 bg-[#001e3c] text-white font-bold rounded-2xl hover:bg-[#fbb124] hover:text-[#001e3c] transition-all uppercase tracking-widest text-[12px] shadow-xl"
                      >
                        Send Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[12px] font-bold uppercase tracking-widest text-[#001e3c]/30 pl-4">Your Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-14 rounded-2xl bg-slate-50 border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:bg-white focus:border-[#fbb124] outline-none transition-all shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[12px] font-bold uppercase tracking-widest text-[#001e3c]/30 pl-4">Email Address</label>
                          <input
                            required
                            type="email"
                            placeholder="name@business.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-14 rounded-2xl bg-slate-50 border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:bg-white focus:border-[#fbb124] outline-none transition-all shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[12px] font-bold uppercase tracking-widest text-[#001e3c]/30 pl-4">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-14 rounded-2xl bg-slate-50 border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:bg-white focus:border-[#fbb124] outline-none transition-all shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[12px] font-bold uppercase tracking-widest text-[#001e3c]/30 pl-4">Inquiry Subject</label>
                          <div className="relative">
                            <select
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="w-full h-14 rounded-2xl bg-slate-50 border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:bg-white focus:border-[#fbb124] outline-none transition-all appearance-none cursor-pointer shadow-sm"
                            >
                              <option>General Inquiry</option>
                              <option>Product Specifications</option>
                              <option>Order Status</option>
                              <option>Technical Support</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#001e3c]/30 pointer-events-none" size={18} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[12px] font-bold uppercase tracking-widest text-[#001e3c]/30 pl-4">Detailed Message</label>
                        <textarea
                          required
                          rows="6"
                          placeholder="How can our specialists assist you today?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-[2rem] bg-slate-50 border border-gray-100 p-8 text-[15px] font-semibold text-[#001e3c] focus:bg-white focus:border-[#fbb124] outline-none transition-all resize-none shadow-sm"
                        />
                      </div>

                      <div className="pt-6 text-center">
                        <button
                          disabled={loading}
                          className="w-full md:w-auto h-16 px-14 bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-4 hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-2xl active:scale-95 disabled:opacity-70 mx-auto"
                        >
                          {loading ? (
                            <>
                              <Loader2 size={20} className="animate-spin" /> Processing...
                            </>
                          ) : (
                            <>
                              Send Inquiry <ArrowRight size={20} />
                            </>
                          )}
                        </button>

                        {status === 'error' && (
                          <p className="text-red-500 text-[13px] font-bold mt-6 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            Connection error. Please attempt again.
                          </p>
                        )}
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
