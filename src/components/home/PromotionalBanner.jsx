import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { promotionalBanners } from '@/data/banners';

export function PromotionalBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {promotionalBanners.map((banner) => {
          const isBlue = banner.theme === 'blue';
          return (
            <div
              key={banner.id}
              className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-lg ${
                isBlue
                  ? 'bg-linear-to-br from-[#2874F0] to-[#101828]'
                  : 'bg-linear-to-br from-[#101828] to-[#1D2939]'
              }`}
            >
              <div className="relative z-10 max-w-xs space-y-3">
                <span className="inline-block rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#FF9900]">
                  {banner.tag}
                </span>
                <h3 className="text-xl font-extrabold sm:text-2xl">{banner.title}</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {banner.description}
                </p>
                <div className="pt-2">
                  <Link
                    to={banner.link}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF9900] px-4 py-2.5 text-xs font-extrabold text-[#101828] transition hover:bg-[#E68A00]"
                  >
                    <span>{banner.ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <img
                src={banner.image}
                alt={banner.title}
                className="pointer-events-none absolute -bottom-4 -right-4 h-44 w-44 sm:h-52 sm:w-52 rounded-2xl object-cover opacity-35 sm:opacity-65 shadow-xl"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PromotionalBanner;