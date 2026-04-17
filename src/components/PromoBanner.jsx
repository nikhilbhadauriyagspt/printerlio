import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import colImg from "@/assets/bannerr/exp1.png";
import promoImg from "@/assets/bannerr/exp3.png";
import bannerImg from "@/assets/bannerr/exp2.png";
import bannerImg2 from "@/assets/bannerr/exp4.png";

const collectionData = [
  {
    title: "Office Printers",
    desc: "High-performance printers designed for smooth workflow and daily office productivity.",
    image: colImg,
    link: "/shop?category=laser-printers",
    tag: "Work Setup",
    bg: "bg-[#f5efea]",
  },
  {
    title: "All-in-One Printers",
    desc: "Print, scan, and copy with reliable all-in-one solutions for home and business use.",
    image: promoImg,
    link: "/shop?category=all-in-one-printers",
    tag: "Multi Function",
    bg: "bg-[#f3f6fb]",
  },
  {
    title: "Home Printers",
    desc: "Easy-to-use printers built for everyday documents, school work, and personal printing.",
    image: bannerImg,
    link: "/shop?category=inkjet-printers",
    tag: "Daily Use",
    bg: "bg-[#f7f3ee]",
  },
  {
    title: "Printer Accessories",
    desc: "Dependable accessories that support better printing performance and smoother workflow.",
    image: bannerImg2,
    link: "/shop?category=printer-accessories",
    tag: "Support Range",
    bg: "bg-[#f4f4f2]",
  },
];

export default function Collections() {
  return (
    <section className="w-full bg-white py-12 md:py-14 lg:py-16 font-['Poppins']">
      <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <span className="block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-3">
            Featured Collection
          </span>
          <h2 className="text-[30px] md:text-[40px] lg:text-[46px] font-semibold leading-none text-[#1f140f]">
            Explore Our Printers
          </h2>
        </div>

        {/* Redesigned cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {collectionData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to={item.link}
                className={`block h-full rounded-[28px] overflow-hidden border border-[#e8dfd6] ${item.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.07)]`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-[1.05fr_1fr] items-center min-h-[260px]">
                  {/* Content */}
                  <div className="px-6 md:px-7 lg:px-8 py-7 md:py-8 order-2 sm:order-1">
                    <span className="inline-block text-[10px] uppercase tracking-[2px] text-[#8e7767] mb-3">
                      {item.tag}
                    </span>

                    <h3 className="text-[24px] md:text-[28px] font-semibold leading-[1.1] text-[#241812] mb-4">
                      {item.title}
                    </h3>

                    <p className="text-[14px] md:text-[15px] leading-7 text-[#67584e] max-w-[420px] mb-6">
                      {item.desc}
                    </p>

                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[1px] text-[#7a4320]">
                      Shop Now
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-[220px] sm:h-full min-h-[220px] flex items-center justify-center px-5 py-5 order-1 sm:order-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-[190px] md:max-h-[220px] object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}