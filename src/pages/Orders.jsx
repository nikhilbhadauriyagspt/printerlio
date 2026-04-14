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
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    if (s === 'delivered' || s === 'completed') return <CheckCircle2 size={16} className="text-black" />;
    if (s === 'processing' || s === 'pending') return <Clock size={16} className="text-black" />;
    if (s === 'shipped') return <Truck size={16} className="text-black" />;
    return <Package size={16} className="text-black" />;
  };

  return (
    <div className="bg-white min-h-screen font-['Poppins'] text-black">
      <SEO
        title="Track Your Orders | Printing State"
        description="Monitor your printer orders and shipment status."
      />

      {/* HEADER */}
      <section className="pt-32 pb-16 md:pb-20 border-b border-black/10 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-black mb-3">
              Order Tracking
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
              Order History
            </h1>
            <p className="mt-4 text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
              Keep track of your orders and review their status, details, and delivery information.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-5xl mx-auto">
            {/* GUEST SEARCH */}
            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 md:mb-14 rounded-[30px] border border-black/10 bg-white p-6 md:p-8"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="max-w-md">
                    <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
                      Track as Guest
                    </h3>
                    <p className="text-sm md:text-base text-black/60 leading-relaxed">
                      Enter your email address to view your order status and history.
                    </p>
                  </div>

                  <form
                    onSubmit={handleTrackRequest}
                    className="flex flex-col sm:flex-row gap-3 w-full max-w-xl"
                  >
                    <div className="relative flex-1">
                      <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
                        size={18}
                      />
                      <input
                        required
                        type="email"
                        placeholder="name@example.com"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        className="w-full h-12 rounded-[16px] border border-black/10 bg-white pl-11 pr-4 text-sm text-black outline-none"
                      />
                    </div>

                    <button
                      disabled={searching}
                      className="h-12 px-8 rounded-[16px] bg-black text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {searching ? <Clock className="animate-spin" size={16} /> : 'Track Now'}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* ORDERS */}
            <div className="space-y-6 min-h-[40vh]">
              {loading ? (
                <div className="space-y-5">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-52 w-full rounded-[28px] border border-black/10 bg-black/[0.02] animate-pulse"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="rounded-[30px] border border-black/10 bg-white p-8 md:p-12 text-center">
                  <div className="h-20 w-20 rounded-[24px] border border-black/10 bg-white flex items-center justify-center mx-auto mb-6">
                    <Package size={38} className="text-black/20" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">No orders found</h3>
                  <p className="text-black/60 text-sm md:text-base mb-8">
                    {error}
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold"
                  >
                    Shop Now <ShoppingBag size={16} />
                  </Link>
                </div>
              ) : orders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-[30px] border border-black/10 bg-white p-8 md:p-12 text-center"
                >
                  <div className="h-20 w-20 rounded-[24px] border border-black/10 bg-white flex items-center justify-center mx-auto mb-6">
                    <Package size={38} className="text-black/20" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">No orders found</h3>
                  <p className="text-black/60 text-sm md:text-base mb-8">
                    You have not placed any orders yet.
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold"
                  >
                    Shop Now <ShoppingBag size={16} />
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-black/10">
                        <div className="flex items-start gap-4">
                          <div className="h-16 w-16 rounded-[20px] border border-black/10 bg-white flex items-center justify-center shrink-0">
                            <Package size={28} className="text-black" />
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/60">
                                {order.order_code || `#${order.id}`}
                              </span>
                              <span className="text-black/30">•</span>
                              <span className="text-[12px] text-black/50">
                                {new Date(order.created_at).toLocaleDateString()}
                              </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-black">
                              Order Information
                            </h3>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[14px] border border-black/10 bg-white text-sm font-semibold text-black w-fit">
                            {getStatusIcon(order.status)}
                            {getStatusLabel(order.status)}
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50 mb-1">
                              Total Amount
                            </p>
                            <p className="text-2xl md:text-3xl font-bold text-black">
                              ${parseFloat(order.total_amount || order.total_price || 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {order.items?.length > 0 && (
                        <div className="flex flex-wrap gap-3 py-6 border-b border-black/10">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="px-4 py-2 rounded-[14px] border border-black/10 bg-white text-sm font-medium text-black"
                            >
                              {item.product_name}
                              <span className="text-black/50 ml-2">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-[14px] border border-black/10 bg-white flex items-center justify-center shrink-0">
                            <MapPin size={16} className="text-black" />
                          </div>
                          <p className="text-sm md:text-base text-black/60 leading-relaxed max-w-xl">
                            {order.shipping_address}
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="w-full md:w-auto px-8 py-3 rounded-[16px] border border-black/10 bg-white text-black text-sm font-semibold"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MODAL */}
            <AnimatePresence>
              {selectedOrder && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedOrder(null)}
                    className="fixed inset-0 bg-black/40 z-[200]"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl rounded-[30px] border border-black/10 bg-white z-[210] flex flex-col overflow-hidden"
                  >
                    <div className="p-6 md:p-8 border-b border-black/10 flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-black">Order Details</h3>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="h-11 w-11 rounded-[14px] border border-black/10 bg-white flex items-center justify-center text-black"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                      <div className="rounded-[24px] border border-black/10 bg-white p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50 mb-1">
                            Status
                          </p>
                          <div className="inline-flex items-center gap-2 text-lg font-bold text-black capitalize">
                            {getStatusIcon(selectedOrder.status)}
                            {selectedOrder.status}
                          </div>
                        </div>

                        <div className="md:text-right">
                          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50 mb-1">
                            Code
                          </p>
                          <p className="text-lg font-bold text-black">
                            {selectedOrder.order_code || `#${selectedOrder.id}`}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-black/50 mb-4">
                          Order Items
                        </h4>

                        <div className="rounded-[24px] border border-black/10 bg-white overflow-hidden">
                          {selectedOrder.items?.map((item, i) => (
                            <div
                              key={i}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 md:p-5 border-b border-black/10 last:border-b-0"
                            >
                              <span className="text-sm md:text-base font-semibold text-black">
                                {item.product_name}
                              </span>
                              <span className="text-sm font-medium text-black/60">
                                ${parseFloat(item.price).toLocaleString()} x {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="rounded-[24px] border border-black/10 bg-white p-5">
                          <h4 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-black/50 mb-3">
                            Shipping To
                          </h4>
                          <p className="text-sm md:text-base text-black/60 leading-relaxed">
                            {selectedOrder.shipping_address}
                          </p>
                        </div>

                        <div className="rounded-[24px] border border-black/10 bg-white p-5">
                          <h4 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-black/50 mb-3">
                            Order Total
                          </h4>
                          <p className="text-3xl font-bold text-black">
                            ${parseFloat(selectedOrder.total_amount || selectedOrder.total_price || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 border-t border-black/10 bg-white">
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="w-full h-12 rounded-[16px] bg-black text-white text-sm font-semibold"
                      >
                        Close Details
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <div className="mt-14 md:mt-16 flex justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] border border-black/10 bg-white text-black text-sm font-semibold"
              >
                <ShoppingBag size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}