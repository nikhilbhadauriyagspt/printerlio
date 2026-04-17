import React from 'react';
import {
  Printer,
  Settings,
  Truck,
  CheckCircle2,
  ArrowRight,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import aboutImg from '@/assets/bannerr/bannn1.png';

const features = [
  {
    icon: <Printer size={22} />,
    title: 'Wide Printer Range',
    desc: 'Browse dependable printer options for home, office, and business printing.',
  },
  {
    icon: <Settings size={22} />,
    title: 'Essential Supplies',
    desc: 'Find quality ink, toner, and accessories for smooth day-to-day printing.',
  },
  {
    icon: <PackageCheck size={22} />,
    title: 'Checked Quality',
    desc: 'Products are selected with a focus on performance, reliability, and value.',
  },
  {
    icon: <Truck size={22} />,
    title: 'Fast Delivery',
    desc: 'Quick shipping helps you get the printing products you need without delay.',
  },
];

const commitments = [
  'Carefully selected printer collection',
  'Reliable products for daily use',
  'Simple and secure online shopping',
  'Smooth ordering experience',
  'Helpful support when needed',
  'Solutions for home and office printing',
];

const About = () => {
  return (
    <div className="pt-20 bg-[#fbf8f5] text-[#111111] font-['Poppins']">
      <SEO
        title="About Us | MyPrinterHero"
        description="Your trusted destination for quality printers and genuine printing supplies."
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#ebe1d8] bg-[#f4eeea]">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-16 md:py-20 lg:py-24">
          <div className="max-w-[900px] mx-auto text-center">
            <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-4">
              Our Story
            </span>

            <h1 className="text-[36px] md:text-[52px] lg:text-[66px] leading-[0.98] font-semibold text-[#241812]">
              Smart Printing
              <br />
              Starts with the Right Store
            </h1>

            <p className="mt-5 text-[#6b5d54] text-[15px] md:text-[17px] leading-8 max-w-[760px] mx-auto">
              At MyPrinterHero, we focus on making printers and printing supplies easier
              to explore, compare, and choose for home, office, and everyday business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Image + Intro */}
      <section className="py-14 md:py-16 lg:py-20">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_1fr] gap-10 lg:gap-14 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#d8c3b3] translate-x-4 translate-y-4 rounded-[28px] hidden md:block" />
              <div className="relative rounded-[28px] overflow-hidden border border-[#eadfd6] bg-white">
                <img
                  src={aboutImg}
                  alt="Printer Collection"
                  className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover"
                />
              </div>
            </div>

            <div>
              <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-4">
                Who We Are
              </span>

              <h2 className="text-[30px] md:text-[42px] lg:text-[50px] leading-[1.02] font-semibold text-[#241812] mb-5">
                A Reliable Place
                <br />
                for Better Printing
              </h2>

              <p className="text-[#6b5d54] text-[15px] md:text-[16px] leading-8 mb-5">
                We bring together practical printer choices, genuine supplies, and useful
                shopping support so customers can find what fits their setup without
                unnecessary confusion.
              </p>

              <p className="text-[#6b5d54] text-[15px] md:text-[16px] leading-8 mb-8">
                Whether you are upgrading an office printer, buying a compact home model,
                or restocking important accessories, our goal is to make the process simple,
                smooth, and dependable.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-[22px] border border-[#e9dfd6] bg-white p-5"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-[18px] font-semibold text-[#241812] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[14px] leading-6 text-[#6b5d54]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-14 md:py-16 lg:py-20 bg-[#2d1a11] text-white">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10">
          <div className="text-center max-w-[820px] mx-auto mb-10 md:mb-12">
            <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-white/60 mb-4">
              Our Commitment
            </span>

            <h2 className="text-[30px] md:text-[42px] lg:text-[50px] leading-[1.02] font-semibold mb-5">
              Built Around Simplicity,
              <br />
              Quality, and Trust
            </h2>

            <p className="text-white/70 text-[15px] md:text-[16px] leading-8">
              We aim to create a smoother shopping experience with practical product choices,
              dependable support, and solutions customers can rely on every day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {commitments.map((text, i) => (
              <div
                key={i}
                className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#f0c29f]">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-[15px] md:text-[16px] leading-7 text-white/85">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-16 lg:py-20">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10">
          <div className="rounded-[32px] border border-[#eadfd6] bg-white px-6 md:px-10 lg:px-14 py-10 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-[760px]">
              <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-3">
                Shop with Confidence
              </span>

              <h2 className="text-[28px] md:text-[40px] lg:text-[46px] font-semibold leading-[1.05] text-[#241812] mb-4">
                Looking for the Right
                <br className="hidden md:block" />
                Printer or Supply?
              </h2>

              <p className="text-[#6b5d54] text-[15px] md:text-[16px] leading-8">
                Explore our collection and discover dependable printers, accessories,
                and everyday printing essentials in one place.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-3 h-[50px] px-8 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all shrink-0"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;