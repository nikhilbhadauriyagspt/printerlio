import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Images
import mid1 from '../assets/middle-imges/1.png';
import mid2 from '../assets/middle-imges/2.png';

const banners = [
  {
    id: 1,
    image: mid2,
    link: '/shop'
  },
  {
    id: 2,
    image: mid1,
    link: '/shop'
  }
];

export default function DualBanners() {
  return (
    <section className="w-full bg-white py-12 px-4 md:px-10">
      <div className="max-w-[1820px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-[280px] md:h-[380px] lg:h-[450px]  overflow-hidden shadow-lg"
            >
              <Link to={banner.link} className="block w-full h-full">
                <img
                  src={banner.image}
                  alt={`Banner ${banner.id}`}
                  className="w-full h-full object-cover transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}