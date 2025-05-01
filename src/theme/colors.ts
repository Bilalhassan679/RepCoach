export const colors = {
  // Primary Colors
  primary: {
    main: 'rgba(239, 0, 0, 1)',
    light: '#E0F2FE',
    dark: '#0250C5',
    contrast: '#FFFFFF',
  },

  // Secondary Colors
  secondary: {
    main: '#FF3B30',
    light: '#FF6B64',
    dark: '#CC2F26',
    contrast: '#FFFFFF',
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    grey100: '#F3F4F6',
    grey200: '#E5E7EB',
    grey300: '#D1D5DB',
    grey400: '#9CA3AF',
    grey500: '#6B7280',
    grey600: '#4B5563',
    grey700: '#374151',
    grey800: '#1F2937',
    grey900: '#111827',
  },

  // Status Colors
  status: {
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5856D6',
  },

  // Background Colors
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    dark: '#121212',
    shadow: '#F79B001A',
  },

  // Text Colors
  text: 'rgba(17, 18, 20, 1)',
  disabled: '#9E9E9E',
  hint: '#9E9E9E',
  inverse: '#FFFFFF',
  danger: '#FF3B30',

  // Border Colors
  border: {
    primary: '#F1F1F1',
    light: '#E0E0E0',
    main: '#BDBDBD',
    dark: '#757575',
    thin: '#E8E8E8',
  },

  // Overlay Colors
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',
    main: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.8)',
  },
} as const;
