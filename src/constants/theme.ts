export const Colors = {
  light: {
    primary: '#6366F1',
    primaryDark: '#4F46E5',
    secondary: '#F59E0B',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceVariant: '#F3F4F6',
    text: '#1F2937',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    heart: '#EF4444',
    gradient: ['#6366F1', '#8B5CF6'],
  },
  dark: {
    primary: '#818CF8',
    primaryDark: '#6366F1',
    secondary: '#FBBF24',
    background: '#0F172A',
    surface: '#1E293B',
    surfaceVariant: '#334155',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    border: '#334155',
    error: '#F87171',
    success: '#34D399',
    heart: '#F87171',
    gradient: ['#4F46E5', '#7C3AED'],
  },
  rose: {
    primary: '#F43F5E',
    primaryDark: '#E11D48',
    secondary: '#FB923C',
    background: '#FFF1F2',
    surface: '#FFFFFF',
    surfaceVariant: '#FFE4E6',
    text: '#1F2937',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#FECDD3',
    error: '#EF4444',
    success: '#10B981',
    heart: '#F43F5E',
    gradient: ['#F43F5E', '#FB7185'],
  },
  ocean: {
    primary: '#0EA5E9',
    primaryDark: '#0284C7',
    secondary: '#14B8A6',
    background: '#F0F9FF',
    surface: '#FFFFFF',
    surfaceVariant: '#E0F2FE',
    text: '#0C4A6E',
    textSecondary: '#0369A1',
    textTertiary: '#7DD3FC',
    border: '#BAE6FD',
    error: '#EF4444',
    success: '#10B981',
    heart: '#EF4444',
    gradient: ['#0EA5E9', '#06B6D4'],
  },
};

export type ThemeType = keyof typeof Colors;
export type ColorScheme = typeof Colors.light;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FontSizes = {
  small: {
    quote: 18,
    author: 14,
    body: 14,
    title: 20,
    header: 24,
  },
  medium: {
    quote: 22,
    author: 16,
    body: 16,
    title: 24,
    header: 28,
  },
  large: {
    quote: 26,
    author: 18,
    body: 18,
    title: 28,
    header: 32,
  },
};

export type FontSizeType = keyof typeof FontSizes;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

