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
import { useId, useState, type FormEvent } from 'react';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  message: '',
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>(CONTACT_COPY.success.description);

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const honeypotId = useId();
  const formErrorId = useId();

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
      setFieldErrors(clientValidation.fieldErrors as Record<string, string>);
      setFormError(null);
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
      setFieldErrors(mapped.fieldErrors as Record<string, string>);
      setFormError(mapped.formError);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div
        className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
        data-testid="contact-form-success"
      >
        <SuccessAlert title={CONTACT_COPY.success.title} description={successMessage} />
        <p className="text-body-sm text-muted-foreground">
          I will reply to the email address you provided.
        </p>
        <Button type="button" variant="outline" onClick={resetForAnother}>
          {CONTACT_COPY.success.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
      data-testid="contact-form"
      aria-busy={isSubmitting}
    >
      <p className="text-body-sm text-muted-foreground">{CONTACT_COPY.formIntro}</p>

      {formError ? (
        <ErrorAlert id={formErrorId} title="Could not send your message" description={formError} />
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

      <FormField id={nameId} label={CONTACT_COPY.fields.name.label} error={fieldErrors.name}>
        <Input
          name="name"
          type="text"
          autoComplete="name"
          placeholder={CONTACT_COPY.fields.name.placeholder}
          value={values.name}
          onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          disabled={isSubmitting}
          maxLength={120}
          required
        />
      </FormField>

      <FormField id={emailId} label={CONTACT_COPY.fields.email.label} error={fieldErrors.email}>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={CONTACT_COPY.fields.email.placeholder}
          value={values.email}
          onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          disabled={isSubmitting}
          required
        />
      </FormField>

      <FormField
        id={messageId}
        label={CONTACT_COPY.fields.message.label}
        error={fieldErrors.message}
      >
        <Textarea
          name="message"
          placeholder={CONTACT_COPY.fields.message.placeholder}
          value={values.message}
          onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
          disabled={isSubmitting}
          maxLength={MESSAGE_MAX_LENGTH}
          rows={6}
          required
        />
      </FormField>

      <Button type="submit" size="lg" className="min-h-11 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? CONTACT_COPY.submitting : CONTACT_COPY.submit}
      </Button>
    </form>
  );
}
