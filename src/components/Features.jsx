import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={30} strokeWidth={1.6} />,
    title: 'FREE SHIPPING',
    desc: 'On all printer and accessory orders',
  },
  {
    icon: <RotateCcw size={30} strokeWidth={1.6} />,
    title: 'EASY RETURNS',
    desc: 'Simple 7-day return process',
  },
  {
    icon: <ShieldCheck size={30} strokeWidth={1.6} />,
    title: 'SECURE PAYMENT',
    desc: 'Protected checkout for every purchase',
  },
  {
    icon: <Headphones size={30} strokeWidth={1.6} />,
    title: 'EXPERT SUPPORT',
    desc: 'Helpful printer assistance anytime',
  },
];

export default function Features() {
  return (
    <section className="w-full bg-[#fbf7f3] border-t border-[#eee3d8] font-['Poppins'] overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`group relative flex flex-col items-center text-center px-8 md:px-10 py-10 md:py-12 transition-all duration-300 hover:bg-white ${
                index !== features.length - 1 ? 'lg:border-r lg:border-[#eadfd4]' : ''
              } ${
                index < 2 ? 'border-b border-[#eadfd4] lg:border-b-0' : ''
              } ${
                index % 2 === 0 ? 'sm:border-r sm:border-[#eadfd4] lg:border-r-0' : ''
              }`}
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d8c2b0] bg-white text-[#9a6a4d] transition-all duration-300 group-hover:bg-[#9a6a4d] group-hover:text-white group-hover:border-[#9a6a4d]">
                {item.icon}
              </div>

              <h3 className="text-[14px] md:text-[15px] font-bold text-[#5b341d] tracking-[0.14em] mb-2 uppercase">
                {item.title}
              </h3>

              <p className="text-[13px] text-[#7b675c] leading-6 max-w-[220px]">
                {item.desc}
              </p>

              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#9a6a4d] transition-all duration-300 group-hover:w-[70px]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}