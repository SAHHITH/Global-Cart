import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { dealProductIds } from '@/data/offers';

export function DealOfTheDay() {
  const { products } = useProducts();
  const [secondsLeft, setSecondsLeft] = useState(5 * 3600 + 42 * 60 + 18);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 6 * 3600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const dealProducts = products.filter((p) => dealProductIds.includes(p.id)).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div
        className="rounded-3xl border p-6 sm:p-8"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
        }}
      >
        {/* Header Bar with Countdown */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b pb-5" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF9900] text-[#101828]">
                <Flame className="h-5 w-5 fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold sm:text-2xl">Deal of the Day</h2>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Limited-stock flash markdowns refreshed daily
                </p>
              </div>
            </div>

            {/* Live Countdown Pill */}
            <div className="inline-flex items-center gap-2 rounded-xl bg-[#101828] px-3.5 py-2 text-xs font-bold text-white">
              <Clock className="h-4 w-4 text-[#FF9900]" />
              <span className="text-slate-300">Ends in:</span>
              <span className="font-mono text-sm font-extrabold text-[#FF9900]">
                {hours}:{minutes}:{seconds}
              </span>
            </div>
          </div>

          <Link
            to="/offers"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#2874F0] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1C5ED6]"
          >
            <span>See All Deals</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 4 Deal Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DealOfTheDay;