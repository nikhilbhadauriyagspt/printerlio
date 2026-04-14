import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const features = [
  {
    icon: <Truck size={14} />,
    title: "Free Shipping",
    desc: "On all orders "
  },
  {
    icon: <RotateCcw size={14} />,
    title: "Money Back",
    desc: "7-day easy returns"
  },
  {
    icon: <ShieldCheck size={14} />,
    title: "Safe Checkout",
    desc: "100% Secure Payments"
  },
  {
    icon: <Headphones size={14} />,
    title: "Expert Help",
    desc: "24/7 Dedicated Support"
  }
];

export default function Features() {
  return (
    <section className="w-full bg-slate-50 border-b border-slate-100 h-10 md:h-12 flex items-center font-poppins overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 w-full">
        <div className="flex items-center justify-between md:justify-center gap-4 md:gap-16 overflow-x-auto no-scrollbar py-1">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 shrink-0 group"
            >
              <div className="text-blue-600 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[11px] md:text-[12px] font-bold text-slate-900 uppercase tracking-tight">
                  {item.title}:
                </span>
                <span className="text-slate-500 text-[10px] md:text-[11px] font-medium">
                  {item.desc}
                </span>
              </div>
              {index !== features.length - 1 && (
                <div className="hidden md:block h-3 w-[1px] bg-slate-200 ml-12" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
