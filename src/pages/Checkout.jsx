import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Lock, CreditCard, Wallet, Truck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/common/Button';
import { CartSummary } from '@/components/cart/CartSummary';
import { formatPrice } from '@/utils/formatPrice';
import { useCart } from '@/hooks/useCart';

const CHECKOUT_STEPS = ['Shipping Address', 'Payment Method', 'Review & Confirm'];

export function Checkout() {
  const navigate = useNavigate();
  const { items, totals, placeOrder } = useCart();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'card',
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <EmptyState
          icon={ShoppingBag}
          title="No items ready for checkout"
          description="Add products to your cart before proceeding to simulated checkout."
          actionLabel="Browse Products"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAddress = () => {
    if (
      !formData.fullName.trim() ||
      !formData.email.includes('@') ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.zipCode.trim()
    ) {
      toast.error('Please complete all required shipping fields.');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (activeStep === 0 && !validateAddress()) return;
    setActiveStep((prev) => Math.min(2, prev + 1));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateAddress()) {
      setActiveStep(0);
      return;
    }

    const order = placeOrder({
      customer: formData,
      totals,
    });

    toast.success(`Order ${order.id} placed successfully!`);
    navigate('/order-success', { state: { order } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Cart', path: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Secure Checkout</h1>
        <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
          Frontend simulation mode — no real payment details are collected or charged.
        </p>
      </div>

      {/* MUI Stepper */}
      <div
        className="mb-8 rounded-2xl border p-4 sm:p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {CHECKOUT_STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Form Steps */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-8 space-y-6">
          {/* Step 0: Shipping */}
          {activeStep === 0 && (
            <div
              className="rounded-2xl border p-6 space-y-4"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-[#2874F0]" />
                <h2 className="text-lg font-extrabold">1. Delivery Details</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Alex Mercer"
                    required
                    className="w-full rounded-xl border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
                    style={{ borderColor: 'var(--border-color)' }}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    required
                    className="w-full rounded-xl border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
                    style={{ borderColor: 'var(--border-color)' }}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
                    style={{ borderColor: 'var(--border-color)' }}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold">Postal / PIN Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="560103"
                    required
                    className="w-full rounded-xl border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
                    style={{ borderColor: 'var(--border-color)' }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Flat 402, Green Glen Layout, Outer Ring Road"
                    required
                    className="w-full rounded-xl border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
                    style={{ borderColor: 'var(--border-color)' }}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Bengaluru"
                    required
                    className="w-full rounded-xl border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
                    style={{ borderColor: 'var(--border-color)' }}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold">State / Region</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Karnataka"
                    className="w-full rounded-xl border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
                    style={{ borderColor: 'var(--border-color)' }}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <Button onClick={handleNextStep}>Continue to Payment →</Button>
              </div>
            </div>
          )}

          {/* Step 1: Payment Option (Demo UI only) */}
          {activeStep === 1 && (
            <div
              className="rounded-2xl border p-6 space-y-5"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#FF9900]" />
                <h2 className="text-lg font-extrabold">2. Select Simulated Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { id: 'card', label: 'Demo Credit / Debit Card', desc: 'Instant test authorization' },
                  { id: 'wallet', label: 'Global Pay Wallet', desc: 'One-click express checkout' },
                  { id: 'cod', label: 'Pay on Delivery', desc: 'Cash or UPI upon arrival' },
                ].map((opt) => {
                  const selected = formData.paymentMethod === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: opt.id }))}
                      className={`rounded-2xl border p-4 text-left transition cursor-pointer ${
                        selected
                          ? 'border-[#2874F0] bg-[#2874F0]/10 ring-1 ring-[#2874F0]'
                          : 'hover:border-[#2874F0]/50'
                      }`}
                      style={!selected ? { borderColor: 'var(--border-color)' } : undefined}
                    >
                      <Wallet className="h-5 w-5 text-[#2874F0]" />
                      <p className="mt-2 text-sm font-bold">{opt.label}</p>
                      <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-3">
                <Button variant="outline" onClick={() => setActiveStep(0)}>
                  ← Back to Shipping
                </Button>
                <Button onClick={handleNextStep}>Review Order →</Button>
              </div>
            </div>
          )}

          {/* Step 2: Final Review */}
          {activeStep === 2 && (
            <div
              className="rounded-2xl border p-6 space-y-5"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg font-extrabold">3. Review Your Order</h2>
              </div>

              <div
                className="rounded-xl border p-4 text-sm space-y-1"
                style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-color)' }}
              >
                <p className="font-bold">Delivering to: {formData.fullName}</p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {formData.address}, {formData.city} {formData.state} {formData.zipCode}
                </p>
                <p className="text-xs uppercase font-bold text-[#2874F0] pt-1">
                  Payment Mode: {formData.paymentMethod} (Simulated)
                </p>
              </div>

              <div className="space-y-2.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2.5 text-sm"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    <span className="font-medium">
                      {item.name} × <strong>{item.quantity}</strong>
                    </span>
                    <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Button variant="outline" onClick={() => setActiveStep(1)}>
                  ← Change Payment
                </Button>
                <Button type="submit" size="lg">
                  <Lock className="h-4 w-4" />
                  <span>Confirm & Place Order ({formatPrice(totals.total)})</span>
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Right Summary */}
        <div className="lg:col-span-4">
          <CartSummary showCoupon />
        </div>
      </div>
    </div>
  );
}

export default Checkout;