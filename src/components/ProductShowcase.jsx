import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ProductShowcase({ products = [], arrivals = [], loading = false }) {
  const { addToCart, openCartDrawer, toggleWishlist, isInWishlist } = useCart();

  // Use all products passed from parent up to 18
  const featuredProducts = products.slice(0, 18);

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

  const handleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <section className="w-full bg-white py-20 px-4 md:px-10 font-['Poppins']">
      <div className="max-w-[1820px] mx-auto">
        
        {/* Centered Heading Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#001e3c]">Our Products</span>
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
          </div>
          
          <h2 className="text-[34px] md:text-[46px] font-semibold text-[#001e3c] leading-tight mb-4">
            Featured <span className="text-[#fbb124]">Products</span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-[600px]">
            Discover our handpicked selection of top-rated printers and accessories, 
            crafted for performance and reliability.
          </p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-50 rounded-2xl animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
            {featuredProducts.map((p, i) => (
              <motion.div
                key={p.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,30,60,0.1)] transition-all duration-500 flex flex-col h-full overflow-hidden"
              >
                {/* Product Image & Badges */}
                <Link to={`/product/${p.slug}`} className="relative block p-6 flex-grow">
                  {p.original_price && (
                    <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                      SALE
                    </span>
                  )}
                  
                  <div className="aspect-square flex items-center justify-center mb-6 overflow-hidden">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Hover Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 z-20">
                     <button 
                        onClick={(e) => handleWishlist(e, p)}
                        className={cn(
                          "w-9 h-9 shadow-md rounded-full flex items-center justify-center transition-all",
                          isInWishlist(p.id) 
                            ? "bg-red-500 text-white shadow-red-200" 
                            : "bg-white text-[#001e3c] hover:bg-[#fbb124]"
                        )}
                     >
                        <Heart size={16} className={cn(isInWishlist(p.id) && "fill-current")} />
                     </button>
                     <div className="w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-[#001e3c] hover:bg-[#fbb124] transition-colors cursor-pointer">
                        <Eye size={16} />
                     </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col text-center">
                    <h3 className="text-[14px] font-semibold text-[#001e3c] leading-snug mb-3 line-clamp-2 h-10 group-hover:text-[#fbb124] transition-colors">
                      {p.name}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-[18px] font-black text-[#001e3c]">${p.price}</span>
                      {p.original_price && (
                        <span className="text-[13px] text-gray-400 line-through">${p.original_price}</span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Modern Add to Cart Button */}
                <div className="px-5 pb-6 mt-auto">
                  <button
                    onClick={(e) => handleAddToCart(e, p)}
                    className="w-full h-11 bg-[#001e3c] text-white hover:bg-[#fbb124] hover:text-[#001e3c] rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
