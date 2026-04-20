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
    <div className="bg-white font-['Poppins'] text-[#111111]">
      <SEO
        title="Shop Printers & Supplies | USPrinterStore"
        description="Browse our high-performance inventory of precision printers and accessories."
      />

      {/* Header / Breadcrumb Section */}
      <section className="w-full bg-gray-50 pt-12 pb-8 border-b border-gray-100">
        <div className="max-w-[1820px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[12px] uppercase tracking-widest text-gray-400 mb-4 ">
                <Link to="/" className="hover:text-blue-800 transition-colors">Home</Link>
                <ChevronRight size={12} />
                <span className="text-blue-800">Shop</span>
              </div>
              <h1 className="text-[36px] md:text-[40px]  text-slate-900 leading-none">
                {activeCategoryName}
              </h1>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 border border-gray-100 rounded-2xl shadow-sm">
              <span className="text-[13px] font-bold text-gray-500 pl-4">{products.length} Items</span>
              <div className="h-6 w-px bg-gray-100"></div>
              <div className="flex items-center gap-2 pr-2">
                <SlidersHorizontal size={14} className="text-gray-400" />
                <select 
                  value={sort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="bg-transparent text-[13px]  outline-none cursor-pointer"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.val} value={opt.val}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1820px] mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-28 space-y-10">
              <div>
                <h3 className="text-[14px]  uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-2">
                  <LayoutGrid size={16} className="text-blue-800" />
                  Categories
                </h3>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      'text-left text-[14px] px-4 py-2 rounded-xl transition-all',
                      !category ? 'bg-blue-800 text-white ' : 'text-gray-500 hover:bg-gray-50 hover:text-slate-900'
                    )}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        'text-left text-[14px] px-4 py-2 rounded-xl transition-all',
                        category === cat.slug ? 'bg-blue-800 text-white ' : 'text-gray-500 hover:bg-gray-50 hover:text-slate-900'
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo in Sidebar */}
              <div className="bg-slate-900 rounded-[2rem] p-8 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-800 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <h4 className="text-white text-[20px] font-black mb-4 relative z-10">Need Help?</h4>
                <p className="text-white/60 text-[13px] leading-relaxed mb-6 relative z-10">
                  Our experts are here to find the perfect printer for you.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-white font-bold text-[12px] uppercase tracking-wider relative z-10 group-hover:gap-3 transition-all">
                  Contact Us <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            {/* Mobile Toolbar */}
            <div className="lg:hidden flex items-center justify-between mb-8 gap-4">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl bg-slate-900 text-white font-bold text-[13px]"
              >
                <Filter size={16} /> Filters
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-24 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package size={32} className="text-gray-300" />
                </div>
                <h2 className="text-[24px] font-bold text-slate-900 mb-2">No items found</h2>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto text-[14px]">
                  We couldn't find any products matching your current filters.
                </p>
                <button
                  onClick={() => updateFilter('category', '')}
                  className="px-8 py-3 bg-blue-800 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200 border border-gray-200 overflow-hidden">
                {products.map((p, i) => (
                  <div
                    key={p.id}
                    className="group relative bg-white flex flex-col h-full"
                  >
                    <Link to={`/product/${p.slug}`} className="block p-4 sm:p-6 flex-grow">
                      {/* Actions Over image */}
                      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center shadow-sm border border-gray-100 transition-all transform scale-0 group-hover:scale-100",
                            isInWishlist(p.id) ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-400 hover:text-blue-800"
                          )}
                        >
                          <Heart size={16} className={isInWishlist(p.id) ? 'fill-current' : ''} />
                        </button>
                      </div>

                      {/* Image */}
                      <div className="aspect-square flex items-center justify-center mb-6 overflow-hidden">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex flex-col">
                       
                        <h4 className="text-slate-800 text-[14px] sm:text-[15px] leading-tight line-clamp-2 h-10 mb-4 group-hover:text-blue-800 transition-colors">
                          {p.name}
                        </h4>
                        
                        <div className="flex items-center gap-3">
                          <span className="text-[18px] font-bold text-slate-900">
                            ${p.price}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="px-4 sm:px-6 pb-6 mt-auto">
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="w-full h-10 border-2 border-slate-900 text-slate-900 text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
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
              className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white z-[510] rounded-t-[3rem] max-h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-[24px] font-black text-slate-900">Filter By</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                <div>
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Categories
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateFilter('category', '')}
                      className={cn(
                        'h-12 flex items-center justify-center rounded-2xl border transition-all text-[13px] font-bold',
                        !category ? 'bg-blue-800 border-blue-800 text-white' : 'border-gray-100 text-slate-900'
                      )}
                    >
                      All Products
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter('category', cat.slug)}
                        className={cn(
                          'h-12 flex items-center justify-center rounded-2xl border transition-all text-[13px] font-bold px-3 text-center leading-tight',
                          category === cat.slug ? 'bg-blue-800 border-blue-800 text-white' : 'border-gray-100 text-slate-900'
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-gray-100">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full h-14 rounded-2xl bg-blue-800 text-white font-black text-[14px] uppercase tracking-widest shadow-lg shadow-blue-100"
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
