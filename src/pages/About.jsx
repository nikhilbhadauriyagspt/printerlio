import React from 'react';
import {
  Shield,
  ArrowRight,
  Layers3,
  Users,
  Target,
  Trophy,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import aboutImg from '@/assets/bannerr/ban1.jpg';

const processCards = [
  {
    title: 'Safe Packaging',
    desc: 'Each printer is packed carefully with proper protection so it reaches you safely and in excellent condition.',
  },
  {
    title: 'Quick Shipping',
    desc: 'We work with reliable delivery partners to make sure your order reaches you on time without unnecessary delays.',
  },
  {
    title: 'Checked Before Dispatch',
    desc: 'Every model is reviewed for quality, performance, and reliability before it is prepared for shipping.',
  },
  {
    title: 'Easy Start Support',
    desc: 'We share simple guidance and setup help so you can begin using your printer smoothly from day one.',
  },
];

const whyChooseUs = [
  {
    icon: Trophy,
    title: 'Reliable Products',
    desc: 'We select printers and accessories that deliver dependable performance for both home and business use.'
  },
  {
    icon: Users,
    title: 'Helpful Assistance',
    desc: 'Our team is here to help you choose the right printer and guide you with basic setup or product questions.'
  },
  {
    icon: Shield,
    title: 'Trusted Shopping',
    desc: 'We focus on a secure and smooth buying experience so you can shop with confidence every time.'
  },
  {
    icon: History,
    title: 'Better Long-Term Value',
    desc: 'Our goal is to provide products that are practical, efficient, and useful for your everyday printing needs.'
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-white text-black font-['Poppins']">
      <SEO
        title="About Us | Printing State"
        description="Learn about our commitment to providing reliable printing solutions for homes and businesses."
      />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pb-20 border-b border-black/10 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
              About Us
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
              Smart Printing Solutions For Everyday Needs
            </h1>
            <p className="mt-4 text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
              We make it easier for homes and businesses to find dependable printers, useful accessories, and simple support in one place.
            </p>
            <div className="flex justify-center mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-[16px] bg-black text-white text-sm font-semibold"
              >
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] bg-white max-w-8xl items-center justify-center  mx-auto">
            <img
              src={aboutImg}
              alt="About Printing State"
              className=" h-[240px] md:h-[360px] lg:h-[460px] object-contain mx-auto"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
            <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Why People Choose Printing State
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-black/60 leading-relaxed">
              We focus on quality products, simple service, and a smooth shopping experience from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[24px] border border-black/10 bg-white p-6 md:p-7"
              >
                <div className="h-14 w-14 rounded-[18px] border border-black/10 bg-white flex items-center justify-center mb-5">
                  <item.icon size={26} className="text-black" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-sm md:text-[15px] leading-relaxed text-black/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-16 md:py-20 bg-white border-y border-black/10">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
            <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
              Our Purpose
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Built Around Quality And Simplicity
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-black/60 leading-relaxed">
              Everything we do is centered around making printer shopping and usage easier for our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
            <div className="rounded-[28px] border border-black/10 bg-white p-7 md:p-10">
              <Target size={42} className="text-black mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Our Mission
              </h3>
              <p className="text-black/60 text-sm md:text-base lg:text-lg leading-relaxed">
                Our mission is to provide dependable printers, useful accessories, and straightforward guidance that help customers print with confidence and convenience.
              </p>
            </div>

            <div className="rounded-[28px] border border-black/10 bg-white p-7 md:p-10">
              <Layers3 size={42} className="text-black mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Our Vision
              </h3>
              <p className="text-black/60 text-sm md:text-base lg:text-lg leading-relaxed">
                Our vision is to become a trusted destination for modern printing needs by offering practical products, reliable service, and a better overall customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
            <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
              Our Process
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              How We Deliver Better Service
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-black/60 leading-relaxed">
              From product selection to delivery, we follow a careful process to make your experience smooth and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
            {processCards.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[24px] border border-black/10 bg-white p-6 md:p-7"
              >
                <span className="text-3xl md:text-4xl font-bold text-black/20 block mb-5">
                  0{idx + 1}
                </span>
                <h4 className="text-lg md:text-xl font-semibold text-black mb-3">
                  {item.title}
                </h4>
                <p className="text-sm md:text-[15px] leading-relaxed text-black/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="rounded-[30px] border border-black/10 bg-white p-8 md:p-14 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
                Explore More
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-5">
                Looking For The Right Printer?
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-black/60 leading-relaxed mb-8 md:mb-10">
                Discover printers and accessories designed for everyday use, office work, and reliable performance.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/shop"
                  className="px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold"
                >
                  Browse Catalog
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 rounded-[16px] border border-black/10 bg-white text-black text-sm font-semibold"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;