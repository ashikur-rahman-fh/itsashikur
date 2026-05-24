import { describe, expect, it } from 'vitest';

import { ApiError } from '../api/core/errors';
import { mapContactApiErrorToFields, validateContactFormClient } from './contact-errors';

describe('validateContactFormClient', () => {
  it('returns errors for empty fields', () => {
    const result = validateContactFormClient({ name: '', email: '', message: '' });
    expect(result.fieldErrors.name).toBeTruthy();
    expect(result.fieldErrors.email).toBeTruthy();
    expect(result.fieldErrors.message).toBeTruthy();
  });

  it('accepts valid input', () => {
    const result = validateContactFormClient({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Hello, I would like to connect about a role.',
    });
    expect(Object.keys(result.fieldErrors)).toHaveLength(0);
  });
});

describe('mapContactApiErrorToFields', () => {
  it('maps validation details to fields', () => {
    const error = new ApiError({
      message: 'Validation failed',
      status: 400,
      code: 'VALIDATION_ERROR',
      details: { email: 'Please enter a valid email address so I can reply to you.' },
      isValidationError: true,
    });
    const result = mapContactApiErrorToFields(error);
    expect(result.fieldErrors.email).toContain('valid email');
  });
});
