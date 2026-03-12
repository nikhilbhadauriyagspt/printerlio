import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Check, Plus } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

import 'swiper/css';

export default function BestSellers({ products = [] }) {
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
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="px-6 md:px-10 py-20 bg-white font-sans relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto">
        
        {/* --- MINIMALIST HEADER --- */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 ">
              Market Favorites
            </h2>
            <p className="mt-2 text-slate-600 text-sm font-bold">
              Our most requested hardware and supplies this month.
            </p>
          </div>
          
          {/* Custom Navigation */}
          <div className="flex items-center gap-3 hidden md:flex">
            <button className="bs-prev h-12 w-12 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
              <ChevronLeft size={24} />
            </button>
            <button className="bs-next h-12 w-12 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
              1600: { slidesPerView: 5 },
            }}
            className="!overflow-visible"
          >
            {products.slice(0, 15).map((p) => (
                <SwiperSlide key={p.id}>
                  <div 
                    className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col group hover:border-blue-600/30 h-[500px]"
                  >
                    {/* Image Panel (Upper) */}
                    <div className="relative h-[280px] bg-white flex items-center justify-center p-8 overflow-hidden transition-colors duration-500">
                      <div className="absolute top-4 left-4 z-20">
                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                          {p.brand_name || 'Premium'}
                        </span>
                      </div>
                      
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-4 right-4 z-20 h-10 w-10 bg-white rounded-xl flex items-center justify-center transition-all duration-300 border border-gray-100 shadow-sm hover:scale-110",
                          isInWishlist(p.id) ? "text-red-500" : "text-gray-300 hover:text-red-500"
                        )}
                      >
                        <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      <img 
                        src={getImagePath(p.images)} 
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                        alt={p.name} 
                      />
                    </div>

                    {/* Metadata Panel (Lower) */}
                    <div className="flex-1 p-6 flex flex-col justify-between bg-white relative">
                      <div className="space-y-3">
                        <Link to={`/product/${p.slug}`} className="block">
                          <h3 className="font-black text-slate-900 text-[17px] leading-[1.2] line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {p.name}
                          </h3>
                        </Link>
                      </div>

                      {/* Integrated Action Panel */}
                      <div className="flex items-stretch mt-6 h-14 border border-gray-100 rounded-xl overflow-hidden group/actions">
                        <div className="flex-1 flex flex-col justify-center px-5 bg-gray-50 group-hover/actions:bg-white transition-colors">
                           <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter leading-none mb-1">Standard Price</span>
                           <span className="text-lg font-black text-slate-900 leading-none">${p.price}</span>
                        </div>
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          disabled={addedItems[p.id]}
                          className={cn(
                            "w-16 flex items-center justify-center transition-all duration-500 active:scale-95 z-30 relative",
                            addedItems[p.id] 
                              ? "bg-emerald-500 text-white" 
                              : "bg-black text-white hover:bg-blue-600"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={22} strokeWidth={3} /> : <Plus size={22} strokeWidth={3} />}
                        </button>
                      </div>
                    </div>

                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[85%] z-0" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
