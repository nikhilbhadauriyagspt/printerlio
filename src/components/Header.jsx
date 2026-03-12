import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Heart, 
  ChevronDown,  X,
  LogOut,
  Package,
  ChevronRight,
  Loader2,
  LayoutGrid,
  ShoppingBasket,
  Box,
  Menu, 
  Printer, 
  ShieldCheck, 
  Headset, 
  ShoppingCart,
  ArrowUpRight,
  ArrowRight
  } from 'lucide-react';import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, cart, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setSearchQuery('');
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
          const pData = await pRes.json();
          setSuggestions({ products: pData.status === 'success' ? pData.data : [], categories: [] });
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ products: [], categories: [] });
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          const filtered = data.data.filter(cat => {
            const name = cat.name.toLowerCase();
            return !name.includes('laptop') && !name.includes('computer');
          });
          setCategories(filtered);
          if (filtered.length > 0) setHoveredParent(filtered[0].id);
        }
      });

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  const flattenedSubCats = categories.flatMap(cat => cat.children || []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] font-sans bg-white">
        
       

        {/* --- ROW 2: BRANDED MAIN BAR (CLEAN SQUARE) --- */}
        <div className="py-5 px-6 md:px-10">
          <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between gap-12">
            
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img src="/logo/MYPRINTERMANNN.png" alt="MaxPrinter" className="h-8 md:h-11 w-auto object-contain" />
            </Link>

            {/* Premium Search Terminal */}
            <div className="hidden lg:flex flex-1 max-w-4xl relative" ref={searchRef}>
              <form onSubmit={handleSearch} className="flex w-full group items-center bg-gray-50 hover:bg-gray-100 transition-all focus-within:bg-white border border-gray-200 focus-within:border-blue-600/30 rounded-xl overflow-hidden focus-within:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="px-6 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <Search size={18} strokeWidth={2.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for printers, toner, or hardware..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-12 bg-transparent text-[13px] text-gray-900 focus:outline-none font-bold placeholder:text-gray-400 placeholder:font-medium"
                />
                <button type="submit" className="bg-black text-white px-10 h-12 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all flex items-center gap-3 group/btn">
                  <span>Search</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Enhanced Suggestions Terminal */}
              <AnimatePresence>
                {searchQuery.trim().length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-full left-0 right-0 mt-2 bg-white z-[110] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden border border-gray-100">
                    <div className="p-2 bg-gray-50/50">
                      {isSearching ? (
                        <div className="p-12 text-center">
                          <Loader2 size={24} className="mx-auto animate-spin mb-4 text-blue-600" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Accessing Database...</p>
                        </div>
                      ) : (
                        <div className="max-h-[480px] overflow-y-auto custom-scrollbar space-y-1">
                          {suggestions.products.map(p => (
                            <Link key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')} className="flex items-center gap-6 p-4 bg-white hover:bg-black group transition-all rounded-lg">
                              <div className="h-14 w-14 bg-gray-50 flex items-center justify-center p-2 shrink-0 group-hover:bg-white transition-colors rounded-lg">
                                <img src={p.images ? `${(typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0])}` : ''} className="max-w-full max-h-full object-contain" alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-black text-gray-900 group-hover:text-white uppercase truncate tracking-tight transition-colors">{p.name}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-[11px] font-black text-blue-600 group-hover:text-blue-400 transition-colors">${p.price}</span>
                                  <span className="text-[8px] font-black text-gray-400 group-hover:text-gray-500 uppercase tracking-tighter transition-colors">SKU: {p.id}</span>
                                </div>
                              </div>
                              <ArrowRight size={16} className="text-gray-200 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Refined Action Hub */}
            <div className="flex items-center gap-4">
              <Link to="/wishlist" className="hidden xl:flex h-12 w-12 items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-xl transition-all relative group">
                <Heart size={20} strokeWidth={2} />
                {wishlistCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm">{wishlistCount}</span>}
              </Link>
              
              <Link to={user ? "/profile" : "/login"} className="h-12 px-6 flex items-center gap-3 bg-white border border-gray-100 hover:border-blue-600/20 hover:bg-blue-50/30 text-gray-900 rounded-xl transition-all group">
                <User size={20} className="group-hover:text-blue-600 transition-colors" />
                <div className="hidden xl:flex flex-col items-start leading-none">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-1">Account</span>
                  <span className="text-[11px] font-black uppercase tracking-widest">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
                </div>
              </Link>

              <button onClick={openCartDrawer} className="h-12 px-6 bg-black text-white flex items-center gap-4 hover:bg-blue-600 rounded-xl transition-all relative group shadow-lg shadow-black/5">
                <div className="flex flex-col items-end leading-none border-r border-white/20 pr-4">
                  <span className="text-[9px] font-bold text-blue-200 uppercase tracking-tight mb-1">My Cart</span>
                  <span className="text-[13px] font-black tracking-widest">${cartTotal}</span>
                </div>
                <div className="relative">
                  <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && <span className="absolute -top-2 -right-2 h-5 w-5 bg-blue-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-black">{cartCount}</span>}
                </div>
              </button>

              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden h-12 w-12 flex items-center justify-center bg-gray-50 text-black hover:bg-gray-100 rounded-xl transition-all"><Menu size={24} /></button>
            </div>
          </div>
        </div>

        {/* --- ROW 3: NAV & CATEGORY MARQUEE (VIBRANT BLUE) --- */}
        <div className="hidden lg:block bg-blue-600">
          <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 flex items-center h-10">
            
            {/* Main Nav */}
            <nav className="flex h-full items-center mr-12 shrink-0">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} to={link.path} 
                  className={cn(
                    "text-[11px] font-black uppercase tracking-[0.2em] px-6 h-full flex items-center transition-all relative group",
                    location.pathname === link.path ? "text-white" : "text-blue-100 hover:text-white"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-0 left-6 right-6 h-1 bg-white transition-transform origin-left",
                    location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </Link>
              ))}
            </nav>

            {/* Category Marquee (Clean & Blue Theme) */}
            <div className="flex-1 overflow-hidden relative group/marquee mx-4">
              <div className="flex items-center h-10
               animate-marquee pause-on-hover">
                {[...flattenedSubCats, ...flattenedSubCats].map((sub, idx) => (
                  <Link 
                    key={`header-sub-${sub.id}-${idx}`} 
                    to={`/shop?category=${sub.slug}`}
                    className="flex items-center gap-4 shrink-0 px-10 h-14 hover:bg-white/10 transition-all group"
                  >
                    <div className="h-14 w-20 bg-white flex items-center justify-center overflow-hidden shrink-0 transition-all group-hover:scale-105">
                      {sub.image ? (
                        <img 
                          src={sub.image.startsWith('http') ? sub.image : `/${sub.image}`} 
                          alt="" 
                          className="h-25 w-full object-contain"
                          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                        />
                      ) : null}
                      <ShoppingBasket size={24} className={cn("text-blue-600", sub.image ? "hidden" : "block")} />
                    </div>
                    <span className="text-[10px] font-black text-blue-50 uppercase tracking-widest group-hover:text-white transition-colors whitespace-nowrap">{sub.name}</span>
                  </Link>
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-600 to-transparent pointer-events-none z-10" />
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none z-10" />
            </div>

           

          </div>
        </div>
      </header>

      {/* Spacer (Adjusted Height) */}
      <div className="h-[76px] md:h-[136px] lg:h-[152px]"></div>

      {/* --- MOBILE SIDEBAR (SQUARE) --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-black/60" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 h-full w-[300px] bg-white z-[210] flex flex-col border-r border-gray-200">
              <div className="p-6 flex justify-between items-center border-b border-gray-200">
                <Link to="/" onClick={() => setIsSidebarOpen(false)}><img src="/logo/MYPRINTERMANNN.png" alt="MaxPrinter" className="h-8 w-auto object-contain" /></Link>
                <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 flex items-center justify-center bg-gray-50 border border-gray-100"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                <nav className="space-y-2">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">Main Menu</p>
                  {navLinks.map(link => (
                    <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className={cn("flex items-center justify-between px-4 py-4 text-[12px] font-black uppercase tracking-widest border border-transparent transition-all", location.pathname === link.path ? "bg-black text-white" : "text-gray-600 border-gray-100")}>
                      {link.name} <ChevronRight size={16} />
                    </Link>
                  ))}
                </nav>
                <div className="pt-8 border-t border-gray-200">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">Account</p>
                  <div className="space-y-2">
                     <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 text-[12px] font-black uppercase border border-gray-100"><User size={18} /> Profile</Link>
                     <Link to="/wishlist" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 p-4 text-[12px] font-black uppercase border border-gray-100"><Heart size={18} /> Wishlist</Link>
                     {user ? (
                       <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 text-[12px] font-black uppercase text-red-600 border border-red-100 bg-red-50 mt-4">Logout</button>
                     ) : (
                       <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="w-full flex items-center gap-4 p-4 text-[12px] font-black uppercase text-white bg-black mt-4">Login</Link>
                     )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
