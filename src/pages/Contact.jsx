import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
    <div className="min-h-screen bg-[#f6f8fb] font-['Poppins'] text-black">
      <SEO
        title="Contact Us | Printistan"
        description="Get in touch with Printistan for help with your printer or orders."
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white border-b border-black/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 left-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-60" />
          <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-blue-50 blur-3xl opacity-80" />
        </div>

        <div className="relative max-w-[1700px] mx-auto px-4 md:px-8 lg:px-14 pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                Contact Printistan
              </p>

              <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight  max-w-3xl">
                <span className="text-black">Let’s Start</span>{' '}
                <span className="text-blue-600">Talking</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm md:text-base lg:text-lg leading-relaxed text-black/60">
                Have a question about printers, accessories, orders, or support?
                Send us a message and our team will connect with you with the right help.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-700 p-7 md:p-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)]">
                <p className="text-xs uppercase tracking-[0.24em] text-white/75 font-semibold">
                  Quick Support
                </p>
                <h3 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">
                  We’re here to help with your printer needs
                </h3>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-white/85">
                  Reach out for product guidance, order help, or any general inquiry.
                  We aim to respond as quickly as possible.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-[14px] bg-white/10 flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/70 font-semibold">
                        Email
                      </p>
                      <p className="mt-1 text-sm md:text-base font-semibold break-all">
                        info@printistan.shop
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-[14px] bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/70 font-semibold">
                        Location
                      </p>
                      <p className="mt-1 text-sm md:text-base font-semibold">
                        3001 27th St N, Birmingham, AL 35207, USA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-[14px] bg-white/10 flex items-center justify-center shrink-0">
                      <Clock3 size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/70 font-semibold">
                        Availability
                      </p>
                      <p className="mt-1 text-sm md:text-base font-semibold">
                        Fast replies for support and inquiries
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1920px] ml-100 mx-auto px-4 md:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           

            <div className="lg:col-span-8">
              <div className="rounded-[30px] border border-black/10 bg-white p-6 md:p-8 lg:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.045)]">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <div className="text-center py-10 md:py-14">
                      <div className="h-20 w-20 rounded-[24px] bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} className="text-blue-600" />
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        <span className="text-black">Message</span>{' '}
                        <span className="text-blue-600">Sent</span>
                      </h2>

                      <p className="max-w-md mx-auto text-sm md:text-base text-black/60 leading-relaxed mb-8">
                        Thank you for reaching out. We have received your message and will
                        respond to you soon.
                      </p>

                      <button
                        onClick={() => setStatus(null)}
                        className="inline-flex items-center justify-center px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(37,99,235,0.20)]"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
                            Your Name
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full h-13 rounded-[16px] border border-black/10 bg-[#fbfcff] px-4 text-sm text-black outline-none transition-all duration-300 hover:border-blue-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)]"
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
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full h-13 rounded-[16px] border border-black/10 bg-[#fbfcff] px-4 text-sm text-black outline-none transition-all duration-300 hover:border-blue-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full h-13 rounded-[16px] border border-black/10 bg-[#fbfcff] px-4 text-sm text-black outline-none transition-all duration-300 hover:border-blue-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)]"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black">
                            Subject
                          </label>
                          <div className="relative">
                            <select
                              value={formData.subject}
                              onChange={(e) =>
                                setFormData({ ...formData, subject: e.target.value })
                              }
                              className="w-full h-13 rounded-[16px] border border-black/10 bg-[#fbfcff] px-4 pr-10 text-sm text-black outline-none appearance-none transition-all duration-300 hover:border-blue-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)]"
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
                          rows="7"
                          placeholder="How can we help you today?"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full rounded-[20px] border border-black/10 bg-[#fbfcff] p-4 text-sm text-black outline-none resize-none transition-all duration-300 hover:border-blue-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)]"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          disabled={loading}
                          className="inline-flex w-full md:w-auto items-center justify-center gap-3 rounded-[16px] bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(37,99,235,0.18)] disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                          {loading ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            'Send Message'
                          )}
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