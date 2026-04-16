import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportCTA() {
  return (
    <section className="w-full bg-[#f6f6f4] py-14 md:py-16 font-['Poppins'] flex items-center justify-center">
      
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-[650px] border border-[#e5e5e5] bg-white px-6 md:px-10 py-10 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="h-14 w-14 flex items-center justify-center border border-[#e5e5e5] bg-[#f3f3f3]">
            <HelpCircle size={26} className="text-[#111]" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[24px] md:text-[30px] font-medium text-[#111] leading-tight">
          Need help choosing the right printer?
        </h2>

        {/* Text */}
        <p className="text-[#555] text-[14px] md:text-[15px] mt-3 leading-[1.6] max-w-[480px] mx-auto">
          Get expert guidance to find the best printer for your home, office, or business needs.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
           {/* Contact Button */}
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 px-6 h-[48px] bg-[#111] text-white text-[14px] font-semibold uppercase transition-all duration-300 hover:bg-black"
          >
            Contact Us
            <MessageCircle size={16} />
          </Link>

          {/* FAQ Button */}
          <Link
            to="/faq"
            className="flex items-center justify-center gap-2 px-6 h-[48px] border border-[#111] text-[#111] text-[14px] font-semibold uppercase transition-all duration-300 hover:bg-[#111] hover:text-white"
          >
            FAQs
            <ChevronRight size={16} />
          </Link>

         
        </div>
      </motion.div>
    </section>
  );
}