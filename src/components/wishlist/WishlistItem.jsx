import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { RatingStars } from '@/components/common/RatingStars';
import { Button } from '@/components/common/Button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

export function WishlistItem({ item }) {
  const { addItem } = useCart();
  const { removeFromWishlist } = useWishlist();

  const handleMoveToCart = () => {
    addItem(item, 1);
    removeFromWishlist(item.id);
  };

  return (
    <div className="surface-card flex flex-col justify-between rounded-2xl p-4">
      <div>
        <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
          <Link to={`/products/${item.id}`}>
            <img
              src={item.image}
              alt={item.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
              }}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <button
            type="button"
            onClick={() => removeFromWishlist(item.id)}
            aria-label="Remove from wishlist"
            className="absolute right-2.5 top-2.5 rounded-full bg-white/90 p-2 text-slate-600 shadow-xs transition hover:bg-red-50 hover:text-red-600 dark:bg-slate-900/90 dark:text-slate-300 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-[#2874F0]">{item.brand}</p>
        <Link
          to={`/products/${item.id}`}
          className="mt-1 line-clamp-2 text-sm font-bold transition hover:text-[#2874F0]"
        >
          {item.name}
        </Link>

        <div className="mt-2">
          <RatingStars rating={item.rating} reviews={item.reviews} />
        </div>
      </div>

      <div className="mt-4 space-y-3 border-t pt-3" style={{ borderColor: 'var(--border-color)' }}>
        <PriceDisplay price={item.price} originalPrice={item.originalPrice} size="sm" />

        <Button
          onClick={handleMoveToCart}
          disabled={item.stock <= 0}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{item.stock > 0 ? 'Move to Cart' : 'Out of Stock'}</span>
        </Button>
      </div>
    </div>
  );
}

export default WishlistItem;