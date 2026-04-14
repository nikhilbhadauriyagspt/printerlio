import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  Loader2,
  ChevronDown,
  LayoutGrid,
  ChevronRight,
  LogOut,
  Mail,
  Zap,
  Phone,
  Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.status === 'success') {
          const allCats = data.data.flatMap(parent => parent.children || []);
          const printerCats = allCats.filter(cat => {
            const name = cat.name.toLowerCase();
            return !name.includes('laptop') && !name.includes('computer');
          });
          setCategories(printerCats);
        }
      } catch (err) {
        console.error('Category Fetch Error:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAllDropdownOpen(false);
      }
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
          if (pData.status === 'success') {
            setSuggestions({ products: pData.data || [] });
          }
        } catch (err) { 
          console.error('Search Error:', err); 
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

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileSearchOpen(false);
    }
  };

  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser || storedUser === 'undefined') {
          setUser(null);
          return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop'},
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 font-poppins bg-white",
        isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.05)]" : ""
      )}>
        
        {/* --- ROW 1: BRAND, SEARCH & ACTIONS --- */}
        <div className="border-b border-slate-50">
          <div className="max-w-[1920px] mx-auto px-4 md:px-10 h-20 md:h-24 flex items-center justify-between gap-6 md:gap-12">
            
            {/* LOGO AREA */}
            <div className="flex items-center gap-4 shrink-0">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden p-2 text-slate-900 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="shrink-0 flex items-center group">
                <img 
                  src="/logo/logo.png" 
                  alt="Printing State" 
                  className="h-8 md:h-12 transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* EXPANDED SEARCH BAR (CENTER) */}
            <div className="hidden lg:block flex-1 max-w-4xl relative">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search size={20} strokeWidth={2} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for premium printers, inks, and accessories..." 
                  className="w-full bg-slate-50/80 border-2 border-transparent rounded-[2rem] pl-16 pr-6 py-4 text-[14px] font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:shadow-[0_10px_40px_rgba(37,99,235,0.1)] transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isSearching && (
                   <Loader2 size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-600 animate-spin" />
                )}
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                    className="absolute top-[calc(100%+12px)] left-0 w-full bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-[2rem] overflow-hidden z-[110] border border-slate-100 p-3"
                  >
                    {suggestions.products.length > 0 ? (
                      <div className="grid gap-2">
                        {suggestions.products.map(p => (
                          <Link key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')} className="flex items-center gap-4 p-4 hover:bg-blue-50/50 rounded-2xl transition-all group">
                             <div className="h-14 w-14 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-2 shadow-sm group-hover:border-blue-200">
                                <img src={p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : ''} alt="" className="max-h-full max-w-full object-contain" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{p.name}</p>
                                <p className="text-[13px] font-black text-blue-600">${p.price}</p>
                             </div>
                             <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                               <ChevronRight size={16} />
                             </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-10 text-center text-sm text-slate-400 font-bold">No results found for "{searchQuery}"</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACTION ICONS */}
            <div className="flex items-center gap-2 md:gap-5 shrink-0">
              <button 
                onClick={() => setIsMobileSearchOpen(true)} 
                className="lg:hidden h-12 w-12 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-2xl transition-all"
              >
                <Search size={24} />
              </button>

              <Link to={user ? "/profile" : "/login"} className="hidden sm:flex flex-col items-center gap-1 group">
                <div className="h-11 w-11 flex items-center justify-center bg-slate-50 group-hover:bg-blue-50 rounded-2xl transition-all border border-transparent group-hover:border-blue-100 text-slate-600 group-hover:text-blue-600">
                  <User size={22} strokeWidth={2} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
              </Link>

              <Link to="/wishlist" className="flex flex-col items-center gap-1 group relative">
                <div className="h-11 w-11 flex items-center justify-center bg-slate-50 group-hover:bg-rose-50 rounded-2xl transition-all border border-transparent group-hover:border-rose-100 text-slate-600 group-hover:text-rose-500">
                  <Heart size={22} strokeWidth={2} className={cn(wishlistCount > 0 && "fill-rose-500 text-rose-500")} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-4 ring-white shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-rose-500 transition-colors uppercase tracking-widest">Saved</span>
              </Link>

              <button 
                onClick={openCartDrawer} 
                className="h-12 md:h-14 pl-4 pr-5 md:pl-6 md:pr-8 bg-blue-600 hover:bg-slate-900 text-white rounded-2xl transition-all flex items-center gap-4 shadow-xl shadow-blue-500/10 active:scale-95 group ml-2"
              >
                <div className="relative">
                  <ShoppingCart size={22} strokeWidth={2.5} />
                  <span className="absolute -top-3 -right-3 h-5 w-5 bg-white text-blue-600 text-[11px] font-black rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                </div>
                <div className="hidden sm:flex flex-col items-start leading-none">
                  <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">My Cart</span>
                  <span className="text-[14px] font-black">Checkout</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* --- ROW 2: CATEGORIES & NAV --- */}
        <div className="hidden lg:block border-b border-slate-100">
          <div className="max-w-[1920px] mx-auto px-10 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8 h-full">
              
              {/* CATEGORIES PILL */}
              <div className="relative" ref={dropdownRef}>
                 <button 
                   onClick={() => setIsAllDropdownOpen(!isAllDropdownOpen)}
                   className={cn(
                     "flex items-center gap-3 px-6 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-widest transition-all",
                     isAllDropdownOpen ? "bg-slate-900 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                   )}
                 >
                   <LayoutGrid size={18} />
                   <span>Browse Catalog</span>
                   <ChevronDown size={14} className={cn("transition-transform duration-300", isAllDropdownOpen && "rotate-180")} />
                 </button>

                 <AnimatePresence>
                   {isAllDropdownOpen && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                       className="absolute top-[calc(100%+10px)] left-0 w-[320px] bg-white shadow-2xl z-[500] border border-slate-100 rounded-3xl overflow-hidden p-3"
                     >
                        <div className="grid gap-1">
                          {categories.slice(0, 10).map(cat => (
                            <Link 
                              key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsAllDropdownOpen(false)}
                              className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 rounded-2xl text-slate-700 hover:text-blue-600 font-bold text-[13px] transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100" />
                                <span>{cat.name}</span>
                              </div>
                              <ChevronRight size={14} className="text-slate-200" />
                            </Link>
                          ))}
                          <div className="mt-2 p-2">
                            <Link to="/shop" onClick={() => setIsAllDropdownOpen(false)} className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-2xl text-[12px] font-bold hover:bg-blue-600 transition-all uppercase tracking-widest">
                              View All Categories
                            </Link>
                          </div>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              {/* CLEAN NAV LINKS */}
              <nav className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} to={link.path} 
                    className={cn(
                      "px-5 py-2 rounded-full text-[13px] font-bold transition-all relative group",
                      location.pathname === link.path ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:text-slate-900"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-6">
               <Link to="/orders" className="flex items-center gap-2 text-[12px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                  <Box size={16} />
                  <span>Track Order</span>
               </Link>
               <div className="h-4 w-[1px] bg-slate-200" />
               <div className="flex items-center gap-2 text-[12px] font-bold text-slate-900 tracking-widest">
                  <Mail size={14} className="text-blue-600" />
                  <span>info@printingstate.shop</span>
               </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="lg:hidden absolute top-4 left-4 right-4 bg-white z-[200] p-3 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <form onSubmit={handleSearch} className="flex-1 flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-5 h-14">
                  <Search size={22} className="text-blue-600" />
                  <input 
                    autoFocus type="text" placeholder="Search..." 
                    className="flex-1 bg-transparent px-3 text-base font-bold outline-none text-slate-900"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <button onClick={() => setIsMobileSearchOpen(false)} className="h-14 w-14 flex items-center justify-center bg-slate-100 text-slate-500 rounded-2xl transition-colors"><X size={24} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="p-8 flex justify-between items-center bg-slate-50">
                 <img src="/logo/logo.png" alt="" className="h-8" />
                 <button className="h-12 w-12 flex items-center justify-center text-slate-400" onClick={() => setIsSidebarOpen(false)}><X size={28} /></button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-8 no-scrollbar">
                <div className="mb-10">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Explore</p>
                  <div className="grid gap-2">
                    {navLinks.map(link => (
                      <Link 
                        key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} 
                        className={cn(
                          "py-4 px-6 rounded-2xl font-bold text-[16px] transition-all",
                          location.pathname === link.path ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" : "text-slate-700 active:bg-slate-50"
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Categories</p>
                  <div className="grid gap-2">
                    {categories.slice(0, 10).map(cat => (
                       <Link 
                        key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} 
                        className="py-4 px-6 text-slate-700 active:text-blue-600 font-bold text-[16px] transition-all flex items-center justify-between bg-slate-50 rounded-2xl"
                       >
                         <span>{cat.name}</span>
                         <ChevronRight size={18} className="text-slate-300" />
                       </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-100">
                {user ? (
                   <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2">
                     <LogOut size={18} /> Logout
                   </button>
                ) : (
                  <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="block w-full py-4 bg-blue-600 text-white text-center rounded-2xl font-bold text-[14px] shadow-xl shadow-blue-500/20">
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content from going under the fixed header */}
      <div className="h-[120px] md:h-[160px]" />
    </>
  );
}
