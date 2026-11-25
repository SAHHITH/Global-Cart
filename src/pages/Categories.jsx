import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { categories } from '@/data/categories';
import { useProducts } from '@/hooks/useProducts';

export function Categories() {
  const { products } = useProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Categories' }]} />

      <div className="mb-8">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#2874F0]">
          Marketplace Directory
        </span>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Shop All Departments
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          Explore curated collections across {categories.length} major shopping categories.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const liveCount = products.filter(
            (p) => p.category.toLowerCase() === cat.name.toLowerCase()
          ).length;

          return (
            <Link
              key={cat.id}
              to={`/categories/${cat.slug}`}
              className="surface-card group overflow-hidden rounded-3xl flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = cat.fallbackImage;
                  }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#101828]/80 via-[#101828]/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-lg bg-[#FF9900] px-2.5 py-1 text-xs font-extrabold text-[#101828]">
                  {cat.featuredTag}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-xl font-extrabold">{cat.name}</h2>
                  <p className="text-xs text-slate-200">{liveCount} Available Items</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 p-5">
                <p className="text-xs sm:text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {cat.description}
                </p>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2874F0]/10 text-[#2874F0] transition group-hover:bg-[#2874F0] group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;