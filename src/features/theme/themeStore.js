import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { THEME_MODES, resolveTheme } from './themeConfig';

export const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: THEME_MODES.SYSTEM,
      resolvedTheme: resolveTheme(THEME_MODES.SYSTEM),

      setTheme: (mode) => {
        const resolved = resolveTheme(mode);
        set({ mode, resolvedTheme: resolved });
      },

      syncSystemTheme: () => {
        const currentMode = get().mode;
        if (currentMode === THEME_MODES.SYSTEM) {
          set({ resolvedTheme: resolveTheme(THEME_MODES.SYSTEM) });
        }
      },

      cycleTheme: () => {
        const order = [THEME_MODES.LIGHT, THEME_MODES.DARK, THEME_MODES.SYSTEM];
        const nextIndex = (order.indexOf(get().mode) + 1) % order.length;
        get().setTheme(order[nextIndex]);
      },
    }),
    {
      name: 'global-cart-theme',
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.resolvedTheme = resolveTheme(state.mode);
        }
      },
    }
  )
);

export default useThemeStore;