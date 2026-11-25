import { ArrowUpDown } from 'lucide-react';
import { Select } from '@/components/ui/Select';
import { useProducts } from '@/hooks/useProducts';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Recommendations' },
  { value: 'popular', label: 'Most Popular (Reviews)' },
  { value: 'rating', label: 'Highest Customer Rating' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'discount', label: 'Biggest Discount %' },
  { value: 'newest', label: 'Newest Arrivals' },
];

export function ProductSort({ totalCount }) {
  const { sortBy, setSortBy } = useProducts();

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        Showing <span className="font-extrabold text-[#2874F0]">{totalCount}</span>{' '}
        {totalCount === 1 ? 'product' : 'products'}
      </p>

      <div className="flex items-center gap-2">
        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold opacity-75">
          <ArrowUpDown className="h-3.5 w-3.5" />
          Sort by:
        </span>
        <Select
          value={sortBy}
          onChange={setSortBy}
          options={SORT_OPTIONS}
          ariaLabel="Sort products"
          className="min-w-51.25"
        />
      </div>
    </div>
  );
}

export default ProductSort;