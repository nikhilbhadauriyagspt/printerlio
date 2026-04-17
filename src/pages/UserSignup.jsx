import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Phone,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'user',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8f5] font-['Poppins'] text-[#111111] flex items-center justify-center pt-40">
      <SEO title="Create Account | MyPrinterHero" />

      <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden border border-[#e8dfd6] bg-white shadow-[0_16px_50px_rgba(0,0,0,0.05)]">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="relative bg-[#f4eeea] px-6 sm:px-10 md:px-12 lg:px-14 py-12 md:py-14 flex flex-col justify-center"
        >
          <div className="max-w-[480px]">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo/logo.png" alt="MyPrinterHero" className="h-10 md:h-12 object-contain" />
            </Link>

            <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-4">
              Create Account
            </span>

            <h1 className="text-[34px] md:text-[46px] lg:text-[52px] font-semibold text-[#241812] leading-[1.02] mb-5">
              Join
              <br />
              MyPrinterHero
            </h1>

            <p className="text-[#6b5d54] text-[15px] md:text-[16px] leading-8 mb-8">
              Create your account to enjoy faster checkout, easier order tracking,
              and a smoother shopping experience for printers and accessories.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-[20px] border border-[#e8ddd4] bg-white/70 p-4">
                <div className="w-10 h-10 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#241812] mb-1">
                    Secure Registration
                  </h3>
                  <p className="text-[14px] leading-6 text-[#6b5d54]">
                    Your account details stay protected with a secure signup process.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-[20px] border border-[#e8ddd4] bg-white/70 p-4">
                <div className="w-10 h-10 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#241812] mb-1">
                    Easy Shopping Access
                  </h3>
                  <p className="text-[14px] leading-6 text-[#6b5d54]">
                    Save time managing your profile, orders, and future purchases in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="px-6 sm:px-10 md:px-12 lg:px-14 py-12 md:py-14 flex items-center"
        >
          <div className="w-full max-w-[560px] mx-auto">
            <div className="mb-8 text-center lg:text-left">
              <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-3">
                New Customer
              </span>

              <h2 className="text-[28px] md:text-[36px] font-semibold text-[#241812] leading-tight mb-3">
                Create Your
                <br className="hidden sm:block" />
                Account
              </h2>

              <p className="text-[#6b5d54] text-[14px] md:text-[15px] leading-7">
                Fill in your details below to get started.
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-[14px] font-medium"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3a49a] group-focus-within:text-[#7a4320] transition-colors"
                      size={18}
                    />
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] pl-12 pr-4 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3a49a] group-focus-within:text-[#7a4320] transition-colors"
                      size={18}
                    />
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] pl-12 pr-4 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3a49a] group-focus-within:text-[#7a4320] transition-colors"
                      size={18}
                    />
                    <input
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] pl-12 pr-4 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3a49a] group-focus-within:text-[#7a4320] transition-colors"
                      size={18}
                    />
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] pl-12 pr-12 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b3a49a] hover:text-[#241812] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3a49a] group-focus-within:text-[#7a4320] transition-colors"
                      size={18}
                    />
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] pl-12 pr-4 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full h-14 rounded-xl bg-[#7a4320] text-white font-semibold text-[13px] uppercase tracking-[0.12em] hover:bg-[#643619] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Create Account <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#eee4db] text-center lg:text-left">
              <p className="text-[14px] font-medium text-[#6b5d54]">
                Already have an account?
                <Link
                  to="/login"
                  className="text-[#7a4320] font-semibold hover:underline ml-2"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}