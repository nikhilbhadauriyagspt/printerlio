import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Local asset
import aboutBanner from '../assets/bannerr/24.png';
import aboutBanner1 from '../assets/bannerr/25.png';


const showcaseCards = [
  {
    titleTop: 'Wireless and',
    titleBottom: 'Modern Printing',
    desc: 'Discover dependable printers built for home tasks, office work and daily printing with better speed, cleaner output and smooth everyday performance.',
    buttonText: 'LEARN MORE',
    imagePosition: 'left',
  },
  {
    titleTop: 'Home and',
    titleBottom: 'Office Use',
    desc: 'Find practical printer solutions for documents, school work, business tasks and everyday printing convenience with easy setup and reliable results.',
    buttonText: 'LEARN MORE',
    imagePosition: 'right',
  },
];

export default function AboutSection() {
  return (
    <section className="w-full bg-white  overflow-hidden font-['Poppins']">
      <div className="max-w-[1820px] mx-auto px-4 md:px-10">
        
        {/* Centered Heading Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#001e3c]">About Us</span>
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
          </div>
          
          <h2 className="text-[34px] md:text-[46px] font-semibold text-[#001e3c] leading-tight mb-4">
            Our Mission & <span className="text-[#fbb124]">Values</span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-[700px]">
            Delivering excellence in printing technology. We are dedicated to providing 
            top-tier solutions for all your professional and home printing needs.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="w-full   overflow-hidden">
            {showcaseCards.map((card, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 items-center min-h-[360px] md:min-h-[420px] lg:min-h-[460px] ${
                  index !== showcaseCards.length - 1
                    ? ''
                    : ''
                }`}
              >
                {card.imagePosition === 'left' ? (
                  <>
                    {/* Image Side */}
                    <div className="relative h-full flex items-center justify-center px-8 md:px-14 lg:px-16 py-10 md:py-14 ">
                      <div className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full bg-[#d98a17]/8 blur-3xl" />
                      <img
                        src={aboutBanner}
                        alt={card.titleTop + ' ' + card.titleBottom}
                        className="relative z-10 w-full max-w-[220px] md:max-w-[280px] lg:max-w-[720px] object-contain"
                      />
                    </div>

                    {/* Content Side */}
                    <div className="h-full flex items-center px-8 md:px-12 lg:px-16 py-10 md:py-14">
                      <div className="max-w-[860px]">
                        <h3 className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] leading-[1.02] font-semibold text-[#222] mb-5">
                          <span className="text-[#d98a17]">{card.titleTop} </span>
                          
                          {card.titleBottom}
                        </h3>

                        <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-7 text-[#6f6b63] mb-8 max-w-[520px]">
                          {card.desc}
                        </p>

                        <Link
                          to="/about"
                          className="inline-flex items-center justify-center h-[52px] md:h-[58px] px-8 md:px-10 bg-[#df8b18] hover:bg-[#c97a10] text-white text-[13px] md:text-[14px] font-bold tracking-[0.08em] transition-all rounded-md "
                        >
                          {card.buttonText}
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Content Side */}
                    <div className="h-full flex items-center px-8 md:px-12 lg:px-16 py-10 md:py-14 order-2 lg:order-1">
                      <div className="max-w-[860px]">
                        <h3 className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] leading-[1.02] font-semibold text-[#222] mb-5">
                          <span className="text-[#d98a17]">{card.titleTop} </span>
                         
                          {card.titleBottom}
                        </h3>

                        <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-7 text-[#6f6b63] mb-8 max-w-[520px]">
                          {card.desc}
                        </p>

                        <Link
                          to="/about"
                          className="inline-flex items-center justify-center h-[52px] md:h-[58px] px-8 md:px-10 bg-[#df8b18] hover:bg-[#c97a10] text-white text-[13px] md:text-[14px] font-bold tracking-[0.08em] transition-all rounded-md "
                        >
                          {card.buttonText}
                        </Link>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className="relative h-full flex items-center justify-center px-8 md:px-14 lg:px-16 py-10 md:py-14  order-1 lg:order-2">
                      <div className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full bg-[#d98a17]/8 blur-3xl" />
                      <img
                        src={aboutBanner1}
                        alt={card.titleTop + ' ' + card.titleBottom}
                        className="relative z-10 w-full max-w-[220px] md:max-w-[280px] lg:max-w-[720px] object-contain "
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}