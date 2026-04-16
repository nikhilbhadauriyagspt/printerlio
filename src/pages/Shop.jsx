import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  X,
  Package,
  Heart,
  ChevronDown,
  ShoppingCart,
  Filter,
  LayoutGrid,
  ChevronRight,
  Eye,
  Zap,
  ArrowRight
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

  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-[#111111]">
      <SEO
        title="Shop Printers & Supplies | Printing Land"
        description="Browse our high-performance inventory of precision printers and accessories."
      />

      {/* --- Simple Breadcrumb & Heading --- */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12">
           <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mb-4">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-gray-900">Shop</span>
           </nav>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
             {category ? categories.find(c => c.slug === category)?.name || 'Collection' : 'All Products'}
           </h1>
           <p className="mt-2 text-gray-500 text-[13px] font-medium max-w-xl">
             Explore professional-grade printing solutions tailored for high-efficiency workspaces and home offices.
           </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- Sidebar (Sticky) --- */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-32 space-y-12">
              
              {/* Category Filter */}
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-6 pb-2 border-b border-gray-900 w-fit">
                  Categories
                </h3>
                <ul className="space-y-4">
                  <li>
                    <button 
                      onClick={() => updateFilter('category', '')}
                      className={cn(
                        "text-[14px] font-bold transition-all hover:text-black",
                        !category ? "text-black" : "text-gray-500"
                      )}
                    >
                      View All
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button 
                        onClick={() => updateFilter('category', cat.slug)}
                        className={cn(
                          "text-[14px] font-bold transition-all hover:text-black text-left",
                          category === cat.slug ? "text-black" : "text-gray-500"
                        )}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sort Filter */}
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-6 pb-2 border-b border-gray-900 w-fit">
                  Sort By
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { val: 'newest', label: 'Newest First' },
                    { val: 'price_low', label: 'Price: Low-High' },
                    { val: 'price_high', label: 'Price: High-Low' },
                    { val: 'name_asc', label: 'Alphabetical' }
                  ].map((s) => (
                    <button
                      key={s.val}
                      onClick={() => updateFilter('sort', s.val)}
                      className={cn(
                        "text-[14px] font-bold transition-all hover:text-black text-left",
                        sort === s.val ? "text-black" : "text-gray-500"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* --- Product Grid --- */}
          <main className="flex-1">
            
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
               <span className="text-[12px] font-bold text-gray-400">
                 {products.length} Items Found
               </span>
               
               <button 
                 onClick={() => setIsMobileFilterOpen(true)}
                 className="lg:hidden flex items-center gap-2 text-[12px] font-bold text-gray-900"
               >
                 <Filter size={16} /> Filter
               </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-50 animate-pulse border-r border-b border-gray-100" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-32 border border-dashed border-gray-200">
                 <Package size={48} className="mx-auto text-gray-200 mb-4" />
                 <h2 className="text-xl font-bold mb-2">No items match your criteria.</h2>
                 <button onClick={() => updateFilter('category', '')} className="text-black font-bold text-sm hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-0 border-t border-l border-gray-100">
                {products.map((p, i) => (
                  <div 
                    key={p.id}
                    className="group relative flex flex-col bg-white border-r border-b border-gray-100 p-8 transition-all duration-300 hover:bg-gray-50"
                  >
                    {/* Image */}
                    <Link to={`/product/${p.slug}`} className="aspect-square w-full mb-8 flex items-center justify-center overflow-hidden">
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(p.name); }}
                      />
                    </Link>
 {/* Actions Overlay (Hidden by default, shows on hover like HP) */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                        className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Heart size={18} className={isInWishlist(p.id) ? "fill-red-500 text-red-500" : ""} />
                      </button>
                      <Link 
                        to={`/product/${p.slug}`}
                        className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-blue-50 hover:text-black transition-colors"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>

                    {/* Info */}
                    <div className="mt-auto">
                       <p className="text-[11px] font-bold uppercase text-black mb-2">Printer</p>
                       <Link to={`/product/${p.slug}`} className="block mb-4">
                        <h4 className=" text-gray-900 text-[15px] leading-tight line-clamp-2 min-h-[2.5rem]">
                          {p.name}
                        </h4>
                      </Link>
                      
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-xl font-bold text-gray-900">${p.price}</span>
                        <button 
                          onClick={(e) => handleAddToCart(e, p)}
                          className="px-6 py-2 bg-black text-white font-bold text-[11px] hover:bg-blue-700 transition-all rounded-none"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- Mobile Filter Drawer --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-[310] lg:hidden flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-lg font-bold">Filter</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-12">
                <div>
                   <h3 className="text-[11px] font-bold text-gray-400 mb-6 uppercase tracking-widest">By Category</h3>
                   <div className="flex flex-col gap-4">
                      <button onClick={() => updateFilter('category', '')} className={cn("text-[14px] font-bold text-left", !category ? "text-black" : "text-gray-900")}>All</button>
                      {categories.map(cat => (
                        <button key={cat.id} onClick={() => updateFilter('category', cat.slug)} className={cn("text-[14px] font-bold text-left", category === cat.slug ? "text-black" : "text-gray-900")}>{cat.name}</button>
                      ))}
                   </div>
                </div>
              </div>

              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-4 bg-gray-900 text-white font-bold text-[12px] mt-8"
              >
                Show Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}