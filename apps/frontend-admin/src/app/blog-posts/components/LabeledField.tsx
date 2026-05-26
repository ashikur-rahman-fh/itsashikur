import type { ReactNode } from 'react';

export type LabeledFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export function LabeledField({ id, label, error, children }: LabeledFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-body-sm font-medium text-foreground">
        {label}
      </label>
      <div aria-invalid={error ? true : undefined} aria-describedby={errorId}>
        {children}
      </div>
      {error ? (
        <p id={errorId} className="text-body-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
