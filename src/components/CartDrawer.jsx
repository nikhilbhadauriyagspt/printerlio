import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus, Package, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-white z-[210] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white relative">
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                     <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                     <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.2em]">Shopping Cart</h3>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-5">Items in Cart: {cartCount}</p>
               </div>
               <button 
                 onClick={closeCartDrawer}
                 className="h-12 w-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-95 group"
               >
                 <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
               </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-24 w-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8">
                     <ShoppingBag size={40} className="text-slate-200" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 uppercase  mb-3">Empty Cart</h4>
                  <p className="text-slate-500 font-medium text-sm mb-10 max-w-[240px]">You haven't added any premium products to your cart yet.</p>
                  <button 
                    onClick={() => { closeCartDrawer(); navigate('/shop'); }}
                    className="group flex items-center gap-4 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all active:scale-95"
                  >
                    Start Shopping
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group flex gap-6 p-5 bg-white border border-slate-100 rounded-[2rem] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-blue-100 transition-all duration-500"
                    >
                      <div className="h-24 w-24 bg-slate-50 rounded-2xl p-3 shrink-0 flex items-center justify-center overflow-hidden group-hover:bg-white transition-colors">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name} 
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                           <div className="flex justify-between items-start gap-2">
                              <h4 className="text-[13px] font-black text-slate-800 uppercase line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{item.name}</h4>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-slate-300 hover:text-red-500 transition-all shrink-0 p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                           </div>
                           <p className="text-[14px] font-black text-slate-900 mt-2">${parsePrice(item.price).toLocaleString()}</p>
                        </div>

                        <div className="flex items-center mt-4">
                           <div className="flex items-center gap-4 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-7 w-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 disabled:opacity-30"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-[13px] font-black text-slate-900 min-w-[20px] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-7 w-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90"
                              >
                                <Plus size={14} />
                              </button>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-slate-50 bg-white">
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center text-[12px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                      <span>Subtotal</span>
                      <span className="text-slate-900 font-black">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                   </div>
                   <div className="flex justify-between items-center text-[12px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                      <span>Shipping</span>
                      <span className="text-emerald-600 font-black tracking-widest">FREE</span>
                   </div>
                   <div className="pt-4 border-t border-slate-50 flex justify-between items-end">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">Total Payable</p>
                         <h4 className="text-3xl font-black text-slate-900 leading-none ">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-3">
                   <button 
                     onClick={handleCheckout}
                     className="w-full h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl active:scale-[0.98] group"
                   >
                     Checkout Now
                     <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                   <Link 
                     to="/cart" 
                     onClick={closeCartDrawer}
                     className="w-full h-14 bg-white border border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-[0.98]"
                   >
                     View Detail Cart
                   </Link>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6">
                   <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                      <ShieldCheck size={16} className="text-blue-600" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Secured</span>
                   </div>
                   <div className="h-4 w-[1px] bg-slate-100" />
                   <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                      <Truck size={16} className="text-blue-600" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Fast Delivery</span>
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
