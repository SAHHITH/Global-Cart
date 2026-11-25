import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

export function FeaturedProducts() {
  const { featuredProducts, bestsellers } = useProducts();
  const [activeTab, setActiveTab] = useState('featured');

  const displayed =
    activeTab === 'featured' ? featuredProducts.slice(0, 8) : bestsellers.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF9900]">
            Handpicked For You
          </span>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {activeTab === 'featured' ? 'Featured Showcase' : 'Trending Bestsellers'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="inline-flex rounded-xl border p-1"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('featured')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                activeTab === 'featured'
                  ? 'bg-[#101828] text-white dark:bg-[#FF9900] dark:text-[#101828]'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              Featured
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bestsellers')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                activeTab === 'bestsellers'
                  ? 'bg-[#101828] text-white dark:bg-[#FF9900] dark:text-[#101828]'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              Bestsellers
            </button>
          </div>

          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-[#2874F0] hover:underline"
          >
            <span>Browse All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <ProductGrid products={displayed} />
    </section>
  );
}

export default FeaturedProducts;