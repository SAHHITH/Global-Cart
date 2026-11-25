import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PackageCheck,
  Package,
  Truck,
  Warehouse,
  MapPin,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Calendar,
  ShieldCheck,
  Play,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { formatPrice } from '@/utils/formatPrice';
import { useCart } from '@/hooks/useCart';

const SHIPPING_STAGES = [
  {
    step: 0,
    title: 'Order Confirmed',
    subtitle: 'Storefront Platform',
    desc: 'Order verified & sent to warehouse queue',
    icon: CheckCircle2,
  },
  {
    step: 1,
    title: 'Packed at Warehouse',
    subtitle: 'Chennai Hub B4',
    desc: 'Barcoded, verified & securely packaged',
    icon: Warehouse,
  },
  {
    step: 2,
    title: 'Dispatched from Warehouse',
    subtitle: 'Global Express Logistics',
    desc: 'Departed central facility & in highway transit',
    icon: Truck,
  },
  {
    step: 3,
    title: 'Out for Delivery',
    subtitle: 'Destination City Hub',
    desc: 'Courier executive assigned for doorstep delivery',
    icon: Package,
  },
  {
    step: 4,
    title: 'Delivered to Customer',
    subtitle: 'Customer Doorstep',
    desc: 'Handed over to customer with OTP verification',
    icon: PackageCheck,
  },
];

export function Orders() {
  const navigate = useNavigate();
  const { orders = [], advanceOrderStage } = useCart();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'in_transit' | 'delivered'

  // Filter orders
  const filteredOrders = useMemo(() => {
    if (activeTab === 'in_transit') {
      return orders.filter((o) => (o.shipment?.currentStage ?? 0) < 4);
    }
    if (activeTab === 'delivered') {
      return orders.filter((o) => (o.shipment?.currentStage ?? 0) === 4);
    }
    return orders;
  }, [orders, activeTab]);

  const inTransitCount = orders.filter((o) => (o.shipment?.currentStage ?? 0) < 4).length;
  const deliveredCount = orders.filter((o) => (o.shipment?.currentStage ?? 0) === 4).length;

  const handleSimulateAdvance = (orderId) => {
    const res = advanceOrderStage(orderId);
    if (res?.advanced) {
      toast.success(`Order ${orderId}: Advanced to "${res.nextStageName}"!`);
    } else {
      toast.info(`Order ${orderId} has already reached final delivery!`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'My Orders' }]} />

      {/* Page Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF9900]/15 text-[#FF9900]">
              <PackageCheck className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Ordered Details & Shipment Tracking
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            Real-time fulfillment tracking from Chennai Central Warehouse to your doorstep in Indian Rupees (₹).
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-[#2874F0] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1C5ED6]"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Shop More Items</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 flex gap-2 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#101828] text-white dark:bg-white dark:text-[#101828] shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/10'
          }`}
        >
          <span>All Orders</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
              activeTab === 'all' ? 'bg-[#FF9900] text-[#101828]' : 'bg-black/10 dark:bg-white/10'
            }`}
          >
            {orders.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('in_transit')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
            activeTab === 'in_transit'
              ? 'bg-[#2874F0] text-white shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/10'
          }`}
        >
          <Truck className="h-3.5 w-3.5" />
          <span>In Transit</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
              activeTab === 'in_transit' ? 'bg-white text-[#2874F0]' : 'bg-black/10 dark:bg-white/10'
            }`}
          >
            {inTransitCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('delivered')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
            activeTab === 'delivered'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/10'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Delivered</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
              activeTab === 'delivered' ? 'bg-white text-emerald-700' : 'bg-black/10 dark:bg-white/10'
            }`}
          >
            {deliveredCount}
          </span>
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders found"
          description={
            activeTab === 'all'
              ? "You haven't placed any orders yet. Discover 48+ products with fast delivery across India."
              : `No orders currently match the "${activeTab === 'in_transit' ? 'In Transit' : 'Delivered'}" status filter.`
          }
          actionLabel="Explore Catalog"
          onAction={() => navigate('/products')}
        />
      ) : (
        <div className="space-y-8">
          {filteredOrders.map((order) => {
            const currentStage = order.shipment?.currentStage ?? 0;
            const isDelivered = currentStage >= 4;
            const currentStageInfo = SHIPPING_STAGES[currentStage] || SHIPPING_STAGES[0];
            const orderDateStr = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Recently Placed';

            return (
              <div
                key={order.id}
                className="surface-card overflow-hidden rounded-3xl border shadow-lg transition-all"
                style={{ borderColor: 'var(--border-color)' }}
              >
                {/* 1. Order Summary Header */}
                <div
                  className="border-b p-5 sm:p-6"
                  style={{
                    backgroundColor: 'var(--bg-muted)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                            Order Reference
                          </span>
                          <span className="font-mono text-base font-black text-[#2874F0]">
                            {order.id}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                          Placed on: <span className="font-semibold text-slate-800 dark:text-slate-200">{orderDateStr}</span>
                        </p>
                      </div>

                      {/* Status Badge */}
                      {isDelivered ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Delivered to Customer</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2874F0]/15 px-3 py-1 text-xs font-extrabold text-[#2874F0] border border-[#2874F0]/30">
                          <Truck className="h-4 w-4 animate-bounce" />
                          <span>In Transit: {currentStageInfo.title}</span>
                        </span>
                      )}
                    </div>

                    {/* Right Action: Simulate Transit Step button */}
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <span className="block text-[11px] font-bold uppercase tracking-wider opacity-60">
                          Estimated Doorstep Delivery
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-xs sm:text-sm text-[#FF9900]">
                          <Calendar className="h-3.5 w-3.5" />
                          {order.shipment?.estimatedDelivery || 'In 3 Days'}
                        </span>
                      </div>

                      {!isDelivered ? (
                        <button
                          type="button"
                          onClick={() => handleSimulateAdvance(order.id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#FF9900] hover:bg-[#E68A00] px-4 py-2 text-xs font-black text-[#101828] shadow-md transition active:scale-95 cursor-pointer"
                          title="Simulate the next shipping milestone from warehouse to customer"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Simulate Next Transit Step</span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Fulfillment Complete</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-6">
                  {/* 2. Warehouse-to-Customer Origin → Courier → Destination Route Banner */}
                  <div
                    className="rounded-2xl border p-4 sm:p-5"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
                      {/* Origin: Warehouse */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2874F0]/15 text-[#2874F0]">
                          <Warehouse className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2874F0]">
                            Origin Fulfillment
                          </span>
                          <p className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                            {order.shipment?.warehouseName || 'Global Cart Central Fulfillment Warehouse'}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {order.shipment?.warehouseCity || 'Chennai, Tamil Nadu'}
                          </p>
                        </div>
                      </div>

                      {/* Center: Courier & AWB */}
                      <div className="flex flex-col items-center justify-center border-y py-3 md:border-y-0 md:border-x md:px-4 md:py-0 text-center" style={{ borderColor: 'var(--border-color)' }}>
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FF9900]/15 px-2 py-0.5 text-[11px] font-bold text-[#FF9900]">
                          <Truck className="h-3 w-3" />
                          <span>{order.shipment?.courierPartner || 'Global Express Logistics'}</span>
                        </span>
                        <p className="mt-1 font-mono text-xs font-extrabold tracking-wider">
                          AWB: {order.shipment?.awbNumber || 'GEX-IN-77492018'}
                        </p>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                          Speed Surface Express
                        </p>
                      </div>

                      {/* Destination: Customer Address */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                            Doorstep Destination
                          </span>
                          <p className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                            {order.customer?.fullName || 'Customer Recipient'}
                          </p>
                          <p className="text-xs line-clamp-1" style={{ color: 'var(--text-muted)' }}>
                            {order.customer?.address || 'Shipping Address'}, {order.customer?.city || 'Bengaluru'}, {order.customer?.state || 'Karnataka'} {order.customer?.zipCode || ''}
                          </p>
                          {order.customer?.phone && (
                            <p className="text-[11px] font-mono text-slate-500">
                              Tel: {order.customer.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. 5-Step Warehouse-to-Customer Shipment Timeline Tracker */}
                  <div
                    className="rounded-2xl border p-4 sm:p-6"
                    style={{
                      backgroundColor: 'var(--bg-muted)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#FF9900]" />
                        <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                          Live Shipment Journey
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-[#2874F0]">
                        Milestone {currentStage + 1} of 5
                      </span>
                    </div>

                    {/* Desktop Stepper */}
                    <div className="hidden md:grid grid-cols-5 gap-2 relative">
                      {/* Connecting Background Line */}
                      <div className="absolute top-5 left-10 right-10 h-1 bg-slate-300 dark:bg-slate-700 -z-0" />
                      {/* Completed Progress Line */}
                      <div
                        className="absolute top-5 left-10 h-1 bg-[#2874F0] transition-all duration-500 -z-0"
                        style={{
                          width: `${(currentStage / 4) * 82}%`,
                        }}
                      />

                      {SHIPPING_STAGES.map((stage) => {
                        const isCompleted = stage.step <= currentStage;
                        const isCurrent = stage.step === currentStage;
                        const StepIcon = stage.icon;
                        const timestamp = order.shipment?.stageTimestamps?.[stage.step];

                        return (
                          <div key={stage.step} className="flex flex-col items-center text-center relative z-10">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-full font-bold transition-all ${
                                isCurrent
                                  ? 'bg-[#FF9900] text-[#101828] ring-4 ring-[#FF9900]/30 shadow-md scale-110'
                                  : isCompleted
                                  ? 'bg-[#2874F0] text-white shadow-xs'
                                  : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                              }`}
                            >
                              <StepIcon className="h-5 w-5" />
                            </div>

                            <p
                              className={`mt-2.5 text-xs font-bold ${
                                isCurrent
                                  ? 'text-[#FF9900]'
                                  : isCompleted
                                  ? 'text-slate-900 dark:text-slate-100'
                                  : 'text-slate-400 dark:text-slate-600'
                              }`}
                            >
                              {stage.title}
                            </p>
                            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                              {stage.subtitle}
                            </span>

                            {timestamp ? (
                              <span className="mt-1 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                {timestamp}
                              </span>
                            ) : (
                              <span className="mt-1 text-[10px] text-slate-400">
                                Pending
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Mobile Stepper (Vertical) */}
                    <div className="md:hidden space-y-4">
                      {SHIPPING_STAGES.map((stage) => {
                        const isCompleted = stage.step <= currentStage;
                        const isCurrent = stage.step === currentStage;
                        const StepIcon = stage.icon;
                        const timestamp = order.shipment?.stageTimestamps?.[stage.step];

                        return (
                          <div key={stage.step} className="flex items-start gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold ${
                                isCurrent
                                  ? 'bg-[#FF9900] text-[#101828] ring-2 ring-[#FF9900]/40'
                                  : isCompleted
                                  ? 'bg-[#2874F0] text-white'
                                  : 'bg-slate-200 text-slate-400 dark:bg-slate-800'
                              }`}
                            >
                              <StepIcon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-xs font-bold ${isCurrent ? 'text-[#FF9900]' : ''}`}>
                                  {stage.title}
                                </p>
                                {timestamp && (
                                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                                    {timestamp}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                {stage.location} • {stage.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4 & 5. Ordered Items List + Payment Details & Receipt Breakdown */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left: Ordered Items List */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>
                        <h4 className="text-xs font-bold uppercase tracking-wider opacity-75">
                          Ordered Items ({order.items?.length || 0})
                        </h4>
                        <span className="text-xs text-slate-400">Full Details</span>
                      </div>

                      <div className="space-y-3">
                        {order.items?.map((item, idx) => (
                          <div
                            key={`${item.id}-${idx}`}
                            className="flex items-center gap-3.5 rounded-2xl border p-3 transition hover:border-[#2874F0]/40"
                            style={{
                              backgroundColor: 'var(--bg-secondary)',
                              borderColor: 'var(--border-color)',
                            }}
                          >
                            <Link
                              to={`/products/${item.id}`}
                              className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src =
                                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
                                }}
                                className="h-full w-full object-cover transition hover:scale-105"
                              />
                            </Link>

                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2874F0]">
                                {item.brand}
                              </span>
                              <Link
                                to={`/products/${item.id}`}
                                className="block line-clamp-1 text-xs sm:text-sm font-bold transition hover:text-[#2874F0]"
                              >
                                {item.name}
                              </Link>
                              <div className="mt-1 flex items-baseline gap-2 text-xs">
                                <span className="font-semibold text-slate-500">
                                  Qty: {item.quantity}
                                </span>
                                <span>•</span>
                                <span className="text-slate-500">
                                  {formatPrice(item.price)} each
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-sm font-black text-slate-900 dark:text-slate-100">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Payment Details & Receipt Panel */}
                    <div className="lg:col-span-5">
                      <div
                        className="rounded-2xl border p-4 sm:p-5 space-y-4"
                        style={{
                          backgroundColor: 'var(--bg-secondary)',
                          borderColor: 'var(--border-color)',
                        }}
                      >
                        <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>
                          <h4 className="text-xs font-bold uppercase tracking-wider opacity-75">
                            Payment Breakdown & Receipt
                          </h4>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>Verified</span>
                          </span>
                        </div>

                        {/* Payment Method & Transaction */}
                        <div
                          className="rounded-xl p-3 text-xs space-y-1.5"
                          style={{ backgroundColor: 'var(--bg-muted)' }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="opacity-70">Payment Method</span>
                            <span className="font-bold inline-flex items-center gap-1 text-[#2874F0]">
                              <CreditCard className="h-3.5 w-3.5" />
                              {order.payment?.method || 'Demo Credit Card'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="opacity-70">Transaction Reference</span>
                            <span className="font-mono font-bold text-[11px]">
                              {order.payment?.transactionId || 'TXN827419201'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="opacity-70">Payment Status</span>
                            <span
                              className={`rounded px-1.5 py-0.2 text-[10px] font-extrabold ${
                                order.payment?.status?.toLowerCase().includes('paid')
                                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                              }`}
                            >
                              {order.payment?.status || 'Paid'}
                            </span>
                          </div>
                        </div>

                        {/* Rupee Line Item Breakdown */}
                        <div className="space-y-2 border-t pt-3 text-xs" style={{ borderColor: 'var(--border-color)' }}>
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal</span>
                            <span className="font-semibold">
                              {formatPrice(order.payment?.subtotal ?? order.totals?.subtotal ?? 0)}
                            </span>
                          </div>

                          {(order.payment?.discount > 0 || order.totals?.couponDiscount > 0) && (
                            <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                              <span>Promo Discount</span>
                              <span className="font-semibold">
                                -{formatPrice(order.payment?.discount || order.totals?.couponDiscount)}
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span style={{ color: 'var(--text-secondary)' }}>Delivery Charges</span>
                            <span className="font-semibold">
                              {(order.payment?.shipping ?? order.totals?.shipping) === 0 ? (
                                <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                              ) : (
                                formatPrice(order.payment?.shipping ?? order.totals?.shipping)
                              )}
                            </span>
                          </div>

                          {(order.payment?.tax > 0 || order.totals?.tax > 0) && (
                            <div className="flex justify-between">
                              <span style={{ color: 'var(--text-secondary)' }}>GST / Tax (5%)</span>
                              <span className="font-semibold">
                                {formatPrice(order.payment?.tax ?? order.totals?.tax ?? 0)}
                              </span>
                            </div>
                          )}

                          <div
                            className="flex items-center justify-between border-t pt-2.5 text-sm font-extrabold"
                            style={{ borderColor: 'var(--border-color)' }}
                          >
                            <span>Total Paid</span>
                            <span className="text-base text-[#FF9900]">
                              {formatPrice(order.payment?.total ?? order.totals?.total ?? 0)}
                            </span>
                          </div>
                        </div>

                        <div className="pt-1 text-[11px] text-center text-slate-400">
                          GST Compliant Demo Invoice • All taxes included
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
