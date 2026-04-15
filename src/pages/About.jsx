import React from 'react';
import {
  Shield,
  ArrowRight,
  Layers3,
  Users,
  Target,
  Trophy,
  History,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import aboutImg from '@/assets/bannerr/about1.png';

const processCards = [
  {
    title: 'Safe Packaging',
    desc: 'Each printer is packed carefully with proper protection so it reaches you safely.',
    icon: <Shield size={18} />
  },
  {
    title: 'Quick Shipping',
    desc: 'We work with reliable delivery partners to make sure your order reaches you on time.',
    icon: <Zap size={18} />
  },
  {
    title: 'Quality Checked',
    desc: 'Every model is reviewed for performance and reliability before it is prepared.',
    icon: <CheckCircle2 size={18} />
  },
  {
    title: 'Easy Setup',
    desc: 'We share simple guidance and setup help so you can begin using your printer smoothly.',
    icon: <Users size={18} />
  },
];

const whyChooseUs = [
  {
    icon: Trophy,
    title: 'Reliable Products',
    desc: 'Dependable performance for both home and business use.',
    color: 'text-blue-500'
  },
  {
    icon: Users,
    title: 'Helpful Assistance',
    desc: 'Our team is here to help you choose the right printer.',
    color: 'text-blue-500'
  },
  {
    icon: Shield,
    title: 'Trusted Shopping',
    desc: 'A secure and smooth buying experience every time.',
    color: 'text-blue-500'
  },
  {
    icon: History,
    title: 'Long-Term Value',
    desc: 'Practical, efficient, and useful for everyday needs.',
    color: 'text-blue-500'
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-white text-[#333] font-poppins">
      <SEO
        title="About Us | Printistan"
        description="Learn about our commitment to providing reliable printing solutions for homes and businesses."
      />

      {/* --- MINIMAL HERO --- */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 border-b border-gray-50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 text-center md:text-left"
            >
              <span className="text-[11px] font-bold text-blue-600 tracking-[0.2em] uppercase mb-4 block">Our Story</span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#111] leading-tight mb-6">
                Reliable Printing Solutions for <span className="text-blue-600 font-light italic">Everyday Life.</span>
              </h1>
              <p className="text-[16px] md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto md:mx-0 mb-10 font-light">
                We make it easier for homes and businesses to find dependable printers, useful accessories, and simple support in one place.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
                <Link
                  to="/shop"
                  className="px-8 py-3.5 bg-[#111] text-white text-[14px] font-medium rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2 group"
                >
                  Explore Shop <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3.5 border border-gray-200 text-[#111] text-[14px] font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 flex justify-center md:justify-end"
            >
              <img src={aboutImg} alt="Hardware" className="w-full max-w-md lg:max-w-xl h-auto object-contain mix-blend-multiply opacity-90" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- REFINED VALUES --- */}
      <section className="py-24">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="text-center md:text-left">
                <div className="mb-6 inline-block md:block">
                   <item.icon size={26} className={item.color} strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-semibold text-[#111] mb-3">{item.title}</h3>
                <p className="text-[14px] text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            <div>
              <div className="flex items-center gap-3 mb-6">
                 <Target size={20} className="text-blue-600" />
                 <h3 className="text-xl font-semibold text-[#111]">Our Mission</h3>
              </div>
              <p className="text-[15px] md:text-[16px] text-gray-500 font-light leading-relaxed">
                Our mission is to provide dependable printers, useful accessories, and straightforward guidance that help customers print with confidence and convenience.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                 <Layers3 size={20} className="text-blue-600" />
                 <h3 className="text-xl font-semibold text-[#111]">Our Vision</h3>
              </div>
              <p className="text-[15px] md:text-[16px] text-gray-500 font-light leading-relaxed">
                Our vision is to become a trusted destination for modern printing needs by offering practical products, reliable service, and a better overall customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROCESS STEPS --- */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
          <h2 className="text-center text-3xl font-semibold mb-20">How We Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {processCards.map((item, idx) => (
              <div key={idx} className="p-8 border border-gray-100 rounded-2xl hover:border-blue-100 transition-colors bg-white shadow-sm">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[13px] font-bold mb-6">
                  0{idx + 1}
                </div>
                <h4 className="text-[16px] font-semibold text-[#111] mb-3">{item.title}</h4>
                <p className="text-[14px] text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MINIMAL CTA --- */}
      <section className="pb-24">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="bg-[#111] rounded-[2.5rem] py-16 px-8 md:py-24 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight">
                Ready to Upgrade Your <br />
                <span className="text-blue-500 font-light italic">Printing Experience?</span>
              </h2>
              <p className="text-[15px] md:text-lg text-gray-400 font-light mb-10 leading-relaxed">
                Discover printers and accessories designed for everyday use, office work, and reliable performance.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <Link
                  to="/shop"
                  className="px-10 py-4 bg-blue-600 text-white rounded-xl font-medium text-[15px] hover:bg-white hover:text-[#111] transition-all active:scale-95"
                >
                  Browse Catalog
                </Link>
                <Link
                  to="/contact"
                  className="px-10 py-4 border border-white/20 text-white rounded-xl font-medium text-[15px] hover:bg-white/10 transition-all active:scale-95"
                >
                  Contact Support
                </Link>
              </div>
            </div>
            {/* Subtle Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -ml-32 -mb-32" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
