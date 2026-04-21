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
    <footer className="w-full bg-blue-700 text-[#001e3c] pt-12 pb-6 font-['Poppins']">
      <div className="max-w-[1820px] mx-auto px-4 md:px-10">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-10 border-b border-[#001e3c]/10">
          <div className="max-w-[400px]">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo/logo.png" alt="Logo" className="h-16 object-contain" />
            </Link>
            <p className="text-white text-[14px] leading-relaxed">
              Reliable printing solutions for home and office needs, designed to make everyday tasks easier and more efficient. With quality performance, dependable results, and easy-to-use technology, we help you print with confidence every day.

            </p>
          </div>

          <div className="w-full lg:max-w-[500px]">
            <h4 className="text-[12px] text-white font-bold uppercase tracking-widest mb-3">Stay Informed</h4>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-12 px-5 bg-white/20 border border-[#001e3c]/10 rounded-xl text-[14px] outline-none focus:bg-white transition-all placeholder:text-[#001e3c]/50"
              />
              <button
                disabled={loading}
                className="h-12 px-8 bg-[#001e3c] text-white text-[12px] font-bold uppercase tracking-widest rounded-xl hover:bg-white hover:text-[#001e3c] transition-all"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 py-10">
          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-black uppercase tracking-widest mb-8 border-b-2 border-[#001e3c] text-white inline-block pb-1">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white hover:text-blue-300 hover:font-bold text-[14px] transition-all">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-black uppercase tracking-widest mb-8 border-b-2 border-[#001e3c] text-white inline-block pb-1">Top Collections</h4>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-white hover:text-blue-300 hover:font-bold text-[14px] transition-all">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-black uppercase tracking-widest mb-8 border-b-2 border-[#001e3c] text-white inline-block pb-1">Policies</h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white hover:text-blue-300 hover:font-bold text-[14px] transition-all">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-black uppercase tracking-widest mb-8 border-b-2 border-[#001e3c] text-white inline-block pb-1">Reach Us</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-white" />
                <a href="mailto:info@printerlio.shop" className="text-[14px] font-bold border-b text-white border-[#001e3c]/20">info@printerlio.shop</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-white shrink-0" />
                <p className="text-[14px] font-medium text-white leading-relaxed">9 E 36th St, New York, NY 10016, USA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Payment & Credits */}
        <div className="pt-10 border-t border-[#001e3c]/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[13px] font-medium text-white/50">
            © {new Date().getFullYear()} Printer Lio. Empowering your output.
          </p>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-white" />
              <span className="text-[11px] font-black uppercase text-white/50 tracking-widest">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-5 * text-white ">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 brightness-0  " />
              <CreditCard size={22} />
            </div>
          </div>
        </div>

        {/* Final Disclaimer */}
        <div className="mt-5 py-4 bg-[#001e3c]/5 rounded-xl">
           <p className="text-[10px] font-bold text-white/50 text-center uppercase tracking-[0.25em] leading-relaxed px-4">
             Disclaimer: For informational purposes only. No software installation or distribution .
           </p>
        </div>
      </div>
    </footer>
  );
}
