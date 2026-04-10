import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { Package, Truck, CheckCircle2, Clock, ChevronRight, ArrowRight, Search, MapPin, Calendar, ShoppingBag, X, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searching, setSearching] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

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
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch order history.");
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

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered' || s === 'completed') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (s === 'processing' || s === 'pending') return 'bg-blue-50 text-blue-600 border-blue-100';
    if (s === 'shipped') return 'bg-amber-50 text-amber-600 border-amber-100';
    return 'bg-slate-50 text-slate-600 border-slate-100';
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered' || s === 'completed') return <CheckCircle2 size={12} />;
    if (s === 'processing' || s === 'pending') return <Clock size={12} />;
    if (s === 'shipped') return <Truck size={12} />;
    return <Package size={12} />;
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Track Your Orders | Printer Loop" description="Monitor your professional printer orders and shipment status." />

      {/* --- PROFESSIONAL CENTERED HEADER --- */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-20 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
          <div className="flex flex-col items-center text-center">
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex items-center gap-3 mb-4"
             >
                <div className="h-px w-8 bg-blue-600" />
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Logistics Tracking</span>
                <div className="h-px w-8 bg-blue-600" />
             </motion.div>
             
             <div className="flex flex-col items-center gap-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-7xl font-black text-slate-900  leading-none"
                >
                  Order <span className="text-blue-600">History</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-slate-500 text-sm md:text-lg font-medium max-w-2xl mt-2 leading-relaxed"
                >
                  Track your professional machine shipments and monitor the real-time status of your industrial-grade procurement.
                </motion.p>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-1.5 bg-blue-600 rounded-full mt-4"
                />
             </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 md:px-10 lg:px-16 py-12 md:py-24 bg-slate-50/30 max-w-[1920px] mx-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* --- GUEST TRACKING SEARCH --- */}
          {!user && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-20 p-8 md:p-16 bg-white rounded-[3rem] border border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                <div className="max-w-md text-center lg:text-left">
                   <h3 className="text-2xl font-black text-slate-900 uppercase  mb-3">Guest Tracking</h3>
                   <p className="text-slate-500 font-medium text-lg leading-relaxed">Enter the email used during procurement to view your current status.</p>
                </div>
                <form onSubmit={handleTrackRequest} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      required type="email" placeholder="order@company.com"
                      value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full h-16 bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 text-[15px] font-bold outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                  <button
                    disabled={searching}
                    className="h-16 px-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50 shrink-0"
                  >
                    {searching ? <Clock className="animate-spin" size={20} /> : "Track Now"}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* --- ORDERS LIST --- */}
          <div className="space-y-10 min-h-[40vh]">
            {loading ? (
              <div className="space-y-8">
                {[1, 2].map(i => (
                  <div key={i} className="h-64 w-full bg-white rounded-[3rem] animate-pulse border border-slate-100" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm"
              >
                <div className="h-24 w-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                   <Package size={40} className="text-slate-200" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase  mb-3">No Active Records</h3>
                <p className="text-slate-500 font-medium mb-10 text-lg">You haven't placed any professional unit orders yet.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl active:scale-95 group">
                  Explore Catalog <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {orders.map((order, idx) => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white border border-slate-100 rounded-[3rem] overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:border-blue-100 transition-all duration-700"
                  >
                    <div className="p-10 md:p-14">
                      {/* Top Meta */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 pb-10 border-b border-slate-100/50">
                        <div className="flex items-center gap-8">
                           <div className="h-20 w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-white group-hover:shadow-inner transition-colors">
                              <Package size={36} />
                           </div>
                           <div className="min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                 <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg tracking-widest uppercase">{order.order_code || `#${order.id}`}</span>
                                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Procurement Node</p>
                              </div>
                              <h4 className="text-2xl font-black text-slate-900 uppercase  leading-none">Industrial Package</h4>
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-8 md:text-right">
                           <div className={cn("px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest border flex items-center gap-3 shadow-sm", getStatusColor(order.status))}>
                              {getStatusIcon(order.status)}
                              {order.status}
                           </div>
                           <div className="flex flex-col md:items-end">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Valuation</span>
                              <span className="text-3xl font-black text-slate-900 ">${parseFloat(order.total_amount || order.total_price || 0).toLocaleString()}</span>
                           </div>
                        </div>
                      </div>

                      {/* Items Row */}
                      <div className="flex flex-wrap gap-4 mb-10">
                         {order.items?.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors duration-500">
                               <div className="h-2 w-2 rounded-full bg-blue-600" />
                               <div className="flex-1 min-w-0">
                                  <h5 className="text-[13px] font-black text-slate-800 uppercase truncate leading-none mb-1">{item.product_name}</h5>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity} units</span>
                               </div>
                            </div>
                         ))}
                      </div>

                      {/* Bottom Info Bar */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-slate-100/50">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                               <Calendar size={20} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Logged On</p>
                               <p className="text-sm font-black text-slate-700 uppercase ">{new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                               <MapPin size={20} />
                            </div>
                            <div className="min-w-0">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Terminal</p>
                               <p className="text-sm font-black text-slate-700 truncate uppercase ">{order.shipping_address}</p>
                            </div>
                         </div>
                         <div className="flex items-center sm:justify-end">
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="w-full sm:w-auto h-14 px-10 bg-white border-2 border-slate-900 text-slate-900 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-900 hover:text-white shadow-sm active:scale-95 group/btn"
                            >
                               Track Details
                            </button>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <AnimatePresence>
            {selectedOrder && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setSelectedOrder(null)}
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200]"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 40 }}
                  className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white rounded-[3.5rem] shadow-2xl z-[210] overflow-hidden flex flex-col"
                >
                  <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                         <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                         <h3 className="text-2xl font-black text-slate-900 uppercase ">Live Tracker</h3>
                      </div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[4px] ml-5">{selectedOrder.order_code || `#${selectedOrder.id}`}</p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="h-14 w-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm active:rotate-90">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-10 md:p-14 custom-scrollbar space-y-14">
                    {/* Status Steps */}
                    <div className="relative max-w-lg mx-auto">
                       <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-slate-100 rounded-full" />
                       <div className="space-y-12 relative">
                          {[
                            { label: 'Procurement Logged', desc: 'System registered order at source', icon: Package, status: 'completed' },
                            { label: 'Quality Verification', desc: 'Precision testing and configuration', icon: Zap, status: selectedOrder.status?.toLowerCase() === 'pending' ? 'current' : 'completed' },
                            { label: 'Network Transit', desc: 'En route to destination terminal', icon: Truck, status: ['shipped', 'delivered'].includes(selectedOrder.status?.toLowerCase()) ? 'completed' : selectedOrder.status?.toLowerCase() === 'processing' ? 'current' : 'pending' },
                            { label: 'Terminal Arrival', desc: 'Package secured at final node', icon: CheckCircle2, status: selectedOrder.status?.toLowerCase() === 'delivered' ? 'completed' : selectedOrder.status?.toLowerCase() === 'shipped' ? 'current' : 'pending' }
                          ].map((step, i) => (
                            <div key={i} className="flex gap-10">
                               <div className={cn(
                                 "h-12 w-12 rounded-[1.25rem] flex items-center justify-center shrink-0 z-10 border shadow-lg transition-all duration-700",
                                 step.status === 'completed' ? "bg-emerald-500 text-white border-emerald-500" :
                                 step.status === 'current' ? "bg-blue-600 text-white border-blue-600 ring-4 ring-blue-50 animate-pulse" :
                                 "bg-white text-slate-200 border-slate-100"
                               )}>
                                  <step.icon size={22} />
                               </div>
                               <div className="py-1">
                                  <h5 className={cn("text-[15px] font-black uppercase ", step.status === 'pending' ? "text-slate-300" : "text-slate-900")}>{step.label}</h5>
                                  <p className="text-[13px] font-bold text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col gap-4">
                          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                             <MapPin size={20} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Destination Address</p>
                             <p className="text-sm font-black text-slate-900 leading-relaxed uppercase ">{selectedOrder.shipping_address}</p>
                          </div>
                       </div>
                       <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col gap-4">
                          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm">
                             <Package size={20} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Package Weight</p>
                             <p className="text-sm font-black text-slate-900 leading-relaxed uppercase ">Industrial Standard (Heavy)</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="p-10 border-t border-slate-50 bg-white flex flex-col sm:flex-row items-center justify-between gap-8">
                     <div className="text-center sm:text-left">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-1">Package Value</p>
                        <p className="text-4xl font-black text-slate-900 ">${parseFloat(selectedOrder.total_amount || selectedOrder.total_price || 0).toLocaleString()}</p>
                     </div>
                     <button onClick={() => setSelectedOrder(null)} className="w-full sm:w-auto h-16 px-12 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl active:scale-95">
                        Minimize Log
                     </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="mt-24 flex justify-center">
            <Link to="/shop" className="group flex items-center gap-5 px-12 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95 shadow-sm hover:shadow-2xl">
              <ShoppingBag size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
