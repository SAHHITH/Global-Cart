import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/common/Button';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/hooks/useCart';

export function Cart() {
  const navigate = useNavigate();
  const { items, totals, clearCart } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Your Shopping Cart
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
            {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'} saved in your local browser cart
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 px-3.5 py-2 text-xs font-bold text-red-500 transition hover:bg-red-500/10 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your Global Cart is currently empty"
          description="Explore our catalog of electronics, fashion, home essentials, and daily deals to start building your order."
          actionLabel="Explore Products"
          onAction={() => navigate('/products')}
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-3.5">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2874F0] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <CartSummary
              actionButton={
                <Button size="lg" onClick={() => navigate('/checkout')} className="w-full">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;