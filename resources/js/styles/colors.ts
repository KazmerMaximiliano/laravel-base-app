export const colors = {
  // Primary Colors
  primary: "#283593",
  primaryLight: "#3949ab",
  primaryDark: "#1c258c",

  // Secondary Colors
  white: "#ffffff",
  black: "#000000",

  // Neutral Colors (Gray Scale)
  gray: {
    900: "#333333",
    700: "#475569",
    600: "#666666",
    500: "#64748b",
    400: "#6b7280",
    300: "#cbd5e1",
    200: "#e0e0e0",
    150: "#e5e7eb",
    100: "#f9fafb",
  },

  // Success Colors (Scale)
  success: {
    base: "#4caf50",
    light: "rgba(76, 175, 80, 0.1)",
    dark: "#357a3a",
  },

  // Danger Colors (Scale)
  danger: {
    base: "#f44336",
    light: "rgba(244, 67, 54, 0.1)",
    dark: "#d32f2f",
  },

  // Info Colors (Scale)
  info: {
    base: "#283593",
    100: "rgba(40, 53, 147, 0.1)",
    200: "rgba(40, 53, 147, 0.15)",
    300: "rgba(40, 53, 147, 0.55)",
    400: "rgba(40, 53, 147, 0.75)",
  },

  // White Transparency Scale
  whiteOpacity: {
    100: "rgba(255, 255, 255, 0.15)",
    200: "rgba(255, 255, 255, 0.25)",
    300: "rgba(255, 255, 255, 0.55)",
  },

  // Black Transparency Scale
  blackOpacity: {
    100: "rgba(0, 0, 0, 0.1)",
    200: "rgba(0, 0, 0, 0.5)",
  },

  // Border Colors
  border: {
    light: "rgba(40, 53, 147, 0.15)",
  },

  // Shadow
  shadow: "rgba(0, 0, 0, 0.1)",
} as const;

// Alias for easier access to commonly used colors
export const colorAliases = {
  // Primary colors
  primaryColor: colors.primary,
  primaryColorLight: colors.primaryLight,
  primaryColorDark: colors.primaryDark,

  // Text colors
  textPrimary: colors.primary,
  textSecondary: colors.gray[600],
  textTertiary: colors.gray[500],
  textDisabled: colors.gray[400],

  // Background colors
  bgPrimary: colors.white,
  bgSecondary: colors.gray[100],
  bgTertiary: colors.gray[150],

  // Border colors
  borderColor: colors.border.light,
  borderColorDark: colors.info[300],

  // Feedback colors
  successColor: colors.success.base,
  successColorLight: colors.success.light,
  successColorDark: colors.success.dark,

  dangerColor: colors.danger.base,
  dangerColorLight: colors.danger.light,
  dangerColorDark: colors.danger.dark,

  infoColor: colors.info.base,
  infoColorLight: colors.info[100],
  infoColorMedium: colors.info[200],
  infoColorMediumHigh: colors.info[300],
  infoColorHigh: colors.info[400],

  // Overlay colors
  overlayDark: colors.blackOpacity[200],
  overlayLight: colors.blackOpacity[100],

  // Shadow color
  shadowColor: colors.shadow,
} as const;

/**
 * Type-safe color utilities
 */

export type ColorName = keyof typeof colors;
export type ColorAliasName = keyof typeof colorAliases;

/**
 * Get color value with optional fallback
 */
export const getColor = (
  colorName: ColorName,
  fallback?: string
): string | object => {
  return colors[colorName] ?? fallback ?? colors.primary;
};

/**
 * Get color alias with optional fallback
 */
export const getColorAlias = (
  aliasName: ColorAliasName,
  fallback?: string
): string => {
  return colorAliases[aliasName] ?? fallback ?? colors.primary;
};
