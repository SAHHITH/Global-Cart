import { useMemo } from 'react';
import { useCartStore } from '@/features/cart/cartStore';
import { toast } from 'react-toastify';

export function useCart() {
  const items = useCartStore((state) => state.items);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const orders = useCartStore((state) => state.orders);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const clearCart = useCartStore((state) => state.clearCart);
  const placeOrder = useCartStore((state) => state.placeOrder);
  const advanceOrderStage = useCartStore((state) => state.advanceOrderStage);

  const totals = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const mrpTotal = items.reduce(
      (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
      0
    );
    const productSavings = Math.max(0, mrpTotal - subtotal);

    let couponDiscount = 0;
    if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
      couponDiscount =
        appliedCoupon.type === 'percent'
          ? (subtotal * appliedCoupon.value) / 100
          : appliedCoupon.value;
    }

    const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 79;
    const tax = Math.max(0, Math.round((subtotal - couponDiscount) * 0.05));
    const total = Math.max(0, subtotal - couponDiscount + shipping + tax);

    return {
      itemCount,
      subtotal: Number(subtotal.toFixed(2)),
      mrpTotal: Number(mrpTotal.toFixed(2)),
      productSavings: Number(productSavings.toFixed(2)),
      couponDiscount: Number(couponDiscount.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
    };
  }, [items, appliedCoupon]);

  const addToCartWithToast = (product, quantity = 1) => {
    addItem(product, quantity);
    toast.success(`Added "${product.name}" to your cart`);
  };

  return {
    items,
    isDrawerOpen,
    appliedCoupon,
    orders,
    totals,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    addItem: addToCartWithToast,
    addItemSilent: addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
    placeOrder,
    advanceOrderStage,
  };
}

export default useCart;