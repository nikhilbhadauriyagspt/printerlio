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
  Settings,
  LayoutGrid,
  ShoppingBag,
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
    { id: 'profile', label: 'Account Info', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 font-['Poppins'] text-[#001e3c]">
      <SEO title="My Account | US Printer Store" />

      <div className="max-w-[1500px] mx-auto px-4 md:px-10">
        
        {/* Centered Premium Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100">
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
            <span className="text-[#001e3c] text-[12px] font-bold uppercase tracking-[0.15em]">Member Hub</span>
            <span className="h-[2px] w-8 bg-[#001e3c]"></span>
          </div>
          
          <h1 className="text-[38px] md:text-[56px] font-semibold text-[#001e3c] leading-tight mb-4 uppercase tracking-tight">
            Hi, <span className="text-blue-800">{user.name?.split(' ')[0]}!</span>
          </h1>
          <p className="text-gray-500 text-[16px] max-w-[600px] mx-auto">
            Manage your high-performance printing assets, order history, and security configurations in one secure dashboard.
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,30,60,0.05)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
            
            {/* 1. Sidebar: Elite Tabs */}
            <div className="lg:col-span-3 bg-slate-50/50 border-r border-gray-100 p-8 md:p-10 space-y-3">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#001e3c]/30 mb-8 pl-4">Account Menu</h3>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-6 py-5 rounded-2xl text-[14px] font-bold uppercase tracking-wider transition-all duration-500 border',
                    activeTab === tab.id
                      ? 'bg-[#001e3c] text-white border-[#001e3c] shadow-2xl shadow-blue-900/10'
                      : 'bg-white text-[#001e3c]/60 border-gray-100 hover:border-[#fbb124]/50 hover:bg-white'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <tab.icon size={20} className={cn(activeTab === tab.id ? 'text-blue-800' : '')} />
                    {tab.label}
                  </div>
                  <ChevronRight size={18} className={cn('transition-all duration-500', activeTab === tab.id ? 'translate-x-1 text-blue-800' : 'opacity-0')} />
                </button>
              ))}

              <div className="pt-10 mt-10 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-[14px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all duration-300 active:scale-95"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>

              {/* Data Safety Card */}
              <div className="mt-12 p-8 bg-[#001e3c] rounded-[2.5rem] text-white relative overflow-hidden group shadow-xl">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[#fbb124] rounded-full blur-[60px] opacity-20" />
                 <ShieldCheck className="text-blue-800 mb-4 relative z-10" size={28} />
                 <h4 className="text-[18px] font-semibold mb-2 relative z-10">Security Vault</h4>
                 <p className="text-[12px] text-white/50 leading-relaxed relative z-10 font-medium">
                   Your profile and payment data are encrypted using RSA 2048-bit protocols.
                 </p>
              </div>
            </div>

            {/* 2. Main Area: Profile Content */}
            <div className="lg:col-span-9 p-8 md:p-16 lg:p-20">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-50 pb-12">
                       <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-xl flex items-center justify-center text-[#001e3c] text-[32px] font-bold">
                          {user.name?.charAt(0)}
                       </div>
                       <div className="text-center md:text-left">
                          <h2 className="text-[32px] font-semibold text-[#001e3c] mb-1">{user.name}</h2>
                          <p className="text-gray-400 font-medium uppercase tracking-widest text-[12px]">Member since {new Date().getFullYear()}</p>
                       </div>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/30 pl-4">Full Identity</label>
                          <div className="relative group">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#001e3c]/30 group-focus-within:text-blue-800 transition-colors" size={18} />
                            <input
                              required
                              value={profileForm.name}
                              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                              className="w-full h-15 pl-14 pr-4 rounded-[1.25rem] bg-slate-50 border border-gray-100 focus:border-[#fbb124] focus:bg-white outline-none text-[15px] font-semibold text-[#001e3c] transition-all shadow-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/30 pl-4">Phone Contact</label>
                          <div className="relative group">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-[#001e3c]/30 group-focus-within:text-blue-800 transition-colors" size={18} />
                            <input
                              value={profileForm.phone}
                              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                              className="w-full h-15 pl-14 pr-4 rounded-[1.25rem] bg-slate-50 border border-gray-100 focus:border-[#fbb124] focus:bg-white outline-none text-[15px] font-semibold text-[#001e3c] transition-all shadow-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/30 pl-4">Verified Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#001e3c]/20" size={18} />
                          <input
                            value={user.email || ''}
                            disabled
                            className="w-full h-15 pl-14 pr-4 rounded-[1.25rem] bg-gray-100 border border-gray-100 text-[#001e3c]/30 outline-none text-[15px] font-semibold cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/30 pl-4">Deploy To Address</label>
                        <div className="relative group">
                          <MapPin className="absolute left-5 top-6 text-[#001e3c]/30 group-focus-within:text-blue-800 transition-colors" size={18} />
                          <textarea
                            rows="4"
                            value={profileForm.address}
                            onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                            className="w-full pl-14 pr-6 py-6 rounded-[1.5rem] bg-slate-50 border border-gray-100 focus:border-[#fbb124] focus:bg-white outline-none text-[15px] font-semibold text-[#001e3c] transition-all resize-none shadow-sm"
                            placeholder="Enter your shipping coordinates"
                          />
                        </div>
                      </div>

                      <button
                        disabled={isUpdating}
                        className="h-16 px-12 rounded-[1.25rem] bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-[0.2em] hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-2xl shadow-blue-900/10 active:scale-95 disabled:opacity-50"
                      >
                        {isUpdating ? <Loader2 className="animate-spin" /> : 'Synchronize Profile'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="flex items-center justify-between border-b border-gray-50 pb-8">
                       <h2 className="text-[32px] font-semibold text-[#001e3c]">Recent Orders</h2>
                       <Link to="/orders" className="h-10 px-6 bg-slate-50 rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#001e3c] border border-gray-100 flex items-center justify-center hover:bg-[#001e3c] hover:text-white transition-all">
                         View All
                       </Link>
                    </div>

                    {loading ? (
                      <div className="py-20 text-center animate-pulse">
                        <Loader2 className="animate-spin text-[#001e3c] mx-auto mb-4" />
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Accessing order database...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="py-32 text-center bg-slate-50 rounded-[3rem] border border-gray-100">
                        <ShoppingBag size={56} className="text-gray-200 mx-auto mb-8 shadow-inner" />
                        <p className="text-[20px] font-semibold text-[#001e3c] mb-10 uppercase tracking-tight">No active procurement found</p>
                        <Link to="/shop" className="h-15 px-10 bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-widest rounded-2xl inline-flex items-center gap-4 hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-xl">
                           Browse Collections <ArrowRight size={18} />
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.slice(0, 4).map((order) => (
                          <div key={order.id} className="group bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                            <div className="flex items-center gap-8 w-full md:w-auto">
                               <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 flex flex-col items-center justify-center border border-gray-100 group-hover:bg-[#fbb124]/10 transition-colors">
                                  <span className="text-[11px] font-black text-[#001e3c] leading-none mb-1">ID</span>
                                  <span className="text-[18px] font-bold text-[#001e3c] leading-none">#{order.id}</span>
                               </div>
                               <div className="space-y-2">
                                  <p className="text-[15px] font-bold text-[#001e3c]">{new Date(order.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                  <div className={cn(
                                    'text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border inline-block',
                                    order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-[#001e3c] border-blue-100'
                                  )}>
                                    {order.status}
                                  </div>
                               </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto border-t border-gray-50 md:border-t-0 pt-6 md:pt-0">
                               <div className="text-right">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Amount</p>
                                  <p className="text-[24px] font-black text-[#001e3c]">${parseFloat(order.total_amount || 0).toLocaleString()}</p>
                               </div>
                               <Link to="/orders" className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#001e3c] hover:border-[#fbb124] hover:bg-[#fbb124]/5 transition-all shadow-sm">
                                  <ChevronRight size={22} />
                               </Link>
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center gap-5 border-b border-gray-50 pb-8">
                       <h2 className="text-[32px] font-semibold text-[#001e3c]">Security Console</h2>
                    </div>

                    <form onSubmit={handleSecurityUpdate} className="space-y-10 max-w-xl">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/30 pl-4">
                          New Access Key
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#001e3c]/30 group-focus-within:text-blue-800 transition-colors" size={18} />
                          <input
                            type={showPass ? 'text' : 'password'}
                            required
                            value={securityForm.password}
                            onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                            className="w-full h-15 pl-14 pr-14 rounded-[1.25rem] bg-slate-50 border border-gray-100 focus:border-[#fbb124] focus:bg-white outline-none text-[15px] font-semibold text-[#001e3c] transition-all shadow-sm"
                            placeholder="Min. 8 characters"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#001e3c]/20 hover:text-[#001e3c] transition-colors"
                          >
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/30 pl-4">
                          Verify Access Key
                        </label>
                        <div className="relative group">
                          <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-[#001e3c]/30 group-focus-within:text-blue-800 transition-colors" size={18} />
                          <input
                            type={showPass ? 'text' : 'password'}
                            required
                            value={securityForm.confirmPassword}
                            onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                            className="w-full h-15 pl-14 pr-4 rounded-[1.25rem] bg-slate-50 border border-gray-100 focus:border-[#fbb124] focus:bg-white outline-none text-[15px] font-semibold text-[#001e3c] transition-all shadow-sm"
                          />
                        </div>
                      </div>

                      <button
                        disabled={isUpdating}
                        className="h-16 px-12 rounded-[1.25rem] bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-[0.2em] hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-2xl shadow-blue-900/10 active:scale-95 disabled:opacity-50"
                      >
                        {isUpdating ? <Loader2 className="animate-spin" /> : 'Update Access Credentials'}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
