import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import {
  User,
  Lock,
  Package,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShoppingCart,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Profile() {
  const getInitialUser = () => {
    try {
      const stored = localStorage.getItem('user');
      if (!stored || stored === 'undefined') return null;
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser());
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });

      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast('Profile updated successfully', 'success');
      }
    } catch (err) {
      showToast('Update failed', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();

    if (securityForm.password !== securityForm.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        showToast('Password changed successfully', 'success');
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast('Security update failed', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'My Details', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="pt-25 bg-[#fbf8f5] font-['Poppins'] text-[#111111]">
      <SEO title="My Account | MyPrinterHero" />

      {/* Hero */}
      <section className="bg-[#f4eeea] border-b border-[#e8dfd6]">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-14 md:py-18 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="text-center lg:text-left">
              <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-4">
                Account Dashboard
              </span>

              <h1 className="text-[34px] md:text-[48px] lg:text-[58px] font-semibold text-[#241812] leading-[1.02]">
                My Profile
              </h1>

              <p className="max-w-[760px] mt-4 text-[#6b5d54] text-[14px] md:text-[16px] leading-8">
                Manage your details, review recent orders, and keep your account secure.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-5">
              <div className="text-center sm:text-right">
                <p className="text-[15px] font-semibold text-[#241812]">{user.name}</p>
                <a
                  href={`mailto:${user.email}`}
                  className="text-[13px] text-[#8b7768] hover:text-[#7a4320] transition-colors"
                >
                  {user.email}
                </a>
              </div>

              <button
                onClick={handleLogout}
                className="h-[44px] px-5 rounded-xl border border-[#d8c8bb] bg-white text-[#7a4320] text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#7a4320] hover:text-white transition-all flex items-center gap-2"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-12 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-[330px_1fr] gap-8 lg:gap-10 items-start">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-[28px] border border-[#e8dfd6] bg-white p-4 md:p-5">
              <div className="space-y-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-4 rounded-[18px] text-sm font-medium transition-all border',
                      activeTab === tab.id
                        ? 'bg-[#7a4320] text-white border-[#7a4320]'
                        : 'bg-[#fcfaf7] text-[#5f5148] border-[#ece2d9] hover:bg-white hover:border-[#d8c8bb]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon size={17} />
                      {tab.label}
                    </div>
                    <ChevronRight size={15} />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] bg-[#2d1a11] text-white p-6 md:p-7">
              <ShieldCheck className="text-[#f0c29f] mb-4" size={24} />
              <h4 className="text-[22px] font-semibold leading-tight mb-3">
                Data Protection
              </h4>
              <p className="text-[14px] text-white/70 leading-7">
                Your account information is stored securely and handled with care.
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-[30px] border border-[#e8dfd6] bg-white p-6 md:p-8 lg:p-10"
                >
                  <div className="flex items-center gap-4 mb-8 md:mb-10 pb-5 border-b border-[#eee4db]">
                    <div className="h-12 w-12 rounded-full bg-[#f8f2ec] flex items-center justify-center text-[#7a4320]">
                      <User size={22} />
                    </div>
                    <h2 className="text-[28px] md:text-[34px] font-semibold text-[#241812]">
                      Personal Details
                    </h2>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold text-[#8b7768] uppercase tracking-[0.18em]">
                          Full Name
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b7a89c]"
                            size={17}
                          />
                          <input
                            required
                            value={profileForm.name}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, name: e.target.value })
                            }
                            className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] focus:border-[#7a4320] focus:bg-white outline-none text-sm transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold text-[#8b7768] uppercase tracking-[0.18em]">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b7a89c]"
                            size={17}
                          />
                          <input
                            value={profileForm.phone}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, phone: e.target.value })
                            }
                            className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] focus:border-[#7a4320] focus:bg-white outline-none text-sm transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold text-[#8b7768] uppercase tracking-[0.18em]">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b7a89c]"
                            size={17}
                          />
                          <input
                            value={user.email || ''}
                            disabled
                            className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#f6f1ec] border border-[#e7ddd4] text-[#8b7768] outline-none text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold text-[#8b7768] uppercase tracking-[0.18em]">
                          Account Status
                        </label>
                        <div className="h-14 rounded-xl bg-[#f6f1ec] border border-[#e7ddd4] flex items-center px-4 text-sm font-medium text-[#241812]">
                          Active Customer Account
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-[#8b7768] uppercase tracking-[0.18em]">
                        Default Address
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-4 top-5 text-[#b7a89c]"
                          size={17}
                        />
                        <textarea
                          rows="4"
                          value={profileForm.address}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, address: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] focus:border-[#7a4320] focus:bg-white outline-none text-sm transition-all resize-none"
                        />
                      </div>
                    </div>

                    <button
                      disabled={isUpdating}
                      className="h-12 px-8 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {isUpdating ? 'Saving...' : 'Update Profile'}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-1">
                    <h2 className="text-[28px] md:text-[34px] font-semibold text-[#241812]">
                      Recent Orders
                    </h2>

                    <Link
                      to="/orders"
                      className="inline-flex items-center gap-2 text-[#5a2d14] font-semibold text-[13px] uppercase tracking-[0.08em] border-b border-[#5a2d14] pb-1 hover:text-[#7a4320] hover:border-[#7a4320] transition-all"
                    >
                      View All History <ArrowRight size={14} />
                    </Link>
                  </div>

                  {loading ? (
                    <div className="rounded-[30px] border border-[#e8dfd6] bg-white py-16 flex flex-col items-center">
                      <Loader2 className="animate-spin text-[#7a4320] mb-4" />
                      <p className="text-[12px] font-semibold text-[#8b7768] uppercase tracking-[0.18em]">
                        Loading Orders
                      </p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="rounded-[30px] border border-[#e8dfd6] bg-white py-16 text-center">
                      <ShoppingCart size={46} strokeWidth={1.5} className="text-[#d5c7bb] mx-auto mb-6" />
                      <p className="text-[18px] font-semibold text-[#241812] mb-2">
                        No orders found
                      </p>
                      <Link
                        to="/shop"
                        className="mt-3 inline-flex items-center gap-2 text-[#7a4320] font-semibold text-[13px] uppercase tracking-[0.08em] hover:underline"
                      >
                        Start Shopping <ArrowRight size={14} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div
                          key={order.id}
                          className="rounded-[24px] border border-[#e8dfd6] bg-white p-5 md:p-6 hover:shadow-[0_14px_30px_rgba(0,0,0,0.04)] transition-all"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6 items-center">
                            <div>
                              <p className="text-[10px] font-semibold text-[#8b7768] uppercase tracking-[0.18em] mb-2">
                                Order ID
                              </p>
                              <h4 className="text-[14px] font-semibold text-[#241812]">
                                #{order.order_code || order.id}
                              </h4>
                            </div>

                            <div>
                              <p className="text-[10px] font-semibold text-[#8b7768] uppercase tracking-[0.18em] mb-2">
                                Placed On
                              </p>
                              <p className="text-[14px] font-medium text-[#241812]">
                                {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-semibold text-[#8b7768] uppercase tracking-[0.18em] mb-2">
                                Amount
                              </p>
                              <p className="text-[14px] font-semibold text-[#241812]">
                                ${parseFloat(order.total_amount || order.total_price || 0).toLocaleString()}
                              </p>
                            </div>

                            <div className="md:justify-self-end">
                              <div
                                className={cn(
                                  'px-4 py-2 rounded-full text-[11px] font-semibold border w-fit capitalize',
                                  order.status === 'delivered'
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                    : 'bg-[#f8f2ec] text-[#7a4320] border-[#eadfd6]'
                                )}
                              >
                                {order.status.replace('_', ' ')}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-[30px] border border-[#e8dfd6] bg-white p-6 md:p-8 lg:p-10"
                >
                  <div className="flex items-center gap-4 mb-8 md:mb-10 pb-5 border-b border-[#eee4db]">
                    <div className="h-12 w-12 rounded-full bg-[#f8f2ec] flex items-center justify-center text-[#7a4320]">
                      <Lock size={22} />
                    </div>
                    <h2 className="text-[28px] md:text-[34px] font-semibold text-[#241812]">
                      Security Update
                    </h2>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-[#8b7768] uppercase tracking-[0.18em]">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b7a89c]"
                          size={17}
                        />
                        <input
                          type={showPass ? 'text' : 'password'}
                          required
                          value={securityForm.password}
                          onChange={(e) =>
                            setSecurityForm({ ...securityForm, password: e.target.value })
                          }
                          className="w-full h-14 pl-12 pr-12 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] focus:border-[#7a4320] focus:bg-white outline-none text-sm transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b7a89c] hover:text-[#241812] transition-colors"
                        >
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-[#8b7768] uppercase tracking-[0.18em]">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <ShieldCheck
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b7a89c]"
                          size={17}
                        />
                        <input
                          type={showPass ? 'text' : 'password'}
                          required
                          value={securityForm.confirmPassword}
                          onChange={(e) =>
                            setSecurityForm({
                              ...securityForm,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] focus:border-[#7a4320] focus:bg-white outline-none text-sm transition-all"
                        />
                      </div>
                    </div>

                    <button
                      disabled={isUpdating}
                      className="h-12 px-8 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {isUpdating ? 'Processing...' : 'Update Password'}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}