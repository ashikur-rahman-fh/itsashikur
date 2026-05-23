import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { portfolioThemeId, portfolioThemeName } from './theme-config';
import { semanticColorTokens, typographyTokens } from './tokens';

const themeCss = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../styles/theme.css'),
  'utf8',
);

describe('Ashikur Portfolio theme tokens', () => {
  it('exports a stable theme id and display name', () => {
    expect(portfolioThemeId).toBe('ashikur-portfolio');
    expect(portfolioThemeName).toBe('Ashikur Portfolio');
  });

  it('defines semantic color variables in theme.css', () => {
    for (const token of semanticColorTokens) {
      expect(themeCss).toContain(`--${token}:`);
    }
  });

  it('uses premium navy primary in light mode', () => {
    expect(themeCss).toMatch(/--primary:\s*222 47% 14%/);
    expect(themeCss).toMatch(/--background:\s*210 25% 98%/);
  });

  it('uses cyan-forward primary in dark mode', () => {
    expect(themeCss).toMatch(/\.dark[\s\S]*--primary:\s*199 70% 55%/);
  });

  it('defines surface-dark tokens for dark sections', () => {
    expect(themeCss).toContain('--surface-dark:');
    expect(themeCss).toContain('--surface-dark-foreground:');
  });

  it('defines typography CSS variables', () => {
    expect(themeCss).toContain('--font-sans:');
    expect(themeCss).toContain('Inter');
    expect(themeCss).toContain('--font-display:');
    expect(themeCss).toContain('Plus Jakarta Sans');
    expect(themeCss).toContain('--font-mono:');
    expect(themeCss).toContain('JetBrains Mono');
    expect(typographyTokens.sans).toBe('--font-sans');
    expect(typographyTokens.mono).toBe('--font-mono');
  });

  it('exports semantic color token list for tooling', () => {
    expect(semanticColorTokens).toContain('primary');
    expect(semanticColorTokens).toContain('card');
  });

  it('defines moderate radius scale in theme.css', () => {
    expect(themeCss).toContain('--radius-xs: 0.25rem');
    expect(themeCss).toContain('--radius-sm: 0.375rem');
    expect(themeCss).toContain('--radius-md: 0.5rem');
    expect(themeCss).toContain('--radius-lg: 0.625rem');
    expect(themeCss).toContain('--radius-xl: 0.75rem');
    expect(themeCss).toContain('--radius: 0.5rem');
  });
});
