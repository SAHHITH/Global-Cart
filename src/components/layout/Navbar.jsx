import { NavLink, Link } from 'react-router-dom';
import { Flame, Grid, ShieldCheck, PackageCheck } from 'lucide-react';
import { primaryNavLinks, categoryQuickLinks } from '@/data/navigation';
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/Sheet';
import { useCart } from '@/hooks/useCart';

export function Navbar({ mobileOpen, onCloseMobile }) {
  const { orders } = useCart();
  return (
    <>
      {/* Desktop Secondary Navigation Strip */}
      <nav
        aria-label="Primary Navigation"
        className="hidden lg:block border-b border-white/10 bg-[#1D2939] text-white"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs font-semibold">
          {/* Category Quick Links */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <Link
              to="/categories"
              className="mr-1.5 inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[#FF9900] hover:bg-white/15"
            >
              <Grid className="h-3.5 w-3.5" />
              <span>All Categories</span>
            </Link>

            {categoryQuickLinks.slice(1).map((cat) => (
              <NavLink
                key={cat.path}
                to={cat.path}
                className={({ isActive }) =>
                  `shrink-0 rounded-lg px-2.5 py-1.5 transition whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2874F0] text-white'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {cat.label}
              </NavLink>
            ))}
          </div>

          {/* Right Page Links */}
          <div className="flex items-center gap-4 shrink-0 pl-3">
            {primaryNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `inline-flex items-center gap-1 transition ${
                    isActive ? 'text-[#FF9900]' : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="inline-flex items-center gap-0.5 rounded bg-[#FF9900] px-1.5 py-0.2 text-[10px] font-extrabold text-[#101828]">
                    <Flame className="h-2.5 w-2.5" />
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Navigation Sheet */}
      <Sheet open={mobileOpen} onOpenChange={onCloseMobile} side="left">
        <SheetHeader onClose={() => onCloseMobile(false)}>
          <SheetTitle>
            Global<span className="text-[#FF9900]">Cart</span> Menu
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider opacity-60">
              Pages
            </p>
            <div className="space-y-1">
              {primaryNavLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => onCloseMobile(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-[#FF9900] text-[#101828]'
                        : 'hover:bg-black/5 dark:hover:bg-white/10'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded bg-[#2874F0] px-2 py-0.5 text-[10px] font-bold text-white">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}

              <NavLink
                to="/orders"
                onClick={() => onCloseMobile(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#FF9900] text-[#101828]'
                      : 'hover:bg-black/5 dark:hover:bg-white/10'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <PackageCheck className="h-4 w-4 text-[#2874F0]" />
                  <span>My Orders</span>
                </span>
                {orders && orders.length > 0 && (
                  <span className="rounded bg-[#2874F0] px-2 py-0.5 text-[10px] font-bold text-white">
                    {orders.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>

          <div>
            <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider opacity-60">
              Shop by Category
            </p>
            <div className="space-y-1">
              {categoryQuickLinks.map((cat) => (
                <NavLink
                  key={cat.path}
                  to={cat.path}
                  onClick={() => onCloseMobile(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-[#2874F0]/15 text-[#2874F0] font-semibold'
                        : 'hover:bg-black/5 dark:hover:bg-white/10'
                    }`
                  }
                >
                  {cat.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl border p-3.5 text-xs"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-muted)' }}
          >
            <div className="flex items-center gap-2 font-bold text-[#2874F0]">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Buyer Protection</span>
            </div>
            <p className="mt-1 opacity-75">
              30-day hassle-free returns and verified authentic brands across every order.
            </p>
          </div>
        </div>
      </Sheet>
    </>
  );
}

export default Navbar;