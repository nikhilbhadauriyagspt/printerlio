import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

// Assets
import trip1 from '@/assets/bannerr/trip1.jpg';
import trip2 from '@/assets/bannerr/trip2.jpg';

const banners = [
  {
    id: "01",
    label: "Professional Series",
    title: "Business Powerhouse",
    desc: "Experience industrial-grade efficiency for high-volume corporate spaces.",
    image: trip1,
    gradient: "from-slate-50 to-blue-100/50"
  },
  {
    id: "02",
    label: "Next-Gen Tech",
    title: "Ultra HD Printing",
    desc: "Achieve professional-grade clarity with our next-gen imaging technology.",
    image: trip2,
    gradient: "from-blue-50 to-indigo-100/50"
  }
];

export default function TripleBanners() {
  return (
    <section className="w-full bg-white py-16 md:py-24 font-poppins">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          
          {banners.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative  overflow-hidden flex flex-col md:flex-row min-h-[400px] border border-slate-100 ",
                `bg-gradient-to-br ${item.gradient}`
              )}
            >
              {/* --- LEFT SIDE: TEXT CONTENT --- */}
              <div className="flex-1 p-8 md:p-12 lg:p-14 flex flex-col justify-center relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4 block">
                  {item.label}
                </span>
                <h3 className="text-3xl md:text-3xl font-bold text-slate-900 mb-4 leading-[1.1] t">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-[14px] md:text-[15px] font-medium leading-relaxed mb-10 max-w-[280px]">
                  {item.desc}
                </p>
                <Link 
                  to="/shop" 
                  className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-black text-[13px] uppercase tracking-widest transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 w-fit active:scale-95"
                >
                  Shop Now
                  <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
                </Link>
              </div>

              {/* --- RIGHT SIDE: CIRCULAR IMAGE CUTOUT --- */}
              <div className="flex-1 relative flex items-center justify-center p-8 md:p-10 lg:p-12 overflow-hidden">
                {/* Large Background Circle Decoration */}
                <div className="absolute w-[80%] aspect-square bg-white/60 rounded-full blur-2xl -right-10 -top-10" />
                
                {/* Main Circular Cutout */}
                <div className="relative w-full aspect-square max-w-[320px] rounded-full bg-white shadow-inner border-[12px] border-white/50 overflow-hidden group-hover:scale-105 transition-transform duration-700 ease-out">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Subtle Overlay Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Decorative Sparkle */}
                <div className="absolute top-1/4 right-10 h-2 w-2 bg-blue-400 rounded-full animate-ping opacity-40" />
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
