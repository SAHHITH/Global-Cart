import { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/Sheet';
import { useProducts } from '@/hooks/useProducts';

export function Products() {
  const { filteredProducts, resetFilters, setSearchQuery } = useProducts();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'All Products' }]} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Explore All Products
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
            Browse our full multi-category catalog with real-time filtering and instant cart sync.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold lg:hidden cursor-pointer"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <SlidersHorizontal className="h-4 w-4 text-[#FF9900]" />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-3">
          <ProductFilters />
        </div>

        {/* Product Listing */}
        <div className="lg:col-span-9 space-y-5">
          <ProductSort totalCount={filteredProducts.length} />
          <ProductGrid
            products={filteredProducts}
            columns="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            onResetFilters={resetFilters}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen} side="left">
        <SheetHeader onClose={() => setMobileFiltersOpen(false)}>
          <SheetTitle>Filter Products</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <ProductFilters />
        </div>
      </Sheet>
    </div>
  );
}

export default Products;