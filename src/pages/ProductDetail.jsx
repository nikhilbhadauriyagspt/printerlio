import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Heart,
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  LayoutGrid,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    openCartDrawer();
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`${API_BASE_URL}/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProduct(data.data);

          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';

          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;

          fetch(fetchUrl)
            .then((res) => res.json())
            .then((relData) => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter((p) => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs)
        ? imgs.map((img) => (img.startsWith('http') ? img : `/${img}`))
        : [];
    } catch (e) {
      return [];
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];
        return img.startsWith('http') ? img : `/${img}`;
      }
    } catch (e) {}
    return 'https://via.placeholder.com/400x400?text=Product';
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white font-['Poppins']">
        <Loader2 className="h-10 w-10 animate-spin text-blue-800 mb-4" strokeWidth={1.5} />
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">
          Fetching Product
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center font-['Poppins']">
        <div className="mb-8 w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
          <ShoppingBag size={34} className="text-gray-300" />
        </div>
        <h2 className="text-[32px] font-black text-slate-900 mb-4">Product Not Found</h2>
        <Link
          to="/shop"
          className="inline-flex h-14 items-center gap-2 rounded-2xl bg-blue-800 px-8 text-[13px] font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-blue-100"
        >
          Return to Shop <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage =
    images.length > 0 ? images[activeImage] : 'https://via.placeholder.com/600x600?text=No+Image';

  return (
    <div className="bg-white font-['Poppins'] text-slate-900 pt-32 pb-20">
      <SEO
        title={`${product.name} | USPrinterStore`}
        description={product.description?.substring(0, 160)}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Breadcrumb - Minimal */}
        <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-10 overflow-hidden whitespace-nowrap">
          <Link to="/" className="hover:text-blue-800 transition-colors shrink-0">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link to="/shop" className="hover:text-blue-800 transition-colors shrink-0">Shop</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-slate-900 truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Gallery */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] md:aspect-square bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden flex items-center justify-center p-8 md:p-12 lg:p-20">
              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={mainImage}
                  alt={product.name}
                  className="max-h-[85%] max-w-[85%] object-contain"
                />
              </AnimatePresence>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={cn(
                  'absolute top-6 right-6 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-sm backdrop-blur-md',
                  isInWishlist(product.id)
                    ? 'bg-red-500 border-red-500 text-white shadow-red-200'
                    : 'bg-white/80 border-white text-gray-400 hover:text-blue-800 hover:border-blue-800'
                )}
              >
                <Heart size={20} className={cn(isInWishlist(product.id) && 'fill-current')} />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-4 px-1 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      'w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl border-2 transition-all p-2 bg-white flex items-center justify-center shadow-sm',
                      activeImage === idx
                        ? 'border-blue-800 scale-105'
                        : 'border-gray-100 hover:border-blue-200'
                    )}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Product Info */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h1 className="text-[28px] md:text-[36px] font-medium text-slate-900 leading-[1.2] mb-5">
                {product.name}
              </h1>

              <div className="flex items-center gap-6">
                <span className="text-[24px] md:text-[30px] font-black text-slate-900">
                  ${parseFloat(product.price).toLocaleString()}
                </span>
                {product.sale_price && (
                  <span className="text-[16px] md:text-[18px] text-gray-400 line-through font-bold">
                    ${parseFloat(product.sale_price).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 pl-1">
                Overview
              </h4>
              <p className="text-slate-700 text-[15px] leading-relaxed">
                {product.description ||
                  'Experience efficient, high-quality results with this precision printing solution. Designed for those who demand reliability and consistency in their daily workflow.'}
              </p>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity Picker */}
                <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100 h-14 w-full sm:w-auto">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-900 hover:text-blue-800 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-[16px] font-black text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-900 hover:text-blue-800 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "flex-1 h-14 rounded-2xl font-black text-[13px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:opacity-70",
                    isAdded ? "bg-emerald-600 text-white shadow-emerald-100" : "bg-blue-800 text-white shadow-blue-100 hover:bg-blue-700"
                  )}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={18} /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: 'Free Delivery' },
                  { icon: ShieldCheck, label: 'Secure Payment' },
                  { icon: RefreshCcw, label: '7-Day Returns' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="h-12 rounded-xl border border-gray-100 bg-white flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-500"
                  >
                    <item.icon size={14} className="text-blue-800" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <span className="text-blue-800 font-bold text-[11px] uppercase tracking-[0.3em] mb-3 block">Recommended</span>
                <h2 className="text-[28px] md:text-[36px] font-black text-slate-900 leading-none">
                  Related <span className="text-blue-800">Picks.</span>
                </h2>
              </div>
              <Link
                to="/shop"
                className="group flex items-center gap-2 text-[13px] font-bold text-slate-900 uppercase tracking-widest hover:text-blue-800 transition-colors"
              >
                View More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-gray-200 border border-gray-200 overflow-hidden rounded-[2rem]">
              {relatedProducts.slice(0, 5).map((p, i) => (
                <div
                  key={p.id}
                  className="group relative bg-white flex flex-col h-full"
                >
                  <Link to={`/product/${p.slug}`} className="block p-5 flex-grow">
                    <div className="aspect-square flex items-center justify-center mb-5 overflow-hidden">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1.5 block">
                        {p.brand_name || 'Selection'}
                      </span>
                      <h4 className="text-slate-800 text-[13px] font-medium leading-tight line-clamp-2 h-9 mb-3 group-hover:text-blue-800 transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-[16px] font-bold text-slate-900">
                        ${parseFloat(p.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
