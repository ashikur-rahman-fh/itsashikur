'use client';

import { useEffect, useState } from 'react';

import { navSectionIds, type NavSectionId } from '../data/portfolio';

const OBSERVER_ROOT_MARGIN = '-20% 0px -55% 0px';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function canTrackSections(enabled: boolean): boolean {
  return enabled && !prefersReducedMotion() && typeof IntersectionObserver !== 'undefined';
}

export function useActiveSection(enabled: boolean): NavSectionId | null {
  const [activeSection, setActiveSection] = useState<NavSectionId | null>(null);
  const trackingEnabled = canTrackSections(enabled);

  useEffect(() => {
    if (!trackingEnabled) {
      return;
    }

    const elements = navSectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const visibility = new Map<NavSectionId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as NavSectionId;
          if (!navSectionIds.includes(id)) {
            continue;
          }
          visibility.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId: NavSectionId | null = null;
        let bestRatio = 0;

        for (const id of navSectionIds) {
          const ratio = visibility.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) {
          setActiveSection(bestId);
        }
      },
      { rootMargin: OBSERVER_ROOT_MARGIN, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [trackingEnabled]);

  return trackingEnabled ? activeSection : null;
}
