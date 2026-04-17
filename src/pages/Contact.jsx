import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  Mail,
  CheckCircle2,
  Loader2,
  Send,
  MapPin,
  ChevronDown,
  Phone,
  Clock3,
  ArrowRight,
  Headphones,
} from 'lucide-react';
import API_BASE_URL from '../config';

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
    <div className="pt-20 bg-[#fbf8f5] font-['Poppins'] text-[#111111]">
      <SEO
        title="Contact Us | MyPrinterHero Support"
        description="Connect with our professional support team for printer inquiries and order assistance."
      />

      {/* Hero */}
      <section className="bg-[#f4eeea] border-b border-[#e8dfd6]">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-14 md:py-18 lg:py-20 text-center">
          <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-4">
            Support Center
          </span>

          <h1 className="text-[34px] md:text-[48px] lg:text-[58px] font-semibold text-[#241812] leading-[1.02]">
            We’re Here to Help
          </h1>

          <p className="max-w-[760px] mx-auto mt-4 text-[#6b5d54] text-[14px] md:text-[16px] leading-8">
            Reach out for printer questions, order assistance, or product guidance.
            Our team is ready to help you choose the right solution for your setup.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-12 md:py-14 lg:py-16">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8 lg:gap-10">
            {/* Left Info */}
            <div className="space-y-6">
              <div className="rounded-[28px] border border-[#e8dfd6] bg-white p-6 md:p-7">
                <div className="w-14 h-14 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center mb-5">
                  <Headphones size={26} />
                </div>

                <h3 className="text-[24px] md:text-[28px] font-semibold text-[#241812] leading-tight mb-3">
                  Contact Our Support Team
                </h3>

                <p className="text-[#6b5d54] text-[14px] md:text-[15px] leading-7">
                  Whether you need help selecting a printer or checking an order,
                  we make it easy to connect with the right team.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-5">
                <div className="rounded-[24px] border border-[#e8dfd6] bg-white p-5">
                  <div className="w-11 h-11 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center mb-4">
                    <Mail size={18} />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a8c83] mb-2">
                    Email Support
                  </p>
                  <p className="text-[15px] font-semibold text-[#241812] break-all">
                    info@myprinterhero.shop
                  </p>
                </div>

                <div className="rounded-[24px] border border-[#e8dfd6] bg-white p-5">
                  <div className="w-11 h-11 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center mb-4">
                    <MapPin size={18} />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a8c83] mb-2">
                    Headquarters
                  </p>
                  <p className="text-[15px] text-[#241812] leading-6">
                    2445 4th Ave S, Seattle, WA 98134, USA
                  </p>
                </div>

                <div className="rounded-[24px] border border-[#e8dfd6] bg-white p-5">
                  <div className="w-11 h-11 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center mb-4">
                    <Clock3 size={18} />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a8c83] mb-2">
                    Availability
                  </p>
                  <p className="text-[15px] font-semibold text-[#241812]">
                    24/7 Assistance
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="rounded-[30px] border border-[#e8dfd6] bg-white p-6 md:p-8 lg:p-10">
              <div className="mb-8 md:mb-10 text-center lg:text-left">
                <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-3">
                  Send a Message
                </span>
                <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-semibold text-[#241812] leading-tight">
                  Let Us Know
                  <br className="hidden md:block" />
                  How We Can Help
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[24px] bg-[#f8f2ec] border border-[#eadfd6] text-center py-16 px-6"
                  >
                    <CheckCircle2 size={60} className="text-[#7a4320] mx-auto mb-5" />
                    <h4 className="text-[26px] font-semibold mb-3 text-[#241812]">
                      Message Sent
                    </h4>
                    <p className="text-[#6b5d54] max-w-md mx-auto mb-8 text-[14px] leading-7">
                      Thanks for reaching out. Our team will review your inquiry and get back to you shortly.
                    </p>
                    <button
                      onClick={() => setStatus(null)}
                      className="inline-flex items-center justify-center h-[46px] px-7 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition"
                    >
                      New Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-13 md:h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-4 md:px-5 text-sm focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-13 md:h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-4 md:px-5 text-sm focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-13 md:h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-4 md:px-5 text-sm focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                        Inquiry Subject
                      </label>
                      <div className="relative">
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full h-13 md:h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-4 md:px-5 pr-10 text-sm appearance-none focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                        >
                          <option>General Inquiry</option>
                          <option>Product Question</option>
                          <option>Order Support</option>
                          <option>Technical Help</option>
                        </select>
                        <ChevronDown
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9a8c83] pointer-events-none"
                          size={16}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                        Message
                      </label>
                      <textarea
                        required
                        rows="6"
                        placeholder="Tell us what you need help with..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] p-4 md:p-5 text-sm focus:border-[#7a4320] focus:bg-white outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="md:col-span-2 pt-2">
                      <button
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-3 h-[48px] px-8 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all active:scale-[0.98] disabled:opacity-50"
                      >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : 'Send Message'}
                        {!loading && <ArrowRight size={16} />}
                      </button>

                      {status === 'error' && (
                        <p className="text-red-500 text-[12px] font-medium mt-4">
                          Submission failed. Please check your details and try again.
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}