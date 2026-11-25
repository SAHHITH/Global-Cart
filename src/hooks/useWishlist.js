import { useWishlistStore } from '@/features/wishlist/wishlistStore';
import { toast } from 'react-toastify';

export function useWishlist() {
  const items = useWishlistStore((state) => state.items);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const toggleWishlistWithToast = (product) => {
    const added = toggleWishlist(product);
    if (added) {
      toast.info(`Saved "${product.name}" to wishlist`);
    } else {
      toast.warn(`Removed "${product.name}" from wishlist`);
    }
    return added;
  };

  return {
    items,
    count: items.length,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist: toggleWishlistWithToast,
    clearWishlist,
  };
}

export default useWishlist;