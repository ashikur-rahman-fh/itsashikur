export const CONTACT_COPY = {
  formIntro: "A few sentences is enough—I'll reply by email.",
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
      placeholder: "Role, project, or question—whatever you'd like to discuss.",
      hint: 'At least 20 characters so I have enough context to reply.',
    },
  },
  submit: 'Send message',
  submitting: 'Sending…',
  validation: {
    nameRequired: 'Please enter your name so I know who is reaching out.',
    nameTooLong: 'Your name can be at most 120 characters.',
    emailRequired: 'Please enter your email address so I can reply to you.',
    emailInvalid: 'Please enter a valid email address, like name@example.com.',
    messageRequired: 'Please write your message before sending.',
    messageTooShort: 'This message looks a little short. Please add a few more details.',
    messageTooLong: 'Your message is too long. Please shorten it to 5000 characters or less.',
  },
  success: {
    title: 'Message sent',
    description: "Thanks—your message was sent successfully. I'll get back to you soon.",
    followUp: 'I will reply to the email address you provided.',
    sendAnother: 'Send another message',
  },
  errors: {
    formTitle: 'Could not send your message',
    rateLimited: 'You have sent several messages recently. Please wait a while and try again.',
    serverUnavailable:
      'Your message could not be sent right now because the server is unavailable. Please try again in a few minutes.',
    network:
      'Your message could not be sent because we could not reach the server. Check your connection and try again.',
    timeout:
      'Sending took too long. Your message was not sent—please check your connection and try again.',
    generic:
      'Your message could not be sent. Please review the form and try again, or email me directly using the link below.',
  },
} as const;

export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 5000;
export const NAME_MAX_LENGTH = 120;
