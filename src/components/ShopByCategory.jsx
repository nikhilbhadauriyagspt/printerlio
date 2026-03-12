import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const filteredCategories = categories.filter(cat => {
    const name = cat.name.toLowerCase();
    const slug = cat.slug.toLowerCase();
    return !name.includes('laptop') && 
           !slug.includes('laptop') && 
           !name.includes('computer') && 
           !name.includes('pc') &&
           !name.includes('chromebook') &&
           !name.includes('notebook');
  });

  const subcategories = filteredCategories
    .flatMap(parent => parent.children || [])
    .filter(sub => {
      const name = sub.name.toLowerCase();
      const slug = sub.slug.toLowerCase();
      return !name.includes('laptop') && 
             !slug.includes('laptop') && 
             !name.includes('computer') && 
             !name.includes('pc');
    });

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="px-6 md:px-10 py-20 bg-white font-sans relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        
        {/* --- SIMPLE MINIMAL HEADER --- */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 ">
              Browse Departments
            </h2>
            <p className="mt-2 text-slate-600 text-sm font-bold ">
              Professional hardware solutions for every office environment.
            </p>
          </div>
          
          {/* Custom Navigation */}
          <div className="flex items-center gap-3 hidden md:flex">
            <button className="cat-prev h-12 w-12 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
              <ChevronLeft size={24} />
            </button>
            <button className="cat-next h-12 w-12 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* --- HORIZONTAL CAROUSEL --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.5}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4.5 },
              1440: { slidesPerView: 5.5 },
              1600: { slidesPerView: 6.5 },
            }}
            className="!overflow-visible"
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link to={`/shop?category=${item.slug}`} className="group block space-y-4">
                  {/* Square Image Card */}
                  <div className="aspect-square bg-gray-50 overflow-hidden rounded-xl border border-gray-100 group-hover:border-blue-600/20 transition-all duration-500">
                    <img 
                      src={getImagePath(item.image)} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                    />
                  </div>

                  {/* Simple Label */}
                  <div className="flex items-center justify-between pr-2">
                    <h3 className="text-[15px] font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-none">
                      {item.name}
                    </h3>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-600 transition-all -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
