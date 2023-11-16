import toast, { ToastOptions, ValueOrFunction, Renderable, Toast } from 'react-hot-toast';

type ToastArgs = { message: ValueOrFunction<Renderable, Toast>; options: ToastOptions };

const queue: ToastArgs[] = [];
const activeToasts = new Set();
const MAX_CONCURRENT_TOASTS = 4;
const DURATION = 4000;

const processQueue = () => {
  if (queue.length === 0 || activeToasts.size >= MAX_CONCURRENT_TOASTS) {
    return;
  }

  const toastConf = queue.shift();
  if (!toastConf) return;

  const { message, options } = toastConf;
  const toastId = toast(message, { duration: DURATION, ...options });

  activeToasts.add(toastId);

  // Set a timeout to automatically remove the toast from activeToasts
  setTimeout(() => {
    activeToasts.delete(toastId);
    processQueue(); // Process the next toast in the queue
  }, options.duration || DURATION + 1000);
};

const addToastToQueue = (message: ValueOrFunction<Renderable, Toast>, options: ToastOptions = {}) => {
  queue.push({ message, options });
  processQueue();
};

export const toastQueueService = {
  addToastToQueue,
  processQueue,
};
