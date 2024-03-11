import { waitFor } from '@testing-library/react';
import { toast } from 'react-hot-toast';

import { TOAST_DURATION, MAX_CONCURRENT_TOASTS } from './constants';
import { toastQueueService } from './toast-service';

jest.mock('react-hot-toast', () => ({
  toast: jest.fn(),
}));

describe('toastQueueService', () => {
  let toastIdCounter = 0;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should add a toast to the queue', async () => {
    // Spy on the push method of the queue array
    const pushSpy = jest.spyOn(toastQueueService._testonly_getQueue(), 'push');

    const message = 'Test message';
    toastQueueService.addToastToQueue(message);

    expect(pushSpy).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledWith(expect.objectContaining({ message }));

    // Clean up
    pushSpy.mockRestore();
  });

  it('should process the queue when a toast is added', () => {
    const message = 'Test Message';
    toastQueueService.addToastToQueue(message);

    // Check if 'toast' from 'react-hot-toast' was called
    expect(toast).toHaveBeenCalledWith(message, { duration: TOAST_DURATION });
  });

  it('should handle important type toasts differently', () => {
    const pushSpy = jest.spyOn(toastQueueService._testonly_getQueue(), 'push');
    const unshiftSpy = jest.spyOn(toastQueueService._testonly_getQueue(), 'unshift');

    const importantMessage = 'Important Message';
    const normalMessage = 'Normal Message';

    toastQueueService.addToastToQueue(normalMessage);
    toastQueueService.addToastToQueue(importantMessage, { type: 'important' });

    // Check if unshift and push were called correctly
    expect(unshiftSpy).toHaveBeenCalledWith(expect.objectContaining({ message: importantMessage }));
    expect(pushSpy).toHaveBeenCalledWith(expect.objectContaining({ message: normalMessage }));

    // Clean up
    pushSpy.mockRestore();
    unshiftSpy.mockRestore();
  });

  it('should limit the number of concurrent toasts', async () => {
    // We need to mock the return so that we have new ids otherwise the set does not increase in id
    // @ts-expect-error - we are recasting the toast as a jest mock intentionally
    (toast as jest.Mock).mockImplementation(() => `toast-${++toastIdCounter}`); // Mock implementation for toast

    const message = 'Test Toast';
    const options = { duration: TOAST_DURATION };

    // Add more toasts than the maximum limit
    const scaleMultipier = 2;
    const toastsCount = MAX_CONCURRENT_TOASTS * scaleMultipier;
    for (let i = 0; i < toastsCount; i++) {
      toastQueueService.addToastToQueue(`${message} ${i}`, options);
    }

    // Check if the number of active toasts does not exceed the limit
    expect(toastQueueService._testonly_getActiveToasts().size).toBe(MAX_CONCURRENT_TOASTS);
    expect(toast).toHaveBeenCalledTimes(MAX_CONCURRENT_TOASTS);

    expect(toastQueueService._testonly_getActiveToasts().size).toBeLessThanOrEqual(MAX_CONCURRENT_TOASTS);

    // Advance timers by toast duration
    jest.advanceTimersByTime(TOAST_DURATION);
    // we expect to have only called enough toasts to hit the max by the end of the duration
    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(MAX_CONCURRENT_TOASTS);
    });

    // Ensure the queue is processed correctly and the limit is respected
    // we expect the second set of 3 toasts to have been called after the first 3 set are called for a total of 6
    jest.advanceTimersByTime(TOAST_DURATION * scaleMultipier);
    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(toastsCount);
    });
  });
});
