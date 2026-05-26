'use client';

import {
  contactApi,
  CONTACT_COPY,
  mapContactApiErrorToFields,
  MESSAGE_MAX_LENGTH,
  validateContactFormClient,
} from '@ashikur-portfolio/shared/api';
import {
  Button,
  ErrorAlert,
  FormField,
  Input,
  SuccessAlert,
  Textarea,
} from '@ashikur-portfolio/shared/ui';
import { useEffect, useId, useRef, useState, type FormEvent, type RefObject } from 'react';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FieldKey = keyof FormValues;

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  message: '',
};

const FIELD_ORDER: FieldKey[] = ['name', 'email', 'message'];

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>(CONTACT_COPY.success.description);

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const honeypotId = useId();
  const formErrorId = useId();
  const successRef = useRef<HTMLDivElement>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const fieldRefs: Record<FieldKey, RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    name: nameInputRef,
    email: emailInputRef,
    message: messageInputRef,
  };

  function focusFirstError(errors: Partial<Record<FieldKey, string>>) {
    for (const key of FIELD_ORDER) {
      if (errors[key]) {
        fieldRefs[key].current?.focus();
        return;
      }
    }
  }

  function clearFieldError(field: FieldKey) {
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleFieldChange(field: FieldKey, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  }

  function resetForAnother() {
    setValues(INITIAL_VALUES);
    setHoneypot('');
    setFieldErrors({});
    setFormError(null);
    setIsSuccess(false);
    setSuccessMessage(CONTACT_COPY.success.description);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const clientValidation = validateContactFormClient(values);
    if (Object.keys(clientValidation.fieldErrors).length > 0) {
      const errors = clientValidation.fieldErrors as Partial<Record<FieldKey, string>>;
      setFieldErrors(errors);
      setFormError(null);
      focusFirstError(errors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);

    try {
      const response = await contactApi.submit({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        website: honeypot,
      });
      setSuccessMessage(response.message || CONTACT_COPY.success.description);
      setIsSuccess(true);
    } catch (error) {
      const mapped = mapContactApiErrorToFields(error);
      const errors = mapped.fieldErrors as Partial<Record<FieldKey, string>>;
      setFieldErrors(errors);
      setFormError(mapped.formError);
      if (Object.keys(errors).length > 0) {
        focusFirstError(errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      successRef.current?.focus();
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 outline-none"
        data-testid="contact-form-success"
      >
        <SuccessAlert title={CONTACT_COPY.success.title} description={successMessage} />
        <p className="text-body-sm text-muted-foreground">{CONTACT_COPY.success.followUp}</p>
        <Button type="button" variant="outline" onClick={resetForAnother}>
          {CONTACT_COPY.success.sendAnother}
        </Button>
      </div>
    );
  }

  const formDescribedBy = formError ? formErrorId : undefined;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
      data-testid="contact-form"
      aria-busy={isSubmitting}
      aria-describedby={formDescribedBy}
    >
      <p className="text-body-sm text-muted-foreground">{CONTACT_COPY.formIntro}</p>

      {formError ? (
        <ErrorAlert
          id={formErrorId}
          title={CONTACT_COPY.errors.formTitle}
          description={formError}
        />
      ) : null}

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={honeypotId}>Website</label>
        <input
          id={honeypotId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <FormField
        id={nameId}
        label={CONTACT_COPY.fields.name.label}
        error={fieldErrors.name}
        required
      >
        <Input
          ref={nameInputRef}
          name="name"
          type="text"
          autoComplete="name"
          placeholder={CONTACT_COPY.fields.name.placeholder}
          value={values.name}
          onChange={(event) => handleFieldChange('name', event.target.value)}
          disabled={isSubmitting}
          maxLength={120}
        />
      </FormField>

      <FormField
        id={emailId}
        label={CONTACT_COPY.fields.email.label}
        error={fieldErrors.email}
        required
      >
        <Input
          ref={emailInputRef}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={CONTACT_COPY.fields.email.placeholder}
          value={values.email}
          onChange={(event) => handleFieldChange('email', event.target.value)}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField
        id={messageId}
        label={CONTACT_COPY.fields.message.label}
        hint={CONTACT_COPY.fields.message.hint}
        error={fieldErrors.message}
        required
      >
        <Textarea
          ref={messageInputRef}
          name="message"
          placeholder={CONTACT_COPY.fields.message.placeholder}
          value={values.message}
          onChange={(event) => handleFieldChange('message', event.target.value)}
          disabled={isSubmitting}
          maxLength={MESSAGE_MAX_LENGTH}
          rows={6}
        />
      </FormField>

      <Button
        type="submit"
        size="lg"
        className="min-h-11 w-full sm:w-auto"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? CONTACT_COPY.submitting : CONTACT_COPY.submit}
      </Button>
    </form>
  );
}
