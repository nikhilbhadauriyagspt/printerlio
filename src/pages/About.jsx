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
import aboutMain from '../assets/bannerr/about1.png';
import aboutSecondary from '../assets/bannerr/about2.png';

const About = () => {
  return (
    <div className="bg-white text-slate-900 font-['Poppins']">
      <SEO
        title="About Us | US Printer Store"
        description="Learn more about US Printer Store and our mission to make printing simple and reliable for everyone."
      />

      {/* 1. Hero Section - More Impact */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 bg-gray-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -ml-20 -mb-20" />
        
        <div className="max-w-[1820px] mx-auto px-4 md:px-6 relative z-10">
          <div className="relative">
            <div className="max-w-[900px]">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-blue-800  text-[13px] uppercase tracking-[0.3em] mb-4 block"
              >
                Get to Know Us
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[42px] md:text-[64px]  text-slate-900 leading-[1.1] mb-8"
              >
                Helping You Print <br />
                <span className="text-blue-800">Without the Stress.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-[18px] md:text-[20px] leading-relaxed max-w-[700px]"
              >
                We know that printers can be confusing. That's why we created US Printer Store—a place where you can find reliable machines and original supplies without any complicated tech talk.
              </motion.p>
            </div>
            
            {/* Printer Icon - Bilkul Right */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 12 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-blue-800 rounded-[2.5rem] items-center justify-center text-white"
            >
              <Printer size={80} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Our Approach - Image + Text */}
      <section className="py-24">
        <div className="max-w-[1820px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100"
            >
              <img src={aboutMain} alt="Working with printers" className="w-full h-full object-cover" />
            </motion.div>

            <div className="space-y-8">
              <h2 className="text-[32px] md:text-[42px]  text-slate-900 leading-tight">
                We believe in <span className="text-blue-800">Doing Things Right.</span>
              </h2>
              <p className="text-gray-500 text-[16px] leading-relaxed">
                When we started US Printer Store, we had one goal: to make sure our customers never have to worry about their printing setup again. We noticed too many people were buying the wrong parts or getting stuck with machines that didn't fit their needs.
              </p>
              <p className="text-gray-500 text-[16px] leading-relaxed">
                That's why we hand-pick everything in our store. From small home printers to heavy-duty office machines, we only sell what we know is dependable. We're not just a store; we're your partner in making sure your work gets printed perfectly.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="font-bold text-[15px]">100% Original</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="font-bold text-[15px]">Expert Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="font-bold text-[15px]">Fast Setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="font-bold text-[15px]">Secure Shopping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Pillars - Cards Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1820px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[42px]  text-slate-900 mb-4">What Makes Us Different?</h2>
            <p className="text-gray-500 text-[16px]">Simple rules we follow to give you the best experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Printer, title: 'Simple Choices', desc: 'We only offer the best models, so you dont get lost in a sea of options.' },
              { icon: ShieldCheck, title: 'No Fakes', desc: 'Every ink bottle and toner cartridge is 100% genuine and fresh.' },
              { icon: Truck, title: 'Safe Delivery', desc: 'We pack your orders with care and ship them fast to avoid any delays.' },
              { icon: HelpCircle, title: 'Always Available', desc: 'Got a question? Our team is just a call or message away to help you out.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center mb-6 group-hover:bg-blue-800 group-hover:text-white transition-all">
                  <item.icon size={24} />
                </div>
                <h3 className="text-[20px]  text-slate-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Quality Section - Reverse Image + Text */}
      <section className="py-24">
        <div className="max-w-[1820px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <h2 className="text-[32px] md:text-[42px]  text-slate-900 leading-tight">
                Always <span className="text-blue-800">Reliable Results.</span>
              </h2>
              <p className="text-gray-500 text-[16px] leading-relaxed">
                Whether you're printing important business reports, school projects, or family photos, the quality matters. We make sure that every printer we sell produces sharp, clear prints every single time.
              </p>
              <p className="text-gray-500 text-[16px] leading-relaxed">
                Our team tests the products we carry to ensure they meet our standards for speed and durability. When you shop with US Printer Store, you're getting tools that are built to last and perform.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                  <div className="w-12 h-12 rounded-full bg-blue-800 text-white flex items-center justify-center shrink-0">
                    <ThumbsUp size={20} />
                  </div>
                  <p className="text-blue-900 font-bold text-[15px]">
                    Trusted by thousands of home and office users across the country.
                  </p>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100"
            >
              <img src={aboutSecondary} alt="Printer detail" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-800 rounded-full blur-[120px] opacity-10 -ml-48 -mt-48" />
        <div className="max-w-[1820px] mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-white text-[36px] md:text-[48px]  mb-8">Ready to Upgrade Your Printing?</h2>
          <p className="text-white/60 text-[18px] mb-12 max-w-[600px] mx-auto">
            Browse our collection and find the perfect printer and supplies for your needs today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-12 h-16 bg-blue-800 text-white  rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
            >
              Start Shopping <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-12 h-16 bg-white/5 text-white  rounded-2xl flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
