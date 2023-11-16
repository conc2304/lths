import { useEffect, useState } from 'react';
import toast, { ToastOptions, useToaster, ValueOrFunction, Renderable, Toast, useToasterStore } from 'react-hot-toast';

type ToastArgs = { message: ValueOrFunction<Renderable, Toast>; options: ToastOptions };
export const useToastQueue = () => {
  const [queue, setQueue] = useState<ToastArgs[]>([]);
  const { toasts } = useToasterStore();

  const addToastToQueue = (message: ValueOrFunction<Renderable, Toast>, options: ToastOptions = {}) => {
    setQueue((prevQueue) => [...prevQueue, { message, options }]);
    toast(message, { duration: 4000 * 10, ...options });
  };

  useEffect(() => {
    console.log('T', toasts.length, toasts);
    console.log('Q', queue.length, queue);
    // Check if there are no toasts being displayed and if there are toasts in the queue
    console.log(toasts.length === 0 && queue.length > 0);

    // if (toasts.length > 0 && queue.length === 0) {
    //   console.log('here');
    //   addToastToQueue(toasts[0].message, {});
    // } else if (toasts.length === 0 && queue.length > 0) {
    //   console.log('TOASET IT');
    //   // Get the first toast in the queue
    //   const [nextToast, ...remainingToasts] = queue;
    // toast(nextToast.message, { duration: 4000, ...nextToast.options });
    // Update the queue to remove the displayed toast
    //   setQueue(remainingToasts);
    // }
  }, [toasts, queue]);

  return { addToastToQueue };
};
