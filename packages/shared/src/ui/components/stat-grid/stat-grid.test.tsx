import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatGrid } from './stat-grid';

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
});
