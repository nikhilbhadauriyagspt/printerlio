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
  LayoutGrid,
  Search,
  ArrowRight,
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
    <div className="bg-white font-['Poppins'] text-[#001e3c]">
      <SEO
        title="Shop Printers & Supplies | Printer Lio"
        description="Browse our high-performance inventory of precision printers and accessories."
      />

      {/* Compact Centered Header Section */}
      <section className="w-full bg-gradient-to-b from-[#001e3c]/5 to-transparent py-10 md:py-14 border-b border-gray-100">
        <div className="max-w-[1820px] mx-auto px-4 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[#001e3c]/40 mb-3 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 font-bold">
            <Link to="/" className="hover:text-[#fbb124] transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-[#001e3c]">Shop</span>
          </div>
          
          <h1 className="text-[32px] md:text-[46px] font-semibold text-[#001e3c] leading-tight mb-2  tracking-tight">
            {activeCategoryName}
          </h1>
          <p className="text-gray-500 text-[14px] md:text-[15px] max-w-[550px] mx-auto leading-relaxed">
            Precision printing solutions for professional excellence.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1820px] mx-auto px-4 md:px-10 py-8 md:py-12">
        
        {/* Compact Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 pb-6 border-b border-gray-50">
           <div className="flex items-center gap-4 order-2 md:order-1">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-5 h-10 rounded-lg bg-[#001e3c] text-white font-bold text-[12px] uppercase tracking-wider"
              >
                <Filter size={14} /> Filters
              </button>
              <p className="text-[12px] font-bold text-[#001e3c]/30 uppercase tracking-widest">
                {products.length} Products Found
              </p>
           </div>

           <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 h-10 rounded-lg order-1 md:order-2">
              <SlidersHorizontal size={13} className="text-[#001e3c]/30" />
              <select 
                value={sort}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="bg-transparent text-[12px] font-bold uppercase tracking-wide outline-none cursor-pointer text-[#001e3c]"
              >
                {sortOptions.map(opt => (
                  <option key={opt.val} value={opt.val}>{opt.label}</option>
                ))}
              </select>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Filters Sidebar - More Compact */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-28 space-y-10">
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#001e3c] mb-6 border-l-4 border-[#fbb124] pl-3">
                  Categories
                </h3>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      'text-left text-[13px] px-4 py-2.5 rounded-lg transition-all font-semibold uppercase tracking-wide',
                      !category ? 'bg-[#001e3c] text-white shadow-md' : 'text-[#001e3c]/60 hover:bg-gray-50 hover:text-[#001e3c]'
                    )}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        'text-left text-[13px] px-4 py-2.5 rounded-lg transition-all font-semibold uppercase tracking-wide',
                        category === cat.slug ? 'bg-[#001e3c] text-white shadow-md' : 'text-[#001e3c]/60 hover:bg-gray-50 hover:text-[#001e3c]'
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Sidebar Promo */}
              <div className="bg-[#001e3c] rounded-[1.5rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#fbb124] rounded-full blur-[60px] opacity-20" />
                <h4 className="text-white text-[18px] font-semibold mb-2 relative z-10">Expert Help</h4>
                <p className="text-white/40 text-[12px] leading-relaxed mb-6 relative z-10">
                  Our specialists are ready to assist you.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 h-10 px-5 bg-[#fbb124] text-[#001e3c] font-bold rounded-lg text-[11px] uppercase tracking-widest relative z-10 transition-all hover:bg-white shadow-lg">
                  Contact <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>

          {/* Product Grid Area - Smaller 4-Column Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-50 rounded-2xl animate-pulse border border-gray-100" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-24 text-center bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Package size={32} className="text-[#001e3c]/20" />
                </div>
                <h2 className="text-[24px] font-semibold text-[#001e3c] mb-2">Empty Selection</h2>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto text-[14px]">
                  Try clearing filters to find what you're looking for.
                </p>
                <button
                  onClick={() => updateFilter('category', '')}
                  className="h-12 px-8 bg-[#001e3c] text-white font-bold rounded-xl hover:bg-[#fbb124] hover:text-[#001e3c] transition-all uppercase tracking-widest text-[12px]"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
                {products.map((p, i) => (
                  <motion.div
                    key={p.id || i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    viewport={{ once: true }}
                    className="group relative bg-white rounded-2xl border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,30,60,0.08)] transition-all duration-500 flex flex-col h-full overflow-hidden"
                  >
                    <Link to={`/product/${p.slug}`} className="relative block p-5 flex-grow">
                      {/* Sale Badge */}
                      {p.original_price && (
                        <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-md shadow-md shadow-red-500/10">
                          SALE
                        </span>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(p);
                        }}
                        className={cn(
                          "absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all duration-300 transform scale-0 group-hover:scale-100",
                          isInWishlist(p.id) 
                            ? "bg-red-500 text-white border-red-500" 
                            : "bg-white text-[#001e3c] border-gray-50 hover:bg-[#fbb124]"
                        )}
                      >
                        <Heart size={15} className={isInWishlist(p.id) ? 'fill-current' : ''} strokeWidth={2} />
                      </button>

                      {/* Product Image - Tighter Fit */}
                      <div className="aspect-square flex items-center justify-center mb-6 overflow-hidden">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col text-center">
                        <h4 className="text-[#001e3c] text-[13px] md:text-[14px] font-semibold leading-tight line-clamp-2 h-9 mb-4 group-hover:text-[#fbb124] transition-colors px-1">
                          {p.name}
                        </h4>
                        
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-[18px] font-black text-[#001e3c]">
                            ${p.price}
                          </span>
                          {p.original_price && (
                             <span className="text-[13px] text-gray-300 line-through font-medium">
                               ${p.original_price}
                             </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Compact Add to Cart Button */}
                    <div className="px-5 pb-6 mt-auto">
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="w-full h-10 bg-[#001e3c] text-white rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#fbb124] hover:text-[#001e3c] active:scale-95 shadow-sm"
                      >
                        <ShoppingCart size={14} />
                        Add to Cart
                      </button>
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
              className="fixed inset-0 z-[500] bg-[#001e3c]/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white z-[510] rounded-t-[3.5rem] max-h-[90vh] overflow-hidden flex flex-col shadow-[0_-20px_60px_rgba(0,0,0,0.15)]"
            >
              <div className="p-10 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-[26px] font-semibold text-[#001e3c]">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#001e3c]">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-12">
                <div>
                  <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-[#001e3c]/30 mb-8">
                    Categories
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => updateFilter('category', '')}
                      className={cn(
                        'h-14 flex items-center px-6 rounded-2xl border transition-all text-[14px] font-bold uppercase tracking-wide',
                        !category ? 'bg-[#001e3c] border-[#001e3c] text-white shadow-xl' : 'border-gray-100 text-[#001e3c]'
                      )}
                    >
                      All Products
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter('category', cat.slug)}
                        className={cn(
                          'h-14 flex items-center px-6 rounded-2xl border transition-all text-[14px] font-bold uppercase tracking-wide',
                          category === cat.slug ? 'bg-[#001e3c] border-[#001e3c] text-white shadow-xl' : 'border-gray-100 text-[#001e3c]'
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-10 border-t border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full h-16 rounded-[2rem] bg-[#001e3c] text-white font-bold text-[14px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 active:scale-95 transition-all"
                >
                  View Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
