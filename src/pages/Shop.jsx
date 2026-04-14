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
  Filter
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
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
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('macbook') &&
              !cat.name.toLowerCase().includes('notebook') &&
              !cat.name.toLowerCase().includes('pc') &&
              !cat.name.toLowerCase().includes('computer') &&
              !cat.name.toLowerCase().includes('chromebook')
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
            (p) =>
              !p.name.toLowerCase().includes('laptop') &&
              !p.name.toLowerCase().includes('macbook') &&
              !p.name.toLowerCase().includes('notebook') &&
              !p.name.toLowerCase().includes('chromebook')
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
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return 'https://via.placeholder.com/400x400?text=Product';
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-black">
      <SEO
        title="Shop Inventory | Printing State"
        description="Browse our high-performance inventory of precision printers."
      />

      {/* Header */}
      <section className="pt-32 pb-12 border-b border-black/10 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
              Our Collections
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
              Shop Inventory
            </h1>
            <p className="mt-4 text-sm md:text-base text-black/60 leading-relaxed max-w-2xl mx-auto">
              Browse through our complete range of professional printers and accessories.
              Found {products.length} items for you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-[280px] shrink-0">
              <div className="border border-black/10 rounded-[24px] p-5 space-y-8 sticky top-28 bg-white">
                {/* Search */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black mb-3">
                    Search
                  </h4>
                  <div className="relative">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Product name..."
                      value={search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                      className="w-full h-12 rounded-[16px] border border-black/10 pl-11 pr-4 text-sm text-black outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black mb-3">
                    Categories
                  </h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => updateFilter('category', '')}
                      className={cn(
                        'text-left px-4 py-3 rounded-[16px] text-sm border transition-none',
                        !category
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black/10'
                      )}
                    >
                      All Products
                    </button>

                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter('category', cat.slug)}
                        className={cn(
                          'text-left px-4 py-3 rounded-[16px] text-sm capitalize border transition-none',
                          category === cat.slug
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black/10'
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black mb-3">
                    Sort By
                  </h4>
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => updateFilter('sort', e.target.value)}
                      className="w-full h-12 rounded-[16px] border border-black/10 px-4 pr-10 text-sm text-black outline-none appearance-none bg-white"
                    >
                      <option value="newest">Latest Arrivals</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="name_asc">Alphabetical</option>
                    </select>
                    <ChevronDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="w-full h-12 rounded-[16px] bg-black text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Filter size={18} />
                Filter & Sort
              </button>
            </div>

            {/* Main Grid */}
            <main className="flex-1">
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-[24px] border border-black/10 bg-white overflow-hidden"
                    >
                      <div className="aspect-square bg-black/[0.03] animate-pulse" />
                      <div className="p-4">
                        <div className="h-4 bg-black/[0.05] rounded mb-2 animate-pulse" />
                        <div className="h-4 w-2/3 bg-black/[0.05] rounded mb-4 animate-pulse" />
                        <div className="h-10 bg-black/[0.05] rounded-[14px] animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16 md:py-24 border border-dashed border-black/10 rounded-[28px]">
                  <Package size={46} className="mx-auto text-black/20 mb-4" />
                  <h2 className="text-2xl font-semibold text-black">No products found</h2>
                  <p className="text-black/60 mt-2 mb-6">
                    Try changing your filters or search terms.
                  </p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="px-7 py-3 rounded-[16px] bg-black text-white text-sm font-semibold"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-col h-full rounded-[24px] border border-black/10 bg-white overflow-hidden"
                    >
                      {/* Image */}
                      <Link
                        to={`/product/${p.slug}`}
                        className="relative aspect-square bg-white border-b border-black/10 p-4 md:p-5 block"
                      >
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src =
                              'https://via.placeholder.com/400x400?text=' + encodeURIComponent(p.name);
                          }}
                        />

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(p);
                          }}
                          className="absolute top-3 right-3 h-9 w-9 rounded-[12px] border border-black/10 bg-white flex items-center justify-center text-black"
                        >
                          <Heart
                            size={14}
                            className={isInWishlist(p.id) ? 'fill-black text-black' : ''}
                          />
                        </button>
                      </Link>

                      {/* Content */}
                      <div className="p-4 md:p-5 flex flex-col flex-1">
                        <Link to={`/product/${p.slug}`} className="block flex-1">
                          <h3 className="text-[13px] md:text-[14px] font-semibold leading-[1.45] text-black line-clamp-2 min-h-[40px]">
                            {p.name}
                          </h3>
                        </Link>

                        <div className="pt-4 mt-auto flex items-center justify-between gap-3">
                          <p className="text-[15px] md:text-[17px] font-bold text-black">
                            ${p.price}
                          </p>

                          <button
                            onClick={(e) => handleAddToCart(e, p)}
                            className="h-10 min-w-[42px] px-4 rounded-[999px] bg-black text-white flex items-center justify-center gap-2 text-[12px] font-semibold"
                          >
                            <ShoppingCart size={14} strokeWidth={2.3} />
                            <span className="hidden sm:inline">Add</span>
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
      </section>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <div
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[200] bg-black/40 lg:hidden"
            />

            <div className="fixed top-0 right-0 bottom-0 w-[88%] max-w-[360px] bg-white z-[210] lg:hidden flex flex-col">
              <div className="flex items-center justify-between px-5 py-5 border-b border-black/10">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-black">
                  Filter & Sort
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="h-10 w-10 rounded-[12px] border border-black/10 flex items-center justify-center text-black"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-8">
                {/* Search */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black mb-3">
                    Search
                  </h4>
                  <div className="relative">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Product name..."
                      value={search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                      className="w-full h-12 rounded-[16px] border border-black/10 pl-11 pr-4 text-sm text-black outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black mb-3">
                    Categories
                  </h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => updateFilter('category', '')}
                      className={cn(
                        'text-left px-4 py-3 rounded-[16px] text-sm border transition-none',
                        !category
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black/10'
                      )}
                    >
                      All Products
                    </button>

                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter('category', cat.slug)}
                        className={cn(
                          'text-left px-4 py-3 rounded-[16px] text-sm capitalize border transition-none',
                          category === cat.slug
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black/10'
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black mb-3">
                    Sort By
                  </h4>
                  <div className="grid gap-2">
                    {[
                      { value: 'newest', label: 'Latest Arrivals' },
                      { value: 'price_low', label: 'Price: Low to High' },
                      { value: 'price_high', label: 'Price: High to Low' },
                      { value: 'name_asc', label: 'Alphabetical' }
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => updateFilter('sort', item.value)}
                        className={cn(
                          'text-left px-4 py-3 rounded-[16px] text-sm border transition-none',
                          sort === item.value
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-black/10'
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-black/10">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full h-12 rounded-[16px] bg-black text-white text-sm font-semibold"
                >
                  Apply
                </button>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}