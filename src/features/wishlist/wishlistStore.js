import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      isInWishlist: (productId) => get().items.some((item) => item.id === productId),

      addToWishlist: (product) => {
        if (get().isInWishlist(product.id)) return;
        set((state) => ({
          items: [
            ...state.items,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice || product.price,
              discount: product.discount || 0,
              rating: product.rating || 4.5,
              reviews: product.reviews || 0,
              image: product.image,
              brand: product.brand,
              category: product.category,
              stock: product.stock ?? 10,
            },
          ],
        }));
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      toggleWishlist: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeFromWishlist(product.id);
          return false;
        }
        get().addToWishlist(product);
        return true;
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'global-cart-wishlist',
    }
  )
);

export default useWishlistStore;