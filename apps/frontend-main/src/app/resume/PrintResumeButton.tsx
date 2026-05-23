'use client';

import { Button } from '@ashikur-portfolio/shared/ui';

export function PrintResumeButton() {
  return (
    <Button type="button" size="lg" onClick={() => window.print()}>
      Print / Save PDF
    </Button>
  );
}
