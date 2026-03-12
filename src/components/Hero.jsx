import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, ShieldCheck, Headphones, Truck, CreditCard } from 'lucide-react';

import banner1 from '@/assets/bannerr/banner1.jpg';
import banner2 from '@/assets/bannerr/Banner2.jpg';
import banner3 from '@/assets/bannerr/banner3.jpg';
import banner4 from '@/assets/bannerr/banner4.jpg';

const slides = [
  {
    id: 1,
    subtitle: "Premium office performance",
    title: "Master Laser Series",
    desc: "Uncompromising speed and professional precision. Designed for high-volume business environments that demand the sharpest text and graphics.",
    image: banner1,
    color: "bg-slate-900"
  },
  {
    id: 2,
    subtitle: "Creative studio quality",
    title: "Inkjet Systems",
    desc: "Bring your vision to life with exceptional color accuracy and high-resolution output. Perfect for design studios and home creative hubs.",
    image: banner2,
    color: "bg-indigo-950"
  },
  {
    id: 3,
    subtitle: "Modern eco-printing",
    title: "Eco-Tank Efficiency",
    desc: "Maximize productivity while minimizing waste. Our supertank systems offer ultra-low cost per page with high-capacity integrated ink tanks.",
    image: banner3,
    color: "bg-blue-900"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="w-full bg-white font-sans">
      <div className="max-w-[1920px] mx-auto px-6 md:px-4">
        
        {/* --- TOP GRID: SLIDER + SIDE BANNERS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Main Slider (70%) */}
          <div className="lg:col-span-9 relative h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden group">
            <AnimatePresence mode='wait'>
              <motion.div 
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex items-center px-8 md:px-16"
              >
                {/* Full Image Background */}
                <img src={slides[current].image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-0" />
                
                <div className="relative z-10 w-full max-w-2xl">
                  <div className="space-y-4 text-white">
                    <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-blue-400 font-bold text-xs ">{slides[current].subtitle}</motion.p>
                    <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-3xl md:text-5xl lg:text-6xl font-black">
                      {slides[current].title}
                    </motion.h1>
                    <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-sm md:text-base text-white/70 max-w-md font-medium leading-relaxed">
                      {slides[current].desc}
                    </motion.p>
                    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="pt-2">
                      <Link to="/shop" className="inline-flex items-center gap-3 bg-white text-black h-12 px-8 text-[10px] font-black tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all">
                        Shop Collection <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="absolute bottom-6 left-8 md:left-16 flex items-center gap-3 z-20">
              <button onClick={prevSlide} className="h-10 w-10 bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="h-10 w-10 bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Side Ad Banner (Single Tall) */}
          <div className="lg:col-span-3 relative h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden group">
            <img src={banner4} alt="Premium Hardware" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white leading-tight ">
                  Pro-Lab <br /> Visual Series
                </h3>
                <p className="text-[15px] text-white/60 font-bold ">Gallery grade printing.</p>
                <div className="pt-2">
                  <Link to="/shop" className="flex items-center justify-center bg-blue-600 text-white h-11 w-full text-[10px] font-black tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM GRID: ENRICHED IMAGE BANNERS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Banner 1: All-in-One */}
          <div className="relative h-48 md:h-52 lg:h-56 overflow-hidden group cursor-pointer">
            <img src="/category/all-in-one-printers.jpg" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-blue-600/40 transition-colors duration-500" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
              <div className="space-y-3">
                <h4 className="text-xl font-black  uppercase">All-in-One</h4>
                <div className="space-y-1">
                  <p className="text-[15px] font-bold text-white/80 flex items-center gap-2"><Zap size={10} className="text-blue-400" /> Print, Scan, Copy, Fax</p>
                  <p className="text-[15px] font-bold text-white/80  flex items-center gap-2"><Zap size={10} className="text-blue-400" /> Wireless Mobile Setup</p>
                  <p className="text-[15px] font-bold text-white/80  flex items-center gap-2"><Zap size={10} className="text-blue-400" /> Pro-Sync Cloud Connect</p>
                </div>
              </div>
              
            </div>
          </div>

          {/* Banner 2: Thermal */}
          <div className="relative h-48 md:h-52 lg:h-56 overflow-hidden group cursor-pointer">
            <img src="/category/thermal-printers.jpg" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gray-900/60 group-hover:bg-black/80 transition-colors duration-500" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
              <div className="space-y-3">
                <h4 className="text-xl font-black  uppercase">Thermal Lab</h4>
                <div className="space-y-1">
                  <p className="text-[15px] font-bold text-white/80  flex items-center gap-2"><Zap size={10} className="text-amber-400" /> Industrial Labeling</p>
                  <p className="text-[15px] font-bold text-white/80  flex items-center gap-2"><Zap size={10} className="text-amber-400" /> High-Speed Direct Mode</p>
                  <p className="text-[15px] font-bold text-white/80  flex items-center gap-2"><Zap size={10} className="text-amber-400" /> No Ink Or Toner Required</p>
                </div>
              </div>
              
            </div>
          </div>

          {/* Banner 3: LED Printers */}
          <div className="relative h-48 md:h-52 lg:h-56 overflow-hidden group cursor-pointer">
            <img src="/category/led-printers.jpg" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-blue-900/60 group-hover:bg-blue-600/80 transition-colors duration-500" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
              <div className="space-y-3">
                <h4 className="text-xl font-black  uppercase">LED Series</h4>
                <div className="space-y-1">
                  <p className="text-[15px] font-bold text-white/80 flex items-center gap-2"><Zap size={10} className="text-blue-300" /> Energy Efficient Tech</p>
                  <p className="text-[15px] font-bold text-white/80 flex items-center gap-2"><Zap size={10} className="text-blue-300" /> Sharp Vibrance Engine</p>
                  <p className="text-[15px] font-bold text-white/80 flex items-center gap-2"><Zap size={10} className="text-blue-300" /> Compact Footprint</p>
                </div>
              </div>
             
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
