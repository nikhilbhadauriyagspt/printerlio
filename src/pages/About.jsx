import React from 'react';
import { 
  Printer, 
  Settings, 
  ShieldCheck, 
  Truck, 
  CheckCircle2,
  ArrowRight,
  PackageCheck,
  ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import aboutImg from '@/assets/bannerr/about1.png';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-[#111111] font-['Poppins']">
      <SEO
        title="About Us | Printing Land"
        description="Your trusted destination for quality printers and genuine printing supplies."
      />

      {/* --- Simple Hero Section --- */}
      <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="text-black font-bold text-[12px] uppercase tracking-widest mb-4 block">Our Story</span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Quality Printing <br /> 
              <span className="text-black">Delivered to Your Door.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              At Printing Land, we focus on one thing: providing the best printing hardware and supplies for your home and office. We believe that quality printing should be accessible, reliable, and straightforward.
            </p>
          </div>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={aboutImg} 
                alt="Printer Collection" 
                className="w-full h-auto grayscale-[0.2] border border-gray-100 shadow-2xl"
              />
            </div>
            
            <div className="order-1 lg:order-2 space-y-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">What We Offer</h2>
                <p className="text-gray-500 leading-relaxed font-medium">
                  We maintain a diverse inventory of printers and essential supplies to ensure you never face downtime. Whether you are looking for a new machine or just need to restock your ink and toner, we have you covered.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-50 text-black flex items-center justify-center">
                    <Printer size={24} />
                  </div>
                  <h4 className="font-bold text-lg">Wide Selection</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">A variety of printer models suited for every budget and requirement.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-50 text-black flex items-center justify-center">
                    <Settings size={24} />
                  </div>
                  <h4 className="font-bold text-lg">Essential Supplies</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">High-quality ink and toner cartridges for all major printer models.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-50 text-black flex items-center justify-center">
                    <PackageCheck size={24} />
                  </div>
                  <h4 className="font-bold text-lg">Verified Quality</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Every product is inspected to ensure it meets our performance standards.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-50 text-black flex items-center justify-center">
                    <Truck size={24} />
                  </div>
                  <h4 className="font-bold text-lg">Fast Delivery</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Efficient shipping to get your printing supplies to you as quickly as possible.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Why Us Section (Clean List) --- */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-6">Our Commitment <br /> to You</h2>
              <p className="text-gray-400 font-medium">We pride ourselves on providing a seamless shopping experience and products you can depend on day after day.</p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                "Carefully curated product catalog",
                "Competitive pricing on all items",
                "Simple and secure checkout process",
                "Reliable nationwide shipping",
                "Easy-to-browse category sections",
                "Dedicated to customer satisfaction"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={20} />
                  <span className="text-lg font-medium text-gray-200">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Simple CTA --- */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="bg-black p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Looking for something specific?</h2>
              <p className="text-blue-100 font-medium text-lg">Explore our full range of products today.</p>
            </div>
            <Link to="/shop" className="px-10 py-5 bg-white text-black font-bold text-[14px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center gap-3">
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
