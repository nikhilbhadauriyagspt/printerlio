import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductShowcase({ products = [], arrivals = [], loading = false }) {
  const { addToCart, openCartDrawer } = useCart();

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

  return (
    <section className="w-full bg-white py-16 px-4 md:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-[1820px] mx-auto">
        <div className="max-w-2xl mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-blue-800"></span>
              <span className="text-blue-800 text-[13px] uppercase tracking-[0.2em]">Our products</span>
            </div>
            <h2 className="text-[38px] md:text-[40px]  text-slate-900 leading-[1.1]">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-800">Products</span>
            </h2>
          </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-px bg-gray-100 border border-gray-100">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-px bg-gray-200 border border-gray-200">
            {featuredProducts.map((p, i) => (
              <div
                key={p.id || i}
                className="group relative bg-white transition-colors duration-300 flex flex-col h-full"
              >
                <Link to={`/product/${p.slug}`} className="block p-4 flex-grow">
                  {/* Image Container - Smaller padding */}
                  <div className="aspect-square flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Content - Compact Text */}
                  <div className="flex flex-col">
                    
                    <h3 className="text-[13px] font-medium text-slate-800 leading-snug mb-2 line-clamp-2 h-8">
                      {p.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-[14px] font-bold text-slate-900">${p.price}</span>
                      {p.original_price && (
                        <span className="text-[11px] text-gray-400 line-through">${p.original_price}</span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Smaller Add to Cart Button */}
                <div className="px-4 pb-4">
                  <button
                    onClick={(e) => handleAddToCart(e, p)}
                    className="w-full h-8 border border-slate-900 text-slate-900 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
