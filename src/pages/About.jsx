import React from 'react';
import {
  Cpu,
  HardDrive,
  Printer,
  SlidersHorizontal,
  Shield,
  Wifi,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers3,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import banner2 from '@/assets/bannerr/about.png';

const offerings = [
  {
    title: 'Inkjet Printers',
    desc: 'Perfect for high-quality photo printing and everyday home documents with vibrant color reproduction.',
  },
  {
    title: 'Laser Printers',
    desc: 'The go-to choice for fast, crisp text documents and high-volume office tasks.',
  },
  {
    title: 'All-in-One Units',
    desc: 'Versatile machines that combine printing, scanning, copying, and faxing into one space-saving device.',
  },
  {
    title: 'Ink & Toner Supplies',
    desc: 'A comprehensive range of cartridges and tanks to keep your machines running without interruption.',
  },
];

const features = [
  'Vibrant Color Output',
  'Crisp Black Text',
  'Easy Wireless Setup',
  'Fast Print Speeds',
  'Energy Efficient Models',
  'Quiet Operation Modes',
  'High Paper Capacity',
  'Reliable Scanning',
  'Compact Designs',
  'Durable Build Quality',
];

const processCards = [
  {
    title: 'Secure Packaging',
    desc: 'Every printer is protected with specialized cushioning to ensure it arrives at your doorstep without a single scratch.',
  },
  {
    title: 'Prompt Delivery',
    desc: 'We coordinate with leading delivery services across the USA to get your printer to you as quickly as possible.',
  },
  {
    title: 'Quality Check',
    desc: 'Before any item is listed, we ensure it meets our standards for performance and reliability.',
  },
  {
    title: 'Clear Documentation',
    desc: 'We provide easy-to-follow guides and information for every model we carry in our store.',
  },
  {
    title: 'National Reach',
    desc: 'Serving homes and businesses in every state with reliable printing equipment and supplies.',
  },
  {
    title: 'Usage Tips',
    desc: 'Learn how to optimize your printer settings for better quality and lower ink consumption.',
  },
];

const supportPoints = [
  'Expert Guidance on Model Selection',
  'Comprehensive Setup Instructions',
  'Guidance on Ink & Toner Compatibility',
];

const leftModules = [
  {
    icon: Printer,
    title: 'Home Printing',
    desc: 'Reliable everyday printers designed for assignments, bills, family documents, and routine color printing at home.',
  },
  {
    icon: Layers3,
    title: 'Office Efficiency',
    desc: 'Fast and dependable machines built for frequent printing, sharp text output, and smoother daily workflows.',
  },
  {
    icon: HardDrive,
    title: 'Supplies & Support',
    desc: 'Ink, toner, accessories, and practical guidance to keep your printer running with less interruption.',
  },
];

const rightModules = [
  {
    icon: SlidersHorizontal,
    title: 'Advanced Features',
    desc: 'Wireless printing, duplex support, mobile connectivity, and productivity-focused functions for modern users.',
  },
  {
    icon: Shield,
    title: 'Trusted Performance',
    desc: 'Carefully selected models focused on consistent results, dependable operation, and long-term value.',
  },
  {
    icon: Wifi,
    title: 'Smart Connectivity',
    desc: 'Simple setup across Wi-Fi networks, mobile devices, laptops, and office environments for flexible printing.',
  },
];

const architectureStats = [
  { value: 'Wide', label: 'Printer Range' },
  { value: 'Home + Office', label: 'Use Cases Covered' },
  { value: 'Clear', label: 'Buying Guidance' },
  { value: 'Reliable', label: 'Long-Term Support' },
];

const FloatingCard = ({ item, align = 'left' }) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className={`flex items-start gap-4 ${align === 'right' ? 'md:flex-row-reverse md:text-right' : ''}`}
    >
      <div className="h-14 w-14 shrink-0 rounded-full border border-blue-100 bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
        <Icon size={22} />
      </div>

      <div className={align === 'right' ? 'max-w-xs' : 'max-w-xs'}>
        <h3 className="text-xl font-black  text-slate-950">{item.title}</h3>
        <p className="mt-2 text-sm md:text-[15px] leading-7 font-medium text-slate-500">{item.desc}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8fb] text-slate-900">
      <SEO
        title="About Us | Printer Loop"
        description="Learn about our wide range of printers, ink, toner solutions, and dependable support for home and office printing needs."
      />

      <section className="relative overflow-hidden pt-24 md:pt-28 lg:pt-25 pb-20 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_35%),linear-gradient(to_bottom,#f8fafc,#f7f8fb)]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto w-full max-w-full px-4 md:px-8 lg:px-10 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-5 py-2 text-[10px] font-black uppercase tracking-[0.32em] text-blue-600 shadow-sm">
              <Sparkles size={14} />
              Printer Collection
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.98]  text-slate-950">
              Find the Right
              <span className="block text-blue-600">Printer for Every Need</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base md:text-xl font-medium leading-8 text-slate-500">
              Explore a thoughtfully organized printer range built for homes, offices, creative work, and everyday document needs with dependable performance.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 items-center gap-10 xl:grid-cols-[1fr_520px_1fr] 2xl:grid-cols-[1fr_580px_1fr]">
            <div className="space-y-10 lg:space-y-14">
              {leftModules.map((item, index) => (
                <FloatingCard key={index} item={item} align="left" />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="relative mx-auto flex w-full max-w-[580px] items-center justify-center"
            >
              <div className="absolute inset-0 -z-10 rounded-full bg-blue-100/70 blur-3xl" />

              <div className="relative flex h-[360px] w-[360px] items-center justify-center rounded-full border-[14px] border-white bg-white shadow-[0_30px_90px_rgba(15,23,42,0.10)] md:h-[430px] md:w-[430px]">
                <img
                  src={banner2}
                  alt="Modern printer workspace"
                  className="h-full w-full rounded-full object-cover"
                />

                <div className="absolute -left-2 bottom-10 md:-left-5 md:bottom-14 h-14 w-14 rounded-2xl bg-slate-950 text-blue-400 shadow-xl flex items-center justify-center">
                  <Zap size={22} />
                </div>

                <div className="absolute -right-3 top-10 md:-right-6 md:top-12 h-14 w-14 rounded-2xl bg-white text-blue-600 shadow-xl flex items-center justify-center border border-slate-100">
                  <SlidersHorizontal size={22} />
                </div>
              </div>
            </motion.div>

            <div className="space-y-10 lg:space-y-14">
              {rightModules.map((item, index) => (
                <FloatingCard key={index} item={item} align="right" />
              ))}
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-slate-950 px-8 py-4 text-[12px] font-black uppercase tracking-[0.18em] text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Consult a Printer Expert
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
 
      <section className="border-y border-slate-200/70 bg-white py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-full gap-8 px-4 md:px-8 lg:grid-cols-12 lg:px-10 xl:px-16">
          <div className="lg:col-span-5">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-slate-700">
                <Shield size={14} className="text-blue-600" />
                Our Commitment to Support
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-black leading-tight text-slate-950">
                Buying a printer is only the beginning.
              </h2>
              <p className="mt-5 text-base md:text-lg font-medium leading-8 text-slate-500">
                We are committed to helping you maintain your machine for years to come. Whether you need guidance on supplies or setup, our resources are designed to keep things simple.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 md:grid-cols-3">
              {supportPoints.map((item, i) => (
                <div
                  key={i}
                  className="rounded-[28px] border border-slate-200/70 bg-[#f8fafc] p-6 shadow-sm"
                >
                  <CheckCircle2 size={22} className="mb-4 text-blue-600" />
                  <p className="text-sm font-black uppercase tracking-[0.14em] leading-6 text-slate-900">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto w-full max-w-full px-4 md:px-8 lg:px-10 xl:px-16">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-blue-600">
              Our Careful Process
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-black leading-tight text-slate-950">
              Thoughtful handling at every step.
            </h2>
            <p className="mt-5 text-base md:text-lg font-medium leading-8 text-slate-500">
              We handle every order with care, making sure your machine arrives in excellent condition and is backed by clear information and practical guidance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {processCards.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-[30px] border border-slate-200/70 bg-white p-7 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <span className="text-lg font-black">0{idx + 1}</span>
                  </div>
                  <span className="text-5xl font-black text-slate-100">0{idx + 1}</span>
                </div>
                <h4 className="text-lg font-black text-slate-950">{item.title}</h4>
                <p className="mt-3 text-sm md:text-base font-medium leading-7 text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto w-full max-w-[1450px] px-4 md:px-8 lg:px-10 xl:px-16">
          <div className="relative overflow-hidden rounded-[40px] bg-slate-950 px-6 py-14 text-center md:px-12 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_24%)]" />

            <div className="relative mx-auto max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white">
                Future of Printing
              </div>

              <h2 className="mt-5 text-3xl md:text-5xl font-black leading-tight text-white">
                Bringing Better Printing.
                
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-base md:text-lg font-medium leading-8 text-slate-300">
                Whether you are a student, a creative professional, or a business owner, our printers are designed to help you succeed. Explore our range today and find the one that fits your life.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-blue-700"
                >
                  Browse Printers
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-900 transition-all hover:bg-blue-50"
                >
                  Get in Touch
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
