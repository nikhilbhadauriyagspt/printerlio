import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, ChevronLeft, Trash2, Package, Star, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="My Wishlist | Printer Loop" description="Review your saved professional printing solutions." />
      
      {/* --- PROFESSIONAL CENTERED HEADER --- */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-20 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          <div className="flex flex-col items-center text-center">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex items-center gap-3 mb-4"
             >
                <div className="h-px w-8 bg-red-500" />
                <span className="text-[11px] font-black text-red-500 uppercase tracking-[0.3em]">Personal Archive</span>
                <div className="h-px w-8 bg-red-500" />
             </motion.div>
             
             <div className="flex flex-col items-center gap-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-7xl font-black text-slate-900  leading-none"
                >
                  My <span className="text-red-500">Wishlist</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-slate-500 text-sm md:text-lg font-medium max-w-2xl mt-2 leading-relaxed"
                >
                  Review and manage your curated selection of {wishlistCount} high-performance machines and professional supplies.
                </motion.p>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-1.5 bg-red-500 rounded-full mt-4"
                />
             </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-12 md:py-24 min-h-[60vh] bg-slate-50/30">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 max-w-4xl mx-auto px-8 shadow-sm"
              >
                <div className="h-24 w-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                  <Heart size={40} className="text-slate-200" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4  uppercase">Your wishlist is empty</h2>
                <p className="text-slate-500 font-medium mb-10 max-w-xs mx-auto text-lg">Save your preferred items to keep track of them easily.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl active:scale-95 group">
                  Explore Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
                  <AnimatePresence mode="popLayout">
                    {wishlist.map((p, index) => (
                      <motion.div 
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="h-full"
                      >
                        <Link 
                          to={`/product/${p.slug}`} 
                          className="group relative flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-blue-100 hover:-translate-y-2"
                        >
                          {/* Badge */}
                          <div className="absolute top-5 left-5 z-10 px-3 py-1 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-red-200">
                             Saved Item
                          </div>

                          {/* Image Container */}
                          <div className="relative aspect-[4/5] bg-white flex items-center justify-center p-8 overflow-hidden">
                            <img 
                              src={getImagePath(p.images)} 
                              alt={p.name} 
                              className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                              onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                            />
                            
                            {/* Floating Action Bar */}
                            <div className="absolute right-5 top-5 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                              <button
                                onClick={(e) => {
                                  e.preventDefault(); e.stopPropagation();
                                  toggleWishlist(p);
                                }}
                                className="h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center text-red-500 transition-all duration-300 border border-slate-50"
                              >
                                <Trash2 size={18} />
                              </button>
                              <div className="h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-blue-600 border border-slate-50">
                                 <Eye size={18} />
                              </div>
                            </div>

                            {/* Quick Add Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-5 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                              <button
                                onClick={(e) => handleAddToCart(e, p)}
                                className="w-full h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest shadow-2xl hover:bg-blue-600 transition-all active:scale-95"
                              >
                                <ShoppingBag size={18} />
                                Add to Cart
                              </button>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex flex-col items-center text-center p-6 bg-slate-50/50 flex-1 border-t border-slate-50">
                            
                            <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wide leading-tight group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 px-2">
                              {p.name}
                            </h4>
                            <div className="mt-auto">
                              <p className="text-xl font-black text-slate-900">
                                ${parseFloat(p.price).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-24 flex justify-center">
            <Link to="/shop" className="group flex items-center gap-4 px-12 py-4 bg-white border border-slate-200 text-slate-900 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Return to Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
