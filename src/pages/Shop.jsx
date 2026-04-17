import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  X,
  Package,
  Heart,
  ShoppingCart,
  Filter,
  ChevronRight,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const { category: pathCategory } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = searchParams.get('category') || pathCategory || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((d) => {
        if (d.status === 'success') {
          const all = d.data.flatMap((parent) => [parent, ...(parent.children || [])]);
          const filtered = all.filter(
            (cat) =>
              !cat.name.toLowerCase().includes('laptop') &&
              !cat.slug.toLowerCase().includes('laptop')
          );
          const unique = Array.from(new Map(filtered.map((item) => [item.slug, item])).values());
          setCategories(unique);
        }
      });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(
            (p) => !p.name.toLowerCase().includes('laptop')
          );
          setProducts(filteredProducts);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    setSearchParams(newParams);
    if (isMobileFilterOpen) setIsMobileFilterOpen(false);
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

  const activeCategoryName =
    category ? categories.find((c) => c.slug === category)?.name || 'Collection' : 'All Products';

  const sortOptions = [
    { val: 'newest', label: 'Newest First' },
    { val: 'price_low', label: 'Price: Low-High' },
    { val: 'price_high', label: 'Price: High-Low' },
    { val: 'name_asc', label: 'Alphabetical' },
  ];

  return (
    <div className=" pt-20 bg-[#faf7f3] font-['Poppins'] text-[#111111]">
      <SEO
        title="Shop Printers & Supplies | MyPrinterHero"
        description="Browse our high-performance inventory of precision printers and accessories."
      />

      {/* Top Heading Area */}
      <section className="w-full bg-[#f4eeea] border-b border-[#e7ddd4]">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-12 md:py-16 lg:py-20 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-4">
            <Link to="/" className="hover:text-[#7a4320] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#5a2d14]">Shop</span>
          </div>

          <h1 className="text-[34px] md:text-[48px] lg:text-[58px] font-semibold leading-none text-[#241812]">
            {activeCategoryName}
          </h1>

          <p className="mt-4 text-[#6b5d54] text-[14px] md:text-[16px] leading-8 max-w-[760px] mx-auto">
            Explore dependable printers, accessories, and printing solutions designed for
            home, office, and business performance.
          </p>

          {search && (
            <p className="mt-3 text-[13px] text-[#8a7768]">
              Showing results for: <span className="font-semibold text-[#5a2d14]">"{search}"</span>
            </p>
          )}
        </div>
      </section>

      {/* Main Layout */}
      <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-10 md:py-12">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">
          {/* Sidebar */}
          <aside className="hidden xl:block w-[280px] shrink-0">
            <div className="sticky top-28 rounded-[28px] border border-[#e7ddd4] bg-white p-6 space-y-8">
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#241812] mb-5">
                  Categories
                </h3>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      'text-left text-[14px] transition-colors',
                      !category ? 'text-[#7a4320] font-semibold' : 'text-[#6c5d54] hover:text-[#241812]'
                    )}
                  >
                    View All
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        'text-left text-[14px] transition-colors',
                        category === cat.slug
                          ? 'text-[#7a4320] font-semibold'
                          : 'text-[#6c5d54] hover:text-[#241812]'
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#eee4db] pt-8">
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#241812] mb-5">
                  Sort By
                </h3>

                <div className="flex flex-col gap-3">
                  {sortOptions.map((s) => (
                    <button
                      key={s.val}
                      onClick={() => updateFilter('sort', s.val)}
                      className={cn(
                        'text-left text-[14px] transition-colors',
                        sort === s.val
                          ? 'text-[#7a4320] font-semibold'
                          : 'text-[#6c5d54] hover:text-[#241812]'
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="h-11 px-4 rounded-full border border-[#e5dad1] bg-white flex items-center text-[13px] text-[#6b5d54]">
                  {products.length} Items Found
                </div>

                {category && (
                  <button
                    onClick={() => updateFilter('category', '')}
                    className="h-11 px-4 rounded-full border border-[#e5dad1] bg-white text-[13px] text-[#7a4320] hover:bg-[#f8f2ec] transition"
                  >
                    Clear Category
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 h-11 px-4 rounded-full border border-[#e5dad1] bg-white text-[13px] text-[#6b5d54]">
                  <SlidersHorizontal size={16} />
                  {sortOptions.find((s) => s.val === sort)?.label || 'Newest First'}
                </div>

                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="xl:hidden inline-flex items-center gap-2 h-11 px-4 rounded-full bg-[#7a4320] text-white text-[13px] font-medium hover:bg-[#643619] transition"
                >
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[360px] rounded-[24px] border border-[#eadfd6] bg-white animate-pulse"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-[#e7ddd4] bg-white text-center py-20 px-6">
                <Package size={48} className="mx-auto text-[#d4c5b8] mb-4" />
                <h2 className="text-[24px] font-semibold text-[#241812] mb-2">
                  No items match your filters
                </h2>
                <p className="text-[#6b5d54] text-[14px] mb-6">
                  Try changing category or sorting to explore more products.
                </p>
                <button
                  onClick={() => updateFilter('category', '')}
                  className="inline-flex items-center justify-center h-[44px] px-6 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative flex flex-col h-full rounded-[26px] border border-[#eadfd6] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                      {/* actions */}
                      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          className="w-9 h-9 rounded-full bg-white border border-[#eadfd6] flex items-center justify-center text-[#5a2d14] hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Heart
                            size={16}
                            className={isInWishlist(p.id) ? 'fill-red-500 text-red-500' : ''}
                          />
                        </button>

                        <Link
                          to={`/product/${p.slug}`}
                          className="w-9 h-9 rounded-full bg-white border border-[#eadfd6] flex items-center justify-center text-[#5a2d14] hover:bg-[#f8f2ec] transition-colors"
                        >
                          <Eye size={16} />
                        </Link>
                      </div>

                      {/* image */}
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

                      {/* content */}
                      <div className="flex flex-col flex-1 px-4 md:px-5 py-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a8879] mb-2">
                          Printer
                        </p>

                        <Link to={`/product/${p.slug}`} className="block">
                          <h4 className="text-[#241812] text-[15px] md:text-[16px] font-medium leading-6 line-clamp-2 min-h-[48px]">
                            {p.name}
                          </h4>
                        </Link>

                        <div className="mt-auto pt-4">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[18px] md:text-[20px] font-semibold text-[#241812]">
                              ${p.price}
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
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm xl:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-[320px] bg-white z-[310] xl:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#eee4db]">
                <h2 className="text-[20px] font-semibold text-[#241812]">Filter Products</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-10">
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8b7768] mb-4">
                    Categories
                  </h3>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => updateFilter('category', '')}
                      className={cn(
                        'text-left text-[14px]',
                        !category ? 'text-[#7a4320] font-semibold' : 'text-[#241812]'
                      )}
                    >
                      View All
                    </button>

                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter('category', cat.slug)}
                        className={cn(
                          'text-left text-[14px]',
                          category === cat.slug
                            ? 'text-[#7a4320] font-semibold'
                            : 'text-[#241812]'
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8b7768] mb-4">
                    Sort By
                  </h3>

                  <div className="flex flex-col gap-3">
                    {sortOptions.map((s) => (
                      <button
                        key={s.val}
                        onClick={() => updateFilter('sort', s.val)}
                        className={cn(
                          'text-left text-[14px]',
                          sort === s.val ? 'text-[#7a4320] font-semibold' : 'text-[#241812]'
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[#eee4db]">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full h-[46px] rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em]"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}