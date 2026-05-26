export const ADMIN_DIALOG_COPY = {
  cancel: 'Cancel',
  unsaved: {
    title: 'Leave without saving?',
    description: 'You have unsaved changes. If you leave now, those changes will be lost.',
    confirm: 'Leave',
  },
  deletePost: {
    title: 'Delete this post?',
    description: 'This cannot be undone.',
    confirm: 'Delete',
  },
  archivePost: {
    title: 'Archive this post?',
    description: 'Archived posts are hidden from the public blog.',
    confirm: 'Archive',
  },
} as const;

export const ADMIN_ALERT_COPY = {
  signInFailed: 'Sign in failed',
  couldNotUpdatePassword: 'Could not update password',
  couldNotUpdateStatus: 'Could not update status',
  statusUpdated: 'Status updated',
  markedRead: 'Message marked as read.',
  markedUnread: 'Message marked as unread.',
  couldNotCompleteAction: 'Could not complete that action',
} as const;
