import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  Lock,
  MapPin,
  Mail,
  Loader2,
  CheckCircle2,
  Package,
  Phone,
  Wallet,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, clearCart, cartTotal, cartCount } = useCart();
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
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
      }));
    }
 
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
         
          if (data && data.address) {
            const addr = data.address;
            setFormData(prev => ({
              ...prev,
              city: addr.city || addr.town || addr.village || addr.suburb || '',
              zipCode: addr.postcode || '',
              address: `${addr.road || ''} ${addr.neighbourhood || addr.suburb || ''}`.trim() || data.display_name.split(',')[0]
            }));
          }
        } catch (err) { }
      });
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
        source: 'printingland.shop',
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
    }
    else if (formData.paymentMethod === 'cod') await handleOrderSuccess();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];
        return img.startsWith('http') ? img : `/${img}`;
      }
    } catch (e) { }
    return "https://via.placeholder.com/100x100?text=Product";
  };
 
  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 font-['Poppins']">
        <div className="text-center max-w-md">
            <Package size={48} className="text-gray-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-8">Add items to your selection before proceeding to checkout.</p>
            <Link to="/shop" className="inline-flex h-14 items-center px-10 bg-black text-white font-bold text-[12px] uppercase tracking-widest hover:bg-gray-900 transition-all">
                Browse Shop
            </Link>
        </div>
      </div>
    );
  }
 
  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20 px-6 font-['Poppins'] text-[#111111]">
        <SEO title="Order Confirmed | Printing Land" />
        <div className="max-w-xl w-full text-center space-y-10 p-12 border border-gray-100 shadow-sm">
          <div className="h-20 w-20 bg-black text-white flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed</h1>
            <p className="text-gray-500 font-medium leading-relaxed">
                Thank you for your purchase. Your order ID is <span className="text-gray-900 font-bold">#{orderId}</span>.
                We have sent a confirmation email to <span className="text-gray-900 font-bold">{formData.email}</span>.
            </p>
          </div>
          <div className="pt-4 flex flex-col gap-4">
            <Link to="/orders" className="w-full h-14 bg-gray-900 text-white font-bold text-[13px] uppercase tracking-widest flex items-center justify-center hover:bg-black transition-all">
              Track My Order
            </Link>
            <Link to="/" className="w-full h-14 bg-white border border-gray-900 text-gray-900 font-bold text-[13px] uppercase tracking-widest flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-[#111111]">
      <SEO title="Secure Checkout | Printing Land" />
      
      {/* --- Page Header --- */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-20">
           <div className="flex items-center gap-2 mb-4">
              <div className={cn("h-1 w-12 transition-all duration-500", step >= 1 ? "bg-black" : "bg-gray-200")} />
              <div className={cn("h-1 w-12 transition-all duration-500", step >= 2 ? "bg-black" : "bg-gray-200")} />
           </div>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900  mb-6">
             Secure <span className="text-black">Checkout.</span>
           </h1>
           <p className="max-w-2xl text-gray-500 text-[14px] md:text-[16px] leading-relaxed font-medium">
             Complete your order in two simple steps. Your information is protected by industry-standard encryption.
           </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
           <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              {/* --- LEFT: FORM STEPS --- */}
              <div className="lg:col-span-7">
                 <AnimatePresence mode="wait">
                    {step === 1 ? (
                       <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                          <div className="space-y-8">
                             <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                                <Mail size={20} className="text-black" />
                                <h3 className="text-lg font-bold uppercase tracking-widest">Contact Information</h3>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" className="w-full h-14 bg-gray-50 border border-gray-200 px-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none" />
                             </div>
                          </div>

                          <div className="space-y-8">
                             <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                                <MapPin size={20} className="text-black" />
                                <h3 className="text-lg font-bold uppercase tracking-widest">Shipping Destination</h3>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                   <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">First Name</label>
                                   <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full h-14 bg-gray-50 border border-gray-200 px-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none" />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                                   <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full h-14 bg-gray-50 border border-gray-200 px-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none" />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Street Address</label>
                                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full h-14 bg-gray-50 border border-gray-200 px-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none" />
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                   <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">City / Region</label>
                                   <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full h-14 bg-gray-50 border border-gray-200 px-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none" />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Zip / Postal Code</label>
                                   <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full h-14 bg-gray-50 border border-gray-200 px-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none" />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full h-14 bg-gray-50 border border-gray-200 px-5 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none" />
                             </div>
                          </div>

                          <button type="submit" className="w-full h-14 bg-gray-900 text-white font-bold text-[13px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                             Continue to Payment <ArrowRight size={18} />
                          </button>
                       </motion.div>
                    ) : (
                       <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                          <div className="space-y-8">
                             <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                                <CreditCard size={20} className="text-black" />
                                <h3 className="text-lg font-bold uppercase tracking-widest">Payment Method</h3>
                             </div>
                             
                             <div className="grid grid-cols-1 gap-4">
                                {[
                                   { id: 'paypal', label: 'PayPal / Credit Card', icon: CreditCard, desc: 'Secure payment via PayPal or global cards.' },
                                   { id: 'cod', label: 'Cash on Delivery', icon: Wallet, desc: 'Pay when your package arrives.' }
                                ].map((method) => (
                                   <div 
                                     key={method.id} onClick={() => setFormData({...formData, paymentMethod: method.id})}
                                     className={cn(
                                       "p-6 border transition-all cursor-pointer flex items-center justify-between",
                                       formData.paymentMethod === method.id ? "border-black bg-gray-50" : "border-gray-100 bg-white hover:border-gray-200"
                                     )}
                                   >
                                      <div className="flex items-center gap-5">
                                         <div className={cn("w-5 h-5 border-2 flex items-center justify-center", formData.paymentMethod === method.id ? "border-black" : "border-gray-300")}>
                                            {formData.paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-black" />}
                                         </div>
                                         <div>
                                            <p className="text-sm font-bold uppercase ">{method.label}</p>
                                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">{method.desc}</p>
                                         </div>
                                      </div>
                                      <method.icon size={20} className={cn(formData.paymentMethod === method.id ? "text-black" : "text-gray-200")} />
                                   </div>
                                ))}
                             </div>
                          </div>

                          <div className="space-y-6 pt-4">
                             {formData.paymentMethod === 'paypal' ? (
                                <div className="relative z-10">
                                   <PayPalButtons 
                                     style={{ layout: "vertical", shape: "rect", label: "pay" }}
                                     createOrder={(data, actions) => {
                                        return actions.order.create({
                                           purchase_units: [{
                                              amount: { value: cartTotal.toString() }
                                           }]
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
                                <button type="submit" disabled={loading} className="w-full h-14 bg-gray-900 text-white font-bold text-[13px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                                   {loading ? "Processing..." : "Complete Order"}
                                   {!loading && <CheckCircle2 size={18} />}
                                </button>
                             )}
                             
                             <button type="button" onClick={() => setStep(1)} className="w-full text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors">
                                <ChevronLeft size={16} className="inline mr-2" /> Back to Shipping
                             </button>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              {/* --- RIGHT: ORDER SUMMARY --- */}
              <div className="lg:col-span-5">
                 <div className="bg-gray-50 p-8 md:p-10 border border-gray-100 sticky top-32">
                    <h3 className="text-xl font-bold mb-8 uppercase tracking-widest border-b border-gray-200 pb-4">Order Summary</h3>
                    
                    <div className="max-h-[300px] overflow-y-auto pr-4 custom-scrollbar mb-8 space-y-6">
                       {cart.map((item) => (
                          <div key={item.id} className="flex gap-4">
                             <div className="w-16 h-16 bg-white border border-gray-200 p-2 shrink-0 flex items-center justify-center">
                                <img src={getImagePath(item.images)} className="max-h-full max-w-full object-contain mix-blend-multiply" alt="" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <h4 className="text-[11px] font-bold uppercase  line-clamp-1">{item.name}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                             </div>
                             <p className="text-sm font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                       ))}
                    </div>

                    <div className="space-y-4 pt-8 border-t border-gray-200">
                       <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <span>Subtotal</span>
                          <span className="text-gray-900 font-bold">${(cartTotal || 0).toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <span>Shipping</span>
                          <span className="text-emerald-600">Free</span>
                       </div>
                       <div className="h-px bg-gray-200 w-full" />
                       <div className="flex justify-between items-end pt-2">
                          <span className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">Total</span>
                          <span className="text-3xl font-bold text-black leading-none">${(cartTotal || 0).toLocaleString()}</span>
                       </div>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-3 text-gray-300">
                       <Lock size={14} />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Secured Encryption</span>
                    </div>
                 </div>
              </div>
           </form>
        </div>
      </section>
    </div>
  );
}
