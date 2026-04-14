import { Link } from 'react-router-dom';
import { Mail, MapPin, ShieldCheck, Loader2, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values())
            .filter(cat => 
              !cat.name.toLowerCase().includes('laptop') && 
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('chromebook')
            )
            .slice(0, 5);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Track Order', path: '/orders' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-and-conditions' },
    { name: 'Return Policy', path: '/return-policy' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  return (
    <footer className="bg-white text-slate-900 pt-16 pb-8 font-poppins border-t border-slate-100">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20">
        
        {/* --- TOP ROW: NEWSLETTER --- */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 mb-12 border-b border-slate-50">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-xl md:text-2xl  text-slate-900 ">Stay Connected</h3>
            <p className="text-slate-400 text-[14px] font-medium mt-1">Join our newsletter for the latest tech updates and exclusive printer deals.</p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full max-w-md flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-100 focus-within:border-blue-500 transition-all">
            <input
              required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-5 py-2.5 text-[13px] font-medium outline-none"
            />
            <button
              disabled={loading}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Subscribe"}
            </button>
          </form>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Link to="/">
              <img src="/logo/logo.png" alt="Printing State" className="h-8 md:h-10" />
            </Link>
            <p className="text-slate-500 text-[13px] leading-relaxed mt-5 font-medium">
              The industry benchmark for premium printing solutions. Engineered for excellence, delivering perfection across the USA.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[11px] font-black text-slate-900 mb-6 uppercase tracking-widest">Shop</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 hover:text-blue-600 text-[13px] font-bold transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="text-[11px] font-black text-slate-900 mb-6 uppercase tracking-widest">Categories</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-blue-600 text-[13px] font-bold transition-all capitalize">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-[11px] font-black text-slate-900 mb-6 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 hover:text-blue-600 text-[13px] font-bold transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[11px] font-black text-slate-900 mb-6 uppercase tracking-widest">Contact</h4>
            <div className="space-y-5">
               <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-[13px] font-medium text-slate-500 leading-snug">
                    Junction Plaza, Ashburn, VA 20147, USA
                  </span>
               </div>
               <div className="flex items-center gap-3">
                  <Mail size={18} className="text-blue-600 shrink-0" />
                  <a href="mailto:info@printingstate.shop" className="text-[13px] font-black text-slate-900 hover:text-blue-600 transition-colors">info@printingstate.shop</a>
               </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Printing State. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8">
           
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          </div>
        </div>

        {/* --- DISCLAIMER --- */}
        <div className="mt-10 text-center border-t border-slate-50 pt-8 opacity-40">
           <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
Disclaimer - For Informational only. No software installation or distribution.           </p>
        </div>
      </div>
    </footer>
  );
}
