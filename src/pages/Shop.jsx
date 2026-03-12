import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  Filter, 
  Heart,
  X,
  Loader2,
  Check,
  Plus,
  Box,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
        }
      });
    
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          setBrands(d.data);
        }
      });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const availableBrands = brands.filter(b => {
    const brandName = b.name.toLowerCase().trim();
    const computerBrands = ['acer', 'asus', 'dell', 'lenovo'];
    if (computerBrands.includes(brandName)) return false;
    return products.some(p => 
      p.brand_id === b.id || 
      p.brand_name?.toLowerCase().trim() === brandName
    );
  });

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <SEO 
        title="Store | MaxPrinter" 
        description="Browse our selection of professional printing solutions."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col space-y-2 mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Hardware Inventory
            </h1>
            <p className="text-slate-400 text-sm font-bold tracking-wide">
              Showing {products.length} professional terminal units and supplies.
            </p>
          </div>

          <div className="w-full max-w-2xl relative group">
             <input 
               type="text" 
               placeholder="Search for printers, ink, or accessories..."
               value={search}
               onChange={(e) => updateFilter('search', e.target.value)}
               className="w-full h-14 pl-14 pr-6 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:bg-white focus:border-blue-600 transition-all"
             />
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600" size={20} />
          </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 pb-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* --- LEFT SIDEBAR: FILTERS --- */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-12">
            
            {/* Categories */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Collections</h4>
              <div className="space-y-1">
                <button 
                  onClick={() => updateFilter('category', '')}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-[13px] font-bold transition-all rounded-lg flex items-center justify-between",
                    !category ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:text-slate-900 hover:bg-gray-50"
                  )}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id} onClick={() => updateFilter('category', cat.slug)}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-[13px] font-bold transition-all rounded-lg flex items-center justify-between",
                      category === cat.slug ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:text-slate-900 hover:bg-gray-50"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Brands</h4>
              <div className="grid grid-cols-1 gap-1">
                {availableBrands.map(b => (
                  <button 
                    key={b.id} onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-[13px] font-bold transition-all rounded-lg flex items-center justify-between",
                      brand === b.name ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:text-slate-900 hover:bg-gray-50"
                    )}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(category || brand || search) && (
              <button 
                onClick={() => navigate('/shop')}
                className="w-full py-3.5 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <X size={14} /> Clear Filters
              </button>
            )}
          </aside>

          {/* --- RIGHT AREA: PRODUCTS --- */}
          <div className="flex-1">
            
            {/* Top Bar: Sort & Mobile Filter Toggle */}
            <div className="flex items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-3 h-12 px-6 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-xl"
                >
                  <Filter size={18} /> Filters
                </button>
              </div>

              <div className="flex items-center gap-4">
                <select 
                  value={sort} onChange={(e) => updateFilter('sort', e.target.value)}
                  className="h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-black uppercase focus:outline-none focus:border-blue-600 cursor-pointer text-slate-900 transition-all"
                >
                  <option value="newest">Recent</option>
                  <option value="price_low">Price: Low</option>
                  <option value="price_high">Price: High</option>
                  <option value="name_asc">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-48">
                <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Synchronizing Stock...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-48 text-center bg-gray-50 rounded-2xl">
                <Box size={40} className="text-slate-200 mb-4" />
                <h2 className="text-2xl font-black text-slate-900">No matching units</h2>
                <p className="text-slate-400 text-sm font-bold mt-2 mb-8">Try a different search or refine your filters</p>
                <button onClick={() => navigate('/shop')} className="px-10 py-4 bg-black text-white font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all">Clear Refinement</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((p) => (
                  <div 
                    key={p.id}
                    className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col group hover:border-blue-600/30 h-[440px]"
                  >
                    {/* Image Panel */}
                    <div className="relative h-[220px] bg-white flex items-center justify-center p-6 overflow-hidden transition-colors duration-500">
                      <div className="absolute top-3 left-3 z-20">
                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full tracking-widest">
                          {p.brand_name || 'Premium'}
                        </span>
                      </div>
                      
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-3 right-3 z-20 h-8 w-8 bg-white rounded-lg flex items-center justify-center transition-all duration-300 border border-gray-100 shadow-sm hover:scale-110",
                          isInWishlist(p.id) ? "text-red-500" : "text-gray-300 hover:text-red-500"
                        )}
                      >
                        <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      <img 
                        src={getImagePath(p.images)} 
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                        alt={p.name} 
                      />
                    </div>

                    {/* Metadata Panel */}
                    <div className="flex-1 p-5 flex flex-col justify-between bg-white relative">
                      <div className="space-y-2">
                        <Link to={`/product/${p.slug}`} className="block">
                          <h3 className="font-black text-slate-900 text-[14px] leading-[1.3] line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {p.name}
                          </h3>
                        </Link>
                      </div>

                      {/* Integrated Action Panel */}
                      <div className="flex items-stretch mt-4 h-11 border border-gray-100 rounded-xl overflow-hidden group/actions">
                        <div className="flex-1 flex flex-col justify-center px-4 bg-gray-50 group-hover/actions:bg-white transition-colors">
                           <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter leading-none mb-1">Standard Price</span>
                           <span className="text-[15px] font-black text-slate-900 leading-none">${p.price}</span>
                        </div>
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          disabled={addedItems[p.id]}
                          className={cn(
                            "w-12 flex items-center justify-center transition-all duration-500 active:scale-95 z-30 relative",
                            addedItems[p.id] 
                              ? "bg-emerald-500 text-white" 
                              : "bg-black text-white hover:bg-blue-600"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                        </button>
                      </div>
                    </div>

                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[85%] z-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MOBILE FILTER SIDEBAR --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-950/20 backdrop-blur-md lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[300px] bg-white z-[110] shadow-2xl lg:hidden flex flex-col p-8 space-y-10 overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center pb-6 border-b border-slate-100">
                <h3 className="text-xl font-black text-slate-900">Refine Selection.</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="h-10 w-10 bg-slate-50 flex items-center justify-center rounded-xl border border-slate-100">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-10">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Collections</h4>
                  <div className="space-y-1">
                    {categories.map(cat => (
                      <button 
                        key={cat.id} onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-4 py-2.5 text-[13px] font-bold transition-all rounded-lg", category === cat.slug ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:bg-slate-50")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Brands</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {availableBrands.map(b => (
                      <button 
                        key={b.id} onClick={() => { updateFilter('brand', b.name); setIsMobileFilterOpen(false); }}
                        className={cn("px-4 py-2.5 text-[11px] font-bold border transition-all rounded-lg", brand === b.name ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-white border-slate-100 text-slate-400")}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { navigate('/shop'); setIsMobileFilterOpen(false); }}
                className="w-full py-4 bg-black text-white text-[11px] font-black uppercase tracking-widest mt-auto rounded-xl"
              >
                Reset All Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
