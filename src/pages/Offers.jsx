import { Copy, Sparkles, Tag } from 'lucide-react';
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductGrid } from '@/components/product/ProductGrid';
import { activeOffers } from '@/data/offers';
import { useProducts } from '@/hooks/useProducts';

export function Offers() {
  const { products } = useProducts();
  const discountedProducts = products
    .filter((p) => (p.discount || 0) >= 18)
    .sort((a, b) => b.discount - a.discount);

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    toast.success(`Copied promo code "${code}" to clipboard!`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Exclusive Offers' }]} />

      {/* Hero Banner */}
      <div className="mb-10 rounded-3xl bg-linear-to-r from-[#101828] via-[#1D2939] to-[#2874F0] p-6 sm:p-10 text-white shadow-lg">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF9900] px-3 py-1 text-xs font-extrabold uppercase text-[#101828]">
          <Sparkles className="h-3.5 w-3.5" />
          Global Cart Rewards
        </span>
        <h1 className="mt-3 text-2xl font-extrabold sm:text-4xl">
          Promo Codes & Flash Markdowns
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-200">
          Copy any active coupon below and apply it inside your Cart or Checkout summary for instant savings.
        </p>
      </div>

      {/* Coupon Cards */}
      <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {activeOffers.map((offer) => (
          <div
            key={offer.id}
            className="surface-card flex flex-col justify-between rounded-2xl p-5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-extrabold text-white"
                  style={{ backgroundColor: offer.badgeColor }}
                >
                  {offer.discountText}
                </span>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {offer.category}
                </span>
              </div>

              <h3 className="mt-3 text-base font-extrabold">{offer.title}</h3>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {offer.description}
              </p>
            </div>

            <div
              className="mt-5 flex items-center justify-between rounded-xl border border-dashed px-3.5 py-2.5"
              style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-strong)' }}
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-sm font-extrabold text-[#2874F0]">
                <Tag className="h-4 w-4" />
                {offer.code}
              </span>
              <button
                type="button"
                onClick={() => copyCode(offer.code)}
                className="inline-flex items-center gap-1 rounded-lg bg-[#101828] px-2.5 py-1 text-xs font-bold text-white transition hover:bg-[#FF9900] hover:text-[#101828] cursor-pointer"
              >
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Discounted Catalog */}
      <div>
        <h2 className="mb-5 text-xl font-extrabold sm:text-2xl">
          Top Discounted Products ({discountedProducts.length})
        </h2>
        <ProductGrid products={discountedProducts} />
      </div>
    </div>
  );
}

export default Offers;