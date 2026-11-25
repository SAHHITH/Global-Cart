import { ProductCard } from './ProductCard';
import { EmptyState } from '@/components/common/EmptyState';

export function ProductGrid({
  products = [],
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  onResetFilters,
}) {
  if (!products.length) {
    return (
      <EmptyState
        title="No matching products found"
        description="We couldn't find any items matching your active search or filter criteria."
        actionLabel={onResetFilters ? 'Reset All Filters' : undefined}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className={`grid gap-5 ${columns}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;