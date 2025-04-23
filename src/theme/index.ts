import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { borderRadius } from './borderRadius';
import { shadows } from './shadows';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

// Type for the theme object
export type Theme = typeof theme;

// Export individual theme components
export { colors, typography, spacing, borderRadius, shadows }; 