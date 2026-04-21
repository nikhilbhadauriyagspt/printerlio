import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Local banner images
import banner1 from '../assets/bannerr/21.png';
import banner2 from '../assets/bannerr/22.png';

const slides = [
  {
    id: 1,
    image: banner1,
    alt: 'Printer Banner 1',
  },
  {
    id: 2,
    image: banner2,
    alt: 'Printer Banner 2',
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
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-screen  overflow-hidden bg-white">
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-[#222] shadow-md transition-all"
        >
          <ChevronLeft size={22} className="mx-auto" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-[#222] shadow-md transition-all"
        >
          <ChevronRight size={22} className="mx-auto" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === current
                  ? 'w-8 h-2 bg-white'
                  : 'w-2.5 h-2.5 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;