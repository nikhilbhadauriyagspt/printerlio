import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, CheckCircle2, Loader2, Send, MapPin, ChevronDown } from 'lucide-react';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
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
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: ''
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
    <div className="bg-white min-h-screen font-['Poppins'] text-black">
      <SEO
        title="Contact Us | Printing State"
        description="Get in touch with Printing State for help with your printer or orders."
      />

      {/* HEADER */}
      <section className="pt-32 pb-16 md:pb-20 border-b border-black/10 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
              Contact Us
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
              Get In Touch
            </h1>
            <p className="mt-4 text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
              Whether you have a question about a product, order, or general support, our team is here to help you.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* LEFT INFO */}
            <div className="lg:col-span-4 space-y-5">
              <div className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                  Contact Information
                </h3>
                <p className="text-sm md:text-base text-black/60 leading-relaxed">
                  Reach out to us for product questions, order support, or any general inquiry. We aim to respond as quickly as possible.
                </p>
              </div>

              <div className="rounded-[24px] border border-black/10 bg-white p-5 md:p-6 flex items-start gap-4">
                <div className="h-12 w-12 rounded-[16px] border border-black/10 bg-white flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-black" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50 mb-2">
                    Email Us
                  </p>
                  <a
                    href="mailto:info@printingstate.shop"
                    className="text-sm md:text-base font-semibold text-black break-all"
                  >
                    info@printingstate.shop
                  </a>
                </div>
              </div>

              <div className="rounded-[24px] border border-black/10 bg-white p-5 md:p-6 flex items-start gap-4">
                <div className="h-12 w-12 rounded-[16px] border border-black/10 bg-white flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-black" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50 mb-2">
                    Our Location
                  </p>
                  <p className="text-sm md:text-base font-semibold text-black leading-relaxed">
                    Junction Plaza, Ashburn, VA 20147, USA
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8">
                <h4 className="text-lg md:text-xl font-bold text-black mb-3">
                  Quick Support
                </h4>
                <p className="text-sm md:text-base text-black/60 leading-relaxed">
                  Send us your message anytime and our team will get back to you with the right assistance as soon as possible.
                </p>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="lg:col-span-8">
              <div className="rounded-[30px] border border-black/10 bg-white p-6 md:p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <div className="text-center py-8 md:py-12">
                      <div className="h-20 w-20 rounded-[24px] border border-black/10 bg-white flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} className="text-black" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                        Message Sent
                      </h2>
                      <p className="text-black/60 max-w-md mx-auto text-sm md:text-base leading-relaxed mb-8">
                        Thank you for reaching out. We have received your message and will respond to you soon.
                      </p>
                      <button
                        onClick={() => setStatus(null)}
                        className="inline-flex items-center justify-center px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
                            Your Name
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-12 md:h-13 rounded-[16px] border border-black/10 bg-white px-4 text-sm text-black outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
                            Your Email
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-12 md:h-13 rounded-[16px] border border-black/10 bg-white px-4 text-sm text-black outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-12 md:h-13 rounded-[16px] border border-black/10 bg-white px-4 text-sm text-black outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
                            Subject
                          </label>
                          <div className="relative">
                            <select
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="w-full h-12 md:h-13 rounded-[16px] border border-black/10 bg-white px-4 pr-10 text-sm text-black outline-none appearance-none"
                            >
                              <option>General Inquiry</option>
                              <option>Product Question</option>
                              <option>Order Support</option>
                              <option>Technical Help</option>
                            </select>
                            <ChevronDown
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                              size={16}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
                          Your Message
                        </label>
                        <textarea
                          required
                          rows="6"
                          placeholder="How can we help you today?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-[20px] border border-black/10 bg-white p-4 text-sm text-black outline-none resize-none"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          disabled={loading}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-[16px] bg-black text-white text-sm font-semibold disabled:opacity-50"
                        >
                          {loading ? <Loader2 size={18} className="animate-spin" /> : 'Send Message'}
                          {!loading && <Send size={16} />}
                        </button>
                      </div>

                      {status === 'error' && (
                        <p className="text-red-600 text-sm font-medium">
                          Something went wrong. Please try again later.
                        </p>
                      )}
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