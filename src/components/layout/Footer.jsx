import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Globe,
  Mail,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { footerNavigation } from '@/data/navigation';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Subscribed! Check your inbox for 15% off coupon WELCOME15.');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-[#101828] text-slate-300">
      {/* Back to Top Bar */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-full bg-[#1D2939] py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#293548] cursor-pointer"
      >
        Back to top ↑
      </button>

      {/* Trust Highlights Bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#FF9900]/15 p-2.5 text-[#FF9900]">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Fast Global Shipping</h4>
              <p className="mt-0.5 text-xs text-slate-400">Free express delivery on orders $50+</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#2874F0]/20 p-2.5 text-[#2874F0]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Verified Authentic</h4>
              <p className="mt-0.5 text-xs text-slate-400">100% genuine products & warranties</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-emerald-500/15 p-2.5 text-emerald-400">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day Easy Returns</h4>
              <p className="mt-0.5 text-xs text-slate-400">Instant refunds & doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-purple-500/15 p-2.5 text-purple-400">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Priority Support</h4>
              <p className="mt-0.5 text-xs text-slate-400">Live chat & dedicated order specialists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5 sm:px-6">
        {/* Brand & Newsletter */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF9900] text-[#101828]">
              <ShoppingCart className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="text-xl font-extrabold text-white">
              Global<span className="text-[#FF9900]">Cart</span>
            </span>
          </Link>

          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Your premier destination for flagship electronics, curated fashion, smart home upgrades, and daily flash deals.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md pt-1">
            <label htmlFor="footer-newsletter" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white">
              Subscribe for Exclusive Deals
            </label>
            <div className="flex overflow-hidden rounded-xl border border-white/15 bg-white/5 focus-within:border-[#FF9900]">
              <input
                id="footer-newsletter"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-transparent px-3.5 py-2.5 text-sm text-white placeholder-slate-400 outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-[#FF9900] px-4 py-2.5 text-xs font-bold text-[#101828] transition hover:bg-[#E68A00] cursor-pointer shrink-0"
              >
                <span>Join</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            {footerNavigation.shop.map((item) => (
              <li key={item.label}>
                <Link to={item.path} className="text-slate-400 transition hover:text-[#FF9900]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Customer Care</h4>
          <ul className="space-y-2.5 text-sm">
            {footerNavigation.customerService.map((item) => (
              <li key={item.label}>
                <Link to={item.path} className="text-slate-400 transition hover:text-[#FF9900]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {footerNavigation.company.map((item) => (
              <li key={item.label}>
                <Link to={item.path} className="text-slate-400 transition hover:text-[#FF9900]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10 bg-[#070B14]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Global Cart Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-[#FF9900]" /> English (USD $)
            </span>
            <Link to="/contact" className="inline-flex items-center gap-1 hover:text-white">
              <Mail className="h-3.5 w-3.5 text-[#2874F0]" /> support@globalcart.demo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;