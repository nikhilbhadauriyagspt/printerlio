import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import colImg from "../assets/bannerr/exp1.png";
import promoImg from "../assets/bannerr/exp3.png";
import bannerImg from "../assets/bannerr/exp2.png";
import bannerImg2 from "../assets/bannerr/exp4.png";

const collectionData = [
  {
    title: "Office Printers",
    desc: "High-performance printers designed for smooth workflow and daily office productivity.",
    image: colImg,
    link: "/shop?category=laser-printers",
    tag: "Work Setup",
    bg: "bg-[#f9f9f9]",
  },
  {
    title: "Inkjet Printers",
    desc: "Print, scan, and copy with reliable inkjet solutions for home and business use.",
    image: promoImg,
    link: "/shop?category=inkjet-printers",
    tag: "Multi Function",
    bg: "bg-[#f2f2f2]",
  },
  {
    title: "Home Printers",
    desc: "Easy-to-use printers built for everyday documents, school work, and personal printing.",
    image: bannerImg,
    link: "/shop?category=inkjet-printers",
    tag: "Daily Use",
    bg: "bg-[#f5f5f5]",
  },
  {
    title: "Printer Accessories",
    desc: "Dependable accessories that support better printing performance and smoother workflow.",
    image: bannerImg2,
    link: "/shop?category=printer-accessories",
    tag: "Support Range",
    bg: "bg-[#efefef]",
  },
];

export default function Collections() {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-6 lg:px-8 border-t border-gray-100 font-['Poppins']">
      <div className="max-w-[1820px] mx-auto">
       <div className="max-w-2xl mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-blue-800"></span>
              <span className="text-blue-800  text-[13px] uppercase tracking-[0.2em]">Reliable printers</span>
            </div>
            <h2 className="text-[38px] md:text-[40px]  text-slate-900 leading-[1.1]">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-800">Now</span>
            </h2>
          </div>

        {/* Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
          {collectionData.map((item, index) => (
            <div
              key={index}
              className={`relative ${item.bg} flex flex-col sm:flex-row items-center min-h-[300px] overflow-hidden`}
            >
              {/* Content Area */}
              <div className="flex-1 p-8 md:p-10 lg:p-12 order-2 sm:order-1">
                <span className="inline-block text-[10px]  uppercase tracking-[2px] text-gray-500 mb-4">
                  {item.tag}
                </span>

                <h3 className="text-[22px] md:text-[26px]  leading-tight text-slate-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-[14px] leading-7 text-gray-600 max-w-[380px] mb-8">
                  {item.desc}
                </p>

                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[2px] text-blue-800 border-b-2 border-transparent hover:border-blue-800 transition-all pb-1"
                >
                  Shop Now
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Image Area */}
              <div className="w-full sm:w-[45%] h-[240px] sm:h-full flex items-center justify-center p-6 order-1 sm:order-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
