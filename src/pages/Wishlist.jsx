import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ChevronLeft, ArrowRight, Plus, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-200 flex flex-col items-center justify-center pt-20 px-6 font-sans bg-white">
        <div className="h-24 w-24 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center mb-8 mx-auto shadow-sm">
          <Heart size={40} className="text-slate-200" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Wishlist is empty</h2>
        <p className="text-slate-400 font-bold text-sm mb-10 text-center max-w-xs">You haven't saved any premium hardware yet.</p>
        <Link to="/shop" className="h-14 px-10 bg-black text-white rounded-xl flex items-center gap-4 hover:bg-blue-600 transition-all active:scale-95 group">
          Browse Inventory <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist text-slate-900">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col space-y-2 mb-16">
          <h1 className="text-4xl md:text-5xl font-black leading-tight uppercase">
            Saved Selection
          </h1>
          <p className="text-slate-400 text-base font-bold tracking-wide">
            {wishlistCount} units reserved for future deployment.
          </p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col group hover:border-blue-600/30 h-[440px]"
              >
                {/* Remove */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className="absolute top-3 right-3 z-20 h-8 w-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all border border-gray-100 shadow-sm hover:scale-110 text-slate-300 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>

                {/* Image Panel */}
                <div className="relative h-[220px] bg-white flex items-center justify-center p-6 overflow-hidden transition-colors duration-500">
                  <div className="absolute top-3 left-3 z-20">
                    <span className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full tracking-widest uppercase">
                      {p.brand_name || 'Premium'}
                    </span>
                  </div>
                  <img src={getImagePath(p.images)} alt={p.name} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                </div>

                {/* Metadata Panel */}
                <div className="flex-1 p-5 flex flex-col justify-between bg-white relative border-t border-gray-50">
                  <div className="space-y-2">
                    <Link to={`/product/${p.slug}`} className="block">
                      <h3 className="font-black text-slate-900 text-[14px] leading-[1.3] line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </h3>
                    </Link>
                  </div>

                  {/* Integrated Action Panel */}
                  <div className="flex items-stretch mt-4 h-11 border border-gray-100 rounded-xl overflow-hidden group/actions">
                    <div className="flex-1 flex flex-col justify-center px-4 bg-gray-50 group-hover/actions:bg-white transition-colors">
                       <span className="text-base font-black text-slate-900 leading-none">${p.price.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(p)}
                      className="w-12 flex items-center justify-center bg-black text-white hover:bg-blue-600 transition-all duration-500 active:scale-95 z-30 relative"
                    >
                      <Plus size={18} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[85%] z-0" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-all">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Inventory Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
