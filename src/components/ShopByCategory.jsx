import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function ShopByCategory({ categories = [], loading = false }) {
  const filteredCategories = categories.filter(cat => {
    const name = cat.name.toLowerCase();
    const slug = cat.slug.toLowerCase();
    return !name.includes('laptop') && 
           !slug.includes('laptop') && 
           !name.includes('computer') && 
           !name.includes('pc') &&
           !name.includes('chromebook') &&
           !name.includes('notebook');
  });

  const subcategories = filteredCategories
    .flatMap(parent => parent.children || [])
    .filter(sub => {
      const name = sub.name.toLowerCase();
      const slug = sub.slug.toLowerCase();
      return !name.includes('laptop') && 
             !slug.includes('laptop') && 
             !name.includes('computer') && 
             !name.includes('pc');
    })
    .slice(0, 10); // Showing all 10 in one row

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="bg-white py-12 md:py-16 w-full font-poppins">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        
        {/* --- CENTERED HEADER --- */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Shop by <span className="text-blue-600">Category</span>
          </h2>
          <p className="text-slate-400 text-[13px] md:text-[14px] font-medium max-w-xl mx-auto">
            Explore our diverse range of high-performance printers and accessories.
          </p>
        </div>

        {/* --- 10-COLUMN ONE ROW GRID --- */}
        <div className="flex items-start justify-between gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4 md:pb-0 md:grid md:grid-cols-10 md:overflow-visible">
          {loading ? (
             Array.from({ length: 10 }).map((_, i) => (
               <div key={i} className="flex-shrink-0 w-24 md:w-full space-y-3">
                 <div className="aspect-square rounded-2xl bg-slate-50 animate-pulse" />
                 <div className="h-3 w-12 bg-slate-50 mx-auto rounded-full animate-pulse" />
               </div>
             ))
          ) : (
            subcategories.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-28 md:w-full group"
              >
                <Link 
                  to={`/shop?category=${item.slug}`} 
                  className="flex flex-col items-center gap-4"
                >
                  {/* Image Container - Circular & Subtle Border */}
                  <div className="relative w-full aspect-square overflow-hidden rounded-full bg-white border border-slate-100 group-hover:border-blue-200 transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full p-2 md:p-3">
                       <img 
                        src={getImagePath(item.image)} 
                        alt={item.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out rounded-full"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                    </div>
                  </div>

                  {/* Text Label - Minimal */}
                  <div className="text-center px-1">
                    <h4 className="text-[11px] md:text-[13px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                      {item.name}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
