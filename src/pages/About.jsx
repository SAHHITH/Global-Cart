import { Link } from 'react-router-dom';
import { Globe2, ShieldCheck, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export function About() {
  const highlights = [
    {
      icon: Globe2,
      title: 'Curated Global Marketplace',
      description:
        'Bringing together flagship electronics, tailored apparel, culinary appliances, and sports gear in one unified storefront.',
    },
    {
      icon: Cpu,
      title: 'Modern Multi-UI Architecture',
      description:
        'Engineered with React, Vite, Tailwind CSS, shadcn/ui primitives, Material UI, Ant Design, Zustand, and Recharts.',
    },
    {
      icon: ShieldCheck,
      title: 'Instant Local Persistence',
      description:
        'Your shopping bag, saved wishlist, and light/dark/system theme preferences persist seamlessly in browser LocalStorage.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <div className="rounded-3xl bg-[#101828] p-8 sm:p-12 text-white shadow-xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#FF9900]">
          <Sparkles className="h-3.5 w-3.5" />
          Our Story
        </span>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl leading-tight">
          Built for effortless, high-speed product discovery.
        </h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
          Global Cart combines intuitive marketplace navigation with crisp Midnight Navy and
          Marketplace Orange design tokens—delivering a responsive, distraction-free shopping
          experience across desktop, tablet, and mobile devices.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {highlights.map(({ icon: Icon, title, description }) => (
          <div key={title} className="surface-card rounded-2xl p-6 space-y-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2874F0]/15 text-[#2874F0]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-extrabold">{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {description}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <div>
          <h3 className="text-lg font-extrabold">Ready to explore our catalog?</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Browse 32 curated products across 6 departments.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FF9900] px-5 py-3 text-sm font-extrabold text-[#101828] transition hover:bg-[#E68A00]"
        >
          <span>Shop All Products</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default About;