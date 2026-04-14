import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportCTA() {
  return (
    <section className="w-full bg-white py-10 md:py-14 font-poppins">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative bg-slate-50 border border-slate-100 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[180px]"
        >
          {/* Left: Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2 leading-tight">
              Not sure which printer to buy?
            </h2>
            <p className="text-slate-500 text-[14px] md:text-[15px] font-medium max-w-md">
              Talk to our specialists today for free advice and find your perfect match.
            </p>
          </div>

          {/* Right: Action Button */}
          <div className="shrink-0 w-full md:w-auto">
            <Link 
              to="/contact" 
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-full font-black text-[14px] uppercase tracking-widest transition-all hover:bg-slate-900 shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Get Expert Help
              <ArrowRight size={18} strokeWidth={3} />
            </Link>
          </div>

          {/* Subtle Background Icon Decoration */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-[0.03] pointer-events-none">
             <MessageSquare size={120} strokeWidth={1} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
