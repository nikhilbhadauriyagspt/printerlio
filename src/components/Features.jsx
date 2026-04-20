import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={28} />,
    title: 'Free Shipping',
    desc: 'On all printer and accessory orders',
    color: 'blue',
  },
  {
    icon: <RotateCcw size={28} />,
    title: 'Easy Returns',
    desc: 'Simple 7-day return process',
    color: 'indigo',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Secure Payment',
    desc: 'Protected checkout for every purchase',
    color: 'sky',
  },
  {
    icon: <Headphones size={28} />,
    title: 'Expert Support',
    desc: 'Helpful printer assistance anytime',
    color: 'emerald',
  },
];

export default function Features() {
  return (
    <section className="w-full bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-[1820px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-blue-800/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-800 group-hover:bg-blue-800 group-hover:text-white transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-[17px]  text-gray-900 mb-2">
                {item.title}
              </h3>

              <p className="text-[14px] text-gray-500 leading-relaxed max-w-[240px]">
                {item.desc}
              </p>
              
              <div className="mt-6 w-10 h-1 bg-gray-100 rounded-full group-hover:w-20 group-hover:bg-blue-800 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
