import { ToastOptions, ValueOrFunction, Renderable, Toast, toast as toast_rht } from 'react-hot-toast';

import { TOAST_DURATION, MAX_CONCURRENT_TOASTS } from './constants';

type LTHSToastOptions = ToastOptions & { type?: 'important' | 'error' | 'success' | 'default' };
type ToastArgs = { message: ValueOrFunction<Renderable, Toast>; options: LTHSToastOptions };

const queue: ToastArgs[] = [];
const activeToasts = new Set();

const processQueue = () => {
  if (activeToasts.size >= MAX_CONCURRENT_TOASTS) {
    return;
  }

  const toastConf = queue.shift();
  if (!toastConf) return;

  const { message, options } = toastConf;
  const toastId = toast_rht(message, { duration: TOAST_DURATION, ...options });
  activeToasts.add(toastId);

  // Set a timeout to automatically remove the toast from activeToasts
  setTimeout(() => {
    activeToasts.delete(toastId);
    processQueue();
    // We add 1s bc that is how long ReactHotToast internally delays transitioning
    // a toast from visible to not visible to removed
  }, (options.duration || TOAST_DURATION) + 1000);
};

const addToastToQueue = (message: ValueOrFunction<Renderable, Toast>, options: LTHSToastOptions = {}) => {
  const { type } = options;
  if (type === 'important') {
    queue.unshift({ message, options });
  } else {
    queue.push({ message, options });
  }
  processQueue();
};

// Additional functions for testing
const _testonly_getQueue = () => queue;
const _testonly_getActiveToasts = () => activeToasts;

export const toast = {
  add: addToastToQueue,
  processQueue,
  _testonly_getQueue,
  _testonly_getActiveToasts,
};
