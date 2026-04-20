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
  Loader2,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutGrid,
  Mail,
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

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.status === 'success') {
          const allCats = data.data.flatMap((parent) => parent.children || []);
          setCategories(
            allCats.filter((cat) => !cat.name.toLowerCase().includes('laptop'))
          );
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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const url = `${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=5`;
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
  }, [searchQuery]);

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

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set('search', searchQuery.trim());
      navigate(`/shop?${params.toString()}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      setSuggestions({ products: [] });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop', hasMegaMenu: true },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const topHeaderHeight = 92;
  const navHeight = 52;
  const totalHeaderHeight = topHeaderHeight + 10;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[140] bg-white border-b border-gray-200">
        {/* TOP HEADER */}
        <div className="bg-[#f6f6f6]">
          <div className="max-w-[1820px] mx-auto px-4 md:px-6">
            <div className="h-[70px] grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 items-center gap-4">
              {/* Left Side: Logo & Mobile Menu */}
              <div className="flex items-center justify-start gap-4">
                <div className="flex items-center lg:hidden">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-[#222] hover:text-blue-800 transition"
                  >
                    <Menu size={26} />
                  </button>
                </div>
                <Link to="/" className="inline-flex items-center">
                  <img
                    src="/logo/logo.png"
                    alt="Logo"
                    className="h-8 md:h-10 lg:h-12 object-contain"
                  />
                </Link>
              </div>

              {/* Center: Desktop Search */}
              <div
                className="hidden lg:flex items-center justify-center relative"
                ref={searchRef}
              >
                <div className="relative w-full max-w-[550px]">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      placeholder="Search for printers, accessories..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearchOpen(true);
                      }}
                      onFocus={() => setIsSearchOpen(true)}
                      className="w-full h-[46px] pl-5 pr-12 bg-white border border-[#d8d8d8] text-[15px] text-[#333] outline-none placeholder:text-[#9a9a9a] rounded-lg"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 h-[46px] w-[46px] flex items-center justify-center text-[#2f4858] hover:text-blue-800 transition"
                    >
                      {isSearching ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Search size={18} />
                      )}
                    </button>
                  </form>

                  <AnimatePresence>
                    {isSearchOpen && searchQuery.length > 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full left-0 mt-2 w-full bg-white border border-[#e5e5e5] shadow-xl z-[220] max-h-[340px] overflow-y-auto rounded-lg"
                      >
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
                                  className="flex items-center gap-3 p-3 hover:bg-[#f8faf8] transition"
                                >
                                  <div className="h-14 w-14 border border-[#ececec] bg-white flex items-center justify-center overflow-hidden shrink-0 rounded-md">
                                    {imageSrc && (
                                      <img
                                        src={imageSrc}
                                        alt={p.name}
                                        className="max-h-full max-w-full object-contain p-1"
                                      />
                                    )}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <p className="text-[14px] text-[#222] truncate font-medium">
                                      {p.name}
                                    </p>
                                    <p className="text-[13px] font-semibold text-blue-800">
                                      ${p.price}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          !isSearching && (
                            <div className="p-5 text-sm text-gray-500 text-center">
                              No results found for "{searchQuery}"
                            </div>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Side: Actions */}
              <div className="flex items-center justify-end gap-3 md:gap-5">
                {/* Mobile Search Button */}
                <button
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                  className="lg:hidden p-2 text-[#222] hover:text-blue-800 transition"
                >
                  {isSearchOpen ? <X size={22} /> : <Search size={22} />}
                </button>

                {/* Account */}
                <div className="relative group hidden sm:block">
                  <button
                    onClick={() => navigate(user ? '/profile' : '/login')}
                    className="flex items-center gap-2 text-[#222] hover:text-blue-800 transition"
                  >
                    <User size={20} strokeWidth={1.8} />
                    <span className="hidden lg:block text-[13px] uppercase tracking-[0.04em]">
                      {user ? 'Profile' : 'Sign In'}
                    </span>
                  </button>

                  <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-[#e8e8e8] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all rounded-xl p-3 z-[200]">
                    {user ? (
                      <div className="space-y-1">
                        <div className="px-4 py-3 border-b border-[#efefef] mb-2">
                          <p className="text-[11px] font-semibold text-gray-500">
                            Signed in as
                          </p>
                          <p className="text-[14px] font-semibold text-[#222] truncate">
                            {user.name}
                          </p>
                        </div>

                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-[14px] text-[#333] hover:text-blue-800 hover:bg-[#f8faf8] rounded-xl transition"
                        >
                          <User size={16} /> My Profile
                        </Link>

                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-4 py-3 text-[14px] text-[#333] hover:text-blue-800 hover:bg-[#f8faf8] rounded-xl transition"
                        >
                          <LayoutGrid size={16} /> Order History
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-red-600 hover:bg-red-50 rounded-xl transition mt-2 border-t border-[#efefef]"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    ) : (
                      <div className="p-4">
                        <p className="text-[13px] text-gray-600 mb-4">
                          Access your account to manage orders and settings.
                        </p>
                        <Link
                          to="/login"
                          className="block w-full py-3 bg-blue-800 text-white text-center rounded-xl text-[13px] font-semibold hover:bg-blue-700 transition"
                        >
                          Sign In
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="relative flex items-center gap-2 text-[#222] hover:text-blue-800 transition"
                >
                  <Heart
                    size={20}
                    strokeWidth={1.8}
                    className={cn(wishlistCount > 0 && 'fill-current')}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 left-3 min-w-[18px] h-[18px] px-1 bg-blue-800 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                  <span className="hidden lg:block text-[13px] uppercase tracking-[0.04em]">
                    Wishlist
                  </span>
                </Link>

                {/* Cart */}
                <button
                  onClick={openCartDrawer}
                  className="relative flex items-center gap-2 text-[#222] hover:text-blue-800 transition"
                >
                  <ShoppingBag size={20} strokeWidth={1.8} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 left-3 min-w-[18px] h-[18px] px-1 bg-blue-800 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                  <span className="hidden lg:block text-[13px] uppercase tracking-[0.04em]">
                    Cart
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Search Box */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden pb-4"
                >
                  <div className="relative" ref={searchRef}>
                    <form
                      onSubmit={handleSearchSubmit}
                      className="relative border border-[#d8d8d8] bg-white"
                    >
                      <input
                        type="text"
                        placeholder="Type here..."
                        className="w-full h-[46px] pl-4 pr-12 text-[14px] outline-none text-[#222]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="absolute right-0 top-0 h-[46px] w-[46px] flex items-center justify-center text-[#2f4858]"
                      >
                        {isSearching ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Search size={18} />
                        )}
                      </button>
                    </form>

                    {searchQuery.length > 1 && (
                      <div className="mt-2 bg-white border border-[#e5e5e5] shadow-lg max-h-[300px] overflow-y-auto">
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
                                  className="flex items-center gap-3 p-3 hover:bg-[#f8faf8] transition"
                                >
                                  <div className="h-12 w-12 border border-[#ececec] bg-white flex items-center justify-center overflow-hidden shrink-0">
                                    {imageSrc && (
                                      <img
                                        src={imageSrc}
                                        alt={p.name}
                                        className="max-h-full max-w-full object-contain p-1"
                                      />
                                    )}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-[14px] text-[#222] truncate">
                                      {p.name}
                                    </p>
                                    <p className="text-[13px] font-semibold text-blue-800">
                                      ${p.price}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          !isSearching && (
                            <div className="p-5 text-center text-sm text-gray-500">
                              No results found for "{searchQuery}"
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* GREEN NAVBAR */}
        <div className="bg-blue-800">
          <div className="max-w-[1820px] mx-auto px-4 md:px-6">
            <div className="h-[52px] flex items-center justify-between">
              {/* Left Side: Email */}
              <div className="hidden lg:flex items-center min-w-[50px]">
                <a
                  href="mailto:info@usprinterstore.shop"
                  className="flex items-center gap-2 text-white text-[14px] hover:text-white/80 transition"
                >
                  <Mail size={16} />
                  <span>info@usprinterstore.shop</span>
                </a>
              </div>

              {/* Center: Nav Links */}
              <nav className="hidden lg:flex items-center">
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
                        'h-[52px] px-6 inline-flex items-center gap-1 text-[15px] font-medium text-white transition-colors',
                        location.pathname === link.path
                          ? 'bg-black/10'
                          : 'hover:bg-black/10'
                      )}
                    >
                      {link.name}
                      {link.hasMegaMenu && (
                        <ChevronDown
                          size={15}
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
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full w-[920px] bg-white border border-[#e7e7e7] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-8 z-[250]"
                        >
                          <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-8">
                              <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gray-500 mb-5">
                                Printer Categories
                              </h3>

                              <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                                {categories.slice(0, 10).map((cat) => (
                                  <Link
                                    key={cat.id}
                                    to={`/shop?category=${cat.slug}`}
                                    onClick={() => setActiveMegaMenu(null)}
                                    className="flex items-center justify-between text-[15px] text-[#333] hover:text-blue-800 transition group"
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
                                className="inline-flex items-center gap-2 mt-6 text-[14px] font-semibold text-blue-800 hover:underline"
                              >
                                View All Products <ChevronRight size={16} />
                              </Link>
                            </div>

                            <div className="col-span-4 border border-[#ededed] bg-[#f8fbf8] p-6">
                              <h4 className="text-[18px] font-semibold text-[#222] mb-2">
                                Shop Printer Essentials
                              </h4>
                              <p className="text-[14px] text-gray-600 leading-6 mb-5">
                                Browse printers, supplies, accessories, and your
                                existing category structure.
                              </p>
                              <Link
                                to="/shop"
                                onClick={() => setActiveMegaMenu(null)}
                                className="inline-flex items-center justify-center h-[44px] px-5 bg-blue-800 text-white font-semibold hover:bg-blue-700 transition"
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

              {/* Right Side: Track Order & Support */}
              <div className="hidden lg:flex items-center gap-6 min-w-[250px] justify-end">
                <Link
                  to="/orders"
                  className="text-white text-[14px] font-medium hover:text-white/80 transition"
                >
                  Track Order
                </Link>
                <Link
                  to="/contact"
                  className="text-white text-[14px] font-medium hover:text-white/80 transition"
                >
                  Contact Support
                </Link>
              </div>

              <div className="lg:hidden text-white text-sm font-medium">
                Browse Menu
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div style={{ height: `${totalHeaderHeight}px` }} />

      {/* MOBILE SIDEBAR */}
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
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[360px] bg-white z-[210] flex flex-col border-r border-[#e5e5e5]"
            >
              <div className="p-5 border-b border-[#ececec] flex justify-between items-center">
                <img src="/logo/logo.png" alt="Logo" className="h-10 object-contain" />
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg text-[#222] hover:bg-[#f5f5f5] transition"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-5 flex-1 overflow-y-auto space-y-8">
                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-3 uppercase tracking-[0.08em]">
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
                            ? 'bg-[#f4faf4] text-blue-800 font-semibold'
                            : 'text-[#333] hover:bg-[#f7f7f7]'
                        )}
                      >
                        {link.name}
                        <ChevronRight size={16} />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-3 uppercase tracking-[0.08em]">
                    Categories
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px] text-[#333] hover:bg-[#f7f7f7] transition"
                      >
                        {cat.name}
                        <ChevronRight size={15} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[#ececec]">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block w-full py-3 rounded-xl bg-blue-800 text-white text-center font-semibold"
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