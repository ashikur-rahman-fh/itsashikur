import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { ContactForm } from './ContactForm';

const server = setupServer(
  http.post('*/api/public/contact/', async ({ request }) => {
    const body = (await request.clone().json()) as { email?: string; message?: string };
    if (body.email === 'bad') {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Please check your input and try again.',
            details: { email: 'Please enter a valid email address so I can reply to you.' },
          },
        },
        { status: 422 },
      );
    }
    return HttpResponse.json({
      success: true,
      message: 'Thank you for reaching out.',
    });
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const validMessage =
  'Hello Ashikur, I would like to discuss a software development opportunity with you.';

describe('ContactForm', () => {
  it('shows client validation for empty submit', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
  });

  it('shows success after valid submit', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/your name/i), 'Your full name');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/^message$/i), validMessage);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByTestId('contact-form-success')).toBeInTheDocument();
    });
  });

  it('preserves values and shows field error on API validation failure', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/your name/i), 'Your full name');
    await user.type(screen.getByLabelText(/email address/i), 'bad');
    await user.type(screen.getByLabelText(/^message$/i), validMessage);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Your full name')).toBeInTheDocument();
  });
});
