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
  const [selectedCategory, setSelectedCategory] = useState('');

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
          let url = `${API_BASE_URL}/products?search=${encodeURIComponent(
            searchQuery
          )}&limit=5`;

          if (selectedCategory) {
            url += `&category=${encodeURIComponent(selectedCategory)}`;
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

    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    if (selectedCategory) {
      params.set('category', selectedCategory);
    }

    navigate(`/shop${params.toString() ? `?${params.toString()}` : ''}`);
    setIsSearchOpen(false);
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
  const totalHeaderHeight = topHeaderHeight + navHeight;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[140] bg-white border-b border-[#ece7dc] shadow-sm font-['Poppins']">
        {/* Top Main Header */}
        <div className="h-[92px] bg-blue-700 flex items-center">
          <div className="max-w-[1820px] mx-auto px-4 md:px-8 xl:px-10 w-full flex items-center gap-4 lg:gap-8">
            {/* Left */}
            <div className="flex items-center gap-3 shrink-0 min-w-fit">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-[#2f2f2f] hover:bg-[#f7f2e8]"
              >
                <Menu size={24} />
              </button>

              <Link to="/" className="flex items-center">
                <img
                  src="/logo/logo.png"
                  alt="Logo"
                  className="h-9 md:h-14 object-contain "
                />
              </Link>
            </div>

            {/* Search */}
            <div
              className="hidden md:flex flex-1 max-w-[760px] mx-auto relative"
              ref={searchRef}
            >
              <form
                onSubmit={handleSearchSubmit}
                className="w-full h-[48px] rounded-md border border-[#ddd6c8] overflow-hidden bg-white flex items-center shadow-[0_4px_18px_rgba(0,0,0,0.04)]"
              >
                <div className="relative h-full shrink-0 border-r border-[#ece7dc]">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-full pl-4 pr-9 text-[13px] text-[#4b4b4b] bg-[#fbfaf7] outline-none appearance-none min-w-[125px]"
                  >
                    <option value="">Category</option>
                    {categories.slice(0, 14).map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8477] pointer-events-none"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Search printer, ink, toner or accessories"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="flex-1 h-full px-4 text-[14px] text-[#2f2f2f] outline-none bg-white"
                />

                <button
                  type="submit"
                  className="h-full w-[54px] bg-blue-900 text-white flex items-center justify-center hover:bg-[#ffaa00] transition-colors"
                  aria-label="Search"
                >
                  {isSearching ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Search size={18} />
                  )}
                </button>
              </form>

              <AnimatePresence>
                {isSearchOpen && (searchQuery.length > 1 || selectedCategory) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-3 w-full bg-white border border-[#eee8dc] rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.08)] overflow-hidden z-[220]"
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
                              className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#faf7f1] transition-colors"
                            >
                              <div className="w-14 h-14 rounded-xl bg-white border border-[#f1ece2] p-2">
                                <img
                                  src={imageSrc}
                                  alt={p.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold text-[#2f2f2f] truncate">
                                  {p.name}
                                </p>
                                <p className="text-[12px] text-[#c4902b] font-semibold mt-1">
                                  ${p.price}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : !isSearching ? (
                      <div className="px-5 py-6 text-center text-[13px] text-[#8b8578]">
                        No products found
                      </div>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 md:gap-5 shrink-0 ml-auto">
              <Link
                to="/wishlist"
                className="relative text-white hover:text-[#c4902b] transition-colors"
              >
                <Heart size={21} strokeWidth={1.8} />
                
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-blue-900 text-white text-[10px] flex items-center justify-center font-semibold">
                    {wishlistCount}
                  
                  </span>
                )}
              </Link>

              <button
                onClick={openCartDrawer}
                className="relative text-white hover:text-[#c4902b] transition-colors"
              >
                <ShoppingBag size={21} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-[#d5a037] text-white text-[10px] flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                to={user ? '/profile' : '/login'}
                className="hidden sm:inline-flex items-center gap-2 h-[40px] px-5 rounded-md bg-blue-900 text-white text-[13px] font-semibold hover:bg-[#bf8f31] transition-colors"
              >
                <User size={16} />
                {user ? 'My Account' : 'Login'}
              </Link>

              <Link
                to={user ? '/profile' : '/login'}
                className="sm:hidden text-[#2f2f2f]"
              >
                <User size={21} strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="h-[52px] border-t border-[#f0ece4]">
          <div className="max-w-[1820px] mx-auto px-4 md:px-8 xl:px-10 h-full flex items-center justify-between">
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10 h-full">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() =>
                    link.hasMegaMenu ? setActiveMegaMenu('shop') : null
                  }
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'h-full flex items-center gap-1 text-[13px] font-medium text-[#444] hover:text-blue-900 transition-colors',
                      location.pathname === link.path && 'text-[#c4902b]'
                    )}
                  >
                    {link.name}
                    {link.hasMegaMenu && <ChevronDown size={14} />}
                  </Link>

                  <AnimatePresence>
                    {activeMegaMenu === 'shop' && link.hasMegaMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 14 }}
                        className="absolute left-0 top-full w-[900px] bg-white border border-[#eee7da] rounded-b-2xl shadow-[0_22px_50px_rgba(0,0,0,0.12)] p-8 z-[260] flex gap-10"
                      >
                        <div className="flex-1">
                          <h3 className="text-[12px] uppercase tracking-[0.16em] text-[#b18c46] font-semibold mb-5">
                            Printer Categories
                          </h3>

                          <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                            {categories.slice(0, 12).map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/shop?category=${cat.slug}`}
                                onClick={() => setActiveMegaMenu(null)}
                                className="group flex items-center justify-between text-[14px] text-[#4e4e4e] hover:text-[#1f1f1f]"
                              >
                                <span>{cat.name}</span>
                                <ChevronRight
                                  size={14}
                                  className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#c4902b]"
                                />
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="w-[270px] rounded-2xl bg-[#faf7f1] border border-[#eee6d7] p-6">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#b18c46] font-semibold mb-3">
                            Special Picks
                          </p>
                          <h4 className="text-[22px] font-bold text-[#2f2f2f] leading-tight mb-3">
                            Find the right printer for home & office
                          </h4>
                          <p className="text-[13px] text-[#777062] leading-6 mb-5">
                            Explore inkjet, laser, all-in-one and accessories in one place.
                          </p>
                          <Link
                            to="/shop"
                            className="inline-flex items-center justify-center h-11 px-5 rounded-md bg-[#d5a037] text-white text-[13px] font-semibold hover:bg-[#bf8f31] transition-colors"
                          >
                            Shop Now
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-6 text-[12px] text-black">
              <a
                href="mailto:info@printerlio.shop"
                className="flex items-center gap-2 hover:text-[#c4902b] transition-colors"
              >
                <Mail size={14} />
                info@printerlio.shop
              </a>
              <Link to="/orders" className="hover:text-[#c4902b] transition-colors">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div style={{ height: `${totalHeaderHeight}px` }} />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-[200]"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed left-0 top-0 bottom-0 w-[310px] bg-white z-[210] flex flex-col"
            >
              <div className="px-5 py-5 border-b border-[#eee7da] flex items-center justify-between">
                <img
                  src="/logo/logo.png"
                  alt="Logo"
                  className="h-9 object-contain"
                />
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-[#2f2f2f]"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 border-b border-[#f1ece3]">
                <form
                  onSubmit={handleSearchSubmit}
                  className="h-[46px] rounded-xl border border-[#e6dece] overflow-hidden flex"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 text-[14px] outline-none"
                  />
                  <button
                    type="submit"
                    className="w-12 flex items-center justify-center bg-[#d5a037] text-white"
                  >
                    <Search size={17} />
                  </button>
                </form>
              </div>

              <div className="flex-1 overflow-y-auto py-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      'block px-5 py-4 text-[14px] font-semibold text-[#2f2f2f] border-l-[3px] border-transparent hover:bg-[#faf7f1]',
                      location.pathname === link.path &&
                        'bg-[#faf7f1] border-[#d5a037]'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="mt-4 px-5 pt-5 border-t border-[#f1ece3]">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#ad9871] font-semibold mb-4">
                    Categories
                  </p>
                  <div className="space-y-3">
                    {categories.slice(0, 8).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="block text-[14px] text-[#555]"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[#eee7da] space-y-3">
                <Link
                  to="/orders"
                  onClick={() => setIsSidebarOpen(false)}
                  className="block text-[14px] text-[#555]"
                >
                  Track Order
                </Link>

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full h-11 rounded-xl bg-red-50 text-red-600 text-[13px] font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center justify-center w-full h-11 rounded-xl bg-[#d5a037] text-white text-[13px] font-semibold"
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