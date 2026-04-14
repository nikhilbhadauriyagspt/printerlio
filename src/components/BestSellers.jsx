import React from 'react';
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ChevronRight, Zap, Plus } from "lucide-react";
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function BestSellers({ products = [], loading = false }) {
  const bestSellers = products
    .filter(p => p.price > 50)
    .slice(0, 8); // High density 8-column layout

  const getImagePath = (images) => {
    if (!images) return "https://via.placeholder.com/400x400?text=Product";
    try {
      const parsed = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch (e) {
      return images;
    }
  };

  return (
    <section className="w-full bg-white py-12 md:py-20 font-poppins relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 relative z-10">
        
        {/* --- REFINED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] mb-3">
               <Zap size={12} fill="currentColor" className="text-blue-600" />
               <span>Top Trending</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
              Best <span className="text-blue-600 italic font-medium">Sellers</span>
            </h2>
            <p className="text-slate-400 text-[13px] md:text-[14px] font-medium mt-3 max-w-lg leading-relaxed">
              Our most popular printers and accessories, handpicked for exceptional performance and value.
            </p>
          </div>
          <Link 
            to="/shop" 
            className="group flex items-center gap-3 px-6 py-3 border-2 border-slate-100 rounded-2xl font-black text-[12px] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95"
          >
            <span>View All</span>
            <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- 8-COLUMN GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 gap-4 md:gap-5">
          {loading ? (
             Array.from({ length: 8 }).map((_, i) => (
               <div key={i} className="aspect-[4/5] rounded-2xl bg-slate-50 animate-pulse" />
             ))
          ) : (
            bestSellers.map((p, i) => (
              <motion.div
                key={p.id || i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl bg-white border border-slate-100 group-hover:border-blue-100 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.04)] transition-all duration-500">
                  <div className="absolute inset-0 p-4 md:p-6 flex items-center justify-center">
                    <img 
                      src={getImagePath(p.images)} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out" 
                      alt={p.name} 
                    />
                  </div>
                  
                  {/* Floating Wishlist */}
                  <button className="absolute top-3 right-3 h-8 w-8 rounded-xl bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <Heart size={14} />
                  </button>
                </div>

                {/* Info Section */}
                <div className="mt-4 px-1 flex-1 flex flex-col">
                  <Link to={`/product/${p.slug}`} className="block mb-2 flex-1">
                    <h4 className="font-bold text-slate-800 text-[12px] md:text-[14px] group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {p.name}
                    </h4>
                  </Link>
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <p className="text-slate-950 font-black text-[14px] md:text-[16px]">${p.price}</p>
                    <button className="h-8 px-2.5 rounded-full bg-slate-50 text-slate-900 flex items-center justify-center gap-1.5 hover:bg-blue-600 hover:text-white transition-all group/cart active:scale-95 shadow-sm">
                      <Plus size={14} strokeWidth={3} />
                      <ShoppingCart size={12} strokeWidth={2.5} className="hidden sm:block" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
