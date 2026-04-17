import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import promoImg from "@/assets/bannerr/png-3.png"; // yahan apni printer PNG daal dena

export default function Collections() {
  return (
    <section className="w-full bg-[#f3eeee] py-8 md:py-10 lg:py-12 font-['Poppins'] overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#f3eeee]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[360px] md:min-h-[420px] lg:min-h-[460px]">
            {/* Left Content */}
            <div className="relative z-10 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-8 md:py-10 lg:py-12">
              <div className="max-w-[580px]">
                <p className="text-[#7a4320] text-[34px] sm:text-[44px] md:text-[54px] leading-none font-['cursive'] mb-2">
                  Limited Time Offer
                </p>

                <h2 className="text-[#5a2d14] text-[42px] sm:text-[54px] md:text-[68px] lg:text-[74px] font-bold leading-[0.95] tracking-[-0.03em] mb-5">
                  Printer
                  <br />
                  Savings
                </h2>

                <p className="text-[#6e5b50] text-[15px] md:text-[16px] leading-8 max-w-[560px] mb-6">
                  Explore dependable printers for home, office, and business use.
                  Find better performance, smooth printing, and everyday value in one place.
                </p>

                <h3 className="text-[#5a2d14] text-[24px] md:text-[34px] font-bold leading-tight mb-5">
                  Save More on
                  <br />
                  Selected Printers
                </h3>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center min-w-[150px] h-[46px] px-7 bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all"
                  >
                    Shop Now
                  </Link>

                  
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] flex items-end justify-center">
              <img
                src={promoImg}
                alt="Printer promo"
                className="max-h-full max-w-[95%] object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}