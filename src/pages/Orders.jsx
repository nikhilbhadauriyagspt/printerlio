import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  MapPin,
  ShoppingBag,
  X,
  ArrowRight,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searching, setSearching] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchOrders = async (email = null) => {
    setLoading(true);
    setError(null);

    try {
      const url = email
        ? `${API_BASE_URL}/orders?email=${email}`
        : `${API_BASE_URL}/orders?user_id=${user?.id}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'success') {
        setOrders(data.data);
      } else {
        setError(data.message || 'No orders found.');
      }
    } catch (err) {
      setError('Failed to fetch order history.');
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchOrders();
    else setLoading(false);
  }, []);

  const handleTrackRequest = (e) => {
    e.preventDefault();
    if (!searchEmail.trim()) return;
    setSearching(true);
    fetchOrders(searchEmail.trim());
  };

  const getStatusLabel = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered' || s === 'completed') return 'Delivered';
    if (s === 'processing' || s === 'pending') return 'Processing';
    if (s === 'shipped') return 'Shipped';
    return status || 'Unknown';
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered' || s === 'completed') return <CheckCircle2 size={16} />;
    if (s === 'processing' || s === 'pending') return <Clock size={16} />;
    if (s === 'shipped') return <Truck size={16} />;
    return <Package size={16} />;
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered' || s === 'completed') return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (s === 'processing' || s === 'pending') return 'text-amber-600 bg-amber-50 border-amber-100';
    if (s === 'shipped') return 'text-black bg-blue-50 border-blue-100';
    return 'text-gray-600 bg-gray-50 border-gray-100';
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-[#111111]">
      <SEO title="Order History | Printing Land" />

      {/* --- Page Header --- */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-20">
           <span className="text-[11px] font-bold text-black uppercase tracking-[0.3em] mb-4 block">
             Account Dashboard
           </span>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900  mb-6">
             Your <span className="text-black">Orders.</span>
           </h1>
           <p className="max-w-2xl text-gray-500 text-[14px] md:text-[16px] leading-relaxed font-medium">
             Track your shipments, review order details, and manage your purchase history in one professional space.
           </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          
          {!user && (
            <div className="max-w-xl mx-auto mb-16 p-8 border border-gray-100 bg-white">
               <h3 className="text-xl font-bold mb-6">Track as Guest</h3>
               <form onSubmit={handleTrackRequest} className="flex flex-col gap-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black" size={18} />
                    <input
                      required
                      type="email"
                      placeholder="Enter your order email"
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full h-14 bg-gray-50 border border-gray-200 pl-12 pr-4 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none"
                    />
                  </div>
                  <button
                    disabled={searching}
                    className="h-14 bg-gray-900 text-white font-bold text-[13px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3"
                  >
                    {searching ? "Searching..." : "Track Order"}
                  </button>
               </form>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-40 bg-gray-50 animate-pulse border border-gray-100" />
                ))}
              </div>
            ) : error || orders.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-200">
                <Package size={48} className="mx-auto text-gray-200 mb-6" />
                <h2 className="text-xl font-bold mb-3">{error || "No orders found"}</h2>
                <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
                <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold text-[12px] uppercase tracking-widest hover:bg-blue-700 transition-all">
                  Start Shopping <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div 
                    key={order.id}
                    className="bg-white border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                          <Package size={24} className="text-gray-400 group-hover:text-black transition-colors" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                            Order {order.order_code || `#${order.id}`}
                          </p>
                          <h4 className="text-lg font-bold mb-2">
                            {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </h4>
                          <div className={cn("inline-flex items-center gap-2 px-3 py-1 border text-[11px] font-bold uppercase tracking-widest", getStatusColor(order.status))}>
                             {getStatusIcon(order.status)}
                             {getStatusLabel(order.status)}
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-10 border-t md:border-t-0 pt-6 md:pt-0">
                       <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Amount</p>
                          <p className="text-xl font-bold">${parseFloat(order.total_amount || 0).toLocaleString()}</p>
                       </div>
                       <button 
                         onClick={() => setSelectedOrder(order)}
                         className="h-12 px-6 border-2 border-gray-900 text-gray-900 font-bold text-[12px] uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all flex items-center gap-2"
                       >
                         Details <ChevronRight size={16} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- Order Detail Modal --- */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white z-[210] shadow-2xl"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-2xl font-bold">Order Details</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-900">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto max-h-[70vh] space-y-8">
                <div className="grid grid-cols-2 gap-8">
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Order ID</p>
                      <p className="font-bold">{selectedOrder.order_code || `#${selectedOrder.id}`}</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Status</p>
                      <div className={cn("inline-flex items-center gap-2 px-3 py-1 border text-[11px] font-bold uppercase tracking-widest", getStatusColor(selectedOrder.status))}>
                        {getStatusLabel(selectedOrder.status)}
                      </div>
                   </div>
                </div>

                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Items Ordered</p>
                   <div className="space-y-4">
                      {selectedOrder.items?.map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                           <span className="font-bold text-gray-900">{item.product_name}</span>
                           <span className="text-gray-500 font-medium">Qty: {item.quantity} × ${parseFloat(item.price).toLocaleString()}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Shipping Address</p>
                   <p className="text-sm font-medium text-gray-600 leading-relaxed">{selectedOrder.shipping_address}</p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                   <span className="text-lg font-bold">Total Amount</span>
                   <span className="text-2xl font-bold text-black">${parseFloat(selectedOrder.total_amount || 0).toLocaleString()}</span>
                </div>
              </div>
              <div className="p-8 border-t border-gray-100">
                <button onClick={() => setSelectedOrder(null)} className="w-full h-14 bg-gray-900 text-white font-bold text-[13px] uppercase tracking-widest">
                  Close Window
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
