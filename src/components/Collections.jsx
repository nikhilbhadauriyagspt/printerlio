import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function Collections() {
  return (
    <section className="w-full py-12 px-4 md:px-10 bg-white font-['Poppins']">
      <div className="max-w-[1820px] mx-auto flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-[1000px] bg-[#001e3c] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbb124]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fbb124]/10 border border-[#fbb124]/20 rounded-full mb-4">
               <Zap size={14} className="text-[#fbb124] fill-[#fbb124]" />
               <span className="text-[11px] font-bold uppercase tracking-widest text-[#fbb124]">Limited Collection</span>
            </div>
            
            <h2 className="text-[28px] md:text-[36px] font-semibold text-white leading-tight">
              Premium Printing <span className="text-[#fbb124]">Solutions</span>
            </h2>
            <p className="text-white/60 text-[14px] md:text-[15px] mt-2 max-w-[450px]">
              Don't settle for less. Get high-performance printers at exclusive prices.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 h-12 px-8 bg-[#fbb124] text-[#001e3c] font-bold rounded-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-lg uppercase text-[12px] tracking-widest"
            >
              Shop Collection
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
