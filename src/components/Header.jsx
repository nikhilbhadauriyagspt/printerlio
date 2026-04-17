import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Mail,
  Loader2,
  ChevronDown,
  ChevronRight,
  LogOut,
  Truck,
  HelpCircle,
  Phone,
  LayoutGrid,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState({
    name: 'All Departments',
    slug: '',
  });
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.status === 'success') {
          const allCats = data.data.flatMap((parent) => parent.children || []);
          setCategories(allCats.filter((cat) => !cat.name.toLowerCase().includes('laptop')));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          let url = `${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=5`;
          if (selectedCategory.slug) {
            url += `&category=${encodeURIComponent(selectedCategory.slug)}`;
          }
          const res = await fetch(url);
          const data = await res.json();
          if (data.status === 'success') {
            setSuggestions({ products: data.data || [] });
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ products: [] });
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set('search', searchQuery.trim());
      if (selectedCategory.slug) {
        params.set('category', selectedCategory.slug);
      }
      navigate(`/shop?${params.toString()}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      setSuggestions({ products: [] });
    }
  };

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        const parsed = JSON.parse(storedUser);
        setUser(parsed.role !== 'admin' ? parsed : null);
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop', hasMegaMenu: true },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden md:block w-full fixed top-0 left-0 z-[140] bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 h-11 flex items-center justify-between text-[12px]  tracking-[0.08em] text-gray-600">
          <div className="flex items-center gap-6 min-w-0">
            <Link
              to="/orders"
              className="flex items-center gap-2 transition-colors whitespace-nowrap hover:text-[#7c3f10]"
            >
              <Truck size={14} />
              <span>Track Your Order</span>
            </Link>

            <Link
              to="/faq"
              className="flex items-center gap-2 transition-colors whitespace-nowrap hover:text-[#7c3f10]"
            >
              <HelpCircle size={14} />
              <span>Support Center</span>
            </Link>
          </div>

          <a
            href="mailto:info@myprinterhero.shop"
            className="flex items-center gap-2 font-semibold transition-colors whitespace-nowrap hover:text-[#7c3f10]"
          >
            <Mail size={14} />
            <span>info@myprinterhero.shop</span>
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className="w-full fixed left-0 top-0 md:top-11 z-[130] bg-[#fbf8f5] border-b border-[#e7ddd3] shadow-sm">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8">
          <div className="h-[76px] flex items-center justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-3 lg:gap-5 shrink-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg transition text-[#4c2b16] hover:bg-[#f2e8de]"
              >
                <Menu size={24} />
              </button>

              <Link to="/" className="flex items-center shrink-0">
                <img
                  src="/logo/logo.png"
                  alt="MyPrinterHero"
                  className="h-9 md:h-15 object-contain"
                />
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasMegaMenu && setActiveMegaMenu('shop')}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'h-[76px] px-4 inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors',
                      location.pathname === link.path
                        ? 'text-[#7c3f10]'
                        : 'text-[#5a4437] hover:text-[#7c3f10]'
                    )}
                  >
                    {link.name}
                    {link.hasMegaMenu && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform',
                          activeMegaMenu === 'shop' && 'rotate-180'
                        )}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {activeMegaMenu === 'shop' && link.hasMegaMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        className="absolute left-0 top-full mt-2 w-[920px] bg-white border border-[#eadfd4] rounded-[28px] shadow-[0_20px_70px_rgba(0,0,0,0.12)] p-8 z-[250]"
                      >
                        <div className="grid grid-cols-12 gap-8">
                          <div className="col-span-8">
                            <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#8f7767] mb-5">
                              Printer Categories
                            </h3>

                            <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                              {categories.slice(0, 10).map((cat) => (
                                <Link
                                  key={cat.id}
                                  to={`/shop?category=${cat.slug}`}
                                  onClick={() => setActiveMegaMenu(null)}
                                  className="flex items-center justify-between text-[15px] text-[#5b463a] hover:text-[#7c3f10] transition group"
                                >
                                  <span>{cat.name}</span>
                                  <ChevronRight
                                    size={15}
                                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                  />
                                </Link>
                              ))}
                            </div>

                            <Link
                              to="/shop"
                              onClick={() => setActiveMegaMenu(null)}
                              className="inline-flex items-center gap-2 mt-6 text-[14px] font-semibold text-[#7c3f10] hover:underline"
                            >
                              View All Products <ChevronRight size={16} />
                            </Link>
                          </div>

                          <div className="col-span-4 rounded-[24px] bg-[#f9f3ed] border border-[#eadfd4] p-6 flex flex-col">
                            <div className="w-11 h-11 rounded-xl bg-[#7c3f10] text-white flex items-center justify-center mb-4">
                              <ShoppingBag size={20} />
                            </div>
                            <h4 className="text-[18px] font-semibold text-[#3f2a1d] mb-2">
                              Shop Printer Essentials
                            </h4>
                            <p className="text-[14px] text-[#6f5a4d] leading-6 flex-1">
                              Browse printers, supplies, accessories, and your existing category structure.
                            </p>
                            <Link
                              to="/shop"
                              className="mt-5 inline-flex items-center justify-center h-[44px] rounded-xl bg-[#7c3f10] text-white font-semibold hover:bg-[#63320d] transition"
                              onClick={() => setActiveMegaMenu(null)}
                            >
                              Explore Shop
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0" ref={searchRef}>
              {/* desktop compact search */}
              <div className="hidden lg:flex items-center relative">
                <button
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                  className="h-11 w-11 rounded-full flex items-center justify-center transition text-[#4c2b16] hover:bg-[#f2e8de]"
                >
                  {isSearchOpen ? <X size={19} /> : <Search size={19} />}
                </button>

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-4 w-[560px] bg-white border border-[#eadfd4] rounded-[24px] shadow-[0_20px_70px_rgba(0,0,0,0.12)] overflow-hidden z-[240]"
                    >
                      <form
                        onSubmit={handleSearchSubmit}
                        className="w-full flex items-center border-b border-[#f0e5da] bg-white"
                      >
                        

                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Search printers, ink, toner..."
                            className="w-full h-[56px] px-4 pr-12 text-[14px] text-[#4c2b16] outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchOpen(true)}
                          />
                          {isSearching && (
                            <Loader2
                              size={17}
                              className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#7c3f10]"
                            />
                          )}
                        </div>

                        <button
                          type="submit"
                          className="h-[56px] w-[58px] bg-[#7c3f10] hover:bg-[#63320d] text-white flex items-center justify-center transition"
                        >
                          <Search size={20} />
                        </button>
                      </form>

                      {searchQuery.length > 1 && (
                        <div className="max-h-[340px] overflow-y-auto">
                          {suggestions.products.length > 0 ? (
                            <div className="p-2">
                              {suggestions.products.map((p) => {
                                let imageSrc = '';
                                try {
                                  imageSrc = p.images
                                    ? typeof p.images === 'string'
                                      ? JSON.parse(p.images)[0]
                                      : p.images[0]
                                    : '';
                                } catch {
                                  imageSrc = '';
                                }

                                return (
                                  <Link
                                    key={p.id}
                                    to={`/product/${p.slug}`}
                                    onClick={() => {
                                      setSearchQuery('');
                                      setIsSearchOpen(false);
                                    }}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#fcf8f4] transition"
                                  >
                                    <div className="h-14 w-14 bg-[#f8f4f0] rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-[#f1e7dd]">
                                      {imageSrc && (
                                        <img
                                          src={imageSrc}
                                          alt={p.name}
                                          className="max-h-full max-w-full object-contain p-2"
                                        />
                                      )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <p className="text-[14px] font-medium text-[#4c2b16] truncate">
                                        {p.name}
                                      </p>
                                      <p className="text-[13px] text-[#7c3f10] font-semibold">
                                        ${p.price}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          ) : (
                            !isSearching && (
                              <div className="p-8 text-center text-[#8b7467] text-[14px]">
                                No results found for "{searchQuery}"
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="lg:hidden p-2.5 rounded-lg transition text-[#4c2b16] hover:bg-[#f2e8de]"
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              <div className="relative group">
                <button
                  onClick={() => navigate(user ? '/profile' : '/login')}
                  className="flex flex-col items-center justify-center transition min-w-[48px] text-[#4c2b16] hover:text-[#7c3f10]"
                >
                  <User size={20} />
                  <span className="hidden md:block text-[11px] mt-1 font-medium uppercase tracking-[0.05em]">
                    {user ? 'Profile' : 'Sign In'}
                  </span>
                </button>

                <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-[#eadfd4] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all rounded-2xl p-3 z-[150]">
                  {user ? (
                    <div className="space-y-1">
                      <div className="px-4 py-3 border-b border-[#f1e7dd] mb-2">
                        <p className="text-[11px] font-semibold text-[#8b7467]">Signed in as</p>
                        <p className="text-[14px] font-semibold text-[#4c2b16] truncate">
                          {user.name}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-[14px] text-[#5b463a] hover:text-[#7c3f10] hover:bg-[#fcf8f4] rounded-xl transition"
                      >
                        <User size={16} /> My Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-3 text-[14px] text-[#5b463a] hover:text-[#7c3f10] hover:bg-[#fcf8f4] rounded-xl transition"
                      >
                        <LayoutGrid size={16} /> Order History
                      </Link>

                      <button
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-red-600 hover:bg-red-50 rounded-xl transition mt-2 border-t border-[#f1e7dd]"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  ) : (
                    <div className="p-4">
                      <p className="text-[13px] text-[#6f5a4d] mb-4">
                        Access your account to manage orders and settings.
                      </p>
                      <Link
                        to="/login"
                        className="block w-full py-3 bg-[#7c3f10] text-white text-center rounded-xl text-[13px] font-semibold hover:bg-[#63320d] transition"
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <Link
                to="/wishlist"
                className="relative flex flex-col items-center justify-center transition min-w-[48px] text-[#4c2b16] hover:text-[#7c3f10]"
              >
                <Heart size={20} className={cn(wishlistCount > 0 && 'fill-current')} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 right-0 md:right-1 w-[18px] h-[18px] bg-[#7c3f10] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
                <span className="hidden md:block text-[11px] mt-1 font-medium uppercase tracking-[0.05em]">
                  Favorites
                </span>
              </Link>

              <button
                onClick={openCartDrawer}
                className="relative flex flex-col items-center justify-center transition min-w-[48px] text-[#4c2b16] hover:text-[#7c3f10]"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 right-0 md:right-1 w-[18px] h-[18px] bg-[#7c3f10] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
                <span className="hidden md:block text-[11px] mt-1 font-medium uppercase tracking-[0.05em]">
                  My Cart
                </span>
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden pb-4"
              >
                <form
                  onSubmit={handleSearchSubmit}
                  className="border border-[#eadfd4] rounded-xl overflow-hidden bg-white"
                >
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search printers, toner..."
                      className="flex-1 h-[48px] px-4 text-[14px] outline-none text-[#4c2b16]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="h-[48px] w-[52px] bg-[#7c3f10] text-white flex items-center justify-center"
                    >
                      <Search size={19} />
                    </button>
                  </div>
                </form>

                {searchQuery.length > 1 && (
                  <div className="mt-3 bg-white border border-[#eadfd4] rounded-2xl shadow-sm overflow-hidden">
                    {suggestions.products.length > 0 ? (
                      <div className="p-2">
                        {suggestions.products.map((p) => {
                          let imageSrc = '';
                          try {
                            imageSrc = p.images
                              ? typeof p.images === 'string'
                                ? JSON.parse(p.images)[0]
                                : p.images[0]
                              : '';
                          } catch {
                            imageSrc = '';
                          }

                          return (
                            <Link
                              key={p.id}
                              to={`/product/${p.slug}`}
                              onClick={() => {
                                setSearchQuery('');
                                setIsSearchOpen(false);
                              }}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#fcf8f4] transition"
                            >
                              <div className="h-12 w-12 bg-[#f8f4f0] rounded-lg flex items-center justify-center overflow-hidden border border-[#f1e7dd]">
                                {imageSrc && (
                                  <img
                                    src={imageSrc}
                                    alt={p.name}
                                    className="max-h-full max-w-full object-contain p-2"
                                  />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[14px] text-[#4c2b16] truncate">{p.name}</p>
                                <p className="text-[13px] text-[#7c3f10] font-semibold">
                                  ${p.price}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      !isSearching && (
                        <div className="p-6 text-center text-[#8b7467] text-[14px]">
                          No results found for "{searchQuery}"
                        </div>
                      )
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[200] bg-black/50"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[360px] bg-white z-[210] flex flex-col border-r border-[#eadfd4]"
            >
              <div className="p-5 border-b border-[#eadfd4] flex justify-between items-center">
                <img src="/logo/logo.png" alt="MyPrinterHero" className="h-9 object-contain" />
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg text-[#4c2b16] hover:bg-[#f2e8de] transition"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-5 flex-1 overflow-y-auto space-y-8">
                <div>
                  <p className="text-[12px] font-semibold text-[#8b7467] mb-3 uppercase tracking-[0.08em]">
                    Menu
                  </p>
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 rounded-xl text-[15px] transition',
                          location.pathname === link.path
                            ? 'bg-[#fcf8f4] text-[#7c3f10] font-semibold'
                            : 'text-[#5b463a] hover:bg-[#fcf8f4]'
                        )}
                      >
                        {link.name}
                        <ChevronRight size={16} />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#8b7467] mb-3 uppercase tracking-[0.08em]">
                    Categories
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px] text-[#5b463a] hover:bg-[#fcf8f4] transition"
                      >
                        {cat.name}
                        <ChevronRight size={15} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[#eadfd4]">
                {user ? (
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block w-full py-3 rounded-xl bg-[#7c3f10] text-white text-center font-semibold"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}