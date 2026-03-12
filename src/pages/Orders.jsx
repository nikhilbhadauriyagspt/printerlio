import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X, CheckCircle2, Clock, Box, MapPin, ArrowRight, Loader2, Truck, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'We have received your order.' },
    { key: 'processing', label: 'Preparing', icon: Package, desc: 'Your items are being packed.' },
    { key: 'shipped', label: 'On the Way', icon: Truck, desc: 'Your order has been shipped.' },
    { key: 'out_for_delivery', label: 'Near You', icon: MapPin, desc: 'The delivery person is close by.' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully reached your address.' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-200 bg-white pt-40 pb-20 font-sans px-6 flex flex-col items-center justify-center text-slate-900">
        <div className="max-w-md w-full text-center">
          <div className="h-20 w-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Package size={32} className="text-slate-200" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">Track your order</h1>
          <p className="text-slate-400 font-bold text-sm mb-10 max-w-sm mx-auto">Login to see your full history or enter your guest email below.</p>
          
          <form onSubmit={handleGuestSearch} className="space-y-4 bg-white p-8 rounded-2xl border border-gray-100 shadow-2xl shadow-black/5">
            <div className="space-y-2 text-left">
               <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Email address</label>
               <input 
                 type="email" required placeholder="john@example.com" value={guestEmail}
                 onChange={(e) => setGuestEmail(e.target.value)}
                 className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all"
               />
            </div>
            <button className="w-full h-14 bg-black text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-black/5">
              Track shipment now
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-50">
            <Link to="/login" className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">Sign in for full history</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist text-slate-900">
      <SEO title="Order History | MaxPrinter" />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col space-y-2 mb-16">
          <h1 className="text-4xl md:text-5xl font-black leading-tight uppercase">
            Order History
          </h1>
          <p className="text-slate-400 text-base font-bold tracking-wide">
            {orders.length} hardware deployments registered to your account.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Searching records...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 border border-gray-100 rounded-2xl">
            <Package size={40} className="text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900">No orders found</h3>
            <Link to="/shop" className="h-12 px-10 bg-black text-white inline-flex items-center gap-3 font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all mt-8 rounded-xl">
              Explore hardware <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                key={order.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-600/30 transition-all duration-500 shadow-2xl shadow-black/5"
              >
                {/* Order Meta Header */}
                <div className="p-6 lg:p-8 border-b border-gray-50 flex flex-wrap items-center justify-between gap-8 bg-gray-50/50">
                  <div className="flex items-center gap-10">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Identity</p>
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">#{order.order_code || order.id}</h3>
                    </div>
                    <div className="h-8 w-px bg-gray-200 hidden sm:block" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Timeline</p>
                      <p className="text-sm font-black text-slate-900">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className={cn(
                      "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 rounded-full border shadow-sm bg-white",
                      order.status === 'completed' || order.status === 'delivered' ? "text-emerald-600 border-emerald-100" :
                      order.status === 'pending' ? "text-amber-600 border-amber-100" :
                      "text-blue-600 border-blue-100"
                    )}>
                      <div className={cn("h-1.5 w-1.5 rounded-full", 
                        order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-500" :
                        order.status === 'pending' ? "bg-amber-500" : "bg-blue-500"
                      )} />
                      {order.status}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items & Shipping */}
                <div className="p-6 lg:p-10 flex flex-col lg:flex-row gap-12">
                  <div className="flex-1 space-y-6">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6 group/item">
                        <div className="h-20 w-20 bg-white border border-gray-100 rounded-xl flex items-center justify-center p-4 shrink-0 transition-all group-hover/item:border-blue-600/20">
                          <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-full max-h-full object-contain" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-black text-slate-900 uppercase truncate mb-1">{item.product_name}</h4>
                          <div className="flex items-center gap-3">
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                             <div className="h-1 w-1 rounded-full bg-gray-200" />
                             <p className="text-[11px] font-black text-slate-900 tracking-widest">${parseFloat(item.price).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[350px] space-y-6 lg:border-l lg:border-gray-100 lg:pl-12">
                    <div className="space-y-3">
                       <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-blue-600" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
                       </div>
                       <p className="text-sm font-bold text-slate-900 leading-relaxed uppercase">{order.address}<br/>{order.city}, {order.zipCode}</p>
                    </div>
                    
                    <button onClick={() => setSelectedOrder(order)} className="w-full h-12 bg-black text-white rounded-xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-black/5 active:scale-95 group">
                      Track status
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-[1000]" />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-white z-[1001] shadow-2xl rounded-2xl p-10 font-urbanist border border-gray-100">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
                  <div>
                     <h2 className="text-2xl font-black text-slate-900 uppercase">Live Tracking</h2>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time status synchronization</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-black hover:bg-gray-100 transition-all active:scale-90 border border-gray-100"><X size={20} /></button>
                </div>
                <div className="space-y-10 relative px-2">
                  <div className="absolute left-[31px] top-4 bottom-4 w-[2px] bg-gray-100" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-8">
                        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center z-10 transition-all duration-700 border-2", isCompleted ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20' : 'bg-white text-slate-200 border-gray-100')}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <h4 className={cn("text-[13px] font-black uppercase tracking-widest", isCompleted ? 'text-slate-900' : 'text-slate-300')}>{step.label}</h4>
                          <p className={cn("text-[11px] font-bold mt-1 leading-relaxed", isCompleted ? 'text-slate-500' : 'text-slate-300')}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
