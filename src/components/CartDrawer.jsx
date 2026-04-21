import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  ArrowRight,
  ShoppingCart,
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
  } = useCart();

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

  const handleCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-[#001e3c]/60 backdrop-blur-sm z-[500]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[510] flex flex-col font-['Poppins'] shadow-[0_0_100px_rgba(0,30,60,0.3)] border-l border-gray-100"
          >
            {/* Header */}
            <div className="px-8 py-8 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#001e3c] text-blue-800 flex items-center justify-center shadow-lg">
                  <ShoppingCart size={20} />
                </div>
                <div>
                  <h3 className="text-[20px] font-semibold text-[#001e3c] leading-none mb-1">Your Cart</h3>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)} Items Added
                  </p>
                </div>
              </div>

              <button
                onClick={closeCartDrawer}
                className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#001e3c] transition-colors shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <ShoppingBag size={40} className="text-gray-200" />
                  </div>
                  <h4 className="text-[24px] font-semibold text-[#001e3c] mb-3">Cart is empty</h4>
                  <p className="text-gray-400 text-[15px] mb-10 max-w-[240px]">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <button
                    onClick={() => {
                      closeCartDrawer();
                      navigate('/shop');
                    }}
                    className="h-14 px-10 rounded-2xl bg-[#001e3c] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-lg active:scale-95"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="group flex gap-5 p-5 border border-gray-100 rounded-[2rem] hover:border-[#fbb124]/30 hover:bg-slate-50 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 rounded-[1.5rem] bg-white border border-gray-100 p-2 flex items-center justify-center shrink-0 shadow-sm">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="max-h-[85%] max-w-[85%] object-contain transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className="text-[14px] font-semibold text-[#001e3c] line-clamp-1 group-hover:text-blue-800 transition-colors">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[16px] font-black text-[#001e3c] mb-2">
                            ${parsePrice(item.price).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          {/* Quantity */}
                          <div className="flex items-center bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-[#001e3c] disabled:opacity-30 hover:bg-[#fbb124] transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>

                            <span className="w-10 text-center text-[13px] font-bold text-[#001e3c]">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-[#001e3c] hover:bg-[#fbb124] transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <p className="text-[14px] font-black text-[#001e3c]/50">
                            ${(parsePrice(item.price) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-8 py-8 border-t border-gray-50 bg-slate-50/50">
                {/* Totals */}
                <div className="space-y-4 mb-8 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                  <div className="flex justify-between text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-[#001e3c]">${(cartTotal || 0).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-emerald-600">Free</span>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex justify-between items-end">
                    <div>
                       <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-800 block mb-1">
                        Final Total
                      </span>
                      <span className="text-[28px] font-semibold text-[#001e3c] leading-none tracking-tight">
                        ${(cartTotal || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full h-16 rounded-2xl bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-lg active:scale-95"
                  >
                    Secure Checkout <ArrowRight size={18} />
                  </button>

                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-16 rounded-2xl bg-white border border-gray-200 text-[#001e3c] font-bold text-[13px] uppercase tracking-widest flex items-center justify-center hover:border-[#001e3c] hover:bg-slate-50 transition-all"
                  >
                    Review Cart
                  </Link>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <ShieldCheck size={14} className="text-blue-800" /> Secure
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <Truck size={14} className="text-blue-800" /> Free Delivery
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
