import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingCart, ChevronLeft, Trash2 } from 'lucide-react';
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
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return 'https://via.placeholder.com/400x400?text=Product';
  };

  return (
    <div className="bg-white min-h-screen font-['Poppins'] text-black">
      <SEO
        title="My Wishlist | Printing State"
        description="Review your saved professional printing solutions."
      />

      {/* HEADER */}
      <section className="pt-32 pb-16 md:pb-20 border-b border-black/10 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
              Your Wishlist
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
              My Wishlist
            </h1>
            <p className="mt-4 text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
              You have {wishlistCount} items saved. Review and manage your favorite printers and supplies.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-20 min-h-[60vh] bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto rounded-[30px] border border-black/10 bg-white px-8 py-16 md:py-20 text-center"
              >
                <div className="h-20 w-20 rounded-[24px] border border-black/10 bg-white flex items-center justify-center mx-auto mb-6">
                  <Heart size={40} className="text-black/20" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                  Your wishlist is empty
                </h2>
                <p className="text-black/60 text-sm md:text-base mb-8 max-w-md mx-auto">
                  Save items you like to find them easily later.
                </p>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold"
                >
                  Explore Products <ArrowRight size={16} />
                </Link>
              </motion.div>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5">
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
                        <div className="rounded-[24px] border border-black/10 bg-white overflow-hidden flex flex-col h-full">
                          <Link
                            to={`/product/${p.slug}`}
                            className="relative block aspect-square bg-white overflow-hidden p-4 md:p-5 border-b border-black/10"
                          >
                            <img
                              src={getImagePath(p.images)}
                              alt={p.name}
                              className="w-full h-full object-contain"
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
                              className="absolute top-3 right-3 h-9 w-9 rounded-[12px] border border-black/10 bg-white flex items-center justify-center text-black"
                            >
                              <Trash2 size={14} />
                            </button>
                          </Link>

                          <div className="p-4 md:p-5 flex flex-col flex-1">
                            <div className="flex-1">
                              <Link
                                to={`/product/${p.slug}`}
                                className="block text-[13px] md:text-[14px] font-semibold text-black line-clamp-2 leading-[1.45] min-h-[42px]"
                              >
                                {p.name}
                              </Link>
                            </div>

                            <div className="mt-auto pt-4 flex flex-col gap-3">
                              <p className="text-[15px] md:text-[17px] font-bold text-black text-left">
                                ${parseFloat(p.price).toLocaleString()}
                              </p>

                              <button
                                onClick={(e) => handleAddToCart(e, p)}
                                className="w-full h-11 rounded-[16px] bg-black text-white text-[12px] font-semibold flex items-center justify-center gap-2"
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
              className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] border border-black/10 bg-white text-black text-sm font-semibold"
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