import { useThemeStore } from '@/features/theme/themeStore';

export function useTheme() {
  const mode = useThemeStore((state) => state.mode);
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const cycleTheme = useThemeStore((state) => state.cycleTheme);

  return {
    mode,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    setTheme,
    cycleTheme,
  };
}

export default useTheme;