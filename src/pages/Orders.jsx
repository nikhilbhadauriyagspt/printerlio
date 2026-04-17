import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  ChevronRight,
  Mail,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchOrders = async (email = null) => {
    setLoading(true);
    setError(null);

    try {
      const url = email
        ? `${API_BASE_URL}/orders?email=${email}`
        : `${API_BASE_URL}/orders?user_id=${user?.id}`;

      const res = await fetch(url);
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
    if (s === 'delivered') return 'bg-emerald-50 text-emerald-600';
    if (s === 'processing') return 'bg-amber-50 text-amber-600';
    if (s === 'shipped') return 'bg-blue-50 text-blue-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="pt-40 bg-[#fbf8f5] font-['Poppins']">
      <SEO title="Orders | MyPrinterHero" />

      {/* HERO */}
      <section className="bg-[#f4eeea] border-b border-[#e8dfd6] text-center py-16">
        <h1 className="text-[40px] font-semibold text-[#241812] mb-3">
          Your Orders
        </h1>
        <p className="text-[#6b5d54]">
          Track, review and manage all your orders easily.
        </p>
      </section>

      {/* CONTENT */}
      <div className="max-w-[1200px] mx-auto px-4 py-12">

        {/* EMPTY */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error || orders.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#e4d9cf] rounded-2xl bg-white">
            <Package size={40} className="mx-auto mb-4 text-[#d1c4b8]" />
            <h2 className="text-xl font-semibold mb-2">
              No Orders Found
            </h2>
            <Link to="/shop" className="text-[#7a4320] font-semibold">
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#e8dfd6] rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition"
              >
                <div>
                  <p className="text-xs text-[#8b7768] mb-1">
                    Order #{order.id}
                  </p>
                  <h3 className="font-semibold text-[#241812] mb-2">
                    {new Date(order.created_at).toDateString()}
                  </h3>

                  <span
                    className={cn(
                      'px-3 py-1 text-xs rounded-full font-semibold',
                      getStatusColor(order.status)
                    )}
                  >
                    {getStatus(order.status)}
                  </span>
                </div>

                <div className="flex items-center justify-between md:gap-10">
                  <div>
                    <p className="text-xs text-[#8b7768]">Total</p>
                    <p className="text-lg font-semibold">
                      ${parseFloat(order.total_amount).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-5 h-[42px] border border-[#7a4320] text-[#7a4320] rounded-xl hover:bg-[#7a4320] hover:text-white transition flex items-center gap-2"
                  >
                    Details <ChevronRight size={14} />
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
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setSelectedOrder(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[95%] max-w-xl p-6 rounded-2xl z-50"
            >
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold">Order Details</h3>
                <button onClick={() => setSelectedOrder(null)}>
                  <X />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <p><b>Order ID:</b> #{selectedOrder.id}</p>
                <p><b>Status:</b> {getStatus(selectedOrder.status)}</p>
                <p><b>Total:</b> ${selectedOrder.total_amount}</p>

                <div>
                  <b>Items:</b>
                  {selectedOrder.items?.map((i, idx) => (
                    <p key={idx}>
                      {i.product_name} × {i.quantity}
                    </p>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-6 w-full h-[45px] bg-[#7a4320] text-white rounded-xl"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}