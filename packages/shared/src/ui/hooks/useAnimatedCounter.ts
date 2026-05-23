'use client';

import * as React from 'react';

export type UseAnimatedCounterOptions = {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
};

function parseNumericValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) {
    return { prefix: '', num: 0, suffix: value };
  }
  return { prefix: match[1] ?? '', num: Number(match[2]), suffix: match[3] ?? '' };
}

export function useAnimatedCounter({
  end,
  duration = 1200,
  start = 0,
  enabled = true,
}: UseAnimatedCounterOptions) {
  const [value, setValue] = React.useState(start);
  const reducedMotion = React.useMemo(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  React.useEffect(() => {
    if (!enabled || reducedMotion) {
      setValue(end);
      return;
    }

    let frame = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, enabled, end, reducedMotion, start]);

  return value;
}

export function formatAnimatedStat(displayValue: string, animatedNum: number): string {
  const { prefix, suffix } = parseNumericValue(displayValue);
  return `${prefix}${animatedNum}${suffix}`;
}
