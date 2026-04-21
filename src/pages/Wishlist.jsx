import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ChevronLeft,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';

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
      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];
        return img.startsWith('http') ? img : `/${img}`;
      }
    } catch (e) {}
    return 'https://via.placeholder.com/400x400?text=Product';
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20 font-['Poppins'] text-[#001e3c]">
      <SEO title="Wishlist | Printer Lio" />

      <div className="max-w-[1400px] mx-auto px-4">
        {/* Centered Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#001e3c]">My Collection</span>
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
          </div>
          
          <h1 className="text-[34px] md:text-[46px] font-semibold text-[#001e3c] leading-tight mb-4 uppercase tracking-tight">
            Saved <span className="text-[#fbb124]">Items</span>
          </h1>
          <p className="text-gray-500 text-[15px] max-w-[500px]">
            Manage your personal selection of high-performance printing technology.
          </p>
        </div>

        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,30,60,0.05)] overflow-hidden">
          <div className="px-8 py-8 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#001e3c] text-[#fbb124] flex items-center justify-center shadow-lg">
                <Heart size={24} className="fill-current" />
              </div>
              <div>
                <h2 className="text-[20px] font-semibold text-[#001e3c]">Wishlist</h2>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{wishlistCount} Products Saved</p>
              </div>
            </div>
            <Link to="/shop" className="text-[12px] font-bold text-[#001e3c] uppercase tracking-widest flex items-center gap-2 hover:text-[#fbb124] transition-all">
              <ChevronLeft size={16} /> Continue Shopping
            </Link>
          </div>

          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              {wishlistCount === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-32 text-center"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <ShoppingBag size={40} className="text-gray-200" />
                  </div>
                  <h2 className="text-[24px] font-semibold text-[#001e3c] mb-3">Your wishlist is empty</h2>
                  <p className="text-gray-400 text-[15px] mb-10">Save your favorite printers and supplies here.</p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-3 h-14 px-10 bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-widest rounded-2xl hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-xl"
                  >
                    Start Browsing <ArrowRight size={18} />
                  </Link>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {wishlist.map((p, i) => (
                    <motion.div 
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group bg-white border border-gray-100 rounded-[2.5rem] p-6 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative"
                    >
                      <button
                        onClick={() => toggleWishlist(p)}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-gray-300 hover:text-red-500 shadow-lg flex items-center justify-center transition-all z-20 hover:scale-110 active:scale-95"
                      >
                        <Trash2 size={18} />
                      </button>

                      <div className="relative aspect-square flex items-center justify-center mb-8 bg-slate-50 rounded-[2rem] overflow-hidden p-6">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-1000"
                        />
                      </div>

                      <div className="flex-grow text-center space-y-2 mb-6">
                        <p className="text-[10px] font-bold text-[#fbb124] uppercase tracking-widest">{p.brand_name || 'Premium Selection'}</p>
                        <h4 className="text-[15px] font-semibold text-[#001e3c] line-clamp-2 h-10 group-hover:text-[#fbb124] transition-colors">{p.name}</h4>
                        <p className="text-[20px] font-black text-[#001e3c]">${parseFloat(p.price).toLocaleString()}</p>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="w-full h-12 bg-[#001e3c] text-white rounded-xl text-[12px] font-bold uppercase tracking-widest hover:bg-[#fbb124] hover:text-[#001e3c] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <ShoppingCart size={16} /> Add to Cart
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
