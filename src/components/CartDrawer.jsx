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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#fbf8f5] z-[210] flex flex-col font-['Poppins'] shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-[#e8dfd6] flex items-center justify-between bg-white">
              <div>
                <p className="text-[11px] uppercase tracking-[3px] text-[#8b7768] mb-1">
                  Your Cart
                </p>
                <h3 className="text-[22px] font-semibold text-[#241812]">
                  Shopping Bag
                </h3>
              </div>

              <button
                onClick={closeCartDrawer}
                className="w-10 h-10 rounded-full border border-[#e4d9cf] flex items-center justify-center text-[#7a4320] hover:bg-[#f6ede6]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag size={42} className="text-[#d4c5b8] mb-5" />

                  <h4 className="text-[20px] font-semibold text-[#241812] mb-2">
                    Cart is Empty
                  </h4>

                  <p className="text-[#6b5d54] text-[14px] mb-6 max-w-[260px]">
                    Add printers or accessories to get started.
                  </p>

                  <button
                    onClick={() => {
                      closeCartDrawer();
                      navigate('/shop');
                    }}
                    className="px-6 h-[44px] rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em]"
                  >
                    Browse Shop
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-5 border-b border-[#eee4db]"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-xl bg-white border border-[#eadfd6] p-3 flex items-center justify-center">
                      <img
                        src={getImagePath(item.images)}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex justify-between gap-2 mb-1">
                        <h4 className="text-[14px] font-semibold text-[#241812] line-clamp-2">
                          {item.name}
                        </h4>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#b3a49a] hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p className="text-[13px] text-[#6b5d54] mb-3">
                        ${parsePrice(item.price).toLocaleString()}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center border border-[#e4d9cf] rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#7a4320]"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>

                          <span className="w-8 text-center text-[13px] font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#7a4320]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <p className="text-[14px] font-semibold text-[#241812]">
                          $
                          {(
                            parsePrice(item.price) * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-[#e8dfd6] bg-white">
                {/* Totals */}
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-[13px] text-[#6b5d54]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#241812]">
                      ${(cartTotal || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-[13px] text-[#6b5d54]">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                  </div>

                  <div className="flex justify-between items-end pt-2 border-t border-[#eee4db]">
                    <span className="text-[13px] uppercase tracking-[0.12em] text-[#8c7769]">
                      Total
                    </span>
                    <span className="text-[26px] font-semibold text-[#241812]">
                      ${(cartTotal || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full h-[48px] rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-center gap-2"
                  >
                    Checkout <ArrowRight size={14} />
                  </button>

                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-[48px] rounded-xl border border-[#7a4320] text-[#7a4320] text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-center hover:bg-[#7a4320] hover:text-white transition"
                  >
                    View Cart
                  </Link>
                </div>

                {/* Trust */}
                <div className="mt-5 pt-5 border-t border-[#eee4db] space-y-3">
                  <div className="flex items-center gap-2 text-[12px] text-[#6b5d54]">
                    <ShieldCheck size={14} /> Secure Checkout
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#6b5d54]">
                    <Truck size={14} /> Fast Delivery
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