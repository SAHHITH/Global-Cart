import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import { useCart } from '@/hooks/useCart';

export function CartItem({ item, compact = false, onNavigate }) {
  const { incrementQuantity, decrementQuantity, removeItem } = useCart();

  return (
    <div
      className={`flex gap-3.5 rounded-2xl border p-3.5 ${compact ? 'items-center' : 'items-start sm:items-center'}`}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <Link
        to={`/products/${item.id}`}
        onClick={onNavigate}
        className={`shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 ${
          compact ? 'h-16 w-16' : 'h-20 w-20 sm:h-24 sm:w-24'
        }`}
      >
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
          }}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#2874F0]">
          {item.brand}
        </p>
        <Link
          to={`/products/${item.id}`}
          onClick={onNavigate}
          className="line-clamp-1 text-sm font-bold transition hover:text-[#2874F0]"
        >
          {item.name}
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-extrabold">{formatPrice(item.price * item.quantity)}</span>
          {item.quantity > 1 && (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              ({formatPrice(item.price)} each)
            </span>
          )}
        </div>

        {/* Quantity Stepper & Remove */}
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <div
            className="inline-flex items-center rounded-lg border"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <button
              type="button"
              onClick={() => decrementQuantity(item.id)}
              aria-label="Decrease quantity"
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-7 text-center text-xs font-bold">{item.quantity}</span>
            <button
              type="button"
              onClick={() => incrementQuantity(item.id)}
              aria-label="Increase quantity"
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label="Remove item"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-500/10 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {!compact && <span>Remove</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;