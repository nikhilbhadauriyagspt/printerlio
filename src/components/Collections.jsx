import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import colImg from "@/assets/bannerr/col.png";
import promoImg from "@/assets/bannerr/ban4.png";

const collectionData = [
  {
    title: "Office Printers",
    desc: "Explore practical Printers that help improve workflow, printer support, and day-to-day productivity.",
    image: colImg,
    link: "/shop",
  },
  {
    title: "Modern Printing Solutions",
    desc: "Find dependable printers built for better performance, smooth operation, and everyday home or office use.",
    image: promoImg,
    link: "/shop?category=laser-printers",
  },
];
export default function Collections() {
  return (
    <section className="w-full bg-[#efefef] py-14 md:py-16 lg:py-20 font-['Poppins']">
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-14">
          {collectionData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="w-full">
                {/* Image */}
                <div className="w-full overflow-hidden bg-[#e8e8e8]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[250px] sm:h-[320px] md:h-[340px] lg:h-[395px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Content */}
                <div className="pt-5">
                  <h3 className="text-[24px] md:text-[28px] leading-tight font-normal text-black">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[15px] md:text-[16px] leading-[1.55] text-[#111111] max-w-[92%]">
                    {item.desc}
                  </p>

                  <Link
                    to={item.link}
                    className="inline-flex items-center justify-center mt-8 min-w-[104px] h-[42px] px-6 bg-[#2f3542] text-white text-[14px] font-bold uppercase tracking-[0.3px] transition-all duration-300 hover:bg-black"
                  >
                    SHOP
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}