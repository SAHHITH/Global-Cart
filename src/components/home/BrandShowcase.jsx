import { useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';
import { trustedBrands } from '@/data/banners';
import { useProducts } from '@/hooks/useProducts';

export function BrandShowcase() {
  const navigate = useNavigate();
  const { resetFilters, toggleBrand } = useProducts();

  const handleSelectBrand = (brandName) => {
    resetFilters();
    toggleBrand(brandName);
    navigate('/products');
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div className="mb-5 flex items-center gap-2">
        <Award className="h-5 w-5 text-[#FF9900]" />
        <h2 className="text-xl font-extrabold sm:text-2xl">Official Partner Brands</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {trustedBrands.map((brand) => (
          <button
            key={brand.id}
            type="button"
            onClick={() => handleSelectBrand(brand.name)}
            className="surface-card flex flex-col items-center justify-center rounded-2xl p-4 text-center transition hover:border-[#2874F0] cursor-pointer"
          >
            <span className="text-base font-extrabold tracking-tight">{brand.name}</span>
            <span className="mt-0.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
              {brand.tagline}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default BrandShowcase;