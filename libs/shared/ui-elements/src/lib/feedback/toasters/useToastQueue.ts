import { useEffect, useState } from 'react';
import toast, { ToastOptions, ValueOrFunction, Renderable, Toast, useToasterStore } from 'react-hot-toast';

type ToastArgs = { message: ValueOrFunction<Renderable, Toast>; options: ToastOptions };
export const useToastQueue = () => {
  const MAX_CONCURRENT_TOASTS = 4;
  const DURATION = 4000;
  const [queue, setQueue] = useState<ToastArgs[]>([]);
  const { toasts } = useToasterStore();

  const addToastToQueue = (message: ValueOrFunction<Renderable, Toast>, options: ToastOptions = {}) => {
    setQueue((prevQueue) => [...prevQueue, { message, options }]);
  };

  useEffect(() => {
    const availableSlots = MAX_CONCURRENT_TOASTS - toasts.length;

    if (availableSlots > 0 && queue.length > 0) {
      const toastsToShow = queue.slice(0, availableSlots);
      const remainingToasts = queue.slice(availableSlots);

      setTimeout(() => {
        toastsToShow.forEach((toastItem) => {
          toast(toastItem.message, { duration: DURATION, ...toastItem.options });
        });
        setQueue(remainingToasts);
      }, 1); // break the race condition of useEffect
    }
  }, [toasts, queue]);

  return { addToastToQueue };
};
