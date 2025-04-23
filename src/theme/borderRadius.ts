export const borderRadius = {
  // Base radius unit (4px)
  base: 4,
  
  // Border radius scale
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 12,   // 12px
  lg: 16,   // 16px
  xl: 24,   // 24px
  xxl: 32,  // 32px
  round: 9999, // For circular shapes
  
  // Component specific radius
  components: {
    button: 8,
    input: 8,
    card: 12,
    avatar: 20,
    modal: 16,
  },
} as const; 