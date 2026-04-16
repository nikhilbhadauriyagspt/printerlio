import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, ChevronRight, Zap, Eye } from "lucide-react";
import { Link } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { cn } from '../lib/utils';

export default function ProductShowcase({ products = [], arrivals = [], loading = false }) {
  const [activeTab, setActiveTab] = useState('best-sellers');
  const { addToCart, openCartDrawer, toggleWishlist, isInWishlist } = useCart();

  const bestSellers = products
    .filter(p => p.price > 50)
    .slice(0, 8);

  const newArrivals = arrivals.slice(0, 8);

  const displayedProducts = activeTab === 'best-sellers' ? bestSellers : newArrivals;

  const getImagePath = (images) => {
    if (!images) return "https://via.placeholder.com/400x400?text=Product";
    try {
      const parsed = typeof images === 'string' ? JSON.parse(images) : images;
      const img = Array.isArray(parsed) ? parsed[0] : parsed;
      return img.startsWith('http') ? img : `/${img}`;
    } catch (e) {
      return images.startsWith('http') ? images : `/${images}`;
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const tabs = [
    { id: 'best-sellers', label: 'Best Sellers', icon: <Zap size={24} />, desc: 'Our most popular printers' },
    { id: 'new-arrivals', label: 'New Arrivals', icon: <Zap size={24} />, desc: 'Latest technology' },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24 font-['Poppins']">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* --- Selection Cards (Tabs) --- */}
        <div className="flex items-center justify-center gap-3 mb-10 max-w-xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-3 p-4 border transition-all duration-500 h-[60px]",
                activeTab === tab.id 
                  ? "bg-gray-900 border-gray-900 text-white shadow-none" 
                  : "bg-white border-gray-200 text-gray-900 hover:border-gray-900 shadow-none"
              )}
              style={{ borderRadius: '0px' }}
            >
              <span className={cn(activeTab === tab.id ? "text-blue-400" : "text-gray-400")}>
                {React.cloneElement(tab.icon, { size: 18 })}
              </span>
              <span className="text-[13px] font-bold uppercase tracking-widest whitespace-nowrap">{tab.label}</span>
              {activeTab === tab.id && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 bg-black rounded-full ml-1" />}
            </button>
          ))}
        </div>

        {/* --- Product Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-gray-100">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
               <div key={i} className="aspect-[3/4] bg-gray-50 animate-pulse border-r border-b border-gray-100" />
             ))
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="contents"
              >
                {displayedProducts.map((p, i) => (
                  <div
                    key={p.id || i}
                    className="group relative flex flex-col bg-white border-r border-b border-gray-100 p-8 transition-all duration-300 hover:bg-white"
                  >
                    {/* Image */}
                    <Link 
                      to={`/product/${p.slug}`}
                      className="aspect-square w-full mb-8 flex items-center justify-center overflow-hidden"
                    >
                      <img 
                        src={getImagePath(p.images)} 
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                        alt={p.name} 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                      />
                    </Link>

                    {/* Actions Overlay (Hidden by default, shows on hover like HP) */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                        className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Heart size={18} className={isInWishlist(p.id) ? "fill-red-500 text-red-500" : ""} />
                      </button>
                      <Link 
                        to={`/product/${p.slug}`}
                        className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-blue-50 hover:text-black transition-colors"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>

                    {/* Info */}
                    <div className="mt-auto">
                      <p className="text-[11px] font-bold text-black uppercase tracking-widest mb-2">Printer</p>
                      <Link to={`/product/${p.slug}`} className="block mb-4">
                        <h4 className=" text-gray-900 text-lg leading-tight line-clamp-2 min-h-[3rem]">
                          {p.name}
                        </h4>
                      </Link>
                      
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-2xl font-bold text-gray-900">${p.price}</span>
                        <button 
                          onClick={(e) => handleAddToCart(e, p)}
                          className="px-6 py-2.5 bg-black text-white  text-[13px] hover:bg-blue-700 transition-all"
                          style={{ borderRadius: '0px' }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* --- View All Footer --- */}
        <div className="mt-16 text-center">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-gray-900 font-bold text-[15px] border-b-2 border-gray-900 pb-1 hover:text-black hover:border-black transition-all"
          >
            Explore the Full Collection <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const ArrowRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);