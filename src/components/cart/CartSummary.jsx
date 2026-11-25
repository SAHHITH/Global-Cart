import { ShieldCheck, Truck } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import { useCart } from '@/hooks/useCart';
import { CouponInput } from './CouponInput';

export function CartSummary({ showCoupon = true, actionButton = null }) {
  const { totals } = useCart();
  const freeShippingRemaining = Math.max(0, 999 - totals.subtotal);

  return (
    <div
      className="rounded-2xl border p-5 space-y-4"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <h3 className="text-base font-extrabold">Order Summary</h3>

      {/* Free Shipping Progress */}
      {totals.subtotal > 0 && (
        <div
          className="rounded-xl p-3 text-xs"
          style={{ backgroundColor: 'var(--bg-muted)' }}
        >
          <div className="flex items-center gap-2 font-semibold">
            <Truck className="h-4 w-4 text-[#2874F0] shrink-0" />
            {freeShippingRemaining === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400">
                You’ve unlocked FREE Express Shipping!
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(freeShippingRemaining)}</strong> more for FREE shipping
              </span>
            )}
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-300 dark:bg-slate-700">
            <div
              className="h-full bg-[#2874F0] transition-all duration-300"
              style={{ width: `${Math.min(100, (totals.subtotal / 999) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {showCoupon && <CouponInput />}

      {/* Line Breakdown */}
      <div className="space-y-2.5 border-t pt-3.5 text-sm" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex justify-between">
          <span style={{ color: 'var(--text-secondary)' }}>
            Subtotal ({totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="font-semibold">{formatPrice(totals.subtotal)}</span>
        </div>

        {totals.productSavings > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span>Catalog Savings</span>
            <span className="font-semibold">-{formatPrice(totals.productSavings)}</span>
          </div>
        )}

        {totals.couponDiscount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span>Promo Code Discount</span>
            <span className="font-semibold">-{formatPrice(totals.couponDiscount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
          <span className="font-semibold">
            {totals.shipping === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
            ) : (
              formatPrice(totals.shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span style={{ color: 'var(--text-secondary)' }}>Estimated Tax (8%)</span>
          <span className="font-semibold">{formatPrice(totals.tax)}</span>
        </div>

        <div
          className="flex items-center justify-between border-t pt-3 text-base font-extrabold"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <span>Total</span>
          <span className="text-lg text-[#FF9900]">{formatPrice(totals.total)}</span>
        </div>
      </div>

      {actionButton}

      <div className="flex items-center justify-center gap-1.5 pt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span>256-bit SSL Encrypted Frontend Demo Checkout</span>
      </div>
    </div>
  );
}

export default CartSummary;