import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  LayoutDashboard,
  Menu,
  LogIn,
  LogOut,
  ChevronDown,
  PackageCheck,
} from 'lucide-react';
import { SearchBar } from '@/components/common/SearchBar';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuthStore } from '@/features/auth/authStore';

export function Header({ onOpenMobileMenu }) {
  const navigate = useNavigate();
  const { totals, openDrawer, orders } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#101828] text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Left: Mobile Menu + Brand Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="rounded-xl p-2 text-white hover:bg-white/10 lg:hidden cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF9900] text-[#101828] shadow-xs transition-transform group-hover:scale-105">
              <ShoppingCart className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div className="leading-tight">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                Global<span className="text-[#FF9900]">Cart</span>
              </span>
              <span className="hidden sm:block text-[10px] font-medium uppercase tracking-widest text-slate-400">
                Smart Marketplace
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl px-3">
          <SearchBar />
        </div>

        {/* Right: Navigation Links & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Top Header Links: About & Contact */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-300 mr-1">
            <Link
              to="/about"
              className="transition hover:text-[#FF9900] hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="transition hover:text-[#FF9900] hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>

          <ThemeToggle variant="header" />

          {/* Login / Account Dropdown */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20 cursor-pointer">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9900] text-[#101828] text-[10px] font-black uppercase">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="hidden sm:inline max-w-24 truncate font-bold">
                  {user.name?.split(' ')[0] || 'Account'}
                </span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="right" className="w-56 p-2 space-y-1">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-xs font-extrabold truncate" style={{ color: 'var(--text-primary)' }}>
                    {user.name}
                  </p>
                  <p className="text-[11px] truncate opacity-70" style={{ color: 'var(--text-muted)' }}>
                    {user.email || 'shopper@globalcart.com'}
                  </p>
                  {user.role === 'admin' && (
                    <span className="mt-1 inline-block rounded bg-[#2874F0]/20 px-2 py-0.5 text-[10px] font-extrabold text-[#2874F0]">
                      Admin User
                    </span>
                  )}
                </div>

                <DropdownMenuItem
                  onClick={() => navigate('/orders')}
                  className="cursor-pointer"
                >
                  <PackageCheck className="h-4 w-4 text-[#FF9900]" />
                  <span>My Orders & Tracking</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate('/admin')}
                  className="cursor-pointer"
                >
                  <LayoutDashboard className="h-4 w-4 text-[#2874F0]" />
                  <span>Admin Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate('/wishlist')}
                  className="cursor-pointer"
                >
                  <Heart className="h-4 w-4 text-rose-400" />
                  <span>My Wishlist</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate('/cart')}
                  className="cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4 text-[#FF9900]" />
                  <span>My Cart</span>
                </DropdownMenuItem>

                <div className="border-t border-white/10 my-1 pt-1" />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-500 hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              title="Sign in to your account"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              <LogIn className="h-4 w-4 text-[#FF9900]" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}

          {/* Wishlist Button */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
          >
            <Heart className="h-4 w-4 text-rose-400" />
            <span className="hidden lg:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2874F0] px-1 text-[11px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Orders Button (Next to Cart) */}
          <Link
            to="/orders"
            aria-label="My Orders and Tracking"
            title="My Orders & Tracking"
            className="relative inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
          >
            <PackageCheck className="h-4 w-4 text-[#FF9900]" />
            <span className="hidden sm:inline">Orders</span>
            {orders && orders.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2874F0] px-1 text-[11px] font-bold text-white">
                {orders.length}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open shopping cart"
            className="relative inline-flex items-center gap-2 rounded-xl bg-[#FF9900] px-3.5 py-2 text-xs sm:text-sm font-bold text-[#101828] transition hover:bg-[#E68A00] cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#101828] px-1.5 text-[11px] font-extrabold text-[#FF9900]">
              {totals.itemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="border-t border-white/10 px-4 py-2.5 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
