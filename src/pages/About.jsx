import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Heart, Star, Globe, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
import aboutHero from "@/assets/bannerr/about.jpg";
import sideBanner from "@/assets/bannerr/banner4.jpg";

const About = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      <SEO 
        title="About Us | MaxPrinter" 
        description="Learn about the philosophy and engineering behind MaxPrinter hardware solutions."
      />

      {/* --- AUTHENTIC HERO (SQUARE) --- */}
      <section className="w-full bg-white py-4 px-6 md:px-10">
        <div className="max-w-[1920px] mx-auto">
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
            <img src={aboutHero} alt="Hardware Excellence" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10" />
            
            <div className="relative z-20 h-full flex items-center px-10 md:px-20">
              <div className="max-w-2xl space-y-6">
                <span className="text-blue-400 font-bold text-sm">Professional office hardware</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
                  Engineering the <br />
                  <span className="text-blue-600">modern workplace.</span>
                </h1>
                <p className="text-white/70 text-sm md:text-lg font-medium leading-relaxed max-w-lg">
                  We are a specialized hardware partner focused on bridging the gap between high-performance technology and seamless office deployment.
                </p>
                <div className="pt-2">
                  <Link to="/shop" className="inline-flex items-center gap-3 bg-white text-black h-12 px-8 text-xs font-black hover:bg-blue-600 hover:text-white transition-all group/btn">
                    Browse inventory <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGINEERING PHILOSOPHY: ARCHITECTURAL GRID --- */}
      <section className="py-20 lg:py-32 bg-white px-6 md:px-10">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]">
                  Our professional <br /> foundation.
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                  Every unit in our inventory undergoes a rigorous internal verification process. We don't just sell hardware; we ensure every device meets a specific standard for performance, clarity, and lifecycle reliability.
                </p>
              </div>
              
              <div className="space-y-8">
                {[
                  { title: "Hardware sourcing", desc: "We work directly with manufacturer laboratories to ensure 100% genuine hardware and supplies." },
                  { title: "Internal verification", desc: "Our team performs comprehensive stress tests on every new model before it enters our catalog." },
                  { title: "Office scaling", desc: "Providing the guidance needed to grow your office infrastructure sustainably and efficiently." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="h-px w-10 bg-blue-600 mt-3 shrink-0 group-hover:w-16 transition-all duration-500" />
                    <div className="space-y-2">
                      <h4 className="text-xl font-black text-slate-900">{item.title}</h4>
                      <p className="text-[15px] text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-gray-50 p-4 border border-gray-100">
                <div className="bg-slate-900 p-10 md:p-16 text-white space-y-10">
                  <div className="h-14 w-14 bg-white/5 border border-white/10 flex items-center justify-center">
                    <Heart className="text-blue-500" size={28} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black leading-tight">
                      A human approach <br /> to complex gear.
                    </h3>
                    <p className="text-slate-400 text-base font-bold leading-relaxed">
                      We believe that professional hardware shouldn't come with complicated support. Our team consists of trained specialists ready to provide clear, actionable advice for your specific workplace needs.
                    </p>
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-3 text-white border-b border-white/20 pb-1 hover:text-blue-400 hover:border-blue-400 transition-all font-black text-xs uppercase tracking-widest">
                    Connect with an expert
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECONDARY IMAGE BLOCK --- */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-[1920px] mx-auto">
          <div className="relative h-[300px] md:h-[400px] overflow-hidden border border-gray-100">
            <img src={sideBanner} alt="Precision hardware" className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 text-center max-w-lg border border-gray-100 shadow-2xl">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Quality without compromise.</h3>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Verified terminal standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CALL: MINIMALIST --- */}
      <section className="py-24 bg-white text-center px-6 border-t border-gray-50">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]">
            Ready to find your <br /> perfect hardware?
          </h2>
          <div className="pt-4">
            <Link to="/shop" className="inline-flex items-center gap-4 bg-black text-white h-14 px-12 text-xs font-black hover:bg-blue-600 transition-all group/cta">
              Explore inventory
              <ArrowRight size={18} className="group-hover/cta:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
