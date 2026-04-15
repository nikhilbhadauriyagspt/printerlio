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
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } =
    useCart();

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
    } catch (e) {}
    return 'https://via.placeholder.com/400x400?text=Product';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Poppins'] text-black">
      <SEO
        title="My Wishlist | Printistan"
        description="Review your saved professional printing solutions."
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 bg-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
        </div>

        <div className="relative max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-4xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-blue-700">
              <Sparkles size={14} />
              Your Wishlist
            </p>

            <h1 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ">
              <span className="text-black">My</span>{' '}
              <span className="text-blue-600">Wishlist</span>
            </h1>

            <p className="mt-5 text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
              You have {wishlistCount} items saved. Review and manage your favorite
              printers and supplies.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-20 min-h-[60vh]">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto rounded-[34px] border border-black/10 bg-white px-8 py-16 md:py-20 text-center shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="h-20 w-20 rounded-[24px] border border-blue-100 bg-blue-50 flex items-center justify-center mx-auto mb-6">
                  <Heart size={38} className="text-blue-600" />
                </div>

                <h2 className="text-2xl md:text-4xl font-bold mb-3">
                  <span className="text-black">Your Wishlist</span>{' '}
                  <span className="text-blue-600">is Empty</span>
                </h2>

                <p className="text-black/60 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
                  Save items you like to find them easily later and build your
                  perfect printer collection.
                </p>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.18)]"
                >
                  Explore Products <ArrowRight size={16} />
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <p className="text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-blue-700 mb-2">
                      Saved Products
                    </p>
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                      <span className="text-black">Favorite</span>{' '}
                      <span className="text-blue-600">Items</span>
                    </h2>
                  </div>

                  <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 w-fit">
                    {wishlistCount} Saved Items
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5">
                  <AnimatePresence mode="popLayout">
                    {wishlist.map((p) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                        className="h-full"
                      >
                        <div className="group rounded-[26px] border border-black/10 bg-white overflow-hidden flex flex-col h-full shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_34px_rgba(37,99,235,0.10)]">
                          <Link
                            to={`/product/${p.slug}`}
                            className="relative block aspect-square bg-[#fbfcff] overflow-hidden p-4 md:p-5 border-b border-black/10"
                          >
                            <img
                              src={getImagePath(p.images)}
                              alt={p.name}
                              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                              onError={(e) => {
                                e.target.src =
                                  'https://via.placeholder.com/400x400?text=' +
                                  encodeURIComponent(p.name);
                              }}
                            />

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(p);
                              }}
                              className="absolute top-3 right-3 h-10 w-10 rounded-[14px] border border-black/10 bg-white flex items-center justify-center text-black transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={15} />
                            </button>
                          </Link>

                          <div className="p-4 md:p-5 flex flex-col flex-1">
                            <div className="flex-1">
                              <Link
                                to={`/product/${p.slug}`}
                                className="block text-[13px] md:text-[14px] font-semibold text-black line-clamp-2 leading-[1.5] min-h-[44px] transition-colors duration-300 hover:text-blue-600"
                              >
                                {p.name}
                              </Link>
                            </div>

                            <div className="mt-auto pt-4 flex flex-col gap-3">
                              <p className="text-[16px] md:text-[18px] font-bold text-black text-left">
                                ${parseFloat(p.price).toLocaleString()}
                              </p>

                              <button
                                onClick={(e) => handleAddToCart(e, p)}
                                className="w-full h-11 rounded-[16px] bg-black text-white text-[12px] font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(37,99,235,0.16)]"
                              >
                                <ShoppingCart size={14} strokeWidth={2.3} />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-14 md:mt-16 flex justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] border border-black/10 bg-white text-black text-sm font-semibold transition-all duration-300 hover:border-blue-200 hover:text-blue-600 hover:-translate-y-0.5"
            >
              <ChevronLeft size={16} />
              Return to Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}