export const spacing = {
  // Base spacing unit (4px)
  base: 4,
  
  // Spacing scale
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 16,   // 16px
  lg: 24,   // 24px
  xl: 32,   // 32px
  xxl: 48,  // 48px
  xxxl: 64, // 64px
  
  // Layout spacing
  layout: {
    screenPadding: 16,
    sectionPadding: 24,
    contentSpacing: 16,
    cardPadding: 16,
  },
  
  // Component spacing
  components: {
    buttonPadding: 12,
    inputPadding: 12,
    iconSize: 24,
    avatarSize: 40,
    thumbnailSize: 80,
  },
  
  // Grid system
  grid: {
    gutter: 16,
    column: 8,
  },
} as const; 