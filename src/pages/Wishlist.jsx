import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {
  Heart,
  ArrowRight,
  ShoppingCart,
  ChevronLeft,
  Trash2,
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
    <div className="pt-20 bg-[#fbf8f5] font-['Poppins'] text-[#111111]">
      <SEO title="My Wishlist | MyPrinterHero" />

      {/* Hero */}
      <section className="bg-[#f4eeea] border-b border-[#e8dfd6]">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-14 md:py-18 lg:py-20 text-center">
          <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-4">
            Favorites
          </span>

          <h1 className="text-[34px] md:text-[48px] lg:text-[58px] font-semibold text-[#241812] leading-[1.02]">
            My Wishlist
          </h1>

          <p className="max-w-[760px] mx-auto mt-4 text-[#6b5d54] text-[14px] md:text-[16px] leading-8">
            Review and manage your saved printers and accessories in one place.
            You currently have <span className="font-semibold text-[#7a4320]">{wishlistCount}</span> item{wishlistCount !== 1 ? 's' : ''} saved.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-14 lg:py-16">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10">
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[30px] border border-dashed border-[#e7ddd4] bg-white text-center py-16 md:py-20 px-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center mx-auto mb-6">
                  <Heart size={28} />
                </div>

                <h2 className="text-[26px] md:text-[34px] font-semibold text-[#241812] mb-3">
                  Your Wishlist is Empty
                </h2>

                <p className="text-[#6b5d54] text-[14px] md:text-[15px] leading-7 max-w-[540px] mx-auto mb-8">
                  Save the printers and accessories you like so you can easily come back to them later.
                </p>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 h-[48px] px-7 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all"
                >
                  Browse Products <ArrowRight size={16} />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="filled"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {wishlist.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative flex flex-col h-full rounded-[26px] border border-[#eadfd6] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                      {/* Remove */}
                      <button
                        onClick={() => toggleWishlist(p)}
                        className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white border border-[#eadfd6] flex items-center justify-center text-[#5a2d14] hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* Image */}
                      <Link
                        to={`/product/${p.slug}`}
                        className="h-[210px] md:h-[230px] bg-[#fcfaf7] border-b border-[#efe5db] flex items-center justify-center p-5 overflow-hidden"
                      >
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src =
                              'https://via.placeholder.com/400x400?text=' +
                              encodeURIComponent(p.name);
                          }}
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex flex-col flex-1 px-4 md:px-5 py-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a8879] mb-2">
                          Saved Item
                        </p>

                        <Link to={`/product/${p.slug}`} className="block">
                          <h4 className="text-[#241812] text-[15px] md:text-[16px] font-medium leading-6 line-clamp-2 min-h-[48px]">
                            {p.name}
                          </h4>
                        </Link>

                        <div className="mt-auto pt-4">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[18px] md:text-[20px] font-semibold text-[#241812]">
                              ${parseFloat(p.price).toLocaleString()}
                            </span>

                            <button
                              onClick={(e) => handleAddToCart(e, p)}
                              className="inline-flex items-center justify-center gap-2 h-[40px] px-4 rounded-xl bg-[#7a4320] text-white text-[12px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition"
                            >
                              <ShoppingCart size={14} />
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[#5a2d14] font-semibold text-[13px] uppercase tracking-[0.08em] border-b border-[#5a2d14] pb-1 hover:text-[#7a4320] hover:border-[#7a4320] transition-all"
            >
              <ChevronLeft size={16} /> Return to Shop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}