import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ShoppingCart,
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  Eye,
  EyeOff,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/features/auth/authStore';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated } = useAuthStore();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  // Register Form State
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from?.pathname || '/';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const validateSignIn = () => {
    const errs = {};
    if (!signInData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!signInData.password) {
      errs.password = 'Password is required';
    } else if (signInData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateRegister = () => {
    const errs = {};
    if (!registerData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (registerData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!registerData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!registerData.password) {
      errs.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (registerData.password !== registerData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    const displayName = signInData.email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    login({
      name: formattedName || 'Shopper',
      email: signInData.email,
      role: signInData.email.toLowerCase().includes('admin') ? 'admin' : 'shopper',
    });

    toast.success(`Welcome back, ${formattedName}!`);
    navigate('/', { replace: true });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    register({
      name: registerData.name.trim(),
      email: registerData.email.trim(),
      role: 'shopper',
    });

    toast.success(`Account created! Welcome to Global Cart, ${registerData.name}!`);
    navigate('/', { replace: true });
  };

  // Demo Login Handlers
  const handleDemoShopper = () => {
    login({
      name: 'Aarav Sharma',
      email: 'aarav.shopper@globalcart.in',
      role: 'shopper',
    });
    toast.success('Signed in as Shopper (Aarav Sharma)');
    navigate('/', { replace: true });
  };

  const handleDemoAdmin = () => {
    login({
      name: 'Priya Patel (Admin)',
      email: 'admin@globalcart.in',
      role: 'admin',
    });
    toast.success('Signed in as Admin Portal Manager');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#101828] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2874F0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#FF9900]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 group mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF9900] text-[#101828] shadow-lg shadow-[#FF9900]/25 transition-transform group-hover:scale-105">
              <ShoppingCart className="h-7 w-7 stroke-[2.5]" />
            </div>
            <div className="text-left leading-tight">
              <span className="text-2xl font-black tracking-tight text-white">
                Global<span className="text-[#FF9900]">Cart</span>
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Smart Marketplace India
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Sign in to explore 48+ premium products with fast delivery across India.
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#1D2939]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Quick Demo Access Bar */}
          <div className="mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-1.5 mb-2.5 text-xs font-bold uppercase tracking-wider text-[#FF9900]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>One-Click Instant Demo Login</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleDemoShopper}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/15 px-3 py-2.5 text-xs font-bold text-white transition border border-white/10 hover:border-[#FF9900]/50 cursor-pointer"
              >
                <User className="h-4 w-4 text-[#FF9900]" />
                <span>Continue as Shopper</span>
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#2874F0]/20 hover:bg-[#2874F0]/30 px-3 py-2.5 text-xs font-bold text-[#60A5FA] transition border border-[#2874F0]/30 hover:border-[#2874F0] cursor-pointer"
              >
                <LayoutDashboard className="h-4 w-4 text-[#60A5FA]" />
                <span>Sign In as Admin</span>
              </button>
            </div>
          </div>

          {/* Sign In / Register Tabs */}
          <div className="flex rounded-xl bg-[#101828]/60 p-1 mb-6 border border-white/5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                setErrors({});
              }}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-[#FF9900] text-[#101828] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrors({});
              }}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-[#FF9900] text-[#101828] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={signInData.email}
                    onChange={(e) => {
                      setSignInData({ ...signInData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: null });
                    }}
                    placeholder="name@example.com"
                    className="w-full rounded-xl bg-[#101828]/70 border border-white/10 pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#FF9900] transition"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-300">Password</label>
                  <span className="text-[11px] text-[#2874F0] hover:underline cursor-pointer">
                    Forgot?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInData.password}
                    onChange={(e) => {
                      setSignInData({ ...signInData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: null });
                    }}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-[#101828]/70 border border-white/10 pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#FF9900] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-rose-400">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#FF9900] hover:bg-[#E68A00] text-[#101828] py-3 text-sm font-black transition shadow-lg shadow-[#FF9900]/20 active:scale-[0.99] cursor-pointer"
              >
                <span>Sign In to Storefront</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: null });
                    }}
                    placeholder="e.g. Rohan Verma"
                    className="w-full rounded-xl bg-[#101828]/70 border border-white/10 pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#FF9900] transition"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: null });
                    }}
                    placeholder="name@example.com"
                    className="w-full rounded-xl bg-[#101828]/70 border border-white/10 pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#FF9900] transition"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: null });
                    }}
                    placeholder="At least 6 characters"
                    className="w-full rounded-xl bg-[#101828]/70 border border-white/10 pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#FF9900] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-rose-400">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.confirmPassword}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                    }}
                    placeholder="Re-enter password"
                    className="w-full rounded-xl bg-[#101828]/70 border border-white/10 pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#FF9900] transition"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-rose-400">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#FF9900] hover:bg-[#E68A00] text-[#101828] py-3 text-sm font-black transition shadow-lg shadow-[#FF9900]/20 active:scale-[0.99] cursor-pointer"
              >
                <span>Create Account & Start Shopping</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* Footer Security Note */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Secure 256-bit Encrypted Session</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
