import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={28} strokeWidth={1.5} />,
    title: "FREE SHIPPING",
    desc: "On all printer orders"
  },
  {
    icon: <RotateCcw size={28} strokeWidth={1.5} />,
    title: "EASY RETURNS",
    desc: "7-days return policy"
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: "SECURE PAYMENT",
    desc: "100% SSL protected transactions"
  },
  {
    icon: <Headphones size={28} strokeWidth={1.5} />,
    title: "EXPERT SUPPORT",
    desc: "24/7  assistance for all"
  }
];

export default function Features() {
  return (
    <section className="w-full bg-white border-t pt-7 border-gray-100 font-['Poppins']">
      <div className="max-w-[1740px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col items-center text-center p-12 border-gray-100 group transition-colors hover:bg-gray-50 ${
                index !== features.length - 1 ? 'lg:border-r' : ''
              } ${
                index < 2 ? 'border-b lg:border-b-0' : 'sm:border-b-0'
              } ${
                index % 2 === 0 ? 'sm:border-r lg:border-r-0' : ''
              } lg:border-b-0`}
            >
              <div className="mb-6 text-gray-400 group-hover:text-black transition-colors duration-500">
                {item.icon}
              </div>
              
              <h3 className="text-[14px] font-bold text-gray-900 tracking-[0.1em] mb-2">
                {item.title}
              </h3>
              <p className="text-[12px] text-gray-500 leading-relaxed max-w-[200px]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}