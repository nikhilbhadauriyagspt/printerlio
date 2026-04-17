import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, ChevronRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportCTA() {
  return (
    <section className="w-full bg-[#f7f4ef] py-12 md:py-14 font-['Poppins'] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-[760px] rounded-[28px] border border-[#e8dfd6] bg-white px-6 md:px-10 py-10 md:py-12 text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
      >
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 rounded-full flex items-center justify-center border border-[#e7d8cb] bg-[#f8f2ec] text-[#7a4320]">
            <Headphones size={28} />
          </div>
        </div>

        {/* Eyebrow */}
        <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-3">
          Expert Guidance
        </span>

        {/* Heading */}
        <h2 className="text-[26px] md:text-[34px] font-semibold text-[#241812] leading-tight">
          Need Help Finding
          <br />
          the Right Printer?
        </h2>

        {/* Text */}
        <p className="text-[#6b5d54] text-[14px] md:text-[15px] mt-4 leading-7 max-w-[540px] mx-auto">
          Get simple guidance for choosing printers, accessories, and printing
          solutions that fit your home, office, or business needs.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 px-6 h-[48px] rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:bg-[#643619]"
          >
            Contact Us
            <MessageCircle size={16} />
          </Link>

          <Link
            to="/faq"
            className="flex items-center justify-center gap-2 px-6 h-[48px] rounded-xl border border-[#d8c8bb] text-[#5a2d14] text-[13px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:bg-[#f8f2ec]"
          >
            View FAQs
            <ChevronRight size={16} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}