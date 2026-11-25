import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';

  const { filteredProducts, setSearchQuery, setCategory, resetFilters } = useProducts();

  useEffect(() => {
    setSearchQuery(query);
    setCategory(category);
  }, [query, category, setSearchQuery, setCategory]);

  const handleClearSearch = () => {
    resetFilters();
    setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Search Results' }]} />

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2874F0]/15 text-[#2874F0]">
          <Search className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold sm:text-2xl">
            {query ? (
              <>
                Search results for <span className="text-[#FF9900]">“{query}”</span>
              </>
            ) : (
              'All Searchable Products'
            )}
          </h1>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            {category !== 'all' ? `Filtered in ${category}` : 'Across all departments'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <ProductFilters />
        </div>

        <div className="lg:col-span-9 space-y-5">
          <ProductSort totalCount={filteredProducts.length} />
          <ProductGrid
            products={filteredProducts}
            columns="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            onResetFilters={handleClearSearch}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchResults;