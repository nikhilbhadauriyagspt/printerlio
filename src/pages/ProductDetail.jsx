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
  ArrowRight
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
                setRelatedProducts(
                  relData.data.filter((p) => p.id !== data.data.id)
                );
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
      return Array.isArray(imgs) ? imgs.map((img) => img.startsWith('http') ? img : `/${img}`) : [];
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
        <Loader2 className="h-10 w-10 animate-spin text-black mb-4" strokeWidth={1.5} />
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Loading Catalog</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center font-['Poppins']">
        <div className="mb-8 p-6 bg-gray-50 border border-gray-100">
          <ShoppingBag size={48} className="text-gray-200" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link
          to="/shop"
          className="inline-flex h-14 items-center gap-2 bg-black px-10 text-[12px] font-bold uppercase tracking-widest text-white transition-all hover:bg-gray-900"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage =
    images.length > 0 ? images[activeImage] : 'https://via.placeholder.com/600x600?text=No+Image';

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 font-['Poppins'] text-[#111111]">
      <SEO
        title={`${product.name} | Printing Land`}
        description={product.description?.substring(0, 160)}
      />

      {/* --- Breadcrumbs --- */}
      <section className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest overflow-hidden whitespace-nowrap">
          <Link to="/" className="hover:text-black transition-colors shrink-0">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link to="/shop" className="hover:text-black transition-colors shrink-0">Shop</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* --- LEFT: GALLERY --- */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-square bg-gray-50 border border-gray-100 p-8 flex items-center justify-center overflow-hidden">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={mainImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className={cn(
                  'absolute top-6 right-6 w-12 h-12 flex items-center justify-center border transition-all duration-300',
                  isInWishlist(product.id)
                    ? 'bg-black border-black text-white'
                    : 'bg-white border-gray-100 text-gray-300 hover:text-black'
                )}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      'w-20 h-20 shrink-0 border-2 flex items-center justify-center p-2 bg-white transition-all',
                      activeImage === idx ? 'border-black' : 'border-gray-100 hover:border-gray-200'
                    )}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: INFO --- */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <span className="inline-block text-[11px] font-bold text-black  tracking-[0.3em] mb-4">Printer Specification</span>
              <h1 className="text-3xl md:text-4xl text-gray-900  leading-[1.1] mb-6 ">{product.name}</h1>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-black">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-lg text-gray-300 line-through font-medium">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
               <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Product Description</h4>
               <p className="text-gray-500 font-medium leading-relaxed text-[15px]">
                  {product.description || 'A high-performance printer solution engineered for professional and home use. Delivering consistent precision and absolute reliability for all your printing needs.'}
               </p>
            </div>

            <div className="pt-10 border-t border-gray-100 space-y-8">
               <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center border border-gray-200 h-14 w-fit">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-14 h-full flex items-center justify-center hover:bg-gray-50 text-gray-400">
                      <Minus size={18} />
                    </button>
                    <span className="w-14 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-14 h-full flex items-center justify-center hover:bg-gray-50 text-gray-400">
                      <Plus size={18} />
                    </button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className="flex-1 h-14 bg-gray-900 text-white font-bold text-[13px] uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isAdded ? <CheckCircle size={20} /> : <ShoppingBag size={20} />}
                    {isAdded ? 'Item Added' : 'Add to Cart'}
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: <Truck size={20} />, label: 'Fast USA Shipping' },
                    { icon: <ShieldCheck size={20} />, label: 'Secure Checkout' },
                    { icon: <RefreshCcw size={20} />, label: 'Easy Returns' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                       <div className="text-black">{item.icon}</div>
                       {item.label}
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-20 border-t border-gray-100">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h2 className="text-2xl font-bold  uppercase">Recommended Hardware</h2>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Based on your selection</p>
               </div>
               <Link to="/shop" className="text-[11px] font-bold text-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-900 hover:border-gray-900 transition-all">
                 Browse Shop
               </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-t border-l border-gray-100">
              {relatedProducts.slice(0, 5).map((p) => (
                <div key={p.id} className="group relative bg-white border-r border-b border-gray-100 p-8 hover:bg-gray-50 transition-all flex flex-col">
                   <Link to={`/product/${p.slug}`} className="aspect-square w-full mb-8 flex items-center justify-center overflow-hidden">
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      />
                   </Link>
                   <div className="mt-auto text-center">
                      <Link to={`/product/${p.slug}`} className="block mb-4">
                         <h4 className="font-bold text-gray-900 uppercase  line-clamp-2 min-h-[3rem] text-sm leading-tight">{p.name}</h4>
                      </Link>
                      <p className="text-lg font-bold text-black">${parseFloat(p.price).toLocaleString()}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
