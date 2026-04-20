import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Box } from "lucide-react";

export default function ShopByCategory({ categories = [], loading = false }) {
  const filteredCategories = categories.filter((cat) => {
    const name = cat.name?.toLowerCase() || "";
    const slug = cat.slug?.toLowerCase() || "";
    return (
      !name.includes("laptop") &&
      !slug.includes("laptop") &&
      !name.includes("computer") &&
      !name.includes("pc") &&
      !name.includes("chromebook") &&
      !name.includes("notebook")
    );
  });

  const subcategories = filteredCategories
    .flatMap((parent) => parent.children || [])
    .filter((sub) => {
      const name = sub.name?.toLowerCase() || "";
      const slug = sub.slug?.toLowerCase() || "";
      return (
        !name.includes("laptop") &&
        !slug.includes("laptop") &&
        !name.includes("computer") &&
        !name.includes("pc")
      );
    })
    .slice(0, 8);

  const getImagePath = (image) => {
    if (!image) return "https://via.placeholder.com/600x400?text=Category";
    if (image.startsWith("http")) return image;
    return `/${image}`;
  };

  return (
    <section className="w-full bg-gray-50/50 py-20 px-4 md:px-8">
      <div className="max-w-[1820px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 bg-blue-800"></span>
              <span className="text-blue-800  text-[13px] uppercase tracking-[0.2em]">Our Collections</span>
            </div>
            <h2 className="text-[38px] md:text-[40px]  text-slate-900 leading-[1.1]">
              Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-800">Category.</span>
            </h2>
          </div>
          <Link 
            to="/shop" 
            className="group flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-800 hover:text-blue-800 transition-all  text-[15px]"
          >
            Explore Everything <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-100 rounded-[2.5rem] animate-pulse" />
            ))
          ) : (
            subcategories.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/shop?category=${item.slug}`}
                  className="group relative block h-48 bg-white  border border-gray-100 shadow-sm  hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Decorative Background Accent */}
                  <div className="absolute top-0 right-0 z-110 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-800 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 p-8 flex items-center justify-between">
                    {/* Text Content */}
                    <div className="relative z-10 flex flex-col justify-center max-w-[60%]">
                      <h3 className="text-[20px]  text-slate-900 leading-tight mb-2 group-hover:text-blue-800 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-blue-800 font-bold text-[12px] uppercase tracking-wider opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        Shop Now <ArrowRight size={14} />
                      </div>
                    </div>

                    {/* Image Container */}
                    <div className="relative z-10 w-35 h-40 flex items-center justify-center p-2 ">
                      <img
                        src={getImagePath(item.image)}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(
                            item.name
                          )}`;
                        }}
                      />
                    </div>
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
