export const CONTACT_COPY = {
  formIntro:
    'Send a message and I will reply by email. A short note about what you would like to discuss is enough.',
  fields: {
    name: {
      label: 'Your name',
      placeholder: 'Your full name',
    },
    email: {
      label: 'Email address',
      placeholder: 'you@example.com',
    },
    message: {
      label: 'Message',
      placeholder:
        'What you’d like to discuss—a project idea, question, or how we might work together.',
    },
  },
  submit: 'Send message',
  submitting: 'Sending…',
  validation: {
    nameRequired: 'Please enter your name so I know who is reaching out.',
    emailRequired: 'Please enter your email address so I can reply to you.',
    emailInvalid: 'Please enter a valid email address so I can reply to you.',
    messageRequired: 'Please write your message before sending.',
    messageTooShort:
      'Please add a bit more detail — your message should be at least 20 characters.',
    messageTooLong: 'Your message is too long. Please shorten it to 5000 characters or less.',
  },
  success: {
    title: 'Message sent',
    description:
      'Thank you for reaching out. Your message was received and I will get back to you by email soon.',
    sendAnother: 'Send another message',
  },
  errors: {
    rateLimited: 'You have sent several messages recently. Please wait a while and try again.',
    serverUnavailable:
      'Your message could not be sent right now because the server is unavailable. Please try again in a few minutes.',
    network:
      'Your message could not be sent because we could not reach the server. Check your connection and try again.',
    timeout:
      'Sending took too long. Your message was not sent — please check your connection and try again.',
    generic:
      'Your message could not be sent. Please review the form and try again, or email me directly using the link below.',
  },
} as const;

export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 5000;
export const NAME_MAX_LENGTH = 120;
