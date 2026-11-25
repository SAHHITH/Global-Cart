import { Link } from 'react-router-dom';
import { Compass, Home, ShoppingBag } from 'lucide-react';

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF9900]/15 text-[#FF9900]">
        <Compass className="h-9 w-9" />
      </div>

      <span className="text-sm font-extrabold uppercase tracking-widest text-[#2874F0]">
        Error 404
      </span>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Page Not Found</h1>
      <p className="mt-2 max-w-md text-sm" style={{ color: 'var(--text-muted)' }}>
        The route you visited doesn’t exist or may have been moved. Jump back to the storefront
        below.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FF9900] px-5 py-3 text-sm font-extrabold text-[#101828] transition hover:bg-[#E68A00]"
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition hover:bg-black/5 dark:hover:bg-white/10"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Browse Catalog</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;