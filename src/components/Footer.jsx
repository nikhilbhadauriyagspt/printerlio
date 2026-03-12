import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

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
            .slice(0, 6);
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
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-slate-900 pt-20 pb-10 font-urbanist border-t border-gray-100">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10">
        
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/">
              <img src="/logo/MYPRINTERMANNN.png" alt="MaxPrinter" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-slate-500 text-base font-medium leading-relaxed max-w-sm pt-6">
              Your premier destination for high-performance laser printers, precision document scanners, and high-quality hardware solutions engineered for the modern office.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Collections</h4>
              <ul className="space-y-4">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/shop?category=${cat.slug}`} className="text-slate-600 hover:text-blue-600 transition-all text-sm font-bold capitalize">
                      {cat.name.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Support</h4>
              <ul className="space-y-4">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'Track Orders', path: '/orders' },
                  { name: 'FAQs', path: '/faq' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-slate-600 hover:text-blue-600 transition-all text-sm font-bold capitalize">
                      {item.name.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Policies</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Privacy Policy', path: '/privacy-policy' },
                  { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                  { name: 'Return Policy', path: '/return-policy' },
                  { name: 'Shipping Policy', path: '/shipping-policy' },
                  { name: 'Cookie Policy', path: '/cookie-policy' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-slate-600 hover:text-blue-600 transition-all text-sm font-bold capitalize">
                      {item.name.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="lg:col-span-3 space-y-10">
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Stay Informed</h4>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition-all font-bold"
                />
                <button
                  disabled={loading}
                  className="w-full py-3 bg-black text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 active:scale-95 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : (
                    <>Subscribe <ArrowRight size={16} /></>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-600" />
                <span className="text-[13px] font-bold text-slate-600">Prestonia Louisville, KY 40213, USA</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-600" />
                <span className="text-[13px] font-bold text-slate-600">info@maxprinter.shop</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
            © 2026 MaxPrinter | All Rights Reserved.
          </p>
          <div className="flex items-center gap-10">
             <div className="text-slate-300 italic font-black text-2xl hover:text-blue-600 transition-colors cursor-default">PayPal</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
