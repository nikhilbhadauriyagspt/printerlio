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
  Package, 
  ShieldCheck, 
  Truck,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
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

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Your Shopping Cart | Printer Loop" description="Review your selected items before completing your purchase." />

      {/* --- PROFESSIONAL CENTERED HEADER --- */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-20 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          <div className="flex flex-col items-center text-center">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex items-center gap-3 mb-4"
             >
                <div className="h-px w-8 bg-blue-600" />
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Review Order</span>
                <div className="h-px w-8 bg-blue-600" />
             </motion.div>
             
             <div className="flex flex-col items-center gap-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-7xl font-black text-slate-900  leading-none"
                >
                  Shopping <span className="text-blue-600">Cart</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-slate-500 text-sm md:text-lg font-medium max-w-2xl mt-2 leading-relaxed"
                >
                  You have {cartCount} premium items in your selection. Review your units and finalize your procurement for immediate dispatch.
                </motion.p>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-1.5 bg-blue-600 rounded-full mt-4"
                />
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-slate-50/30">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          
          <AnimatePresence mode="wait">
            {cart.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 max-w-4xl mx-auto px-8 shadow-sm"
              >
                <div className="h-24 w-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                  <ShoppingBag size={40} className="text-slate-200" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4  uppercase">Your cart is empty</h2>
                <p className="text-slate-500 font-medium mb-10 max-w-xs mx-auto text-lg">Looks like you haven't made your choice yet.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl active:scale-95 group">
                  Explore Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-20 items-start">
                
                {/* --- LEFT: ITEMS LIST --- */}
                <div className="xl:col-span-8 space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                     <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                           <Package size={20} />
                        </div>
                        Selected Items ({cartCount})
                     </h3>
                     <button onClick={() => navigate('/shop')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-slate-900 transition-colors">Continue Shopping</button>
                  </div>

                  <div className="space-y-6">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="group flex flex-col md:flex-row items-center gap-10 p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:border-blue-100 transition-all duration-700"
                      >
                        {/* Image */}
                        <div className="h-40 w-40 md:h-48 md:w-48 bg-slate-50 rounded-[2rem] p-6 shrink-0 flex items-center justify-center overflow-hidden group-hover:bg-white transition-colors duration-500">
                          <img 
                            src={getImagePath(item.images)} 
                            alt={item.name} 
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 w-full flex flex-col h-full">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-3">
                              
                               <h4 className="text-[16px] md:text-[18px] font-black text-slate-900 uppercase  line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                 {item.name}
                               </h4>
                               
                            </div>
                            <div className="text-2xl font-black text-slate-900 ">
                               ${(parsePrice(item.price) * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                            <div className="flex items-center gap-6 p-2 bg-slate-50 border border-slate-100 rounded-2xl">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 disabled:opacity-30"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="text-[16px] font-black text-slate-900 min-w-[30px] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-3 text-[11px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-all group/del"
                            >
                              <div className="h-10 w-10 rounded-xl bg-slate-50 group-hover/del:bg-red-50 flex items-center justify-center transition-colors">
                                <Trash2 size={18} />
                              </div>
                              Remove Item
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* --- RIGHT: SUMMARY PANEL --- */}
                <div className="xl:col-span-4 sticky top-32">
                  <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
                    
                    <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.3em] mb-10 border-b border-slate-50 pb-8 text-center">Procurement Summary</h3>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-[13px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span className="text-slate-900 font-black">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center text-[13px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Logistics</span>
                        <span className="text-emerald-600 font-black tracking-widest uppercase">Free Delivery</span>
                      </div>
                      <div className="flex justify-between items-center text-[13px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Estimated Tax</span>
                        <span className="text-slate-900 font-black">$0.00</span>
                      </div>
                      
                      <div className="h-[1px] w-full bg-slate-100/50 my-10" />
                      
                      <div className="flex justify-between items-end mb-12">
                        <div className="space-y-1">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">Total Payable</span>
                           <h4 className="text-4xl font-black text-slate-900 leading-none ">${(cartTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
                        </div>
                      </div>

                      <button 
                        onClick={() => navigate('/checkout')}
                        className="w-full h-20 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center gap-5 font-black text-[12px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl active:scale-95 group"
                      >
                        Secure Checkout
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <div className="mt-12 grid grid-cols-1 gap-4">
                         <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 transition-colors hover:bg-blue-50/30">
                            <ShieldCheck size={24} className="text-blue-600" />
                            <div className="text-left">
                               <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Encrypted Payment</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">SSL Secure Transfer</p>
                            </div>
                         </div>
                         <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 transition-colors hover:bg-blue-50/30">
                            <Truck size={24} className="text-blue-600" />
                            <div className="text-left">
                               <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Logistics Ready</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Nationwide Dispatch</p>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>

                  <Link to="/shop" className="group flex items-center justify-center gap-4 mt-10 text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[4px] transition-all">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Catalog
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
