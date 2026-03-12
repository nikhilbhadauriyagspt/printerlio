import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        navigate('/login');
      } else {
        setError(data.message || 'Check your details and try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-white font-urbanist px-6 py-20 relative overflow-hidden text-slate-900">
      
      <div className="max-w-md w-full relative z-10">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase mb-2">
            Create account
          </h1>
          <p className="text-slate-400 font-bold text-sm">Join our professional hardware network.</p>
        </div>

        <div className="bg-white border border-gray-100 p-8 md:p-10 rounded-2xl shadow-2xl shadow-black/5 transition-all duration-500">
          <form onSubmit={handleSignup} className="space-y-5">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Full name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    required type="text" placeholder="John Doe" value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Email address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    required type="email" placeholder="john@example.com" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Phone number</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    required type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Secure password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full h-14 pl-14 pr-16 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-sm font-bold transition-all"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-14 bg-black text-white font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 shadow-lg shadow-black/5 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-50 text-center">
            <p className="text-xs font-bold text-slate-400 tracking-wide">
              Already have an account?
              <Link to="/login" className="text-blue-600 font-black hover:underline ml-2 uppercase text-[10px] tracking-widest">Log In Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
