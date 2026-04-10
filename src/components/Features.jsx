import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={20} className="text-blue-600 transition-colors duration-300 group-hover:text-white" />,
    title: "FREE SHIPPING",
    desc: "On all orders"
  },
  {
    icon: <RotateCcw size={20} className="text-blue-600 transition-colors duration-300 group-hover:text-white" />,
    title: "MONEY GUARANTEE",
    desc: "7 days money back"
  },
  {
    icon: <ShieldCheck size={20} className="text-blue-600 transition-colors duration-300 group-hover:text-white" />,
    title: "SAFE SHOPPING",
    desc: "Safe shopping guarantee"
  },
  {
    icon: <Headphones size={20} className="text-blue-600 transition-colors duration-300 group-hover:text-white" />,
    title: "ONLINE SUPPORT",
    desc: "Support 24/24h on day"
  },
  {
    icon: <CreditCard size={20} className="text-blue-600 transition-colors duration-300 group-hover:text-white" />,
    title: "PAYMENT METHOD",
    desc: "Many different ways"
  }
];

export default function Features() {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-300 cursor-default"
            >
              {/* Thin Landscape Card Style */}
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 shadow-sm group-hover:shadow-blue-200">
                {item.icon}
              </div>
              
              <div className="flex flex-col min-w-0">
                <h3 className="text-[11px] md:text-[12px] font-black text-slate-900 uppercase tracking-[0.1em] leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-[10px] md:text-[11px] font-bold uppercase tracking-wide opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.desc}
                </p>
              </div>

              {/* Decorative side accent */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-blue-600 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
