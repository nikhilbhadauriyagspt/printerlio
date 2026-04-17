import React from 'react';
import { motion } from 'framer-motion';
import { Printer, ScanLine, Droplets, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

// Using your local asset
import aboutBanner from '@/assets/bannerr/banner6.png';

const features = [
  {
    icon: Printer,
    title: 'HOME PRINTERS',
    desc: 'Reliable printers for everyday documents, school work, and personal use.',
  },
  {
    icon: ScanLine,
    title: 'ALL-IN-ONE',
    desc: 'Print, scan, and copy with smart multifunction performance in one machine.',
  },
  {
    icon: Droplets,
    title: 'INK & TONER',
    desc: 'High-quality ink and toner supplies for sharp output and smooth printing.',
  },
  {
    icon: ShieldCheck,
    title: 'OFFICE READY',
    desc: 'Built for business efficiency, fast workflows, and consistent page quality.',
  },
];

export default function AboutSection() {
  return (
    <section className="w-full bg-[#f6f1ef] overflow-hidden font-['Poppins']">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch">
        
        {/* Left Side Image */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[680px]"
        >
          <div className="absolute inset-0 bg-[#b97952] translate-x-4 translate-y-4 z-0 hidden md:block" />

          <div className="relative z-10 w-full h-full">
            <img
              src={aboutBanner}
              alt="Printer workspace"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative flex items-center px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-12 md:py-14 lg:py-16 min-h-[320px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[680px]"
        >
          {/* soft printer bg */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center justify-center">
            <Printer size={300} strokeWidth={1.1} className="text-[#8b5a3c]" />
          </div>

          <div className="relative z-10 w-full max-w-[760px]">
            <span className="text-[#9a6a4d] text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.22em] mb-3 block">
              Printing Solutions
            </span>

            <h2 className="text-[30px] sm:text-[36px] md:text-[44px] xl:text-[50px] font-bold text-[#5e3017] leading-[1.05] mb-4">
              Smart Printer
              <br />
              Equipment & Supplies
            </h2>

            <p className="text-[#6d5b51] text-[14px] md:text-[15px] leading-7 max-w-[680px] mb-8">
              Discover dependable printing technology for home, office, and business needs.
              From compact printers to all-in-one machines and genuine consumables, we help
              you build a smoother and more efficient printing setup.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="text-center sm:text-left">
                    <div className="mb-3 flex justify-center sm:justify-start">
                      <div className="w-14 h-14 rounded-full border border-[#cda990] flex items-center justify-center text-[#9a6a4d]">
                        <Icon size={26} strokeWidth={1.8} />
                      </div>
                    </div>

                    <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#6a381c] uppercase leading-tight mb-2">
                      {item.title}
                    </h3>

                    <p className="text-[#76665d] text-[14px] leading-6 max-w-[280px] mx-auto sm:mx-0">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center justify-center h-[46px] px-7 bg-[#9a6a4d] hover:bg-[#83583e] text-white text-[13px] font-semibold uppercase tracking-[0.08em] transition-all"
              >
                Explore More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}