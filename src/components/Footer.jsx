import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Loader2,
  ShieldCheck,
  CreditCard,
  ChevronRight,
} from 'lucide-react';
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
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const flat = data.data.flatMap((cat) => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map((item) => [item.slug, item])).values())
            .filter(
              (cat) =>
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
        body: JSON.stringify({ email }),
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
    <footer className="w-full bg-white text-slate-900 pt-20 pb-6 border-t border-gray-100 font-['Poppins']">
      <div className="max-w-[1820px] mx-auto px-4 md:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block">
              <img src="/logo/logo.png" alt="Logo" className="h-12 object-contain" />
            </Link>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-[400px]">
              We provide the most reliable printing solutions for home and office. 
              Our mission is to simplify your printing experience with premium products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-900 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 hover:text-blue-800 text-[14px] font-medium transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-900 mb-8">Collections</h4>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-gray-500 hover:text-blue-800 text-[14px] font-medium transition-colors">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h4 className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 h-12 px-5 bg-gray-50 border border-gray-100 rounded-xl text-[14px] outline-none focus:border-blue-800 transition-all"
                />
                <button
                  disabled={loading}
                  className="h-12 px-6 bg-blue-800 text-white text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : 'Join'}
                </button>
              </form>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center transition-all group-hover:bg-blue-800 group-hover:text-white">
                  <Mail size={18} />
                </div>
                <a href="mailto:info@usprinterstore.shop" className="text-[14px] font-bold text-slate-900 hover:text-blue-800 transition-colors">info@usprinterstore.shop</a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center transition-all group-hover:bg-blue-800 group-hover:text-white">
                  <MapPin size={18} />
                </div>
                <p className="text-[14px] font-bold text-slate-900">4352 13th Ave S, Fargo, ND 58103, USA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-4 border-t border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3">
            <p className="text-[12px]  text-gray-400">© {new Date().getFullYear()} USPrinterStore.All rights reserved.</p>
            {legalLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-[12px] font-bold text-gray-400 hover:text-blue-800 transition-colors">{link.name}</Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-800" />
              <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-4 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              <CreditCard size={20} />
            </div>
          </div>
        </div>

        {/* Disclaimer Bar at absolute bottom */}
        <div className="pt-4 mt-4 border-t border-gray-50">
           <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-[0.2em] leading-relaxed">
             Disclaimer - For Informational only. No software installation or distribution.
           </p>
        </div>
      </div>
    </footer>
  );
}
