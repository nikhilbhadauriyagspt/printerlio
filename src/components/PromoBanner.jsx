import React from "react";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

import colImg from "../assets/bannerr/exp1.png";
import promoImg from "../assets/bannerr/exp3.png";
import bannerImg from "../assets/bannerr/exp2.png";
import bannerImg2 from "../assets/bannerr/exp4.png";

const collectionData = [
  {
    title: "Office Productivity",
    desc: "Engineered for high-volume tasks and seamless workplace efficiency.",
    image: colImg,
    link: "/shop?category=laser-printers",
    tag: "Pro Series",
  },
  {
    title: "Vibrant Inkjet",
    desc: "Experience true-to-life colors and sharp details for every print.",
    image: promoImg,
    link: "/shop?category=inkjet-printers",
    tag: "Creative",
  },
  {
    title: "Smart Home",
    desc: "Compact, wireless solutions designed for the modern family life.",
    image: bannerImg,
    link: "/shop?category=inkjet-printers",
    tag: "Everyday",
  },
  {
    title: "Essential Gear",
    desc: "The perfect support system for your professional printing setup.",
    image: bannerImg2,
    link: "/shop?category=printer-accessories",
    tag: "Add-ons",
  },
];

export default function Collections() {
  return (
    <section className="w-full bg-white py-24 px-4 md:px-10 font-['Poppins']">
      <div className="max-w-[1820px] mx-auto">

        {/* Centered Premium Heading */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-12 bg-[#001e3c]"></span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#001e3c]">Premium Range</span>
            <span className="h-[1px] w-12 bg-[#001e3c]"></span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-semibold text-[#001e3c] leading-tight mb-4">
            Reliable <span className="text-[#fbb124]">Printers</span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-[600px]">
            Explore professional-grade technology designed to deliver 
            unmatched reliability and precision.
          </p>
        </div>

        {/* Sharp Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {collectionData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative h-[400px] md:h-[500px] border border-gray-100 overflow-hidden bg-[#fbfbfb]"
            >
              {/* Background Image - Clean & Centered */}
              <div className="absolute inset-0 flex items-center justify-center p-12 md:p-20 transition-transform duration-700 group-hover:scale-105 group-hover:blur-[2px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain opacity-90"
                />
              </div>

              {/* Content Overlay - Up & Down Animation */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-[#001e3c] via-[#001e3c]/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <span className="text-[#fbb124] text-[12px] font-bold uppercase tracking-widest mb-3 inline-block">
                    {item.tag}
                  </span>
                  <h3 className="text-white text-[28px] md:text-[34px] font-semibold mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-[15px] max-w-[400px] mb-8 leading-relaxed">
                    {item.desc}
                  </p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-3 bg-[#fbb124] text-[#001e3c] px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    Explore Now
                    <MoveRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Default View Tag - Slides down on hover */}
              <div className="absolute top-8 left-8 group-hover:-translate-y-20 transition-transform duration-500">
                 <h4 className="text-[#001e3c] text-[20px] font-semibold border-l-4 border-[#fbb124] pl-4">
                    {item.title}
                 </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
