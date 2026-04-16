import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Using your local asset
import aboutBanner from '@/assets/bannerr/bannn1.png';

export default function AboutSection() {
  return (
    <section className="w-full py-24 bg-white overflow-hidden font-['Poppins']">
      <div className="max-w-[1740px] mx-auto px-4 md:px-8">
        
        <div className="relative flex items-center min-h-[500px]">
          
          {/* 1. Large Rectangular Image (Right aligned) */}
          <div className="w-full md:w-[80%] ml-auto h-[400px] md:h-[700px] relative overflow-hidden bg-gray-100">
            <img 
              src={aboutBanner} 
              alt="Workspace" 
              className="w-full h-full object-cover grayscale-[0.2]"
            />
          </div>

          {/* 2. Landscape Overlapping Card (Left) */}
          {/* No Shadow, No Rounded Corners, Smaller than image height */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[90%] md:w-[600px] bg-white border border-gray-200 p-10 z-20"
          >
            <span className="text-black text-[12px] font-bold uppercase tracking-[0.2em] mb-4 block">
              Professional Standards
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
              Excellence in Every <br /> <span className="text-black">Printed Page.</span>
            </h2>
            
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              At Printing Land, we deliver global standards in printing technology directly to your workspace. Our commitment ensures your office efficiency never stops.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {["Global Solutions", "Quality Certified"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-800 text-sm font-semibold">
                  <CheckCircle2 size={16} className="text-black" />
                  {item}
                </div>
              ))}
            </div>

            <Link 
              to="/about" 
              className="inline-flex items-center gap-4 text-gray-900 font-bold text-sm group border-b-2 border-gray-900 pb-1 hover:text-black hover:border-black transition-all"
            >
              Explore Our Story
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}