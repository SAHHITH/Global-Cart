import { useState } from 'react';
import { Tag, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCart } from '@/hooks/useCart';

export function CouponInput() {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const res = applyCoupon(code);
    if (res.success) {
      toast.success(res.message);
      setCode('');
    } else {
      toast.error(res.message);
    }
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs">
        <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>
            <strong>{appliedCoupon.code}</strong> — {appliedCoupon.label}
          </span>
        </div>
        <button
          type="button"
          onClick={removeCoupon}
          aria-label="Remove coupon"
          className="rounded p-1 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300 cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleApply} className="space-y-1.5">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-50" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Promo code (e.g. WELCOME15)"
            className="h-9 w-full rounded-xl border bg-transparent pl-8 pr-3 text-xs font-semibold uppercase outline-none focus:border-[#2874F0]"
            style={{ borderColor: 'var(--border-color)' }}
          />
        </div>
        <button
          type="submit"
          className="h-9 rounded-xl bg-[#2874F0] px-3.5 text-xs font-bold text-white transition hover:bg-[#1C5ED6] cursor-pointer"
        >
          Apply
        </button>
      </div>
      <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
        Try <span className="font-mono font-bold">WELCOME15</span>,{' '}
        <span className="font-mono font-bold">GLOBAL10</span>, or{' '}
        <span className="font-mono font-bold">SAVE500</span>
      </p>
    </form>
  );
}

export default CouponInput;