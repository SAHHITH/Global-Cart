import { createTheme } from '@mui/material/styles';
import { theme as antdTheme } from 'antd';

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

export const BRAND_COLORS = {
  navy: '#101828',
  navyLight: '#1D2939',
  orange: '#FF9900',
  blue: '#2874F0',
  cloud: '#F5F7FA',
};

export function getSystemTheme() {
  if (typeof window === 'undefined') return THEME_MODES.LIGHT;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME_MODES.DARK
    : THEME_MODES.LIGHT;
}

export function resolveTheme(mode) {
  if (mode === THEME_MODES.SYSTEM) {
    return getSystemTheme();
  }
  return mode === THEME_MODES.DARK ? THEME_MODES.DARK : THEME_MODES.LIGHT;
}

export function getMuiTheme(resolvedMode) {
  const isDark = resolvedMode === THEME_MODES.DARK;
  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: BRAND_COLORS.orange,
        contrastText: '#101828',
      },
      secondary: {
        main: BRAND_COLORS.blue,
      },
      background: {
        default: isDark ? '#0B1120' : '#F5F7FA',
        paper: isDark ? '#101828' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F9FAFB' : '#101828',
        secondary: isDark ? '#D0D5DD' : '#475467',
      },
    },
    typography: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    },
    shape: {
      borderRadius: 10,
    },
  });
}

export function getAntdTheme(resolvedMode) {
  const isDark = resolvedMode === THEME_MODES.DARK;
  return {
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: BRAND_COLORS.blue,
      colorWarning: BRAND_COLORS.orange,
      colorBgContainer: isDark ? '#101828' : '#FFFFFF',
      colorBgElevated: isDark ? '#1D2939' : '#FFFFFF',
      borderRadius: 10,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    },
  };
}