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
    <div className="bg-white font-['Poppins'] text-slate-900">
      <SEO
        title="Contact Us | US Printer Store Support"
        description="Connect with our professional support team for printer inquiries and order assistance."
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
              Support Center
            </span>
            <h1 className="text-[40px] md:text-[60px]  text-slate-900 leading-tight mb-8">
              We’re Here to <span className="text-blue-800">Help.</span>
            </h1>
            <p className="text-gray-500 text-[16px] md:text-[18px] leading-relaxed max-w-[700px] mx-auto">
              Got a question about a printer? Need help with an order? 
              Our team is ready to provide the answers you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1820px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Info Column */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h2 className="text-[32px]  text-slate-900 mb-6">Get in Touch</h2>
                <p className="text-gray-500 text-[16px] leading-relaxed">
                  We value clear communication and fast responses. Reach out through any of these 
                  channels and we'll get back to you as soon as possible.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover:bg-blue-800 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1">Email Support</p>
                    <a href="mailto:info@usprinterstore.shop" className="text-[18px]  text-slate-900 hover:text-blue-800 transition-colors">
                      info@usprinterstore.shop
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover:bg-blue-800 group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1">Our Office</p>
                    <p className="text-[18px]  text-slate-900 leading-snug">
                      4352 13th Ave S, Fargo, ND 58103, USA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover:bg-blue-800 group-hover:text-white transition-all">
                    <Clock3 size={24} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1">Availability</p>
                    <p className="text-[18px]  text-slate-900">
                      24/7 Online Assistance
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-8">
              <div className="bg-gray-50 rounded-[3rem] p-8 md:p-12 lg:p-16 border border-gray-100 shadow-sm">
                <div className="mb-12">
                  <h3 className="text-[28px] md:text-[36px] text-slate-900 mb-4">Send a Message</h3>
                  <p className="text-gray-500">Fill out the form below and our team will be in touch shortly.</p>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-[2rem] border border-gray-100 text-center py-20 px-8"
                    >
                      <div className="w-20 h-20 bg-blue-50 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h4 className="text-[32px] font-black mb-4">Message Sent!</h4>
                      <p className="text-gray-500 max-w-md mx-auto mb-10 text-[16px] leading-relaxed">
                        Thank you for reaching out. We have received your message and will respond within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus(null)}
                        className="h-14 px-10 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all active:scale-95"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                            Full Name
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-14 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                            Email Address
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-14 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                            Phone (Optional)
                          </label>
                          <input
                            type="tel"
                            placeholder="Your phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-14 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                            Subject
                          </label>
                          <div className="relative">
                            <select
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="w-full h-14 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all appearance-none cursor-pointer"
                            >
                              <option>General Inquiry</option>
                              <option>Product Question</option>
                              <option>Order Support</option>
                              <option>Technical Help</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                          Your Message
                        </label>
                        <textarea
                          required
                          rows="6"
                          placeholder="How can we help you today?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-2xl bg-white border border-gray-100 p-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all resize-none"
                        />
                      </div>

                      <div className="pt-4">
                        <button
                          disabled={loading}
                          className="w-full md:w-auto h-16 px-12 bg-blue-800 text-white font-black text-[14px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-70 active:scale-95"
                        >
                          {loading ? (
                            <>
                              <Loader2 size={20} className="animate-spin" /> Processing...
                            </>
                          ) : (
                            <>
                              Send Message <ArrowRight size={20} />
                            </>
                          )}
                        </button>

                        {status === 'error' && (
                          <p className="text-red-500 text-[13px] font-bold mt-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            Something went wrong. Please try again.
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
