import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

  const getDescription = (name) => {
    const lower = name?.toLowerCase() || "";

    if (lower.includes("laser")) {
      return "Fast and dependable office printing.";
    }
    if (lower.includes("inkjet")) {
      return "Smooth color output for daily use.";
    }
    if (lower.includes("accessories")) {
      return "Essential tools for printer setup.";
    }
    if (lower.includes("large format")) {
      return "Built for posters and bigger prints.";
    }
    if (lower.includes("supertank")) {
      return "High-volume printing with low refill hassle.";
    }
    if (lower.includes("led")) {
      return "Sharp results for modern workspaces.";
    }
    if (lower.includes("thermal")) {
      return "Reliable labels and receipt printing.";
    }
    if (lower.includes("photo")) {
      return "Detailed prints for creative work.";
    }
    if (lower.includes("dot matrix")) {
      return "Trusted for forms and invoices.";
    }
    if (lower.includes("all-in-one")) {
      return "Print, scan, and copy in one device.";
    }

    return "Explore dependable printer solutions.";
  };

  return (
    <section className="w-full bg-[#f7f4ef] py-12 md:py-14 font-['Poppins']">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8 lg:px-10">
        {/* Heading */}
        <div className="mb-8 md:mb-10 text-center">
          <span className="block text-[11px] uppercase tracking-[3px] text-[#8a7566] mb-2">
            Explore Collection
          </span>
          <h2 className="text-[28px] md:text-[38px] lg:text-[44px] font-semibold leading-none text-[#2b1d15]">
            Shop by Category
          </h2>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[280px] rounded-2xl border border-[#e6dbcf] bg-white animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {subcategories.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link
                  to={`/shop?category=${item.slug}`}
                  className="block h-full rounded-2xl border border-[#e6dbcf] bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_14px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                >
                  <div className="flex flex-col h-full min-h-[280px]">
                    {/* Image */}
                    <div className="h-[140px] md:h-[160px] bg-white border-b border-[#efe5db] flex items-center justify-center p-4 overflow-hidden">
                      <img
                        src={getImagePath(item.image)}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(
                            item.name
                          )}`;
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 px-4 md:px-5 py-4">
                      <span className="text-[10px] uppercase tracking-[2px] text-[#9a8879] mb-2">
                        Printer Range
                      </span>

                      <h3 className="text-[17px] md:text-[19px] leading-[1.2] font-semibold text-[#241812]">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-[13px] md:text-[14px] leading-6 text-[#6e5f55]">
                        {getDescription(item.name)}
                      </p>

                      <div className="mt-auto pt-4">
                        <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[1px] text-[#7c3f10]">
                          Shop Now
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}