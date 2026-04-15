import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronRight, Zap, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportCTA() {
  return (
    <section className="w-full bg-white py-12 md:py-16 font-poppins overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-[#FAF9F6] border border-[#E8E6E1] rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 overflow-hidden"
        >
          {/* Subtle Accent Gradient */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/30 to-transparent pointer-events-none" />
          
          {/* Left: Content Section */}
          <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
            <div className="hidden lg:flex h-14 w-14 rounded-2xl bg-white text-blue-600 items-center justify-center shadow-sm border border-[#E8E6E1]">
               <HelpCircle size={28} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-2">
                 <Zap size={14} fill="currentColor" />
                 <span>Free Expert Advice</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight">
                Not sure which printer to buy?
              </h2>
              <p className="text-gray-500 text-[14px] md:text-[15px] font-medium mt-1">
                Our specialists will help you find the perfect match for your needs.
              </p>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-[#1A1A1A] hover:bg-blue-600 text-white rounded-2xl font-bold text-[16px] transition-all shadow-xl shadow-gray-200 active:scale-95 group"
            >
              Get Expert Help
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute -right-10 -bottom-10 opacity-[0.05] text-[#1A1A1A] pointer-events-none hidden xl:block">
             <HelpCircle size={200} strokeWidth={1} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
