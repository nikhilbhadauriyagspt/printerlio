import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      type: 'user',
      identifier: email.trim(),
      email: email.trim(),
      password: password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const userData = data.data || data.user || data;
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
        navigate('/profile');
      } else {
        setError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Could not connect to the authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 font-['Poppins'] text-[#001e3c] flex items-center justify-center py-20 px-4  relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#fbb124] rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#001e3c] rounded-full blur-[120px]" />
      </div>

      <SEO title="Sign In | Printer Lio" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,30,60,0.12)] border border-gray-100 overflow-hidden relative z-10"
      >
        <div className="p-8 sm:p-12">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-12">
            <Link to="/" className="mb-8">
              <img src="/logo/logo.png" alt="Logo" className="h-10 object-contain" />
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#001e3c]/5 rounded-full mb-4">
              <Lock size={14} className="text-[#001e3c]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#001e3c]">Authorized Access</span>
            </div>
            <h2 className="text-[32px] font-semibold text-[#001e3c] text-center">Sign In</h2>
            <p className="text-gray-400 font-medium text-center mt-2">Welcome back to Printer Lio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-[13px] font-bold flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/30 pl-4">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#001e3c]/30 group-focus-within:text-[#fbb124] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 rounded-2xl bg-slate-50 border border-gray-100 pl-14 pr-4 text-[15px] font-semibold text-[#001e3c] outline-none focus:border-[#fbb124] focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#001e3c]/30 pl-4">
                Secure Password
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#001e3c]/30 group-focus-within:text-[#fbb124] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 rounded-2xl bg-slate-50 border border-gray-100 pl-14 pr-14 text-[15px] font-semibold text-[#001e3c] outline-none focus:border-[#fbb124] focus:bg-white transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#001e3c]/20 hover:text-[#001e3c] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full h-15 rounded-2xl bg-[#001e3c] text-white font-bold text-[13px] uppercase tracking-[0.2em] hover:bg-[#fbb124] hover:text-[#001e3c] transition-all shadow-xl shadow-blue-900/10 active:scale-95 flex items-center justify-center gap-4 mt-8"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Enter Dashboard <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-50 text-center">
            <p className="text-[14px] font-bold text-gray-400">
              New to our store?
              <Link
                to="/signup"
                className="text-[#001e3c] hover:text-[#fbb124] ml-2 underline underline-offset-4 decoration-2 decoration-[#fbb124]/30 transition-all"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
