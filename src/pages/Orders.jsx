import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import {
  Package,
  ArrowRight,
  X,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  HelpCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/orders?user_id=${user?.id}`);
      const data = await res.json();
      if (data.status === 'success') {
        setOrders(data.data);
      } else {
        setError(data.message || 'No orders found.');
      }
    } catch {
      setError('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchOrders();
    else setLoading(false);
  }, []);

  const getStatus = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 'Delivered';
    if (s === 'processing') return 'Processing';
    if (s === 'shipped') return 'Shipped';
    return 'Pending';
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (s === 'processing') return 'bg-amber-50 text-amber-600 border-amber-100';
    if (s === 'shipped') return 'bg-blue-50 text-[#001e3c] border-blue-100';
    return 'bg-gray-50 text-gray-600 border-gray-100';
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return <CheckCircle2 size={14} />;
    if (s === 'shipped') return <Truck size={14} />;
    return <Clock size={14} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20 font-['Poppins'] text-[#001e3c]">
      <SEO title="Order History | Printer Lio" />

      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#001e3c]">Command Center</span>
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
          </div>
          
          <h1 className="text-[34px] md:text-[46px] font-semibold text-[#001e3c] leading-tight mb-4 uppercase tracking-tight">
            Order <span className="text-[#fbb124]">History</span>
          </h1>
          <p className="text-gray-500 text-[15px] max-w-[500px]">
            Review your past purchases and track the status of your current deliveries.
          </p>
        </div>

        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,30,60,0.05)] overflow-hidden">
          {/* Header Inside Container */}
          <div className="px-8 py-8 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#001e3c] text-[#fbb124] flex items-center justify-center shadow-lg">
                <Package size={24} />
              </div>
              <div>
                <h2 className="text-[20px] font-semibold text-[#001e3c] leading-none mb-1">Purchases</h2>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{orders.length} Orders Found</p>
              </div>
            </div>
            {!loading && orders.length > 0 && (
              <Link to="/shop" className="text-[12px] font-bold text-[#001e3c] uppercase tracking-widest flex items-center gap-2 hover:text-[#fbb124] transition-all">
                Shop More <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {/* Orders List */}
          <div className="p-6 md:p-10">
            {loading ? (
              <div className="py-20 text-center animate-pulse">
                <div className="h-4 w-32 bg-gray-100 mx-auto rounded mb-4" />
                <div className="h-10 w-64 bg-gray-50 mx-auto rounded-xl" />
              </div>
            ) : orders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-32 text-center"
              >
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <ShoppingBag size={40} className="text-gray-200" />
                </div>
                <h2 className="text-[24px] font-semibold text-[#001e3c] mb-3">No orders yet</h2>
                <p className="text-gray-400 text-[15px] mb-10">You haven't placed any orders with us yet.</p>
                <Link to="/shop" className="inline-flex items-center gap-3 h-14 px-10 bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-widest rounded-2xl hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-xl">
                  Start Shopping <ArrowRight size={18} />
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex flex-col items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#fbb124]/10 transition-colors">
                        <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Order</span>
                        <span className="text-[15px] font-bold text-[#001e3c] leading-none">#{order.id}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold text-[#001e3c] text-[16px]">
                          {new Date(order.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </h3>
                        <div className={cn(
                          'inline-flex items-center gap-2 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-full border',
                          getStatusColor(order.status)
                        )}>
                          {getStatusIcon(order.status)}
                          {getStatus(order.status)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-10 w-full md:w-auto border-t border-gray-50 md:border-t-0 pt-6 md:pt-0">
                      <div className="text-right md:text-left">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Total Amount</p>
                        <p className="text-[22px] font-bold text-[#001e3c]">
                          ${parseFloat(order.total_amount).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="h-12 px-6 bg-[#001e3c] text-white rounded-xl text-[12px] font-bold uppercase tracking-widest hover:bg-[#fbb124] hover:text-[#001e3c] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md"
                      >
                        Details <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          {/* Help Footer */}
          <div className="px-10 py-8 bg-slate-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-2 text-gray-400">
               <HelpCircle size={18} />
               <span className="text-[14px] font-medium">Need help with an order?</span>
             </div>
             <Link to="/contact" className="text-[13px] font-bold text-[#001e3c] hover:text-[#fbb124] transition-colors uppercase tracking-widest">
               Contact Support
             </Link>
          </div>
        </div>
      </div>

      {/* Modern Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#001e3c]/60 backdrop-blur-sm z-[500]"
              onClick={() => setSelectedOrder(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[95%] max-w-xl rounded-[3rem] shadow-2xl z-[510] overflow-hidden"
            >
              <div className="p-8 md:p-10 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-[24px] font-semibold text-[#001e3c]">Order #{selectedOrder.id}</h3>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-1">Transaction Summary</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#001e3c] transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 md:p-10 space-y-8">
                <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-gray-100">
                  <span className="text-[13px] font-bold text-[#001e3c]/50 uppercase tracking-widest">Status</span>
                  <span className={cn(
                    'px-5 py-2 text-[12px] font-bold uppercase tracking-widest rounded-full border',
                    getStatusColor(selectedOrder.status)
                  )}>
                    {getStatus(selectedOrder.status)}
                  </span>
                </div>

                <div>
                  <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/40 mb-4 pl-2">Purchased Items</h4>
                  <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {selectedOrder.items?.map((i, idx) => (
                      <div key={idx} className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:border-[#fbb124]/30 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-semibold text-[#001e3c] truncate">{i.product_name}</p>
                          <p className="text-[13px] text-gray-500 mt-1">Quantity: {i.quantity}</p>
                        </div>
                        <div className="pl-4 text-right">
                          <p className="text-[16px] font-bold text-[#001e3c]">${(parseFloat(i.price) * i.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[18px] font-semibold text-[#001e3c]">Grand Total</span>
                  <span className="text-[28px] font-bold text-[#fbb124]">${parseFloat(selectedOrder.total_amount).toLocaleString()}</span>
                </div>
              </div>

              <div className="p-8 md:p-10 pt-0">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full h-14 bg-[#001e3c] text-white rounded-2xl font-bold text-[13px] uppercase tracking-widest hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-lg active:scale-95"
                >
                  Close Summary
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
