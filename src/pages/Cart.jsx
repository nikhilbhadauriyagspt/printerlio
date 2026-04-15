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
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '@/components/SEO';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
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
    <div className="min-h-screen bg-[#f8fafc] font-['Poppins'] text-black">
      <SEO
        title="Your Shopping Cart | Printistan"
        description="Review your selected items before completing your purchase."
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 bg-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
        </div>

        <div className="relative max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-4xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-blue-700">
              <Sparkles size={14} />
              Your Cart
            </p>

            <h1 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ">
              <span className="text-black">Shopping</span>{' '}
              <span className="text-blue-600">Cart</span>
            </h1>

            <p className="mt-5 text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
              You have {cartCount} items in your cart. Review your selection before
              moving to checkout.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <AnimatePresence mode="wait">
            {cart.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto rounded-[34px] border border-black/10 bg-white px-8 py-16 md:py-20 text-center shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="h-20 w-20 rounded-[24px] border border-blue-100 bg-blue-50 flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={38} className="text-blue-600" />
                </div>

                <h2 className="text-2xl md:text-4xl font-bold mb-3">
                  <span className="text-black">Your Cart</span>{' '}
                  <span className="text-blue-600">is Empty</span>
                </h2>

                <p className="text-black/60 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
                  Add some products to your cart to see them here and continue with
                  your purchase.
                </p>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.18)]"
                >
                  Start Shopping <ArrowRight size={16} />
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 items-start">
                {/* ITEMS */}
                <div className="xl:col-span-8 space-y-5 md:space-y-6">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="group rounded-[30px] border border-black/10 bg-white p-5 md:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_34px_rgba(37,99,235,0.08)]"
                    >
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                        {/* IMAGE */}
                        <div className="w-full md:w-auto flex justify-center">
                          <div className="h-32 w-32 md:h-40 md:w-40 rounded-[24px] border border-black/10 bg-[#fbfcff] p-4 flex items-center justify-center shrink-0">
                            <img
                              src={getImagePath(item.images)}
                              alt={item.name}
                              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                          </div>
                        </div>

                        {/* DETAILS */}
                        <div className="flex-1 w-full">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="max-w-2xl">
                              <h3 className="text-base md:text-lg font-semibold text-black leading-relaxed capitalize">
                                {item.name}
                              </h3>
                              <p className="text-sm text-black/50 mt-2">
                                Unit Price: $
                                {parsePrice(item.price).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </p>
                            </div>

                            <p className="text-lg md:text-2xl font-bold text-black">
                              $
                              {(parsePrice(item.price) * item.quantity).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </p>
                          </div>

                          <div className="mt-6 pt-5 border-t border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="inline-flex items-center gap-3 rounded-[16px] border border-black/10 bg-[#fbfcff] px-2 py-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-9 w-9 rounded-[12px] border border-black/10 bg-white flex items-center justify-center text-black disabled:opacity-40 transition-all duration-300 hover:border-blue-200 hover:text-blue-600"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>

                              <span className="min-w-[24px] text-center text-sm font-semibold text-black">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-9 w-9 rounded-[12px] border border-black/10 bg-white flex items-center justify-center text-black transition-all duration-300 hover:border-blue-200 hover:text-blue-600"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-black/60 transition-all duration-300 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* SUMMARY */}
                <div className="xl:col-span-4">
                  <div className="xl:sticky xl:top-28 space-y-5">
                    <div className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                      <p className="text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-blue-700 mb-2">
                        Order Summary
                      </p>

                      <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                        <span className="text-black">Checkout</span>{' '}
                        <span className="text-blue-600">Overview</span>
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm md:text-base text-black/60">
                          <span>Subtotal</span>
                          <span className="font-semibold text-black">
                            ${(cartTotal || 0).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm md:text-base text-black/60">
                          <span>Shipping</span>
                          <span className="font-semibold text-emerald-600">Free</span>
                        </div>

                        <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                          <span className="text-lg font-bold text-black">Total</span>
                          <span className="text-lg font-bold text-black">
                            ${(cartTotal || 0).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate('/checkout')}
                        className="w-full mt-8 h-12 md:h-14 rounded-[18px] bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.18)]"
                      >
                        Checkout Now
                      </button>

                      <div className="space-y-4 pt-6">
                        <div className="flex items-center gap-3 text-sm text-black/60">
                          <div className="h-10 w-10 rounded-[14px] border border-blue-100 bg-blue-50 flex items-center justify-center">
                            <ShieldCheck size={18} className="text-blue-600" />
                          </div>
                          <span className="font-medium">Secure checkout process</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-black/60">
                          <div className="h-10 w-10 rounded-[14px] border border-blue-100 bg-blue-50 flex items-center justify-center">
                            <Truck size={18} className="text-blue-600" />
                          </div>
                          <span className="font-medium">Fast shipping across USA</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-[16px] border border-black/10 bg-white text-black text-sm font-semibold transition-all duration-300 hover:border-blue-200 hover:text-blue-600 hover:-translate-y-0.5"
                    >
                      <ChevronLeft size={16} />
                      Back to Shopping
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}