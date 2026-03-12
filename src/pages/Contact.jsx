import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, CheckCircle2, Loader2, ArrowRight, ChevronDown } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

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
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
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
    <div className="bg-white min-h-screen font-sans text-slate-900">
      <SEO 
        title="Contact Us | MaxPrinter" 
        description="Get in touch with MaxPrinter for help with your equipment or deployment. Our team is here to assist you."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col space-y-2 mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900">
              Get In Touch.
            </h1>
            <p className="text-slate-400 text-sm font-bold tracking-wide">
              Connect with our specialists for expert guidance and order assistance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* --- CONTACT INFO SIDEBAR --- */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-8 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-between h-48 group hover:border-blue-600/20 transition-all">
              <div className="h-10 w-10 bg-white rounded-lg border border-gray-100 text-blue-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                <Mail size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">General inquiry</p>
                <h4 className="text-lg font-black text-slate-900">info@maxprinter.shop</h4>
              </div>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-between h-48 group hover:border-blue-600/20 transition-all">
              <div className="h-10 w-10 bg-white rounded-lg border border-gray-100 text-blue-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                <MapPin size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Deployment HQ</p>
                <h4 className="text-lg font-black text-slate-900 leading-tight">Prestonia Louisville, <br/> KY 40213, USA</h4>              </div>
            </div>
          </div>

          {/* --- CONTACT FORM --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-gray-100 rounded-xl p-8 md:p-12 transition-all">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                  <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">Message sent.</h2>
                  <p className="text-slate-400 text-sm font-bold mb-10 tracking-wide">We will respond to your request within 24 hours.</p>
                  <button onClick={() => setStatus(null)} className="h-12 px-10 bg-black text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Send another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Full name</label>
                      <input 
                        required type="text" placeholder="John Doe" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Email address</label>
                      <input 
                        required type="email" placeholder="john@example.com" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Phone number</label>
                      <input 
                        type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Subject</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all appearance-none cursor-pointer pr-12"
                        >
                          <option>General Inquiry</option>
                          <option>Product Support</option>
                          <option>Order Inquiries</option>
                          <option>Warranty Claim</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Message</label>
                    <textarea 
                      required rows="5" placeholder="How can we help your office?" value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button 
                      disabled={loading}
                      className="h-14 px-10 bg-black text-white rounded-xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-black/5"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>Send message <ArrowRight size={18} /></>
                      )}
                    </button>
                  </div>
                  {status === 'error' && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-4 ml-1">Failed to send. Please try again.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
