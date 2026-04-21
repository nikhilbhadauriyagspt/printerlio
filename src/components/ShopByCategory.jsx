import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [], loading = false }) {
  const filteredCategories = categories.filter((cat) => {
    const name = cat.name?.toLowerCase() || "";
    const slug = cat.slug?.toLowerCase() || "";

    return (
      !name.includes("laptop") &&
      !slug.includes("laptop") &&
      !name.includes("computer") &&
      !name.includes("pc") &&
      !name.includes("chromebook") &&
      !name.includes("notebook")
    );
  });

  const subcategories = filteredCategories
    .flatMap((parent) => parent.children || [])
    .filter((sub) => {
      const name = sub.name?.toLowerCase() || "";
      const slug = sub.slug?.toLowerCase() || "";

      return (
        !name.includes("laptop") &&
        !slug.includes("laptop") &&
        !name.includes("computer") &&
        !name.includes("pc")
      );
    })
    .slice(0, 8);

  const getImagePath = (image) => {
    if (!image) return "https://via.placeholder.com/600x600?text=Category";
    if (image.startsWith("http")) return image;
    return `/${image}`;
  };

  return (
    <section className="w-full bg-white  font-['Poppins']">
      <div className="max-w-[1820px] mx-auto">
        
        {/* Centered Heading Design */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#001e3c]">Collections</span>
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
          </div>
          
          <h2 className="text-[34px] md:text-[46px] font-semibold text-[#001e3c] leading-tight mb-6">
            Shop by <span className="text-[#fbb124]">Category</span>
          </h2>

        
        </div>

        {/* Category Slider */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-[350px] bg-gray-50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                prevEl: '.category-prev',
                nextEl: '.category-next',
              }}
              autoplay={{ delay: 4000 }}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {subcategories.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link
                    to={`/shop?category=${item.slug}`}
                    className="group relative block bg-white rounded-2xl overflow-hidden h-[350px] md:h-[300px] "
                  >
                    {/* Full Card Image - No space, tight fit */}
                    <img
                      src={getImagePath(item.image)}
                      alt={item.name}
                      className="w-full h-full object-contain  transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/600x600?text=${encodeURIComponent(item.name)}`;
                      }}
                    />

                    {/* Hover Overlay - Small Button Only */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                       <span className="inline-flex items-center justify-center h-10 px-6 bg-[#fbb124] text-[#001e3c] font-bold text-[12px] rounded-full shadow-xl uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          Explore Now
                       </span>
                    </div>

                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}