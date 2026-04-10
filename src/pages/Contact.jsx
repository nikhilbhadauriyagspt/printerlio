import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, CheckCircle2, Loader2, Send, MapPin, Phone, ChevronDown, MessageSquare, Sparkles, HeadphonesIcon } from 'lucide-react';
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
    <div className="bg-white min-h-screen font-jakarta text-slate-900">
      <SEO 
        title="Contact Us | Printer Loop" 
        description="Connect with Printer Loop for support and inquiries about our printers."
      />
      
      {/* --- PROFESSIONAL CENTERED HEADER --- */}
      <section className="pt-32 md:pt-25 pb-12 md:pb-20 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1620px] mx-auto">
          <div className="flex flex-col items-center text-center">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex items-center gap-3 mb-4"
             >
                <div className="h-px w-8 bg-blue-600" />
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Support Hub</span>
                <div className="h-px w-8 bg-blue-600" />
             </motion.div>
             
             <div className="flex flex-col items-center gap-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-7xl font-black text-slate-900  leading-none"
                >
                  Get In <span className="text-blue-600">Touch</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-slate-500 text-sm md:text-lg font-medium max-w-2xl mt-2 leading-relaxed"
                >
                  Our dedicated specialist team is available to assist with technical specifications, logistics, and professional account support.
                </motion.p>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-1.5 bg-blue-600 rounded-full mt-4"
                />
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-slate-50/30">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1620px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* LEFT: INFO & CONTACT CARDS */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.3em]">Contact Channels</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Select your preferred method of contact. Our systems ensure your inquiry is routed to the correct specialist immediately.
                </p>
              </div>
                
              <div className="grid gap-4">
                {[
                  { icon: <Mail size={20} />, label: "Email Support", val: "info@printerloop.shop", link: "mailto:info@printerloop.shop" },
                  { icon: <MapPin size={20} />, label: "HQ Address", val: "1311 N Hancock St Philadelphia, PA 19122, USA", link: "#" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-[2rem] group hover:border-blue-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-500 text-slate-400">
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">{item.label}</p>
                       {item.link !== "#" ? (
                         <a href={item.link} className="text-[14px] font-black text-slate-900 truncate hover:text-blue-600 transition-colors uppercase ">{item.val}</a>
                       ) : (
                         <p className="text-[14px] font-black text-slate-900 leading-tight uppercase ">{item.val}</p>
                       )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Banner */}
              <div className="p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative group shadow-2xl">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-600/30 transition-colors duration-700" />
                 <div className="relative z-10 space-y-5">
                    <div className="flex items-center gap-3 text-blue-400">
                       <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-[3px]">Availability</span>
                    </div>
                    <h4 className="text-2xl font-black ">24/7 Monitoring</h4>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                       Our  monitoring systems are active 24/7. Human support response times currently average under 4 hours for all inquiries.
                    </p>
                 </div>
              </div>
            </div>

            {/* RIGHT: CONTACT FORM */}
            <div className="lg:col-span-8">
              <div className="bg-white p-8 md:p-14 lg:p-20 rounded-[3.5rem] border border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="h-24 w-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-500/20 rotate-3">
                        <CheckCircle2 size={48} />
                      </div>
                      <h2 className="text-4xl font-black text-slate-900 mb-4  uppercase">Message Dispatched</h2>
                      <p className="text-slate-500 mb-12 max-w-sm mx-auto font-medium text-lg leading-relaxed">Your inquiry has been successfully logged. A technical specialist will contact you shortly.</p>
                      <button 
                        onClick={() => setStatus(null)} 
                        className="bg-slate-900 text-white px-14 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-blue-600 shadow-2xl active:scale-95"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <label className="text-[11px] font-black text-slate-900 uppercase tracking-[3px] ml-1">Full Name</label>
                          <input 
                            required type="text" placeholder="e.g. Alexander Hamilton" value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-[15px] font-bold transition-all placeholder:text-slate-300 shadow-sm"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[11px] font-black text-slate-900 uppercase tracking-[3px] ml-1">Work Email</label>
                          <input 
                            required type="email" placeholder="name@company.com" value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-[15px] font-bold transition-all placeholder:text-slate-300 shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <label className="text-[11px] font-black text-slate-900 uppercase tracking-[3px] ml-1">Contact Number</label>
                          <input 
                            type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-[15px] font-bold transition-all placeholder:text-slate-300 shadow-sm"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[11px] font-black text-slate-900 uppercase tracking-[3px] ml-1">Topic Of Interest</label>
                          <div className="relative">
                            <select 
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 outline-none text-[15px] font-bold transition-all appearance-none cursor-pointer shadow-sm"
                            >
                              <option>General Inquiry</option>
                              <option>Industrial Printer Specs</option>
                              <option>Logistics & Dispatch</option>
                              <option>Technical Support</option>
                            </select>
                            <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-slate-900 uppercase tracking-[3px] ml-1">Message Content</label>
                        <textarea 
                          required rows="6" placeholder="Specify your requirements or describe the technical issue in detail..." value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full p-8 bg-slate-50 border border-slate-100 rounded-3xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-[15px] font-bold transition-all resize-none min-h-[200px] placeholder:text-slate-300 shadow-sm"
                        ></textarea>
                      </div>

                      <div className="pt-6">
                        <button 
                          disabled={loading}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-5 bg-slate-900 text-white h-20 px-16 rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] transition-all hover:bg-blue-600 shadow-2xl active:scale-[0.98] disabled:opacity-50 group"
                        >
                          {loading ? <Loader2 size={24} className="animate-spin" /> : "Send Message"}
                          {!loading && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />}
                        </button>
                      </div>
                      {status === 'error' && <p className="text-red-600 text-[11px] font-black uppercase tracking-[2px] mt-8 bg-red-50 p-4 rounded-xl border border-red-100 inline-block">Transmission failure. Internal error detected. Please retry.</p>}
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
