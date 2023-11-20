import { toast } from 'react-hot-toast';

import { TOAST_DURATION, MAX_CONCURRENT_TOASTS } from './constants';
import { toastQueueService } from './toast-service';

jest.mock('react-hot-toast');

describe('toastQueueService', () => {
  jest.useFakeTimers();

  beforeEach(() => {
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

    // Check if push was called
    expect(pushSpy).toHaveBeenCalled();

    // Optional: Check if push was called with specific arguments
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

  it('should process toasts within the maximum concurrent limit', () => {
    for (let i = 0; i < MAX_CONCURRENT_TOASTS + 2; i++) {
      toastQueueService.addToastToQueue(`Message ${i}`);
    }

    // Initially, only MAX_CONCURRENT_TOASTS should be active
    expect(toastQueueService._testonly_getActiveToasts().size).toBe(MAX_CONCURRENT_TOASTS);

    // Fast-forward time to process the toasts
    jest.advanceTimersByTime(TOAST_DURATION + 1000);

    // After the duration, the next set of toasts (if any) should be processed
    // Check the active toasts again
    // The exact expectation here depends on how your service handles the queue
    // For example, if it processes the next toast right after one is finished, then:
    expect(toastQueueService._testonly_getActiveToasts().size).toBeLessThanOrEqual(MAX_CONCURRENT_TOASTS);
  });
});
