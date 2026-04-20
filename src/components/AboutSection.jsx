import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Truck, LifeBuoy, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Using your local asset
import aboutBanner from '../assets/bannerr/banner6.png';

const features = [
  {
    icon: CheckCircle2,
    title: 'Best Printers',
    desc: 'Original and reliable printers.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    desc: 'Quick delivery to your door.',
  },
  {
    icon: Zap,
    title: 'Easy Setup',
    desc: 'Get printing in just minutes.',
  },
  {
    icon: LifeBuoy,
    title: 'Full Support',
    desc: 'Friendly help whenever you need.',
  },
];

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-70" />
            <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10 brightness-105">
              <img
                src={aboutBanner}
                alt="Modern Printer"
                className="w-full h-auto object-cover "
              />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-800 text-[12px] font-bold uppercase tracking-wider rounded-full mb-6">
                Easy Printing
              </span>

              <h2 className="text-[36px] md:text-[48px] lg:text-[46px]  text-gray-900 leading-[1.1] mb-6">
                Making Printing <span className="text-blue-800">Simple & Reliable.</span>
              </h2>

              <p className="text-gray-500 text-[16px] md:text-[18px] leading-relaxed mb-10 max-w-[900px]">
                We provide the best printers and original supplies to help you get your work 
                done faster. Whether it's for home or office, we make sure you have 
                everything you need for a smooth printing experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-blue-800 group-hover:bg-blue-800 group-hover:text-white transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-[18px]  text-gray-900 mb-1 group-hover:text-blue-800 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[14px] text-gray-500 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[56px] px-8 bg-blue-800 hover:bg-blue-700 text-white  rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                Learn More <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
