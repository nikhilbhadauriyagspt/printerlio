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
    if (s === 'delivered' || s === 'completed') {
      return <CheckCircle2 size={16} className="text-emerald-600" />;
    }
    if (s === 'processing' || s === 'pending') {
      return <Clock size={16} className="text-amber-600" />;
    }
    if (s === 'shipped') {
      return <Truck size={16} className="text-blue-600" />;
    }
    return <Package size={16} className="text-black/70" />;
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered' || s === 'completed') {
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    }
    if (s === 'processing' || s === 'pending') {
      return 'border-amber-200 bg-amber-50 text-amber-700';
    }
    if (s === 'shipped') {
      return 'border-blue-200 bg-blue-50 text-blue-700';
    }
    return 'border-black/10 bg-white text-black';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Poppins'] text-black">
      <SEO
        title="Track Your Orders | Printistan"
        description="Monitor your printer orders and shipment status."
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 bg-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
        </div>

        <div className="relative max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-4xl mx-auto text-center">
            <p className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-blue-700">
              Order Tracking
            </p>

            <h1 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ">
              <span className="text-black">Order</span>{' '}
              <span className="text-blue-600">History</span>
            </h1>

            <p className="mt-5 text-sm md:text-base lg:text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
              Keep track of your orders and review their status, details, and
              delivery information.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-[1850px] mx-auto px-4 md:px-8 lg:px-14">
          <div className="max-w-6xl mx-auto">
            {/* GUEST SEARCH */}
            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 md:mb-12 rounded-[32px] border border-black/10 bg-white p-6 md:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] border border-blue-100 bg-blue-50 mb-4">
                      <Mail size={20} className="text-blue-600" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                      <span className="text-black">Track as</span>{' '}
                      <span className="text-blue-600">Guest</span>
                    </h3>

                    <p className="mt-3 text-sm md:text-base text-black/60 leading-relaxed max-w-md">
                      Enter your email address to view your order history and
                      latest order status.
                    </p>
                  </div>

                  <div className="lg:col-span-7">
                    <form
                      onSubmit={handleTrackRequest}
                      className="flex flex-col md:flex-row gap-3"
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
                          className="w-full h-13 rounded-[18px] border border-black/10 bg-[#fbfcff] pl-11 pr-4 text-sm text-black outline-none transition-all duration-300 hover:border-blue-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)]"
                        />
                      </div>

                      <button
                        disabled={searching}
                        className="h-13 px-8 rounded-[18px] bg-black text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.18)] disabled:hover:translate-y-0"
                      >
                        {searching ? (
                          <Clock className="animate-spin" size={16} />
                        ) : (
                          <>
                            Track Now <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CONTENT */}
            <div className="min-h-[40vh]">
              {loading ? (
                <div className="space-y-5">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-56 w-full rounded-[30px] border border-black/10 bg-black/[0.03] animate-pulse"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="rounded-[32px] border border-black/10 bg-white p-8 md:p-12 text-center shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                  <div className="h-20 w-20 rounded-[24px] border border-black/10 bg-white flex items-center justify-center mx-auto mb-6">
                    <Package size={38} className="text-black/20" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    <span className="text-black">No Orders</span>{' '}
                    <span className="text-blue-600">Found</span>
                  </h3>

                  <p className="text-black/60 text-sm md:text-base mb-8">
                    {error}
                  </p>

                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.18)]"
                  >
                    Shop Now <ShoppingBag size={16} />
                  </Link>
                </div>
              ) : orders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-[32px] border border-black/10 bg-white p-8 md:p-12 text-center shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
                >
                  <div className="h-20 w-20 rounded-[24px] border border-black/10 bg-white flex items-center justify-center mx-auto mb-6">
                    <Package size={38} className="text-black/20" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    <span className="text-black">No Orders</span>{' '}
                    <span className="text-blue-600">Found</span>
                  </h3>

                  <p className="text-black/60 text-sm md:text-base mb-8">
                    You have not placed any orders yet.
                  </p>

                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.18)]"
                  >
                    Shop Now <ShoppingBag size={16} />
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-[32px] border border-black/10 bg-white p-6 md:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
                    >
                      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                        {/* LEFT */}
                        <div className="xl:col-span-8">
                          <div className="flex items-start gap-4">
                            <div className="h-16 w-16 rounded-[20px] border border-blue-100 bg-blue-50 flex items-center justify-center shrink-0">
                              <Package size={28} className="text-blue-600" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/60">
                                  {order.order_code || `#${order.id}`}
                                </span>
                                <span className="text-black/25">•</span>
                                <span className="text-[12px] text-black/50">
                                  {new Date(order.created_at).toLocaleDateString()}
                                </span>
                              </div>

                              <h3 className="text-xl md:text-2xl font-bold text-black">
                                Order Information
                              </h3>

                              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold w-fit ${''}"></div>

                              <div
                                className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold w-fit ${getStatusBadge(
                                  order.status
                                )}`}
                              >
                                {getStatusIcon(order.status)}
                                {getStatusLabel(order.status)}
                              </div>
                            </div>
                          </div>

                          {order.items?.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-black/10">
                              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50 mb-3">
                                Order Items
                              </p>

                              <div className="flex flex-wrap gap-3">
                                {order.items.map((item, i) => (
                                  <div
                                    key={i}
                                    className="px-4 py-2 rounded-[14px] border border-black/10 bg-[#fbfcff] text-sm font-medium text-black transition-all duration-300 hover:border-blue-200 hover:bg-white"
                                  >
                                    {item.product_name}
                                    <span className="text-black/50 ml-2">
                                      x{item.quantity}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* RIGHT */}
                        <div className="xl:col-span-4">
                          <div className="h-full rounded-[24px] border border-black/10 bg-[#fbfcff] p-5 md:p-6">
                            <div>
                              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50 mb-1">
                                Total Amount
                              </p>
                              <p className="text-3xl md:text-4xl font-bold text-black">
                                $
                                {parseFloat(
                                  order.total_amount || order.total_price || 0
                                ).toLocaleString()}
                              </p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-black/10">
                              <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-[14px] border border-black/10 bg-white flex items-center justify-center shrink-0">
                                  <MapPin size={16} className="text-blue-600" />
                                </div>
                                <p className="text-sm text-black/60 leading-relaxed">
                                  {order.shipping_address}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="mt-6 w-full px-8 py-3 rounded-[16px] bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.18)]"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
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
                    className="fixed inset-0 bg-black/45 z-[200]"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 10 }}
                    className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl rounded-[32px] border border-black/10 bg-white z-[210] flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                  >
                    <div className="p-6 md:p-8 border-b border-black/10 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-700 mb-2">
                          Order Overview
                        </p>
                        <h3 className="text-2xl md:text-3xl font-bold">
                          <span className="text-black">Order</span>{' '}
                          <span className="text-blue-600">Details</span>
                        </h3>
                      </div>

                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="h-11 w-11 rounded-[14px] border border-black/10 bg-white flex items-center justify-center text-black transition-all duration-300 hover:border-blue-200 hover:text-blue-600"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="rounded-[24px] border border-black/10 bg-[#fbfcff] p-5 md:p-6">
                          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50 mb-2">
                            Status
                          </p>
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${getStatusBadge(
                              selectedOrder.status
                            )}`}
                          >
                            {getStatusIcon(selectedOrder.status)}
                            {getStatusLabel(selectedOrder.status)}
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-black/10 bg-[#fbfcff] p-5 md:p-6">
                          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50 mb-2">
                            Code
                          </p>
                          <p className="text-lg md:text-xl font-bold text-black">
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
                                ${parseFloat(item.price).toLocaleString()} x{' '}
                                {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="rounded-[24px] border border-black/10 bg-[#fbfcff] p-5">
                          <h4 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-black/50 mb-3">
                            Shipping To
                          </h4>
                          <p className="text-sm md:text-base text-black/60 leading-relaxed">
                            {selectedOrder.shipping_address}
                          </p>
                        </div>

                        <div className="rounded-[24px] border border-black/10 bg-[#fbfcff] p-5">
                          <h4 className="text-[12px] font-semibold tracking-[0.2em] uppercase text-black/50 mb-3">
                            Order Total
                          </h4>
                          <p className="text-3xl font-bold text-black">
                            $
                            {parseFloat(
                              selectedOrder.total_amount ||
                                selectedOrder.total_price ||
                                0
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 border-t border-black/10 bg-white">
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="w-full h-12 rounded-[16px] bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-blue-600"
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
                className="inline-flex items-center gap-2 px-8 py-3 rounded-[16px] border border-black/10 bg-white text-black text-sm font-semibold transition-all duration-300 hover:border-blue-200 hover:text-blue-600 hover:-translate-y-0.5"
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