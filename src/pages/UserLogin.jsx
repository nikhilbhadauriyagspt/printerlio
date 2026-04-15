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
  ShieldCheck,
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
      user_email: email.trim(),
      guest_email: email.trim(),
      username: email.trim(),
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
        setError(
          data.message || 'Authentication failed. Please check your credentials.'
        );
      }
    } catch (err) {
      setError('Could not connect to the authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative  overflow-hidden bg-[#f8fafc] font-['Poppins'] text-slate-900">
      <SEO title="Sign In | Printistan" />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4),rgba(248,250,252,0.95))]" />
      </div>

      <div className="relative z-10 mx-auto flex  max-w-[1500px] items-center justify-center px-4 py-10 md:px-8">
        <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[34px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:grid-cols-2">
          {/* Left Panel */}
          <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-black p-10 text-white xl:p-14">
            <div className="absolute inset-0">
              <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300">
                Welcome Back
              </div>

              <h1 className="mt-6 text-4xl xl:text-5xl font-bold leading-tight">
                <span className="text-white">Sign</span>{' '}
                <span className="text-blue-400">In</span>
              </h1>

              <p className="mt-5 max-w-md text-sm xl:text-base leading-relaxed text-white/70">
                Login to your account to manage orders, review activity, and access
                your profile in one place.
              </p>
            </div>

            <div className="relative space-y-4">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-blue-500/15 text-blue-300">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Secure Access
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">
                      Your login is handled securely so you can access your account
                      with confidence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-white/65">
                  Access your order details, saved account information, and a smoother
                  shopping experience after signing in.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center bg-white p-6 sm:p-8 md:p-10 xl:p-14"
          >
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <p className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700">
                  Account Login
                </p>

                <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-tight">
                  <span className="text-black">Sign</span>{' '}
                  <span className="text-blue-600">In</span>
                </h2>

                <p className="mt-3 text-sm md:text-base text-slate-500">
                  Login to your account to manage your orders.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="rounded-[18px] border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900">
                      Email Address
                    </label>

                    <div className="group relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-blue-600"
                        size={18}
                      />
                      <input
                        required
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-13 w-full rounded-[18px] border border-slate-200 bg-[#fbfcff] pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition-all duration-300 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900">
                      Password
                    </label>

                    <div className="group relative">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-blue-600"
                        size={18}
                      />
                      <input
                        required
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-13 w-full rounded-[18px] border border-slate-200 bg-[#fbfcff] pl-11 pr-12 text-sm font-medium text-slate-900 outline-none transition-all duration-300 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 hover:text-slate-900"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    to="#"
                    className="text-xs font-semibold text-blue-600 transition-colors duration-300 hover:text-slate-900"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  disabled={loading}
                  className="flex h-13 w-full items-center justify-center gap-3 rounded-[18px] bg-black text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[0_16px_34px_rgba(37,99,235,0.18)] disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      Login <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-slate-100 pt-8 text-center">
                <p className="text-sm font-medium text-slate-500">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="font-semibold text-blue-600 transition-colors duration-300 hover:text-slate-900"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}