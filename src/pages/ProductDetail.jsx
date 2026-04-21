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
        <Loader2 className="h-10 w-10 animate-spin text-blue-700 mb-4" strokeWidth={1.5} />
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
          className="inline-flex h-14 items-center gap-2 rounded-2xl bg-blue-700 px-8 text-[13px] font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-blue-100"
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
    <div className="bg-white font-['Poppins'] text-[#001e3c] pt-32 pb-20">
      <SEO
        title={`${product.name} | US Printer Store`}
        description={product.description?.substring(0, 160)}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        {/* 1. Centered Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#001e3c]/50 mb-6 bg-slate-50 px-5 py-2 rounded-full border border-gray-100 font-bold">
            <Link to="/" className="hover:text-blue-800 transition-colors shrink-0">Home</Link>
            <ChevronRight size={10} className="shrink-0" />
            <Link to="/shop" className="hover:text-blue-800 transition-colors shrink-0">Shop</Link>
            <ChevronRight size={10} className="shrink-0" />
            <span className="text-[#001e3c] truncate max-w-[200px]">{product.name}</span>
          </div>
          
          <h1 className="text-[32px] md:text-[40px]  text-[#001e3c]  max-w-[1500px]">
            {product.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* 2. Left Side: Enhanced Gallery */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[4/3] md:aspect-square  rounded-[3.5rem] border border-gray-100 overflow-hidden flex items-center justify-center p-8 md:p-14 lg:p-20 shadow-[0_30px_80px_rgba(0,0,0,0.03)]">
              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={mainImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </AnimatePresence>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={cn(
                  'absolute top-8 right-8 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl active:scale-95',
                  isInWishlist(product.id)
                    ? 'bg-red-500 text-white shadow-red-200'
                    : 'bg-white text-[#001e3c] hover:bg-[#fbb124] border border-gray-50'
                )}
              >
                <Heart size={24} className={cn(isInWishlist(product.id) && 'fill-current')} />
              </button>
            </div>

            {/* Thumbnails Slider Style */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 px-2 no-scrollbar justify-center lg:justify-start">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      'w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-[1.5rem] border-2 transition-all p-3 bg-white flex items-center justify-center shadow-md',
                      activeImage === idx
                        ? 'border-[#001e3c] scale-110'
                        : 'border-gray-100 hover:border-[#fbb124]/50'
                    )}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Right Side: Premium Product Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
               
               <div className="flex items-center gap-6">
                <span className="text-[20px] md:text-[30px]  text-blue-800 leading-none">
                  ${parseFloat(product.price).toLocaleString()}
                </span>
                {product.sale_price && (
                  <span className="text-[20px] text-gray-300 line-through font-semibold">
                    ${parseFloat(product.sale_price).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-gray-100 shadow-inner">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#001e3c]/30 mb-5 pl-1">
                Product Details
              </h4>
              <p className="text-[#001e3c]/70 text-[16px] leading-relaxed font-medium">
                {product.description ||
                  'Experience industrial-grade performance with this elite printing solution. Designed for those who demand ultimate reliability, consistency, and professional quality in every output.'}
              </p>
            </div>

            {/* Controls Section */}
            <div className="space-y-8 pt-4">
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Modern Quantity Picker */}
                <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-gray-100 h-16 w-full sm:w-auto shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md text-[#001e3c] hover:bg-[#fbb124] transition-all"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-14 text-center text-[18px] font-bold text-[#001e3c]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md text-[#001e3c] hover:bg-[#fbb124] transition-all"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Add to Cart Premium Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "flex-1 h-16 rounded-2xl font-bold text-[14px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 disabled:opacity-70",
                    isAdded 
                      ? "bg-green-500 text-white" 
                      : "bg-[#001e3c] text-white hover:bg-[#fbb124] hover:text-[#001e3c] shadow-blue-900/10"
                  )}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={20} /> Item Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} /> Add to Bag
                    </>
                  )}
                </button>
              </div>

              {/* Grid Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Truck, label: 'Free Shipping' },
                  { icon: ShieldCheck, label: 'Encrypted' },
                  { icon: RefreshCcw, label: 'Easy Returns' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#001e3c]/50 shadow-sm"
                  >
                    <item.icon size={16} className="text-blue-800" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Related Picks - Clean Card Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-20 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 mb-2">
                  <span className="h-[2px] w-8 bg-[#001e3c]"></span>
                  <span className="text-[#001e3c] text-[12px] font-bold uppercase tracking-[0.2em]">Our Recommendations</span>
                </div>
                <h2 className="text-[32px] md:text-[42px] font-semibold text-[#001e3c] leading-none uppercase tracking-tight">
                  Related <span className="text-blue-800">Picks</span>
                </h2>
              </div>
              <Link
                to="/shop"
                className="group flex items-center gap-3 h-12 px-8 bg-slate-50 rounded-xl text-[12px] font-bold text-[#001e3c] uppercase tracking-widest hover:bg-[#001e3c] hover:text-white transition-all shadow-sm"
              >
                View Catalog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {relatedProducts.slice(0, 5).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-6 flex flex-col h-full hover:shadow-2xl transition-all duration-500"
                >
                  <Link to={`/product/${p.slug}`} className="block flex-grow">
                    <div className="aspect-square flex items-center justify-center mb-6  rounded-[2rem] p-5 overflow-hidden">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="text-center px-2">
                     
                      <h4 className="text-[#001e3c] text-[14px] font-semibold leading-tight line-clamp-4 h-10 mb-4 group-hover:text-blue-800 transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-[18px] font-bold text-[#001e3c]">
                        ${parseFloat(p.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

