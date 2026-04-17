import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, ChevronRight, Zap, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function ProductShowcase({ products = [], arrivals = [], loading = false }) {
  const [activeTab, setActiveTab] = useState('best-sellers');
  const { addToCart, openCartDrawer, toggleWishlist, isInWishlist } = useCart();

  const bestSellers = products.filter((p) => p.price > 50).slice(0, 8);
  const newArrivals = arrivals.slice(0, 8);

  const displayedProducts = activeTab === 'best-sellers' ? bestSellers : newArrivals;

  const getImagePath = (images) => {
    if (!images) return 'https://via.placeholder.com/400x400?text=Product';
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
    {
      id: 'best-sellers',
      label: 'Best Sellers',
      icon: <Zap size={18} />,
    },
    {
      id: 'new-arrivals',
      label: 'New Arrivals',
      icon: <Zap size={18} />,
    },
  ];

  return (
    <section className="w-full bg-[#f7f4ef] py-12 md:py-14 font-['Poppins']">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-10">
          <span className="block text-[11px] uppercase tracking-[3px] text-[#8b7768] mb-2">
            Featured Products
          </span>
          <h2 className="text-[28px] md:text-[38px] font-semibold text-[#2b1d15]">
            Popular Printer Picks
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-3 mb-8 max-w-md mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 h-[46px] px-4 rounded-full border transition-all duration-300 text-[12px] font-semibold uppercase tracking-[0.12em]',
                activeTab === tab.id
                  ? 'bg-[#8b5a3c] border-[#8b5a3c] text-white'
                  : 'bg-white border-[#e6dbcf] text-[#5b463a] hover:border-[#8b5a3c]'
              )}
            >
              <span className={cn(activeTab === tab.id ? 'text-white' : 'text-[#8b5a3c]')}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[340px] rounded-2xl border border-[#e6dbcf] bg-white animate-pulse"
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
            >
              {displayedProducts.map((p, i) => (
                <motion.div
                  key={p.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link
                    to={`/product/${p.slug}`}
                    className="relative flex flex-col h-full min-h-[340px] rounded-2xl border border-[#e6dbcf] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.06)]"
                  >
                    {/* Top Actions */}
                    <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(p);
                        }}
                        className="w-9 h-9 rounded-full bg-white border border-[#eadfd4] flex items-center justify-center text-[#5b463a] hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Heart
                          size={16}
                          className={isInWishlist(p.id) ? 'fill-red-500 text-red-500' : ''}
                        />
                      </button>

                      <Link
                        to={`/product/${p.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-9 h-9 rounded-full bg-white border border-[#eadfd4] flex items-center justify-center text-[#5b463a] hover:bg-[#f8f2ec] hover:text-[#8b5a3c] transition-colors"
                      >
                        <Eye size={16} />
                      </Link>
                    </div>

                    {/* Image */}
                    <div className="h-[170px] md:h-[190px] bg-white border-b border-[#efe5db] flex items-center justify-center p-4 overflow-hidden">
                      <img
                        src={getImagePath(p.images)}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        alt={p.name}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(
                            p.name
                          )}`;
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col flex-1 px-4 md:px-5 py-4">
                      <p className="text-[10px] font-semibold text-[#9a8879] uppercase tracking-[0.18em] mb-2">
                        Printer
                      </p>

                      <h4 className="text-[#241812] text-[15px] md:text-[17px] font-semibold leading-6 line-clamp-2 min-h-[48px]">
                        {p.name}
                      </h4>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[18px] md:text-[20px] font-bold text-[#2b1d15]">
                          ${p.price}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="mt-4 inline-flex items-center justify-center gap-2 h-[42px] rounded-xl bg-[#8b5a3c] text-white text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#73492f] transition-all"
                      >
                        <ShoppingCart size={15} />
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Footer */}
        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[#5b341d] font-semibold text-[14px] border-b border-[#5b341d] pb-1 hover:text-[#8b5a3c] hover:border-[#8b5a3c] transition-all"
          >
            Explore the Full Collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const ArrowRight = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);