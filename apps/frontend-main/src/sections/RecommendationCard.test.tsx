import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { RecommendationCard } from './RecommendationCard';

describe('RecommendationCard', () => {
  it('expands full quote with aria-expanded', async () => {
    const user = userEvent.setup();
    render(
      <RecommendationCard
        name="Zubayet Zaman Zico"
        role="Software Development Lead"
        relationship="Managed Ashikur directly"
        quote="Short quote."
        fullQuote="Short quote. Additional detail from the full recommendation."
      />,
    );

    const toggle = screen.getByRole('button', { name: 'Read full recommendation' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Additional detail from the full recommendation/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show less' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('hides expand control when full quote matches short quote', () => {
    render(
      <RecommendationCard
        name="Redoan Ur Rahman"
        role="Software Technical Lead"
        relationship="Senior colleague"
        quote="Same text."
        fullQuote="Same text."
      />,
    );

    expect(
      screen.queryByRole('button', { name: 'Read full recommendation' }),
    ).not.toBeInTheDocument();
  });
});
