import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Button } from '@/components/common/Button';

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Order & Shipping Inquiry',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes('@') || !form.message.trim()) {
      toast.error('Please fill in your name, valid email, and message.');
      return;
    }
    toast.success('Message sent! Our support team will reply within 24 hours.');
    setForm({ name: '', email: '', subject: 'Order & Shipping Inquiry', message: '' });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Contact Support' }]} />

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Get in Touch</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          Have a question about an order, product warranty, or seller partnership? Reach out below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Contact Cards */}
        <div className="lg:col-span-5 space-y-4">
          {[
            {
              icon: Mail,
              title: 'Email Support',
              detail: 'support@globalcart.demo',
              sub: 'Average response time: under 4 hours',
            },
            {
              icon: Phone,
              title: 'Customer Helpline',
              detail: '1800-123-4562 (Toll Free)',
              sub: 'Mon – Sat, 9:00 AM – 9:00 PM IST',
            },
            {
              icon: MapPin,
              title: 'Global Operations Hub',
              detail: '350 Fifth Avenue, Suite 4200, New York, NY',
              sub: 'Fulfillment centers across North America & Asia',
            },
            {
              icon: Clock,
              title: 'Live Order Assistance',
              detail: '24/7 Automated & Specialist Desk',
              sub: 'Instant tracking & return label generation',
            },
          ].map(({ icon: Icon, title, detail, sub }) => (
            <div key={title} className="surface-card flex items-start gap-3.5 rounded-2xl p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF9900]/15 text-[#FF9900]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold">{title}</h3>
                <p className="text-sm font-semibold text-[#2874F0]">{detail}</p>
                <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 rounded-2xl border p-6 sm:p-8 space-y-4"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <h2 className="text-lg font-extrabold">Send Us a Message</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold">Your Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full rounded-xl border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
                style={{ borderColor: 'var(--border-color)' }}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full rounded-xl border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
                style={{ borderColor: 'var(--border-color)' }}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold">Topic</label>
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <option>Order & Shipping Inquiry</option>
              <option>Returns & Refunds</option>
              <option>Product Warranty Support</option>
              <option>Seller & Brand Onboarding</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold">Message *</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us how we can help..."
              className="w-full rounded-xl border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-[#2874F0]"
              style={{ borderColor: 'var(--border-color)' }}
            />
          </div>

          <Button type="submit" size="lg">
            <Send className="h-4 w-4" />
            <span>Send Message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Contact;