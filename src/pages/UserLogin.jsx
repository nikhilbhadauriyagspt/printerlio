import { useState, useEffect } from 'react';
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
    <div className=" bg-white font-['Poppins'] text-[#111111] flex items-center justify-center py-20 px-4">
      <SEO title="Sign In | Printing Land" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-8">
            <img src="/logo/logo.png" alt="Printing Land" className="h-10 mx-auto" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900  mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-500 font-medium">Sign in to manage your orders and profile.</p>
        </div>

        <div className="bg-white border border-gray-100 p-8 md:p-10 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm font-medium mb-6"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-gray-50 border border-gray-200 pl-12 pr-4 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Password
                  </label>
                  <Link to="#" className="text-[11px] font-bold text-black hover:underline uppercase tracking-widest">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 bg-gray-50 border border-gray-200 pl-12 pr-12 text-sm font-medium focus:border-black focus:bg-white outline-none transition-all rounded-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-900 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full h-14 bg-gray-900 text-white font-bold text-[13px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm font-medium text-gray-500">
              New to Printing Land?{' '}
              <Link to="/signup" className="text-black font-bold hover:underline ml-1">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
