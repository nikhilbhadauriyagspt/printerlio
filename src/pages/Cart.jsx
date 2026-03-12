import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ChevronLeft, ShieldCheck, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white">
        <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-100 shadow-sm">
          <ShoppingCart size={40} className="text-slate-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-400 font-bold text-sm mb-10">No professional hardware selected yet.</p>
        <Link to="/shop" className="h-14 px-10 bg-black text-white rounded-xl flex items-center gap-4 hover:bg-blue-600 transition-all active:scale-95 group">
          Browse Store <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist text-slate-900">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col space-y-2 mb-16">
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Review Selection
          </h1>
          <p className="text-slate-400 text-base font-bold tracking-wide">
            {cartCount} professional units ready for office deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-gray-100 rounded-2xl flex flex-col sm:flex-row items-center overflow-hidden group hover:border-blue-600/20 transition-all duration-500 relative"
                >
                  <div className="h-48 w-full sm:w-48 bg-gray-50 flex items-center justify-center p-8 shrink-0 transition-colors group-hover:bg-white">
                    <img 
                      src={getImagePath(item.images)} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150"; }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 p-8 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.brand_name || 'Premium'}</span>
                        <h3 className="text-lg font-black text-slate-900 leading-tight line-clamp-1">{item.name}</h3>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="h-10 w-10 bg-gray-50 rounded-xl text-slate-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90 border border-gray-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                      <div className="h-11 bg-gray-50 rounded-xl px-1.5 flex items-center border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center hover:bg-white rounded-lg text-slate-900 transition-all active:scale-90"><Minus size={14} strokeWidth={3} /></button>
                        <span className="text-sm font-black w-10 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center hover:bg-white rounded-lg text-slate-900 transition-all active:scale-90"><Plus size={14} strokeWidth={3} /></button>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Item Total</span>
                         <span className="text-2xl font-black text-slate-900 tracking-tight">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-all pt-8 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Continue Selection
            </Link>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 p-8 md:p-10 rounded-2xl sticky top-32 space-y-10">
              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-slate-900">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-500">Shipping</span>
                    <span className="text-emerald-600">Free deployment</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 space-y-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total value</span>
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">${total.toLocaleString()}</span>
                </div>

                <div className="space-y-3">
                  <Link 
                    to="/checkout"
                    className="w-full h-16 bg-black text-white rounded-xl flex items-center justify-center gap-4 text-[12px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-black/5 active:scale-95 group"
                  >
                    Secure Checkout
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-3 py-4 bg-gray-50 rounded-xl border border-gray-100">
                    <ShieldCheck size={18} className="text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 tracking-widest">Verified Payment Network</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 opacity-20">
                 <div className="text-slate-900 italic font-black text-2xl">PayPal</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
