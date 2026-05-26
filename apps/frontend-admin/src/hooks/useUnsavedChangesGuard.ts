'use client';

import { useEffect } from 'react';

const UNSAVED_MESSAGE = 'You have unsaved changes. Leave anyway?';

export function useUnsavedChangesGuard(isDirty: boolean, message = UNSAVED_MESSAGE) {
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

  function confirmLeave(): boolean {
    if (!isDirty) return true;
    return window.confirm(message);
  }

  return { confirmLeave };
}
