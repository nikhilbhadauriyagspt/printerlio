import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Using your local assets
import banner1 from '../assets/bannerr/newban2.png';
import banner2 from '../assets/bannerr/ban2.png';

const slides = [
  { id: 1, image: banner1 },
  { id: 2, image: banner2 }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] xl:h-[750px] overflow-hidden bg-white">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => (
          <Link
            to="/shop"
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt="Banner"
              className="w-full h-full object-cover object-center cursor-pointer"
            />
          </Link>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors"
      >
        <ChevronRight size={32} />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              idx === current ? 'w-8 bg-black' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;