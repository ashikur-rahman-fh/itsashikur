import { describe, expect, it } from 'vitest';

import { ApiError } from '../api/core/errors';
import { CONTACT_COPY } from './contact';
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

  it('rejects names over the max length', () => {
    const result = validateContactFormClient({
      name: 'a'.repeat(121),
      email: 'jane@example.com',
      message: 'Hello, I would like to connect about a role.',
    });
    expect(result.fieldErrors.name).toBe(CONTACT_COPY.validation.nameTooLong);
  });

  it('uses email example in invalid email message', () => {
    const result = validateContactFormClient({
      name: 'Jane',
      email: 'not-an-email',
      message: 'Hello, I would like to connect about a role.',
    });
    expect(result.fieldErrors.email).toContain('name@example.com');
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

  it('falls back to contact generic message for unknown errors', () => {
    const result = mapContactApiErrorToFields(new Error('boom'));
    expect(result.formError).toBe(CONTACT_COPY.errors.generic);
  });
});
