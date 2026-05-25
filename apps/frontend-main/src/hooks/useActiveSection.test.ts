import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useActiveSection } from './useActiveSection';

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe() {}

  disconnect() {}

  trigger(id: string, ratio: number, isIntersecting = ratio > 0) {
    this.callback(
      [
        {
          target: { id } as Element,
          isIntersecting,
          intersectionRatio: ratio,
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
}

describe('useActiveSection', () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    for (const id of ['about', 'experience', 'skills', 'contact']) {
      const element = document.createElement('section');
      element.id = id;
      document.body.appendChild(element);
    }
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  it('returns null when disabled', () => {
    const { result } = renderHook(() => useActiveSection(false));
    expect(result.current).toBeNull();
  });

  it('tracks the section with the highest intersection ratio', async () => {
    const { result } = renderHook(() => useActiveSection(true));

    await waitFor(() => {
      expect(MockIntersectionObserver.instances.length).toBeGreaterThan(0);
    });

    const observer = MockIntersectionObserver.instances[0];
    observer.trigger('about', 0.2);
    observer.trigger('experience', 0.6);

    await waitFor(() => {
      expect(result.current).toBe('experience');
    });
  });
});
