import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Home, PackageCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice } from '@/utils/formatPrice';
import { useCart } from '@/hooks/useCart';

export function OrderSuccess() {
  const location = useLocation();
  const { orders } = useCart();
  const order = location.state?.order || orders[0];

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border p-6 sm:p-10 text-center shadow-xl"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <span className="rounded-full bg-[#2874F0]/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#2874F0]">
          Order Confirmed
        </span>

        <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">
          Thank you for shopping with Global Cart!
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Your simulated order has been recorded locally and is being prepared for dispatch.
        </p>

        {order && (
          <div
            className="mt-6 rounded-2xl border p-5 text-left space-y-3 text-sm"
            style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: 'var(--border-color)' }}>
              <span className="inline-flex items-center gap-1.5 font-bold">
                <Package className="h-4 w-4 text-[#FF9900]" />
                Order Reference
              </span>
              <span className="font-mono font-extrabold text-[#2874F0]">{order.id}</span>
            </div>

            {order.customer?.fullName && (
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Recipient</span>
                <span className="font-semibold">{order.customer.fullName}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span style={{ color: 'var(--text-muted)' }}>Items Ordered</span>
              <span className="font-semibold">{order.items?.length || 0} products</span>
            </div>

            {order.totals && (
              <div className="flex justify-between border-t pt-2.5 text-base font-extrabold" style={{ borderColor: 'var(--border-color)' }}>
                <span>Total Paid</span>
                <span className="text-[#FF9900]">{formatPrice(order.totals.total)}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2874F0] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1C5ED6] shadow-sm"
          >
            <PackageCheck className="h-4 w-4" />
            <span>Track Order & Shipment</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition hover:bg-black/5 dark:hover:bg-white/10"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF9900] px-5 py-3 text-sm font-extrabold text-[#101828] transition hover:bg-[#E68A00]"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default OrderSuccess;