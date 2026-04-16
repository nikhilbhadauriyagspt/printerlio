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
    cartCount,
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[210] flex flex-col font-['Poppins'] shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-black uppercase tracking-[0.3em] mb-1">Your Bag</p>
                <h3 className="text-2xl font-bold">Shopping Cart</h3>
              </div>
              <button
                onClick={closeCartDrawer}
                className="w-10 h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag size={48} className="text-gray-100 mb-6" />
                  <h4 className="text-xl font-bold mb-2">Cart is Empty</h4>
                  <p className="text-gray-400 text-sm mb-10 max-w-[240px]">Browse our catalog and add items to your selection.</p>
                  <button
                    onClick={() => { closeCartDrawer(); navigate('/shop'); }}
                    className="px-10 py-4 bg-gray-900 text-white font-bold text-[12px] uppercase tracking-widest hover:bg-black transition-all"
                  >
                    Go to Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className="w-24 h-24 bg-gray-50 border border-gray-100 p-3 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-3 mb-2">
                           <h4 className="text-sm font-bold text-gray-900 line-clamp-2 uppercase  leading-tight">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <p className="text-sm font-bold mb-4">${parsePrice(item.price).toLocaleString()}</p>

                        <div className="flex items-center border border-gray-100 w-fit scale-90 origin-left">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-50"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-gray-50">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-gray-900">${(cartTotal || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Total Amount</span>
                    <span className="text-2xl font-bold text-black leading-none">${(cartTotal || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full h-14 bg-gray-900 text-white font-bold text-[13px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3"
                  >
                    Checkout Now <ArrowRight size={18} />
                  </button>

                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-white border border-gray-900 text-gray-900 font-bold text-[13px] uppercase tracking-widest flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all"
                  >
                    View Cart
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
