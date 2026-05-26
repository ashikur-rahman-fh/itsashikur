'use client';

import { ADMIN_DIALOG_COPY } from '@ashikur-portfolio/shared/api';
import { useEffect } from 'react';

export function useUnsavedChangesGuard(isDirty: boolean, confirmLeave: () => Promise<boolean>) {
  useEffect(() => {
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isDirty]);

  async function confirmLeaveIfDirty(): Promise<boolean> {
    if (!isDirty) {
      return true;
    }
    return confirmLeave();
  }

  return { confirmLeaveIfDirty };
}

export function unsavedLeaveDialogOptions() {
  return {
    title: ADMIN_DIALOG_COPY.unsaved.title,
    description: ADMIN_DIALOG_COPY.unsaved.description,
    confirmLabel: ADMIN_DIALOG_COPY.unsaved.confirm,
    cancelLabel: ADMIN_DIALOG_COPY.cancel,
    variant: 'destructive' as const,
  };
}
