import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import banner6 from "@/assets/bannerr/promo.jpg";

export default function Collections() {
  return (
    <section className="w-full bg-white py-10 md:py-14 font-['Poppins']">
      <div className="max-w-[1950px] mx-auto px-4 md:px-6">
        <div className="overflow-hidden bg-white">
          <div className="flex flex-col lg:flex-row min-h-[420px] md:min-h-[500px]">
            
            {/* IMAGE SIDE */}
            <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden">
              <img
                src={banner6}
                alt="Premium Accessories"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* TEXT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#eaf4ff] px-6 py-12 md:px-12 lg:px-20">
              <div className="max-w-[540px] text-center">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <span className="inline-block mb-5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                    Premium Printing Essentials
                  </span>

                  <h2 className="text-[30px] sm:text-[38px] md:text-[46px] font-bold leading-[1.15] tracking-[-0.03em] text-slate-900 mb-5">
                    Premium Accessories
                    <br />
                    For Perfect Prints
                  </h2>

                  <p className="text-slate-600 text-sm md:text-[15px] leading-7 max-w-[430px] mx-auto mb-8">
                    Find the right ink and parts for your printer with trusted,
                    quality accessories designed for smooth performance and
                    better everyday printing.
                  </p>

                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center rounded-full bg-blue-700 px-8 md:px-10 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-800"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}