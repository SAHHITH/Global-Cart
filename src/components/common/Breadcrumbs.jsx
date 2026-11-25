import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
      <Link
        to="/"
        className="inline-flex items-center gap-1 font-medium transition hover:text-[#2874F0]"
        style={{ color: 'var(--text-muted)' }}
      >
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.label} className="inline-flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            {isLast || !item.path ? (
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="font-medium transition hover:text-[#2874F0]"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;