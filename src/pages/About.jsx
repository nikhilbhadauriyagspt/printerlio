import React from 'react';
import {
  Printer,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Heart,
  Smile,
  Zap,
  HelpCircle,
  ThumbsUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

// Using different images from your assets
import aboutMain from '../assets/bannerr/ban1.png';
import aboutSecondary from '../assets/bannerr/about2.png';

const About = () => {
  return (
    <div className="bg-white text-[#001e3c] font-['Poppins']">
      <SEO
        title="About Us | Printer Lio"
        description="Learn more about Printer Lio and our mission to make printing simple and reliable for everyone."
      />

      {/* 1. Centered Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-20 md:pb-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full opacity-5 pointer-events-none">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#fbb124] rounded-full blur-[120px]" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#001e3c] rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-[1820px] mx-auto px-4 md:px-10 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 mb-6 bg-white px-5 py-2 rounded-full shadow-sm border border-gray-100"
          >
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            <span className="text-[#001e3c] text-[12px] font-bold uppercase tracking-[0.2em]">Our Story</span>
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[40px] md:text-[50px] font-semibold text-[#001e3c] leading-tight mb-8  tracking-tight"
          >
            Printing Simplified. <br />
            <span className="text-[#fbb124]">Performance Guaranteed.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-[18px] md:text-[20px] leading-relaxed max-w-[800px] mx-auto"
          >
            At Printer Lio, we bridge the gap between complex technology and everyday needs. 
            We provide precision-engineered machines and genuine supplies for home, 
            business, and industrial growth.
          </motion.p>
        </div>
      </section>

      {/* 2. Our Mission - Centered Image + Clean Grid */}
      <section className="py-24 px-4 md:px-10">
        <div className="max-w-[1820px] mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-[32px] md:text-[46px] font-semibold mb-6">Our <span className="text-[#fbb124]">Mission</span></h2>
            <p className="text-gray-500 text-[16px] max-w-[700px] leading-relaxed">
              We started with a single purpose: to ensure our customers never struggle with their printing needs. 
              Reliability is at the core of everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100"
            >
              <img src={aboutMain} alt="Professional Setup" className="w-full h-full object-cover aspect-[4/3]" />
            </motion.div>

            <div className="space-y-10 text-left lg:pl-10">
              <h3 className="text-[28px] md:text-[34px] font-semibold leading-tight text-[#001e3c]">
                Driven by Quality, Focused on <span className="text-[#fbb124]">Reliability.</span>
              </h3>
              <p className="text-gray-500 text-[16px] leading-relaxed">
                Every product in our inventory undergoes a rigorous selection process. We only carry brands and models that meet our high standards for speed, clarity, and longevity.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  { label: 'Genuine Products', icon: ShieldCheck },
                  { label: 'Expert Consultation', icon: Smile },
                  { label: 'Fast Deployment', icon: Zap },
                  { label: 'Verified Security', icon: ShieldCheck }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-gray-100 group hover:bg-[#001e3c] transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#001e3c] flex items-center justify-center shadow-sm group-hover:bg-[#fbb124]">
                      <item.icon size={20} />
                    </div>
                    <span className="font-semibold text-[15px] group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Values Section - Circular/Unique Cards */}
      <section className="py-24 bg-slate-50 px-4 md:px-10">
        <div className="max-w-[1820px] mx-auto text-center">
          <div className="flex flex-col items-center justify-center text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#001e3c]"></span>
              <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#001e3c]">Why Us</span>
              <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            </div>
            <h2 className="text-[34px] md:text-[46px] font-semibold text-[#001e3c]">The  Printer Lio <span className="text-[#fbb124]">Standard</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Printer, title: 'Selected Range', desc: 'Handpicked models specifically for performance and durability.' },
              { icon: ShieldCheck, title: 'Authenticity', desc: '100% original ink and supplies directly from the manufacturers.' },
              { icon: Truck, title: 'Elite Logistics', desc: 'Secure packaging and tracked shipping for every single order.' },
              { icon: HelpCircle, title: 'Priority Support', desc: 'Our dedicated specialists are always on standby for your technical needs.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 group text-center"
              >
                <div className="w-20 h-20 rounded-full bg-slate-50 text-[#001e3c] flex items-center justify-center mb-8 mx-auto group-hover:bg-[#001e3c] group-hover:text-[#fbb124] transition-all border-4 border-white shadow-lg">
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-[20px] font-semibold text-[#001e3c] mb-4 uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-400 text-[14px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final CTA Section - Centered & Impactful */}
      <section className="py-24 px-4 md:px-10 bg-white">
        <div className="max-w-[1820px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#001e3c] rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fbb124] rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-white text-[38px] md:text-[40px] font-semibold mb-8 leading-tight  tracking-tight">
                Ready to Upgrade Your <span className="text-[#fbb124]">Printing Technology?</span>
              </h2>
              <p className="text-white/50 text-[18px] md:text-[20px] mb-14 max-w-[700px] mx-auto leading-relaxed font-medium">
                Join thousands of businesses and homes that trust us for precision, 
                quality, and professional support.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-12 h-16 bg-[#fbb124] text-[#001e3c] font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl uppercase tracking-widest text-[14px]"
                >
                  Explore Collection <ArrowRight size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-12 h-16 bg-white/5 text-white font-bold rounded-2xl flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10 transition-all uppercase tracking-widest text-[14px]"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
