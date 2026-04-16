import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {
  Heart,
  ArrowRight,
  ShoppingCart,
  ChevronLeft,
  Trash2,
  Sparkles,
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
    <div className="min-h-screen bg-white font-['Poppins'] text-[#111111]">
      <SEO title="My Wishlist | Printing Land" />

      {/* --- Page Header --- */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-20">
           <span className="text-[11px] font-bold text-black uppercase tracking-[0.3em] mb-4 block">
             Favorites
           </span>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900  mb-6">
             My <span className="text-black">Wishlist.</span>
           </h1>
           <p className="max-w-2xl text-gray-500 text-[14px] md:text-[16px] leading-relaxed font-medium">
             Review and manage your favorite printing solutions. You have {wishlistCount} items saved for later.
           </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 border border-dashed border-gray-200"
              >
                <Heart size={48} className="mx-auto text-gray-200 mb-6" />
                <h2 className="text-xl font-bold mb-3">Your Wishlist is Empty</h2>
                <p className="text-gray-500 mb-8">Save items you like to find them easily later.</p>
                <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold text-[12px] uppercase tracking-widest hover:bg-blue-700 transition-all">
                  Browse Products <ArrowRight size={18} />
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-gray-100">
                {wishlist.map((p) => (
                  <div 
                    key={p.id}
                    className="group relative bg-white border-r border-b border-gray-100 p-8 transition-all hover:bg-gray-50 flex flex-col"
                  >
                    {/* Remove Action */}
                    <button 
                      onClick={() => toggleWishlist(p)}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>

                    {/* Image */}
                    <Link to={`/product/${p.slug}`} className="aspect-square w-full mb-8 flex items-center justify-center overflow-hidden">
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(p.name); }}
                      />
                    </Link>

                    {/* Info */}
                    <div className="mt-auto">
                       <Link to={`/product/${p.slug}`} className="block mb-4">
                        <h4 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 min-h-[3rem]">
                          {p.name}
                        </h4>
                      </Link>
                      
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-xl font-bold text-gray-900">${parseFloat(p.price).toLocaleString()}</span>
                        <button 
                          onClick={(e) => handleAddToCart(e, p)}
                          className="px-6 py-2.5 bg-black text-white font-bold text-[13px] uppercase tracking-widest hover:bg-blue-700 transition-all"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>

          <div className="mt-16 text-center">
             <Link to="/shop" className="inline-flex items-center gap-2 text-gray-900 font-bold text-[14px] uppercase tracking-widest border-b-2 border-gray-900 pb-1 hover:text-black hover:border-black transition-all">
                <ChevronLeft size={18} /> Return to Shop
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
