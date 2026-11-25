import { NavLink } from 'react-router-dom';
import { Home, Grid, ShoppingBag, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

export function MobileBottomNav() {
  const { totals, openDrawer } = useCart();
  const { count: wishlistCount } = useWishlist();

  const navItems = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/categories', label: 'Categories', icon: Grid },
    { to: '/products', label: 'Shop', icon: ShoppingBag },
    { to: '/wishlist', label: 'Wishlist', icon: Heart, badge: wishlistCount },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t py-2 md:hidden shadow-lg"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      {navItems.map(({ to, label, icon: Icon, end, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `relative flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-semibold transition ${
              isActive ? 'text-[#FF9900]' : 'opacity-70 hover:opacity-100'
            }`
          }
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
          {badge > 0 && (
            <span className="absolute right-1.5 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2874F0] px-1 text-[10px] font-bold text-white">
              {badge}
            </span>
          )}
        </NavLink>
      ))}

      <button
        type="button"
        onClick={openDrawer}
        className="relative flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-semibold opacity-80 hover:opacity-100 cursor-pointer"
      >
        <ShoppingCart className="h-5 w-5 text-[#FF9900]" />
        <span>Cart</span>
        {totals.itemCount > 0 && (
          <span className="absolute right-1.5 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF9900] px-1 text-[10px] font-extrabold text-[#101828]">
            {totals.itemCount}
          </span>
        )}
      </button>
    </nav>
  );
}

export default MobileBottomNav;