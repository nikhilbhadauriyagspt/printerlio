import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Using your local assets
import banner1 from '../assets/bannerr/about1.png';
import banner2 from '../assets/bannerr/about2.png';
import printerBg from '../assets/bannerr/png-1.png';

const slides = [
  {
    id: 1,
    image: banner1,
    eyebrow: 'Upgrade Your Setup',
    title: 'Premium Printers For Home & Office',
    desc: 'Discover reliable printers, smart performance, crisp output, and everyday printing solutions for work, study, and business needs.',
    cta: 'Shop Printers',
    accent: 'Laser • Inkjet • All-In-One',
  },
  {
    id: 2,
    image: banner2,
    eyebrow: 'Smart Printing Deals',
    title: 'Performance Printing Starts Here',
    desc: 'Browse modern printers, accessories, and supplies designed to make printing faster, cleaner, and more efficient.',
    cta: 'Explore Collection',
    accent: 'Printers • Toner • Accessories',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full pt-30 h-[760px] md:h-[860px] lg:h-[960px] overflow-hidden bg-[#f8f3ee]">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
              {/* Left Content */}
              <div className="relative flex items-center justify-center bg-[#f8f3ee] px-6 sm:px-10 lg:px-16 xl:px-24 pt-[150px] md:pt-[170px] lg:pt-[150px] pb-12">
               <div className="absolute inset-0 pointer-events-none overflow-hidden">
  <img
    src={printerBg}
    alt=""
    className="absolute top-[12%] left-[4%] w-[300px] md:w-[420px] object-contain opacity-[0.1] rotate-[-16deg] select-none"
  />
  
</div>

                <div className="relative z-10 max-w-[640px] w-full">
                  <p className="text-[#9a6b48] text-[14px] md:text-[15px] uppercase tracking-[0.22em] font-semibold mb-5">
                    {slide.accent}
                  </p>

                  <h3 className="text-[#8b5a36] text-[38px] md:text-[54px] leading-none font-['cursive'] mb-3">
                    {slide.eyebrow}
                  </h3>

                  <h1 className="text-[#5c2e12] text-[40px] sm:text-[54px] md:text-[68px] lg:text-[72px] xl:text-[80px] font-bold leading-[0.95] tracking-[-0.03em] mb-6 max-w-[760px]">
                    {slide.title}
                  </h1>

                  <p className="text-[#6d5a4d] text-[15px] sm:text-[16px] md:text-[18px] leading-8 max-w-[620px] mb-8">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/shop"
                      className="inline-flex items-center justify-center min-w-[180px] h-[54px] px-7 bg-[#9d6a45] hover:bg-[#87593a] text-white text-[14px] font-semibold uppercase tracking-[0.08em] rounded-[6px] shadow-[0_8px_24px_rgba(157,106,69,0.22)] transition-all"
                    >
                      {slide.cta}
                    </Link>

                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center min-w-[180px] h-[54px] px-7 border border-[#cdb8a8] text-[#6b3d22] hover:bg-[#f3e8df] text-[14px] font-semibold uppercase tracking-[0.08em] rounded-[6px] transition-all"
                    >
                      Contact Us
                    </Link>
                  </div>

                  <div className="flex items-center gap-5 mt-10 text-[#7b4a2d]">
                    <span className="text-[14px] font-medium">Fast Printing</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b88a67]" />
                    <span className="text-[14px] font-medium">Sharp Output</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b88a67]" />
                    <span className="text-[14px] font-medium">Modern Design</span>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative h-full overflow-hidden bg-[#1a120d] pt-[110px] lg:pt-[0]">
                <div className="absolute  z-10" />

                <img
                  src={slide.image}
                  alt="Printer Banner"
                  className="absolute  w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 z-10" />

              

                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/20 transition-all"
      >
        <ChevronLeft size={24} className="mx-auto" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/20 transition-all"
      >
        <ChevronRight size={24} className="mx-auto" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? 'w-10 bg-[#7c3f10]' : 'w-2 bg-[#ccb8a8]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;