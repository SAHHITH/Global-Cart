import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/categories';

export function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#2874F0]">
            Curated Departments
          </span>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Shop by Category
          </h2>
        </div>
        <Link
          to="/categories"
          className="inline-flex items-center gap-1 text-sm font-bold text-[#2874F0] hover:underline"
        >
          <span>View All</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/categories/${cat.slug}`}
            className="surface-card group flex flex-col overflow-hidden rounded-2xl p-3 text-center"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = cat.fallbackImage;
                }}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-108"
              />
              <span className="absolute bottom-2 left-2 right-2 rounded-md bg-[#101828]/85 px-2 py-0.5 text-[10px] font-bold text-[#FF9900] backdrop-blur-xs">
                {cat.featuredTag}
              </span>
            </div>

            <h3 className="mt-3 text-sm font-extrabold transition group-hover:text-[#2874F0]">
              {cat.name}
            </h3>
            <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              {cat.itemCount} Products
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;