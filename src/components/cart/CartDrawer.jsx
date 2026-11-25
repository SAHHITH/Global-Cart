import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/Sheet';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/common/Button';
import { CartItem } from './CartItem';
import { formatPrice } from '@/utils/formatPrice';
import { useCart } from '@/hooks/useCart';

export function CartDrawer() {
  const navigate = useNavigate();
  const { items, totals, isDrawerOpen, closeDrawer } = useCart();

  const handleGoToCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeDrawer();
    navigate('/cart');
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()} side="right">
      <SheetHeader onClose={closeDrawer}>
        <SheetTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-[#FF9900]" />
          <span>Your Cart ({totals.itemCount})</span>
        </SheetTitle>
      </SheetHeader>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Looks like you haven't added any items to your Global Cart yet."
            actionLabel="Start Shopping"
            onAction={() => {
              closeDrawer();
              navigate('/products');
            }}
          />
        ) : (
          items.map((item) => (
            <CartItem key={item.id} item={item} compact onNavigate={closeDrawer} />
          ))
        )}
      </div>

      {/* Footer Summary */}
      {items.length > 0 && (
        <div
          className="border-t p-4 space-y-3"
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-muted)' }}
        >
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Estimated Subtotal
            </span>
            <span className="text-lg font-extrabold">{formatPrice(totals.subtotal)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Button variant="outline" onClick={handleViewCart} className="w-full">
              View Full Cart
            </Button>
            <Button onClick={handleGoToCheckout} className="w-full">
              <span>Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Sheet>
  );
}

export default CartDrawer;