import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ChevronLeft,
  ShoppingCart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
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
    <div className="min-h-screen bg-slate-50 pt-20 pb-20 font-['Poppins'] text-[#001e3c]">
      <SEO title="Shopping Cart | Printer Lio" />

      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#001e3c]">Secure Checkout</span>
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
          </div>
          
          <h1 className="text-[34px] md:text-[46px] font-semibold text-[#001e3c] leading-tight mb-4 uppercase tracking-tight">
            Shopping <span className="text-[#fbb124]">Cart</span>
          </h1>
          <p className="text-gray-500 text-[15px] max-w-[500px]">
            Review your selected printing solutions before proceeding to secure payment.
          </p>
        </div>

        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,30,60,0.05)] overflow-hidden">
          {/* Header Inside Container */}
          <div className="px-8 py-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#001e3c] text-[#fbb124] flex items-center justify-center shadow-lg">
                <ShoppingCart size={24} />
              </div>
              <div>
                <h2 className="text-[20px] font-semibold text-[#001e3c] leading-none mb-1">Your Bag</h2>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                   {cart.length} Product{cart.length !== 1 ? 's' : ''} Added
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
               <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <ShieldCheck size={16} className="text-[#fbb124]" /> 256-bit Encryption
               </div>
               <Link to="/shop" className="text-[12px] font-bold text-[#001e3c] uppercase tracking-widest flex items-center gap-2 hover:text-[#fbb124] transition-all">
                <ChevronLeft size={16} /> Add More Items
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-32 text-center"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <ShoppingBag size={40} className="text-gray-200" />
                  </div>
                  <h3 className="text-[24px] font-semibold text-[#001e3c] mb-4">Your bag is empty</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-10 text-[15px]">
                    Looks like you haven't added any printers or accessories to your cart yet.
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-3 h-14 px-10 bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-widest rounded-2xl hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-xl"
                  >
                    Explore Collections <ArrowRight size={18} />
                  </Link>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Left: Cart Items */}
                  <div className="lg:col-span-8 space-y-6">
                    {cart.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group bg-white border border-gray-100 rounded-[2.5rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      >
                        {/* Image Area */}
                        <div className="w-full sm:w-36 h-36 rounded-3xl bg-slate-50 border border-gray-100 p-4 flex items-center justify-center shrink-0 group-hover:bg-[#fbb124]/5 transition-colors">
                          <img
                            src={getImagePath(item.images)}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>

                        {/* Info Area */}
                        <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                             {item.brand_name || 'Premium Selection'}
                          </p>
                          <h4 className="text-[16px] sm:text-[18px] font-semibold text-[#001e3c] line-clamp-2 group-hover:text-[#fbb124] transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-[18px] font-black text-[#001e3c]">
                            ${parsePrice(item.price).toLocaleString()}
                          </p>
                        </div>

                        {/* Action Area */}
                        <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end border-t border-gray-50 sm:border-t-0 pt-6 sm:pt-0">
                          <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-gray-100 shadow-inner">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-[#001e3c] disabled:opacity-30 hover:bg-[#fbb124] transition-colors active:scale-95"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-12 text-center text-[15px] font-bold text-[#001e3c]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-[#001e3c] hover:bg-[#fbb124] transition-colors active:scale-95"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Subtotal</p>
                            <p className="text-[20px] font-black text-[#001e3c]">
                              ${(parsePrice(item.price) * item.quantity).toLocaleString()}
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                            title="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right: Order Summary */}
                  <div className="lg:col-span-4">
                    <div className="bg-[#001e3c] rounded-[3rem] p-10 space-y-8 sticky top-32 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#fbb124] rounded-full blur-[80px] opacity-20 -mr-16 -mt-16" />
                      
                      <div className="relative z-10">
                        <h3 className="text-[22px] font-semibold text-white mb-8">Order Summary</h3>
                        <div className="space-y-5">
                          <div className="flex justify-between text-[14px] font-bold text-white/60 uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span className="text-white">${(cartTotal || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[14px] font-bold text-white/60 uppercase tracking-widest">
                            <span>Shipping</span>
                            <span className="text-[#fbb124]">Free</span>
                          </div>
                          <div className="flex justify-between text-[14px] font-bold text-white/60 uppercase tracking-widest">
                            <span>Estimated Tax</span>
                            <span className="text-white">$0.00</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/10 relative z-10">
                        <div className="flex justify-between items-end mb-10">
                          <div>
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#fbb124] block mb-2">
                              Grand Total
                            </span>
                            <span className="text-[40px] font-semibold text-white leading-none tracking-tight">
                              ${(cartTotal || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => navigate('/checkout')}
                          className="w-full h-16 bg-[#fbb124] text-[#001e3c] font-bold text-[14px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl active:scale-95 mb-6"
                        >
                          Checkout Now <ArrowRight size={20} />
                        </button>
                        
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <div className="flex items-center gap-3 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                             <ShieldCheck size={16} className="text-[#fbb124]" /> Bank-Grade Security
                          </div>
                          <div className="flex items-center gap-3 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                             <Truck size={16} className="text-[#fbb124]" /> Insured Delivery
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
