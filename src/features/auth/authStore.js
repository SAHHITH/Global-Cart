import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (userData) => {
        set({
          user: {
            id: userData?.id || `usr-${Date.now()}`,
            name: userData?.name || 'Shopper',
            email: userData?.email || '',
            role: userData?.role || 'shopper',
            avatar: userData?.avatar || null,
          },
          isAuthenticated: true,
        });
      },

      register: (userData) => {
        set({
          user: {
            id: userData?.id || `usr-${Date.now()}`,
            name: userData?.name || 'New Member',
            email: userData?.email || '',
            role: userData?.role || 'shopper',
            avatar: userData?.avatar || null,
          },
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'global-cart-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
