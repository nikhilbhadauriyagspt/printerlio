import { motion } from "framer-motion";
import { Heart, Check, Plus, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import banner5 from '@/assets/bannerr/banner5.jpg';

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Hardware";
  };

  return (
    <section className="py-20 bg-white font-sans relative">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10">
        <div className="relative flex flex-col lg:flex-row items-center gap-0">
          
          {/* --- LEFT SIDE: FIXED PROMO (Z-INDEX 30) --- */}
          <div className="w-full lg:w-[480px] shrink-0 z-30 lg:pr-10 bg-white">
            <div className="relative h-[500px] lg:h-[650px] rounded-2xl overflow-hidden group shadow-2xl shadow-black/10">
              <img src={banner5} alt="New Arrivals" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                <h2 className="text-4xl md:text-5xl font-black text-white leading-none uppercase tracking-tighter">
                  New <br /> Arrivals
                </h2>
                <p className="mt-4 text-white/60 text-sm font-bold tracking-wide">
                  Specialized printing units fresh in our inventory.
                </p>
                
                {/* Fixed Position Controls Inside Banner */}
                <div className="mt-8 flex items-center gap-4">
                  <button className="na-prev h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer border border-white/10 active:scale-90">
                    <ChevronLeft size={24} />
                  </button>
                  <button className="na-next h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer border border-white/10 active:scale-90">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: SLIDING PRODUCTS (Z-INDEX 10) --- */}
          <div className="w-full lg:absolute lg:left-[480px] lg:right-0 z-10 overflow-hidden mt-10 lg:mt-0">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1.2}
              navigation={{
                prevEl: '.na-prev',
                nextEl: '.na-next',
              }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 2.5 },
                1440: { slidesPerView: 3.2 },
                1600: { slidesPerView: 4.2 },
              }}
              className="!overflow-visible px-4 lg:pl-12 pr-10"
            >
              {products.slice(0, 15).map((p) => (
                <SwiperSlide key={p.id}>
                  <div 
                    className="relative bg-white border border-gray-100 rounded-xl p-5 transition-all duration-500 flex flex-col group hover:border-blue-600/20 hover:shadow-xl hover:shadow-black/5 h-[450px]"
                  >
                    {/* Compact Image Area */}
                    <div className="relative aspect-square rounded-lg bg-gray-50 flex items-center justify-center p-6 overflow-hidden mb-6 transition-all duration-500 group-hover:bg-white">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-3 right-3 z-20 h-9 w-9 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 border border-gray-100 shadow-sm hover:scale-110",
                          isInWishlist(p.id) ? "text-red-500" : "text-gray-300 hover:text-red-500"
                        )}
                      >
                        <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Info Panel */}
                    <div className="flex-1 flex flex-col">
                      <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase mb-2">
                        {p.brand_name || 'Premium'}
                      </span>
                      
                      <Link to={`/product/${p.slug}`} className="flex-1">
                        <h3 className="text-[16px] font-black text-slate-800 leading-[1.3] line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {p.name}
                        </h3>
                      </Link>

                      <div className="mt-6 flex items-center justify-between pt-5 border-t border-gray-100">
                        <span className="text-xl font-black text-slate-900">${p.price}</span>

                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          disabled={addedItems[p.id]}
                          className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-500 active:scale-95 z-30 relative",
                            addedItems[p.id] 
                              ? "bg-emerald-500 text-white" 
                              : "bg-black text-white hover:bg-blue-600"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                        </button>
                      </div>
                    </div>

                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
}

