import { useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { useThemeStore } from './themeStore';
import { getMuiTheme, getAntdTheme, THEME_MODES } from './themeConfig';

export function ThemeProvider({ children }) {
  const mode = useThemeStore((state) => state.mode);
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme);
  const syncSystemTheme = useThemeStore((state) => state.syncSystemTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', resolvedTheme);
    if (resolvedTheme === THEME_MODES.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => syncSystemTheme();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode, syncSystemTheme]);

  const muiTheme = useMemo(() => getMuiTheme(resolvedTheme), [resolvedTheme]);
  const antdTheme = useMemo(() => getAntdTheme(resolvedTheme), [resolvedTheme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <AntdConfigProvider theme={antdTheme}>{children}</AntdConfigProvider>
    </MuiThemeProvider>
  );
}

export default ThemeProvider;