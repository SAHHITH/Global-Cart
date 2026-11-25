import { Slider, Tag } from 'antd';
import { RotateCcw, Star, Filter } from 'lucide-react';
import { categories } from '@/data/categories';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/utils/formatPrice';

export function ProductFilters({ hideCategoryFilter = false }) {
  const {
    filters,
    brands,
    setCategory,
    toggleBrand,
    setPriceRange,
    setMinRating,
    setInStockOnly,
    setOnlyDeals,
    resetFilters,
  } = useProducts();

  const ratingOptions = [4.5, 4.0, 3.5];

  return (
    <aside
      className="rounded-2xl border p-5 space-y-6"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3.5" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#FF9900]" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider">Filters</h3>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2874F0] hover:underline cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      {!hideCategoryFilter && (
        <div>
          <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider opacity-75">
            Category
          </h4>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => setCategory('all')}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition cursor-pointer ${
                filters.category === 'all'
                  ? 'bg-[#2874F0] text-white'
                  : 'hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              <span>All Categories</span>
            </button>
            {categories.map((cat) => {
              const active = filters.category.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.name)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition cursor-pointer ${
                    active
                      ? 'bg-[#2874F0] text-white'
                      : 'hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="opacity-70">{cat.itemCount}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Ant Design Price Range Slider */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider opacity-75">Price Range</h4>
          <span className="text-xs font-bold text-[#2874F0]">
            {formatPrice(filters.minPrice)} – {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <div className="px-1">
          <Slider
            range
            min={0}
            max={200000}
            step={500}
            value={[filters.minPrice, filters.maxPrice]}
            onChange={([min, max]) => setPriceRange(min, max)}
          />
        </div>
      </div>

      {/* Minimum Customer Rating */}
      <div>
        <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider opacity-75">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {ratingOptions.map((rating) => {
            const active = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() => setMinRating(active ? 0 : rating)}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  active
                    ? 'bg-[#FF9900]/20 text-[#FF9900] ring-1 ring-[#FF9900]'
                    : 'hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                <Star className="h-3.5 w-3.5 fill-[#FF9900] text-[#FF9900]" />
                <span>{rating.toFixed(1)} Stars & Up</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability & Deals Toggles */}
      <div className="space-y-2.5 border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
        <label className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded accent-[#2874F0]"
          />
          <span>In Stock Only</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold">
          <input
            type="checkbox"
            checked={filters.onlyDeals}
            onChange={(e) => setOnlyDeals(e.target.checked)}
            className="h-4 w-4 rounded accent-[#FF9900]"
          />
          <span>Hot Deals (15%+ Off)</span>
        </label>
      </div>

      {/* Brand Multi-Select */}
      <div className="border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
        <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider opacity-75">Brands</h4>
        <div className="flex flex-wrap gap-1.5">
          {brands.map((brand) => {
            const selected = filters.brands.includes(brand);
            return (
              <Tag.CheckableTag
                key={brand}
                checked={selected}
                onChange={() => toggleBrand(brand)}
                className="m-0! rounded-lg! border! px-2.5! py-1! text-xs! font-semibold!"
              >
                {brand}
              </Tag.CheckableTag>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default ProductFilters;