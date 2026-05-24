import { CONTACT_COPY } from './contact';
import { isApiError, USER_MESSAGES } from '../api/core/errors';

export type ContactFieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export type ContactFormErrorState = {
  fieldErrors: ContactFieldErrors;
  formError: string | null;
};

const FIELD_KEY_MAP: Record<string, keyof ContactFieldErrors> = {
  name: 'name',
  email: 'email',
  message: 'message',
};

function detailToFieldMessage(field: keyof ContactFieldErrors, detail: unknown): string {
  if (typeof detail === 'string' && detail.trim()) {
    return detail;
  }
  if (Array.isArray(detail) && typeof detail[0] === 'string') {
    return detail[0];
  }
  if (field === 'name') {
    return CONTACT_COPY.validation.nameRequired;
  }
  if (field === 'email') {
    return CONTACT_COPY.validation.emailInvalid;
  }
  return CONTACT_COPY.validation.messageRequired;
}

export function mapContactApiErrorToFields(error: unknown): ContactFormErrorState {
  const fieldErrors: ContactFieldErrors = {};
  let formError: string | null = null;

  if (isApiError(error)) {
    if (error.isValidationError && error.details && typeof error.details === 'object') {
      for (const [key, value] of Object.entries(error.details as Record<string, unknown>)) {
        const field = FIELD_KEY_MAP[key];
        if (field) {
          fieldErrors[field] = detailToFieldMessage(field, value);
        }
      }
    }

    if (error.status === 429) {
      formError = CONTACT_COPY.errors.rateLimited;
    } else if (error.isNetworkError) {
      formError = CONTACT_COPY.errors.network;
    } else if (error.isTimeout) {
      formError = CONTACT_COPY.errors.timeout;
    } else if (error.isServerError) {
      formError = CONTACT_COPY.errors.serverUnavailable;
    } else if (!Object.keys(fieldErrors).length) {
      formError = error.message || CONTACT_COPY.errors.generic;
    }
  } else {
    formError = CONTACT_COPY.errors.generic;
  }

  if (!formError && !Object.keys(fieldErrors).length) {
    formError = USER_MESSAGES.unknown;
  }

  return { fieldErrors, formError };
}

export function validateContactFormClient(values: {
  name: string;
  email: string;
  message: string;
}): ContactFormErrorState {
  const fieldErrors: ContactFieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    fieldErrors.name = CONTACT_COPY.validation.nameRequired;
  }
  if (!email) {
    fieldErrors.email = CONTACT_COPY.validation.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = CONTACT_COPY.validation.emailInvalid;
  }
  if (!message) {
    fieldErrors.message = CONTACT_COPY.validation.messageRequired;
  } else if (message.length < 20) {
    fieldErrors.message = CONTACT_COPY.validation.messageTooShort;
  } else if (message.length > 5000) {
    fieldErrors.message = CONTACT_COPY.validation.messageTooLong;
  }

  return {
    fieldErrors,
    formError: null,
  };
}
