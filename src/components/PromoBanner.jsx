import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import promoImg from '@/assets/bannerr/6.png';

export default function PromoBanner() {
  return (
    <section className="w-full bg-white py-10 md:py-14 font-poppins">
      <div className="max-w-[1950px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="overflow-hidden  bg-[#eaf4ff] shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:min-h-[520px]">
            
            {/* LEFT IMAGE SIDE */}
            <div className="relative h-[300px] sm:h-[380px] lg:h-full bg-white">
              <img
                src={promoImg}
                alt="Promotional banner"
                className="h-full w-full object-cover"
              />

              {/* Optional subtle overlay for premium feel */}
              <div className="absolute inset-0 bg-black/5" />
            </div>

            {/* RIGHT CONTENT SIDE */}
            <div className="relative flex items-center justify-center bg-[#eaf4ff] px-6 py-12 sm:px-10 md:px-14 lg:px-16">
              <div className="max-w-[1920px] text-center">
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="mb-5 inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-700"
                >
                  Save More on Smart Printing
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-[30px] leading-tight sm:text-[38px] md:text-[46px] font-bold  text-slate-900"
                >
                  Premium Printers
                  <br />
                  For Home & Office
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mx-auto mt-5 max-w-[430px] text-sm sm:text-[15px] leading-7 text-slate-600"
                >
                  Discover efficient, high-quality printers with modern design,
                  smooth wireless performance, and dependable everyday output.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center rounded-full bg-blue-700 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-800 hover:scale-[1.02]"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}