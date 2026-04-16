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
    <div className="min-h-screen bg-white font-['Poppins'] text-[#111111]">
      <SEO title="Your Cart | Printing Land" />

      {/* --- Page Header --- */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-20">
           <span className="text-[11px] font-bold text-black uppercase tracking-[0.3em] mb-4 block">
             Shopping Bag
           </span>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900  mb-6">
             Your <span className="text-black">Selection.</span>
           </h1>
           <p className="max-w-2xl text-gray-500 text-[14px] md:text-[16px] leading-relaxed font-medium">
             Review your items and adjust quantities before proceeding to secure checkout. You have {cartCount} items in your bag.
           </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            {cart.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 border border-dashed border-gray-200"
              >
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-6" />
                <h2 className="text-xl font-bold mb-3">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Ready to start your next printing project?</p>
                <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold text-[12px] uppercase tracking-widest hover:bg-blue-700 transition-all">
                  Browse Shop <ArrowRight size={18} />
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* ITEMS LIST */}
                <div className="lg:col-span-8 space-y-0 border-t border-gray-100">
                  {cart.map((item) => (
                    <div 
                      key={item.id}
                      className="group py-8 border-b border-gray-100 flex flex-col sm:flex-row gap-8 sm:items-center"
                    >
                      {/* Image */}
                      <div className="w-32 h-32 bg-gray-50 border border-gray-100 p-4 shrink-0 flex items-center justify-center">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                         <h4 className="font-bold text-lg mb-1 line-clamp-1 uppercase ">{item.name}</h4>
                         <p className="text-sm text-gray-400 font-bold mb-4 uppercase tracking-widest">
                            ${parsePrice(item.price).toLocaleString()} / unit
                         </p>
                         
                         <div className="flex items-center gap-8">
                            <div className="flex items-center border border-gray-200">
                               <button 
                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                 className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-400"
                                 disabled={item.quantity <= 1}
                               >
                                 <Minus size={14} />
                               </button>
                               <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                               <button 
                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                 className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-400"
                               >
                                 <Plus size={14} />
                               </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-2"
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                         </div>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right sm:pl-8">
                         <p className="text-xl font-bold">
                           ${(parsePrice(item.price) * item.quantity).toLocaleString()}
                         </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SUMMARY SIDEBAR */}
                <div className="lg:col-span-4">
                   <div className="bg-gray-50 p-8 md:p-10 border border-gray-100 sticky top-32">
                      <h3 className="text-xl font-bold mb-8 uppercase tracking-widest border-b border-gray-200 pb-4">Order Summary</h3>
                      
                      <div className="space-y-4 mb-10">
                         <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span className="text-gray-900">${(cartTotal || 0).toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <span>Shipping</span>
                            <span className="text-emerald-600">Free</span>
                         </div>
                         <div className="h-px bg-gray-200 w-full" />
                         <div className="flex justify-between items-end pt-2">
                            <span className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">Total</span>
                            <span className="text-3xl font-bold text-black leading-none">${(cartTotal || 0).toLocaleString()}</span>
                         </div>
                      </div>

                      <button 
                        onClick={() => navigate('/checkout')}
                        className="w-full h-14 bg-gray-900 text-white font-bold text-[13px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                      >
                        Checkout Now <ArrowRight size={18} />
                      </button>

                      <div className="mt-8 space-y-4 pt-8 border-t border-gray-200">
                         <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                            <ShieldCheck size={18} className="text-black" /> Secure Payment
                         </div>
                         <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                            <Truck size={18} className="text-black" /> Global Shipping
                         </div>
                      </div>
                   </div>

                   <Link to="/shop" className="inline-flex items-center gap-2 mt-8 text-gray-900 font-bold text-[12px] uppercase tracking-widest hover:text-black transition-all">
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
