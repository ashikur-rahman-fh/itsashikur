import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { portfolioThemeId, portfolioThemeName } from './theme-config';
import { backgroundSurfaceTokens, semanticColorTokens, typographyTokens } from './tokens';

const themeCss = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../styles/theme.css'),
  'utf8',
);

function parseLightness(hslLine: string): number | null {
  const match = hslLine.match(/:\s*[\d.]+\s+[\d.]+%\s+([\d.]+)%/);
  return match ? Number(match[1]) : null;
}

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

  it('defines background surface tokens in theme.css', () => {
    for (const token of backgroundSurfaceTokens) {
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

  it('uses deep navy technical surfaces, not near-black', () => {
    const lightTechnical = themeCss.match(/--surface-technical:\s*([^;]+);/)?.[1];
    expect(lightTechnical).toBeTruthy();
    const lightL = parseLightness(`: ${lightTechnical}`);
    expect(lightL).not.toBeNull();
    expect(lightL!).toBeGreaterThanOrEqual(12);

    const darkBlock = themeCss.split('.dark {')[1];
    const darkTechnical = darkBlock.match(/--surface-technical:\s*([^;]+);/)?.[1];
    const darkBackground = darkBlock.match(/--background:\s*([^;]+);/)?.[1];
    const technicalL = parseLightness(`: ${darkTechnical}`);
    const backgroundL = parseLightness(`: ${darkBackground}`);
    expect(technicalL).not.toBeNull();
    expect(backgroundL).not.toBeNull();
    expect(technicalL!).toBeGreaterThanOrEqual(backgroundL!);
  });

  it('aliases surface-dark to surface-technical for backward compatibility', () => {
    expect(themeCss).toContain('--surface-dark: var(--surface-technical)');
    expect(themeCss).toContain('--surface-dark-foreground: var(--surface-technical-foreground)');
  });

  it('defines typography CSS variables', () => {
    expect(themeCss).toContain('--font-sans:');
    expect(themeCss).toContain('Inter');
    expect(themeCss).toContain('--font-display:');
    expect(themeCss).toContain('Space Grotesk');
    expect(themeCss).toContain('--font-mono:');
    expect(themeCss).toContain('Consolas');
    expect(typographyTokens.sans).toBe('--font-sans');
    expect(typographyTokens.display).toBe('--font-display');
    expect(typographyTokens.mono).toBe('--font-mono');
  });

  it('exports semantic color token list for tooling', () => {
    expect(semanticColorTokens).toContain('primary');
    expect(semanticColorTokens).toContain('card');
  });

  it('defines semantic type scale variables in theme.css', () => {
    expect(themeCss).toContain('--text-hero:');
    expect(themeCss).toContain('--text-section-title:');
    expect(themeCss).toContain('--text-card-title:');
    expect(themeCss).toContain('--text-stat:');
    expect(themeCss).toContain('--text-eyebrow:');
    expect(themeCss).toContain('--text-ui-sm:');
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
