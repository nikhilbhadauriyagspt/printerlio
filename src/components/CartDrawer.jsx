import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[450px] bg-white z-[1001] flex flex-col font-urbanist border-l border-gray-100 shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">My Selection</h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{cartCount} items ready for deployment</p>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-black hover:bg-gray-100 transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="group flex gap-5 p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-600/20 transition-all duration-500"
                    >
                      <div className="h-20 w-20 bg-gray-50 rounded-lg p-3 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100x100"; }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{item.brand_name || 'Premium'}</span>
                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                          </div>
                          <h3 className="text-sm font-black text-slate-900 truncate pr-2 mt-1">{item.name}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="h-8 bg-gray-50 rounded-lg flex items-center border border-gray-100">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center hover:text-blue-600 transition-all"><Minus size={12} strokeWidth={3} /></button>
                            <span className="text-[11px] font-black w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center hover:text-blue-600 transition-all"><Plus size={12} strokeWidth={3} /></button>
                          </div>
                          <span className="text-sm font-black text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                    <ShoppingCart size={32} className="text-slate-200" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Cart is empty</h3>
                  <p className="text-xs font-bold text-slate-400 mt-2 mb-8">No professional hardware selected yet.</p>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="h-12 px-10 bg-black text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center"
                  >
                    Browse store
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6 px-1">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total value</span>
                     <span className="text-3xl font-black text-slate-900">${total.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Units</span>
                     <span className="text-xl font-black text-blue-600">{cartCount}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-black text-white rounded-xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-black/5 active:scale-95 group"
                  >
                    Secure Checkout
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/cart" 
                    onClick={closeCartDrawer}
                    className="w-full h-12 bg-white border border-gray-200 text-slate-900 rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95"
                  >
                    View full cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
