import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';

export function WishlistButton({ product, variant = 'icon', className = '' }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const saved = isInWishlist(product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${
          saved
            ? 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400'
            : 'border-(--border-color) bg-(--bg-secondary) hover:border-rose-500/50'
        } ${className}`}
      >
        <Heart className={`h-4 w-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
        <span>{saved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-xs backdrop-blur-xs transition hover:scale-105 cursor-pointer ${
        saved
          ? 'border-rose-500/40 bg-rose-50 text-rose-500 dark:bg-rose-950/80'
          : 'border-(--border-color) bg-white/90 text-slate-700 hover:text-rose-500 dark:bg-slate-900/90 dark:text-slate-200'
      } ${className}`}
    >
      <Heart className={`h-4 w-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
    </button>
  );
}

export default WishlistButton;