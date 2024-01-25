import { useEffect } from 'react';

/**
 *
 * @param handler - Custom handler for the 'beforeunload' event
 * @param isDirty - indicates whether there are unsaved changes
 */
export const useBeforeUnload = (handler: (event: BeforeUnloadEvent) => void, isDirty: boolean) => {
  useEffect(() => {
    if (isDirty) window.addEventListener('beforeunload', handler);
    else window.removeEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [isDirty]);
};
