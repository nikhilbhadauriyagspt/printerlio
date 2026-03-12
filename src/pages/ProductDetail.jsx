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
  Share2,
  CheckCircle,
  ArrowRight,
  ShoppingCart,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
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
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
          
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;
          
          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;
          else if (brand) fetchUrl += `&brand=${brand}`;

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
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
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Synchronizing hardware data...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-white">
        <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-100">
           <ShoppingCart size={32} className="text-slate-200" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Hardware not found</h2>
        <Link to="/shop" className="h-12 px-10 bg-black text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-black/5">Return to Inventory</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen pt-40 pb-24 font-urbanist text-slate-900">
      <SEO title={product.name} description={product.description?.substring(0, 160)} />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-12">
          <Link to="/" className="hover:text-blue-600 transition-colors uppercase tracking-widest">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-blue-600 transition-colors uppercase tracking-widest">Shop</Link>
          <ChevronRight size={10} />
          <span className="text-slate-900 truncate max-w-[200px] uppercase tracking-widest">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          
          {/* --- LEFT: GALLERY --- */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-12 overflow-hidden group">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "h-12 w-12 rounded-xl transition-all duration-500 flex items-center justify-center border",
                    isInWishlist(product.id) ? "bg-red-500 border-red-500 text-white" : "bg-white border-gray-100 text-slate-300 hover:text-red-500 hover:border-red-100 shadow-sm"
                  )}
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
                <button className="h-12 w-12 rounded-xl bg-white border border-gray-100 text-slate-900 hover:bg-black hover:text-white transition-all shadow-sm flex items-center justify-center">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={cn(
                      "h-20 w-20 shrink-0 rounded-xl border-2 transition-all duration-500 flex items-center justify-center p-2 overflow-hidden bg-white",
                      activeImage === idx ? "border-blue-600 scale-95" : "border-gray-50 hover:border-gray-200"
                    )}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: INFO --- */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-10">
              <div className="mb-6">
                 <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-widest">
                   {product.brand_name || 'Authentic hardware'}
                 </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-5xl font-black text-slate-900 tracking-tighter">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-xl font-bold text-slate-300 line-through tracking-tighter">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="h-1 w-8 bg-blue-600 rounded-full" />
                   <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Specifications</p>
                </div>
                <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                  {product.description || "High-quality professional printing solution designed for reliability and perfect clarity in every workplace environment."}
                </p>
              </div>
            </div>

            {/* Actions Area */}
            <div className="space-y-6 mt-auto pt-10 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-14 bg-gray-50 rounded-xl px-1.5 flex items-center border border-gray-100 shadow-inner">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-11 w-11 flex items-center justify-center bg-white rounded-lg text-slate-900 shadow-sm transition-all active:scale-90 hover:bg-gray-100"><Minus size={16} strokeWidth={3} /></button>
                  <span className="text-lg font-black w-16 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-11 w-11 flex items-center justify-center bg-white rounded-lg text-slate-900 shadow-sm transition-all active:scale-90 hover:bg-gray-100"><Plus size={16} strokeWidth={3} /></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "flex-1 h-14 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 active:scale-95 shadow-lg shadow-black/5",
                    isAdded ? "bg-emerald-500 text-white" : "bg-black text-white hover:bg-blue-600"
                  )}
                >
                  {isAdded ? <CheckCircle size={20} /> : <ShoppingBag size={20} />}
                  {isAdded ? "Added" : "Add to cart"}
                </button>
              </div>

              {/* Trust Nodes */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Truck size={18} />, label: "Express" },
                  { icon: <ShieldCheck size={18} />, label: "Warranty" },
                  { icon: <RefreshCcw size={18} />, label: "Returns" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-2 py-4 bg-gray-50 rounded-xl border border-gray-100 group transition-all duration-500">
                    <div className="text-blue-600">{item.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED HARDWARE --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-24 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight uppercase">
                  Related Hardware
                </h2>
                <p className="text-slate-400 text-sm font-bold tracking-wide">Professional alternatives for your office deployment.</p>
              </div>
              <Link to="/shop" className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-blue-600 hover:text-black transition-all">
                View Entire Catalog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {relatedProducts.slice(0, 5).map((p) => (
                <div 
                  key={p.id}
                  className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col group hover:border-blue-600/30 h-[440px]"
                >
                  <div className="relative h-[220px] bg-white flex items-center justify-center p-6 overflow-hidden transition-colors duration-500">
                    <img src={getImagePath(p.images)} alt={p.name} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between bg-white relative border-t border-gray-50">
                    <div className="space-y-2">
                      <h4 className="text-[14px] font-black text-slate-900 leading-[1.3] line-clamp-2 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                      <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block uppercase tracking-widest">{p.brand_name}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
                       <span className="text-lg font-black text-slate-900">${parseFloat(p.price).toLocaleString()}</span>
                       <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all"><ArrowRight size={18} /></div>
                    </div>
                  </div>
                  <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0" onClick={() => window.scrollTo(0, 0)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
