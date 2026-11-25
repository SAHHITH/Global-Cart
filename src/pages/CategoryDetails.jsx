import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EmptyState } from '@/components/common/EmptyState';
import { categories } from '@/data/categories';
import { useProducts } from '@/hooks/useProducts';

export function CategoryDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { filteredProducts, setCategory, resetFilters } = useProducts();

  const categoryObj = categories.find((c) => c.slug === slug);

  useEffect(() => {
    if (categoryObj) {
      resetFilters();
      setCategory(categoryObj.name);
    }
    return () => {
      setCategory('all');
    };
  }, [categoryObj, setCategory, resetFilters]);

  if (!categoryObj) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <EmptyState
          title="Category Not Found"
          description="We couldn't find the department you requested."
          actionLabel="Browse All Categories"
          onAction={() => navigate('/categories')}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Categories', path: '/categories' },
          { label: categoryObj.name },
        ]}
      />

      {/* Category Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-[#101828] p-6 sm:p-10 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-block rounded-md bg-[#FF9900] px-2.5 py-0.5 text-xs font-extrabold uppercase text-[#101828]">
            {categoryObj.featuredTag}
          </span>
          <h1 className="text-2xl font-extrabold sm:text-4xl">{categoryObj.name}</h1>
          <p className="text-sm text-slate-300">{categoryObj.description}</p>
        </div>
        <img
          src={categoryObj.image}
          alt={categoryObj.name}
          className="pointer-events-none absolute right-0 top-0 h-full w-1/2 object-cover opacity-25"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <ProductFilters hideCategoryFilter />
        </div>

        <div className="lg:col-span-9 space-y-5">
          <ProductSort totalCount={filteredProducts.length} />
          <ProductGrid
            products={filteredProducts}
            columns="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            onResetFilters={() => {
              resetFilters();
              setCategory(categoryObj.name);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryDetails;