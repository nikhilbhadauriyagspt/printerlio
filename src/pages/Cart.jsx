import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ChevronLeft,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '@/components/SEO';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

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

  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[$,]/g, '')) || 0;
    }
    return parseFloat(price) || 0;
  };

  return (
    <div className="pt-20 bg-[#fbf8f5] font-['Poppins'] text-[#111111]">
      <SEO title="Your Cart | MyPrinterHero" />

      {/* Hero */}
      <section className="bg-[#f4eeea] border-b border-[#e8dfd6]">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-14 md:py-18 lg:py-20 text-center">
          <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-4">
            Shopping Bag
          </span>

          <h1 className="text-[34px] md:text-[48px] lg:text-[58px] font-semibold text-[#241812] leading-[1.02]">
            Your Cart
          </h1>

          <p className="max-w-[760px] mx-auto mt-4 text-[#6b5d54] text-[14px] md:text-[16px] leading-8">
            Review your selected products before checkout. You currently have{' '}
            <span className="font-semibold text-[#7a4320]">{cartCount}</span> item
            {cartCount !== 1 ? 's' : ''} in your cart.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-14 lg:py-16">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10">
          <AnimatePresence mode="wait">
            {cart.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[30px] border border-dashed border-[#e7ddd4] bg-white text-center py-16 md:py-20 px-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={28} />
                </div>

                <h2 className="text-[26px] md:text-[34px] font-semibold text-[#241812] mb-3">
                  Your Cart is Empty
                </h2>

                <p className="text-[#6b5d54] text-[14px] md:text-[15px] leading-7 max-w-[540px] mx-auto mb-8">
                  Browse our collection of printers and accessories to start building your cart.
                </p>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 h-[48px] px-7 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all"
                >
                  Browse Shop <ArrowRight size={16} />
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_390px] gap-8 lg:gap-10">
                {/* Items */}
                <div className="rounded-[30px] border border-[#e8dfd6] bg-white overflow-hidden">
                  <div className="px-5 md:px-8 py-5 border-b border-[#eee4db]">
                    <h2 className="text-[22px] md:text-[28px] font-semibold text-[#241812]">
                      Cart Items
                    </h2>
                  </div>

                  <div className="divide-y divide-[#eee4db]">
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        viewport={{ once: true }}
                        className="p-5 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6 md:gap-7"
                      >
                        {/* Image */}
                        <div className="w-full md:w-[150px] h-[170px] md:h-[150px] rounded-[20px] bg-[#fcfaf7] border border-[#efe5db] p-4 flex items-center justify-center shrink-0">
                          <img
                            src={getImagePath(item.images)}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a8879] mb-2">
                              Selected Product
                            </p>

                            <h4 className="text-[18px] md:text-[22px] font-semibold text-[#241812] leading-tight mb-3">
                              {item.name}
                            </h4>

                            <p className="text-[14px] text-[#6b5d54] font-medium">
                              ${parsePrice(item.price).toLocaleString()} / unit
                            </p>
                          </div>

                          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                            <div className="flex items-center gap-4">
                              <div className="inline-flex items-center rounded-xl border border-[#e4d9cf] overflow-hidden bg-[#fcfaf7]">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-10 h-10 flex items-center justify-center text-[#7a4320] hover:bg-[#f6ede6] transition disabled:opacity-40"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={15} />
                                </button>

                                <span className="w-10 text-center text-[14px] font-semibold text-[#241812]">
                                  {item.quantity}
                                </span>

                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-10 h-10 flex items-center justify-center text-[#7a4320] hover:bg-[#f6ede6] transition"
                                >
                                  <Plus size={15} />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8c7769] hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={14} />
                                Remove
                              </button>
                            </div>

                            <div className="text-left sm:text-right">
                              <p className="text-[13px] uppercase tracking-[0.14em] text-[#9a8879] mb-1">
                                Subtotal
                              </p>
                              <p className="text-[22px] md:text-[26px] font-semibold text-[#241812] leading-none">
                                ${(parsePrice(item.price) * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="xl:sticky xl:top-28 h-fit">
                  <div className="rounded-[30px] border border-[#e8dfd6] bg-white p-6 md:p-7">
                    <h3 className="text-[24px] md:text-[28px] font-semibold text-[#241812] mb-6">
                      Order Summary
                    </h3>

                    <div className="space-y-4 pb-6 border-b border-[#eee4db]">
                      <div className="flex items-center justify-between text-[14px] text-[#6b5d54]">
                        <span>Subtotal</span>
                        <span className="font-semibold text-[#241812]">
                          ${(cartTotal || 0).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[14px] text-[#6b5d54]">
                        <span>Shipping</span>
                        <span className="font-semibold text-emerald-600">Free</span>
                      </div>

                      <div className="flex items-end justify-between pt-2">
                        <span className="text-[14px] uppercase tracking-[0.14em] text-[#8c7769]">
                          Total
                        </span>
                        <span className="text-[30px] md:text-[34px] font-semibold text-[#241812] leading-none">
                          ${(cartTotal || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/checkout')}
                      className="w-full mt-6 h-[50px] rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all flex items-center justify-center gap-3"
                    >
                      Checkout Now <ArrowRight size={16} />
                    </button>

                    <div className="mt-6 pt-6 border-t border-[#eee4db] space-y-4">
                      <div className="flex items-center gap-3 text-[13px] text-[#6b5d54]">
                        <div className="w-10 h-10 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center">
                          <ShieldCheck size={16} />
                        </div>
                        <span>Secure Payment Checkout</span>
                      </div>

                      <div className="flex items-center gap-3 text-[13px] text-[#6b5d54]">
                        <div className="w-10 h-10 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center">
                          <Truck size={16} />
                        </div>
                        <span>Fast & Reliable Delivery</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 mt-6 text-[#5a2d14] font-semibold text-[13px] uppercase tracking-[0.08em] border-b border-[#5a2d14] pb-1 hover:text-[#7a4320] hover:border-[#7a4320] transition-all"
                  >
                    <ChevronLeft size={16} /> Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}