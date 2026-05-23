/** Ashikur Portfolio — muted, light theme for the personal site. */
export const portfolioThemeId = 'ashikur-portfolio' as const;

export const portfolioThemeName = 'Ashikur Portfolio' as const;

export const defaultThemeConfig = {
  attribute: 'class' as const,
  defaultTheme: 'system' as const,
  enableSystem: true,
  disableTransitionOnChange: false,
};

export type ThemeConfig = typeof defaultThemeConfig;
