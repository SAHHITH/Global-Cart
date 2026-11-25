import { useNavigate } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { WishlistItem } from '@/components/wishlist/WishlistItem';
import { useWishlist } from '@/hooks/useWishlist';

export function Wishlist() {
  const navigate = useNavigate();
  const { items, clearWishlist } = useWishlist();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Saved Wishlist</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
            {items.length} saved {items.length === 1 ? 'item' : 'items'} synced locally
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 px-3.5 py-2 text-xs font-bold text-red-500 transition hover:bg-red-500/10 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No saved favorites yet"
          description="Tap the heart icon on any product card to bookmark items for later comparison."
          actionLabel="Discover Products"
          onAction={() => navigate('/products')}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;