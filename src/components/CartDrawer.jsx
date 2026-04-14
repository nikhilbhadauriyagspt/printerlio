import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount
  } = useCart();

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

  const handleCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/40 z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[460px] bg-white z-[210] flex flex-col font-['Poppins'] border-l border-black/10"
          >
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-black/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-black">Your Cart</h3>
                <p className="text-sm text-black/50 mt-1">{cartCount} Items Selected</p>
              </div>

              <button
                onClick={closeCartDrawer}
                className="h-11 w-11 rounded-[14px] border border-black/10 bg-white flex items-center justify-center text-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-20 w-20 rounded-[24px] border border-black/10 bg-white flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-black/20" />
                  </div>

                  <h4 className="text-2xl font-bold text-black mb-2">Cart is empty</h4>
                  <p className="text-black/60 text-sm mb-8 max-w-[260px]">
                    Add items to get started with your purchase.
                  </p>

                  <button
                    onClick={() => {
                      closeCartDrawer();
                      navigate('/shop');
                    }}
                    className="px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold"
                  >
                    Browse Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[24px] border border-black/10 bg-white p-4"
                    >
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="h-24 w-24 rounded-[20px] border border-black/10 bg-white p-3 shrink-0 flex items-center justify-center">
                          <img
                            src={getImagePath(item.images)}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="text-sm font-semibold text-black leading-relaxed line-clamp-2">
                              {item.name}
                            </h4>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="h-9 w-9 rounded-[12px] border border-black/10 bg-white flex items-center justify-center text-black/60 shrink-0"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <p className="text-base font-bold text-black">
                              $
                              {parsePrice(item.price).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </p>

                            <div className="inline-flex items-center gap-2 rounded-[14px] border border-black/10 bg-white px-2 py-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 rounded-[10px] border border-black/10 bg-white flex items-center justify-center text-black disabled:opacity-40"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={12} />
                              </button>

                              <span className="w-5 text-center text-sm font-semibold text-black">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 rounded-[10px] border border-black/10 bg-white flex items-center justify-center text-black"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-5 md:p-6 border-t border-black/10 bg-white space-y-5">
                <div className="rounded-[24px] border border-black/10 bg-white p-5 space-y-4">
                  <div className="flex items-center justify-between text-sm text-black/60">
                    <span>Subtotal</span>
                    <span className="font-semibold text-black">
                      ${(cartTotal || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                    <span className="text-lg font-bold text-black">Total Amount</span>
                    <span className="text-lg font-bold text-black">
                      ${(cartTotal || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full h-12 rounded-[16px] bg-black text-white text-sm font-semibold"
                  >
                    Checkout Now
                  </button>

                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-12 rounded-[16px] border border-black/10 bg-white text-black text-sm font-semibold flex items-center justify-center"
                  >
                    View Detail Cart
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-black/60 font-medium">
                    <div className="h-8 w-8 rounded-[10px] border border-black/10 flex items-center justify-center">
                      <ShieldCheck size={14} className="text-black" />
                    </div>
                    Secured
                  </div>

                  <div className="flex items-center gap-2 text-xs text-black/60 font-medium">
                    <div className="h-8 w-8 rounded-[10px] border border-black/10 flex items-center justify-center">
                      <Truck size={14} className="text-black" />
                    </div>
                    Free Shipping
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}