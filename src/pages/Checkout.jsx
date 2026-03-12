import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, Mail, Box, CheckCircle2, Loader2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; 
  const finalTotal = total + shipping;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (From: ${window.location.hostname})`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-urbanist bg-white">
        <div className="h-24 w-24 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 mx-auto shadow-sm">
             <ShoppingCart size={40} className="text-slate-200" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-sm font-bold text-slate-400 mb-10 text-center max-w-xs">Please add professional hardware before initiating checkout.</p>
        <Link to="/shop" className="h-14 px-10 bg-black text-white rounded-xl flex items-center gap-4 hover:bg-blue-600 transition-all active:scale-95 group">
          Return to shop <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-urbanist bg-white text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative mb-8">
          <div className="h-24 w-24 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-xl border border-emerald-100 relative z-10 mx-auto">
            <CheckCircle2 size={40} />
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-4">Order confirmed</h1>
        <p className="text-slate-400 font-bold text-sm mb-12 uppercase tracking-widest">Your hardware deployment is being prepared.</p>
        
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-12 max-w-sm w-full">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Order Reference</p>
          <p className="text-2xl font-black text-slate-900 uppercase">#{orderId || 'PROCESS'}</p>
        </div>

        <Link to="/" className="h-14 px-12 bg-black text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-black/5">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist text-slate-900">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- CHECKOUT HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
          <div className="flex flex-col items-start">
            <Link to="/cart" className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors mb-6 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to cart
            </Link>
            <h1 className="text-4xl md:text-6xl font-black leading-tight uppercase">
              Secure Checkout
            </h1>
          </div>

          <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
               <div className={cn("h-8 w-8 rounded flex items-center justify-center text-xs font-black transition-all duration-500", step >= 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-300")}>01</div>
               <span className={cn("text-[10px] font-black uppercase tracking-widest", step >= 1 ? "text-slate-900" : "text-slate-300")}>Information</span>
            </div>
            <div className="h-px w-8 bg-gray-200" />
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
               <div className={cn("h-8 w-8 rounded flex items-center justify-center text-xs font-black transition-all duration-500", step >= 2 ? "bg-blue-600 text-white" : "bg-gray-100 text-slate-300")}>02</div>
               <span className={cn("text-[10px] font-black uppercase tracking-widest", step >= 2 ? "text-slate-900" : "text-slate-300")}>Payment</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-50 text-blue-600 flex items-center justify-center rounded-xl border border-gray-100"><Mail size={18} /></div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Information terminal</h3>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Email address</label>
                       <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="john@example.com" className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                    </div>
                  </div>

                  <div className="space-y-8 pt-12 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-50 text-blue-600 flex items-center justify-center rounded-xl border border-gray-100"><MapPin size={18} /></div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Deployment address</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">First name</label>
                         <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Last name</label>
                         <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Street address</label>
                       <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Complete Street Address" className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">City</label>
                         <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Zip code</label>
                         <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Zip Code" className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Phone number</label>
                       <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+1 (000) 000-0000" className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-50 text-blue-600 flex items-center justify-center rounded-xl border border-gray-100"><CreditCard size={18} /></div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Settlement method</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* COD */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                        className={cn(
                          "p-8 rounded-2xl border-2 cursor-pointer transition-all duration-500 flex flex-col justify-between h-48",
                          formData.paymentMethod === 'cod' ? "border-blue-600 bg-white" : "border-gray-100 bg-gray-50 hover:border-gray-200"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'cod' ? "border-blue-600" : "border-gray-200")}>
                            {formData.paymentMethod === 'cod' && <div className="h-3 w-3 rounded-full bg-blue-600" />}
                          </div>
                          <Truck size={32} className={cn(formData.paymentMethod === 'cod' ? "text-blue-600" : "text-gray-300")} />
                        </div>
                        <div>
                           <h4 className="text-lg font-black text-slate-900">Cash on Delivery</h4>
                           <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Settle upon hardware arrival</p>
                        </div>
                      </div>

                      {/* PayPal */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                        className={cn(
                          "p-8 rounded-2xl border-2 cursor-pointer transition-all duration-500 flex flex-col justify-between h-48",
                          formData.paymentMethod === 'paypal' ? "border-blue-600 bg-white" : "border-gray-100 bg-gray-50 hover:border-gray-200"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'paypal' ? "border-blue-600" : "border-gray-200")}>
                            {formData.paymentMethod === 'paypal' && <div className="h-3 w-3 rounded-full bg-blue-600" />}
                          </div>
                          <div className={cn("italic font-black text-2xl", formData.paymentMethod === 'paypal' ? "text-blue-600" : "text-gray-300")}>PayPal</div>
                        </div>
                        <div>
                           <h4 className="text-lg font-black text-slate-900">PayPal Gateway</h4>
                           <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Secure digital settlement</p>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.paymentMethod === 'paypal' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-8 pt-8">
                          <div className="p-8 bg-slate-900 rounded-2xl text-white text-center relative overflow-hidden">
                            <ShieldCheck className="absolute top-0 right-0 p-6 opacity-10" size={100} />
                            <div className="relative z-10">
                              <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">Verified encryption link</p>
                              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-lg border border-white/10 text-[11px] font-black">
                                <Lock size={14} className="text-blue-400" /> Operational Security Active
                              </div>
                            </div>
                          </div>
                          <div className="max-w-md mx-auto">
                            <PayPalButtons 
                              style={{ layout: "vertical", shape: "rect", label: "pay" }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  purchase_units: [{ amount: { value: finalTotal.toString() }, description: `MaxPrinter - ${cartCount} Units` }],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                try {
                                  const details = await actions.order.capture();
                                  await handleOrderSuccess(details);
                                } catch (err) { alert("Failed to synchronize payment."); }
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-16 flex flex-col items-center gap-6 border-t border-gray-100 mt-12">
              {(formData.paymentMethod === 'cod' || step === 1) && (
                <button 
                  type="submit" disabled={loading}
                  className="h-16 px-16 bg-black text-white hover:bg-blue-600 rounded-xl flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-black/5 disabled:opacity-50 active:scale-95 group w-full md:w-auto"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      {step === 1 ? 'Next logistics step' : 'Finalize deployment'}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              )}
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-[11px] font-black text-slate-400 hover:text-black uppercase tracking-widest transition-all flex items-center gap-2">
                   <ChevronLeft size={16} /> Back to information
                </button>
              )}
            </div>
          </div>

          {/* --- SUMMARY SIDEBAR --- */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl sticky top-32">
              <div className="flex items-center gap-3 mb-10">
                 <Box size={18} className="text-blue-600" />
                 <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Manifest</h3>
              </div>
              
              <div className="space-y-6 mb-10 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="h-16 w-16 bg-white rounded-lg p-2 flex items-center justify-center border border-gray-100 shrink-0">
                      <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-full max-h-full object-contain" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-xs font-black text-slate-900 uppercase truncate mb-1">{item.name}</h4>
                      <div className="flex items-center justify-between">
                         <p className="text-[10px] font-bold text-slate-400">Qty: {item.quantity}</p>
                         <p className="text-xs font-black text-slate-900">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-gray-200 pt-8">
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Logistics</span>
                  <span className="text-emerald-600 font-black">Free</span>
                </div>
                <div className="flex flex-col pt-8 border-t border-gray-200 mt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Final valuation</span>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">${finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
