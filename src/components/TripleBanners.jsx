import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Headphones, Printer } from 'lucide-react';

const features = [
  {
    icon: <Printer size={24} strokeWidth={1.8} />,
    title: 'Quality Printers',
    desc: 'Reliable options for home and office use.',
  },
  {
    icon: <ShieldCheck size={24} strokeWidth={1.8} />,
    title: 'Trusted Products',
    desc: 'Carefully selected printers and supplies.',
  },
  {
    icon: <Headphones size={24} strokeWidth={1.8} />,
    title: 'Helpful Support',
    desc: 'Easy guidance for your printing needs.',
  },
  {
    icon: <Truck size={24} strokeWidth={1.8} />,
    title: 'Fast Delivery',
    desc: 'Quick shipping on selected printer items.',
  },
];

export default function TripleBanners() {
  return (
    <section className="w-full bg-[#6d3717] py-8 md:py-10 font-['Poppins'] overflow-hidden relative">
      {/* subtle bg texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-8">
        {/* heading */}
        <div className="text-center max-w-[760px] mx-auto mb-7 md:mb-8">
          <span className="block text-white/80 text-[12px] md:text-[13px] uppercase tracking-[0.18em] mb-2">
            Why Choose Us
          </span>

          <h2 className="text-white text-[24px] md:text-[34px] font-semibold leading-tight mb-3">
            Everything You Need for Better Printing
          </h2>

          <p className="text-white/75 text-[13px] md:text-[15px] leading-7">
            Find dependable printers, essential supplies, and simple support in one place.
          </p>
        </div>

        {/* feature items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="text-center xl:text-left px-2"
            >
              <div className="mb-3 flex justify-center xl:justify-start text-white">
                {item.icon}
              </div>

              <h3 className="text-[18px] md:text-[20px] font-semibold text-white leading-tight mb-2">
                {item.title}
              </h3>

              <p className="text-white/75 text-[13px] md:text-[14px] leading-6 max-w-[250px] mx-auto xl:mx-0">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}