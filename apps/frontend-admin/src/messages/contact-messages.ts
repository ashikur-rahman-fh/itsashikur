export const CONTACT_MESSAGES_COPY = {
  navInbox: 'Inbox',
  listTitle: 'Contact messages',
  listDescription: 'Messages sent through the portfolio contact form.',
  detailTitle: 'Message',
  detailDescription: 'Full message from a portfolio visitor.',
  searchPlaceholder: 'Search by name, email, or message…',
  filters: {
    all: 'All',
    unread: 'Unread',
    read: 'Read',
  },
  sort: {
    newest: 'Newest first',
    oldest: 'Oldest first',
  },
  columns: {
    from: 'From',
    email: 'Email',
    preview: 'Preview',
    status: 'Status',
    received: 'Received',
  },
  status: {
    read: 'Read',
    unread: 'Unread',
  },
  actions: {
    markRead: 'Mark as read',
    markUnread: 'Mark as unread',
    backToList: 'Back to inbox',
    clearFilters: 'Clear filters',
    retry: 'Try again',
  },
  empty: {
    title: 'No messages yet',
    description:
      'When someone submits the contact form on your portfolio, their message will appear here.',
  },
  loadError: {
    title: 'Could not load your inbox',
    description:
      'The message list could not be loaded right now. Check your connection and try again.',
  },
  detailLoadError: {
    title: 'Could not load this message',
    description:
      'This message could not be loaded. It may have been removed, or the server may be unavailable.',
  },
  notFound: {
    title: 'Message not found',
    description: 'This message no longer exists or may have been removed.',
  },
  noResults: {
    title: 'No matching messages',
    description:
      'Nothing matched your search or filters. Try different keywords or clear the filters.',
  },
  markReadError: 'Could not mark this message as read. Please try again.',
  markUnreadError: 'Could not mark this message as unread. Please try again.',
  accessDenied: {
    title: 'Access denied',
    description: 'You need administrator access to view contact messages.',
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
    page: (page: number, total: number) => `Page ${page} of ${total}`,
  },
} as const;
