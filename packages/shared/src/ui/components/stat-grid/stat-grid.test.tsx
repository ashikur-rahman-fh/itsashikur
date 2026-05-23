import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatGrid } from './stat-grid';

const fiveItems = [
  { value: '3+', label: 'years experience' },
  { value: '1500+', label: 'problems solved' },
  { value: '1792', label: 'max rating' },
  { value: '60%+', label: 'traceability', highlight: true },
  { value: '25%', label: 'faster fixes', highlight: true },
];

describe('StatGrid', () => {
  it('renders stat values and labels', () => {
    render(
      <StatGrid
        items={[
          { value: '3+', label: 'years experience' },
          { value: '1792', label: 'max rating', highlight: true },
        ]}
        columns={2}
      />,
    );
    expect(screen.getByText('3+')).toBeInTheDocument();
    expect(screen.getByText('years experience')).toBeInTheDocument();
    expect(screen.getByText('1792')).toBeInTheDocument();
  });

  it('renders 3+2 centered rows when columns is 5', () => {
    const { container } = render(<StatGrid items={fiveItems} columns={5} />);
    const layout = container.querySelector('[data-stat-layout="3-2"]');
    expect(layout).toBeInTheDocument();

    const lists = layout?.querySelectorAll('ul');
    expect(lists).toHaveLength(2);

    expect(lists?.[0]).toHaveClass('sm:grid-cols-3');
    expect(lists?.[1]).toHaveClass('sm:w-2/3', 'mx-auto');

    const topItems = lists?.[0].querySelectorAll('li');
    expect(topItems?.[2]).toHaveClass('col-span-2', 'justify-center');

    expect(screen.getAllByRole('list')).toHaveLength(2);
    expect(screen.getAllByText(/traceability|faster fixes/)).toHaveLength(2);
  });
});
