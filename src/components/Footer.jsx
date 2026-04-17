import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Loader2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
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
    <footer className="w-full bg-[#fbf8f5] text-[#241812] pt-16 md:pt-20 pb-8 border-t border-[#e9dfd6] font-['Poppins']">
      <div className="w-full px-4 md:px-8 lg:px-10 xl:px-14 2xl:px-16">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#e9dfd6]">
          {/* Brand */}
          <div className="xl:col-span-4 pr-0 xl:pr-14">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/logo/logo.png"
                alt="MyPrinterHero"
                className="h-10 md:h-20 object-contain"
              />
            </Link>

            <p className="text-[#6c5d54] text-[14px] leading-7 max-w-[420px] mb-8">
              Your trusted destination for printers, accessories, and dependable
              printing solutions designed for home, office, and business use.
            </p>

            <div className="mb-8">
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#241812] mb-4">
                Stay Connected
              </h4>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row rounded-xl overflow-hidden border border-[#ddd2c8] bg-white"
              >
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for updates"
                  className="flex-1 px-4 h-[48px] text-[14px] outline-none bg-white placeholder:text-[#9a8c83]"
                />
                <button
                  disabled={loading}
                  className="h-[48px] px-6 bg-[#7a4320] text-white text-[12px] font-semibold uppercase tracking-[0.12em] hover:bg-[#643619] transition-all whitespace-nowrap flex items-center justify-center"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : 'Join'}
                </button>
              </form>
            </div>

           
          </div>

          {/* Navigation */}
          <div className="xl:col-span-2">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#241812] mb-6">
              Navigation
            </h4>

            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#6c5d54] hover:text-[#7a4320] text-[14px] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="xl:col-span-2">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#241812] mb-6">
              Products
            </h4>

            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="text-[#6c5d54] hover:text-[#7a4320] text-[14px] transition-colors capitalize"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="xl:col-span-4 xl:pl-10">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#241812] mb-6">
              Contact Support
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
              <div className="flex gap-4 rounded-2xl border border-[#e7ddd4] bg-white p-5 ">
                <div className="w-11 h-11 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a8c83] mb-1">
                    Email Us
                  </p>
                  <a
                    href="mailto:info@myprinterhero.shop"
                    className="text-[14px] font-semibold text-[#241812] hover:text-[#7a4320] transition-colors break-all"
                  >
                    info@myprinterhero.shop
                  </a>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-[#e7ddd4] bg-white p-5">
                <div className="w-11 h-11 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a8c83] mb-1">
                    Office
                  </p>
                  <p className="text-[14px] text-[#241812] leading-6">
                    2445 4th Ave S, Seattle, WA 98134, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col xl:flex-row justify-between items-center gap-5">
          <div className="flex flex-wrap justify-center xl:justify-start gap-x-6 gap-y-3">
            <p className="text-[11px] font-medium text-[#9a8c83] uppercase tracking-[0.14em]">
              © {new Date().getFullYear()} MyPrinterHero. All rights reserved.
            </p>

            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[11px] font-medium text-[#6c5d54] hover:text-[#7a4320] transition-colors uppercase tracking-[0.12em]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 opacity-80">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-4"
            />
            <div className="w-px h-3 bg-[#d7c9bd]" />
            <span className="text-[10px] font-semibold text-[#8f8178] uppercase tracking-[0.14em]">
              Secure Payments
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6">
          <p className="text-[9px] font-semibold text-[#b2a49a] uppercase tracking-[0.28em] leading-6 text-center xl:text-left">
            Disclaimer: For informational purposes only. No unauthorized software distribution.
          </p>
        </div>
      </div>
    </footer>
  );
}