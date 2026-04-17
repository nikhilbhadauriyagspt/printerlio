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
} from 'lucide-react';
import { motion } from 'framer-motion';
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fbf8f5] font-['Poppins']">
        <Loader2 className="h-10 w-10 animate-spin text-[#7a4320] mb-4" strokeWidth={1.5} />
        <p className="text-[11px] font-semibold text-[#8b7768] uppercase tracking-[0.2em]">
          Loading Product
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fbf8f5] px-6 text-center font-['Poppins']">
        <div className="mb-8 w-20 h-20 rounded-full bg-[#f8f2ec] flex items-center justify-center">
          <ShoppingBag size={34} className="text-[#7a4320]" />
        </div>
        <h2 className="text-[28px] font-semibold text-[#241812] mb-4">Product Not Found</h2>
        <Link
          to="/shop"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#7a4320] px-7 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all hover:bg-[#643619]"
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
    <div className="pt-40 bg-[#fbf8f5] font-['Poppins'] text-[#111111]">
      <SEO
        title={`${product.name} | MyPrinterHero`}
        description={product.description?.substring(0, 160)}
      />

      {/* Breadcrumb */}
      <section className="bg-[#f4eeea] border-b border-[#e8dfd6] py-4">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 flex items-center gap-3 text-[10px] font-semibold text-[#8b7768] uppercase tracking-[0.18em] overflow-hidden whitespace-nowrap">
          <Link to="/" className="hover:text-[#7a4320] transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link to="/shop" className="hover:text-[#7a4320] transition-colors shrink-0">
            Shop
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-[#241812] truncate">{product.name}</span>
        </div>
      </section>

      <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-12 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-start">
          {/* Left gallery */}
          <div className="space-y-5">
            <div className="relative rounded-[30px] bg-white border border-[#eadfd6] p-6 md:p-8 lg:p-10 flex items-center justify-center min-h-[420px] md:min-h-[520px] overflow-hidden">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={mainImage}
                alt={product.name}
                className="max-w-full max-h-[430px] md:max-h-[520px] object-contain"
              />

              <button
                onClick={() => toggleWishlist(product)}
                className={cn(
                  'absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300',
                  isInWishlist(product.id)
                    ? 'bg-[#7a4320] border-[#7a4320] text-white'
                    : 'bg-white border-[#eadfd6] text-[#8b7768] hover:text-[#7a4320]'
                )}
              >
                <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      'w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl border bg-white flex items-center justify-center p-2 transition-all',
                      activeImage === idx
                        ? 'border-[#7a4320]'
                        : 'border-[#eadfd6] hover:border-[#d4c1b1]'
                    )}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right info */}
          <div className="rounded-[30px] border border-[#eadfd6] bg-white p-6 md:p-8 lg:p-10">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768] mb-4">
              Printer Specification
            </span>

            <h1 className="text-[30px] md:text-[40px] lg:text-[46px] text-[#241812] leading-[1.06] font-semibold mb-5">
              {product.name}
            </h1>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-[30px] md:text-[36px] font-semibold text-[#241812] leading-none">
                ${parseFloat(product.price).toLocaleString()}
              </span>
              {product.sale_price && (
                <span className="text-[18px] text-[#b6a79a] line-through font-medium">
                  ${parseFloat(product.sale_price).toLocaleString()}
                </span>
              )}
            </div>

            <div className="border-t border-[#eee4db] pt-7">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768] mb-4">
                Product Description
              </h4>
              <p className="text-[#6b5d54] leading-8 text-[15px]">
                {product.description ||
                  'A dependable printer solution designed for home, office, and business printing needs with smooth performance and practical everyday use.'}
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-[#eee4db] space-y-7">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center rounded-xl border border-[#e4d9cf] overflow-hidden bg-[#fcfaf7] h-14 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-full flex items-center justify-center hover:bg-[#f6ede6] text-[#7a4320]"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-14 text-center font-semibold text-[#241812]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-full flex items-center justify-center hover:bg-[#f6ede6] text-[#7a4320]"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex-1 h-14 rounded-xl bg-[#7a4320] text-white font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-[#643619] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isAdded ? <CheckCircle size={18} /> : <ShoppingBag size={18} />}
                  {isAdded ? 'Item Added' : 'Add to Cart'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: <Truck size={18} />, label: 'Fast USA Shipping' },
                  { icon: <ShieldCheck size={18} />, label: 'Secure Checkout' },
                  { icon: <RefreshCcw size={18} />, label: 'Easy Returns' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-[18px] border border-[#eadfd6] bg-[#fcfaf7] px-4 py-4 flex items-center gap-3 text-[12px] font-medium text-[#6b5d54]"
                  >
                    <div className="text-[#7a4320]">{item.icon}</div>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-20 pt-12 border-t border-[#e8dfd6]">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
              <div>
                <h2 className="text-[28px] md:text-[36px] font-semibold text-[#241812]">
                  Related Products
                </h2>
                <p className="text-[12px] font-semibold text-[#8b7768] uppercase tracking-[0.18em] mt-2">
                  Based on your selection
                </p>
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-[#5a2d14] font-semibold text-[13px] uppercase tracking-[0.08em] border-b border-[#5a2d14] pb-1 hover:text-[#7a4320] hover:border-[#7a4320] transition-all"
              >
                Browse Shop <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
              {relatedProducts.slice(0, 5).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="rounded-[24px] border border-[#eadfd6] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] h-full">
                    <Link
                      to={`/product/${p.slug}`}
                      className="h-[190px] bg-[#fcfaf7] border-b border-[#efe5db] flex items-center justify-center p-5 overflow-hidden"
                    >
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <div className="p-4 md:p-5 text-center">
                      <Link to={`/product/${p.slug}`} className="block mb-3">
                        <h4 className="font-medium text-[#241812] line-clamp-2 min-h-[3rem] text-[14px] leading-6">
                          {p.name}
                        </h4>
                      </Link>
                      <p className="text-[18px] font-semibold text-[#241812]">
                        ${parseFloat(p.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}