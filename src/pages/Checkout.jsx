import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ArrowRight,
  Lock,
  MapPin,
  Mail,
  CheckCircle2,
  Package,
  Phone,
  Wallet,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from '@paypal/react-paypal-js';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'paypal',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || '',
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        user_id: user?.id,
        total: cartTotal,
        items: cart,
        payment_details: paymentDetails,
        source: 'printerlio.shop',
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id || data.data?.order_code || data.data?.id);
        setStep(3);
        clearCart();
      } else {
        alert(data.message || 'Error placing order.');
      }
    } catch (err) {
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (step === 1) {
      window.scrollTo(0, 0);
      setStep(2);
    } else if (formData.paymentMethod === 'cod') {
      await handleOrderSuccess();
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];
        return img.startsWith('http') ? img : `/${img}`;
      }
    } catch (e) {}
    return 'https://via.placeholder.com/100x100?text=Product';
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className=" bg-slate-50 flex items-center justify-center px-4 font-['Poppins'] text-[#001e3c]">
        <div className="max-w-md w-full bg-white rounded-[3rem] border border-gray-100 p-12 text-center shadow-2xl">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <ShoppingBag size={40} className="text-gray-200" />
          </div>
          <h2 className="text-[28px] font-semibold text-[#001e3c] mb-4">Your bag is empty</h2>
          <p className="text-gray-400 mb-10 text-[15px]">
            Please add some printers or supplies before checking out.
          </p>
          <Link
            to="/shop"
            className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-widest hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-xl"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4 font-['Poppins'] text-[#001e3c]">
        <SEO title="Order Confirmed | Printer Lio" />
        <div className="max-w-xl w-full bg-white rounded-[3.5rem] border border-gray-100 p-12 md:p-16 text-center shadow-[0_40px_100px_rgba(0,30,60,0.12)]">
          <div className="w-28 h-28 bg-[#001e3c] text-blue-800 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-900/20">
            <CheckCircle2 size={48} />
          </div>

          <h1 className="text-[36px] md:text-[46px] font-semibold text-[#001e3c] mb-6 leading-tight uppercase tracking-tight">
            Order <span className="text-blue-800">Confirmed!</span>
          </h1>

          <p className="text-gray-500 leading-relaxed text-[16px] max-w-md mx-auto mb-12">
            Thank you for choosing Printer Lio. Your order <span className="text-[#001e3c] font-black">#{orderId}</span> is being processed. 
            We've sent a confirmation to <span className="text-[#001e3c] font-black">{formData.email}</span>.
          </p>

          <div className="space-y-4">
            <Link
              to="/orders"
              className="w-full h-16 rounded-2xl bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-xl active:scale-95"
            >
              Track Order Status <ArrowRight size={18} />
            </Link>

            <Link
              to="/"
              className="w-full h-16 rounded-2xl bg-slate-50 border border-gray-100 text-[#001e3c] font-bold text-[13px] uppercase tracking-[0.2em] flex items-center justify-center hover:bg-gray-100 transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white font-['Poppins'] text-[#001e3c] pt-32 pb-20">
      <SEO title="Secure Checkout | Printer Lio" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        
        {/* Centered Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="flex items-center justify-center gap-3 text-[11px] font-bold text-[#001e3c]/50 uppercase tracking-[0.2em] mb-6 bg-slate-50 px-6 py-2 rounded-full border border-gray-100">
            <Link to="/cart" className="hover:text-blue-800 transition-colors">Bag</Link>
            <ChevronRight size={12} />
            <span className={cn(step === 1 ? "text-[#001e3c]" : "text-inherit")}>Shipping</span>
            <ChevronRight size={12} />
            <span className={cn(step === 2 ? "text-[#001e3c]" : "text-inherit")}>Payment</span>
          </div>
          
          <h1 className="text-[34px] md:text-[48px] font-semibold text-[#001e3c] leading-tight mb-6 uppercase tracking-tight">
            {step === 1 ? "Secure Checkout" : "Final Payment"}
          </h1>
          
          <div className="inline-flex items-center gap-2 bg-slate-50 px-5 py-2.5 rounded-full border border-gray-100">
             <Lock size={14} className="text-blue-800" />
             <span className="text-[11px] font-bold text-[#001e3c] uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-8 bg-slate-50 rounded-[3.5rem] p-8 md:p-14 lg:p-16 border border-gray-100 shadow-[0_20px_60px_rgba(0,30,60,0.03)]">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-14"
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-[#001e3c] text-blue-800 flex items-center justify-center shadow-md">
                          <Mail size={20} />
                       </div>
                       <h3 className="text-[26px] font-semibold text-[#001e3c]">Contact Details</h3>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/40 pl-4">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@business.com"
                        className="w-full h-15 rounded-[1.25rem] bg-white border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:border-[#fbb124] outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-[#001e3c] text-blue-800 flex items-center justify-center shadow-md">
                          <MapPin size={20} />
                       </div>
                       <h3 className="text-[26px] font-semibold text-[#001e3c]">Shipping Address</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/40 pl-4">
                          First Name
                        </label>
                        <input
                          required
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full h-15 rounded-[1.25rem] bg-white border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:border-[#fbb124] outline-none transition-all shadow-sm"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/40 pl-4">
                          Last Name
                        </label>
                        <input
                          required
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full h-15 rounded-[1.25rem] bg-white border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:border-[#fbb124] outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/40 pl-4">
                        Street Address
                      </label>
                      <input
                        required
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full h-15 rounded-[1.25rem] bg-white border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:border-[#fbb124] outline-none transition-all shadow-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/40 pl-4">
                          City / State
                        </label>
                        <input
                          required
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full h-15 rounded-[1.25rem] bg-white border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:border-[#fbb124] outline-none transition-all shadow-sm"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/40 pl-4">
                          Zip / Postal Code
                        </label>
                        <input
                          required
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full h-15 rounded-[1.25rem] bg-white border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:border-[#fbb124] outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/40 pl-4">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-15 rounded-[1.25rem] bg-white border border-gray-100 px-6 text-[15px] font-semibold text-[#001e3c] focus:border-[#fbb124] outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-16 rounded-2xl bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-[0.2em] hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-4 active:scale-95 mt-6"
                  >
                    Continue to Payment <ArrowRight size={20} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-14"
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-[#001e3c] text-blue-800 flex items-center justify-center shadow-md">
                          <CreditCard size={20} />
                       </div>
                       <h3 className="text-[26px] font-semibold text-[#001e3c]">Payment Method</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      {[
                        {
                          id: 'paypal',
                          label: 'PayPal / Credit Card',
                          icon: CreditCard,
                          desc: 'Secure payment via PayPal account or bank cards.',
                        },
                        {
                          id: 'cod',
                          label: 'Cash on Delivery',
                          icon: Wallet,
                          desc: 'Pay safely with cash when your package arrives.',
                        },
                      ].map((method) => (
                        <div
                          key={method.id}
                          onClick={() =>
                            setFormData({ ...formData, paymentMethod: method.id })
                          }
                          className={cn(
                            'p-8 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center justify-between group',
                            formData.paymentMethod === method.id
                              ? 'border-[#001e3c] bg-white shadow-xl shadow-[#001e3c]/5'
                              : 'border-white bg-white hover:border-[#fbb124]/50'
                          )}
                        >
                          <div className="flex items-center gap-6">
                            <div
                              className={cn(
                                'w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shrink-0',
                                formData.paymentMethod === method.id
                                  ? 'border-[#001e3c]'
                                  : 'border-gray-200 group-hover:border-[#fbb124]'
                              )}
                            >
                              {formData.paymentMethod === method.id && (
                                <div className="w-3.5 h-3.5 rounded-full bg-[#fbb124]" />
                              )}
                            </div>

                            <div>
                              <p className="text-[17px] font-semibold text-[#001e3c] leading-none mb-2">
                                {method.label}
                              </p>
                              <p className="text-[13px] font-medium text-gray-500">
                                {method.desc}
                              </p>
                            </div>
                          </div>

                          <method.icon
                            size={28}
                            strokeWidth={1.5}
                            className={cn(
                              formData.paymentMethod === method.id
                                ? 'text-[#001e3c]'
                                : 'text-gray-300'
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {formData.paymentMethod === 'paypal' ? (
                      <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                        <PayPalButtons
                          style={{ layout: 'vertical', shape: 'pill', label: 'pay' }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: { value: cartTotal.toString() },
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                              handleOrderSuccess(details);
                            });
                          }}
                        />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-16 rounded-2xl bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-[0.2em] hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-4 disabled:opacity-70 active:scale-95"
                      >
                        {loading ? 'Processing...' : 'Complete Order'}
                        {!loading && <CheckCircle2 size={20} />}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full text-center text-[12px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/40 hover:text-[#001e3c] transition-colors py-4 flex items-center justify-center gap-2"
                    >
                      <ChevronLeft size={16} />
                      Back to Details
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Summary Area */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <div className="bg-white rounded-[3rem] border border-gray-100 p-10 shadow-[0_20px_60px_rgba(0,30,60,0.03)]">
              <h3 className="text-[22px] font-semibold text-[#001e3c] mb-10 text-center">Order Summary</h3>

              <div className="max-h-[380px] overflow-y-auto pr-4 space-y-8 mb-10 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-gray-100 p-3 shrink-0 flex items-center justify-center group-hover:bg-[#fbb124]/5 transition-colors">
                      <img
                        src={getImagePath(item.images)}
                        className="max-h-full max-w-full object-contain"
                        alt=""
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-[14px] font-semibold text-[#001e3c] line-clamp-2 leading-tight mb-2">
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-between mt-auto">
                         <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                         <p className="text-[16px] font-black text-[#001e3c]">
                           ${(item.price * item.quantity).toLocaleString()}
                         </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5 pt-8 border-t border-gray-100">
                <div className="flex justify-between text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-[#001e3c]">${(cartTotal || 0).toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-emerald-500">Free</span>
                </div>

                <div className="flex justify-between items-end pt-6 border-t border-gray-50">
                  <div>
                    <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#001e3c] block mb-2">
                      Grand Total
                    </span>
                    <span className="text-[38px] font-semibold text-[#001e3c] leading-none tracking-tight">
                      ${(cartTotal || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-[#001e3c] rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbb124] rounded-full blur-[60px] opacity-20 -mr-10 -mt-10" />
               <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-5">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-800">
                        <ShieldCheck size={18} />
                     </div>
                     <span className="text-[13px] font-bold uppercase tracking-wider">PCI Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-5">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-800">
                        <Truck size={18} />
                     </div>
                     <span className="text-[13px] font-bold uppercase tracking-wider">Tracked Delivery</span>
                  </div>
                  <div className="flex items-center gap-5">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-800">
                        <Package size={18} />
                     </div>
                     <span className="text-[13px] font-bold uppercase tracking-wider">Genuine Assurance</span>
                  </div>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
