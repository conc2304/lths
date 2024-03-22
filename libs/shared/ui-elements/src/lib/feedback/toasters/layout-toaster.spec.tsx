import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as toastLib from 'react-hot-toast';

import { TOAST_DURATION } from './constants';
import { LayoutToaster } from './layout-toaster';
import { toastQueueService } from './toast-service';

jest.mock('react-hot-toast');
jest.mock('./toast-service');

export function triggerAnimationEnd(node: HTMLElement | HTMLElement[]) {
  act(() => {
    if (Array.isArray(node)) {
      node.forEach((el) => {
        fireEvent.animationEnd(el.parentNode!);
      });
    } else {
      fireEvent.animationEnd(node.parentNode!);
    }

    jest.runAllTimers();
  });
}

describe('LayoutToaster', () => {
  const mockHandlers = {
    startPause: jest.fn(),
    endPause: jest.fn(),
    calculateOffset: jest.fn().mockReturnValue(0),
    updateHeight: jest.fn(),
  };

  const mockToasts = [
    { id: '1', visible: true, message: 'Toast 1', type: 'default' },
    { id: '2', visible: true, message: 'Toast 2', type: 'default' },
  ];

  beforeEach(() => {
    jest.useFakeTimers({ advanceTimers: true });
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(1);
      return 1;
    });

    (toastLib.useToaster as jest.Mock).mockImplementation(() => ({
      toasts: mockToasts,
      handlers: mockHandlers,
    }));

    // Reset mocks
    (toastLib.toast.dismiss as jest.Mock).mockClear();
    (toastQueueService.processQueue as jest.Mock).mockClear();

    // Mock implementation of processQueue
    toastQueueService.processQueue = jest.fn();
  });

  const waitTime = (time: number) => {
    act(() => {
      jest.advanceTimersByTime(time);
    });
  };

  afterEach((done) => {
    (window.requestAnimationFrame as jest.Mock).mockRestore();
    act(() => {
      jest.runAllTimers();
      jest.useRealTimers();
      done();
    });
  });

  it('renders toasts correctly', () => {
    const { getAllByTestId } = render(<LayoutToaster />);
    const toasts = getAllByTestId('LayoutToaster--notification');
    expect(toasts.length).toBe(mockToasts.length);
  });

  it('applies correct animation based on toast state and position', () => {
    const { getAllByTestId } = render(<LayoutToaster />);
    const toasts = getAllByTestId('LayoutToaster--notification');

    // Assuming the first toast should have the enter animation
    const enterAnimationRegex = /toastEnter\d+ 300ms ease/;
    const animationStyle = window.getComputedStyle(toasts[0]).animation;

    // Check if the animation style matches the expected pattern
    expect(enterAnimationRegex.test(animationStyle)).toBe(true);

    // Assuming other toasts should not have the enter animation
    for (let i = 1; i < toasts.length; i++) {
      expect(toasts[i]).not.toHaveStyle({ animation: expect.stringMatching(enterAnimationRegex) });
    }
  });

  it('handles mouse events correctly', async () => {
    const user = userEvent.setup();
    const { getAllByTestId } = render(<LayoutToaster />);

    // wait for toast to enter screen
    waitTime(TOAST_DURATION / 2);

    const toasterContainer = getAllByTestId('LayoutToaster--notification')[0];

    await user.hover(toasterContainer);
    expect(mockHandlers.startPause).toHaveBeenCalled();

    await user.unhover(toasterContainer);
    expect(mockHandlers.endPause).toHaveBeenCalled();
  });

  it('clicking close button dismisses the toast', () => {
    const { getAllByTestId } = render(<LayoutToaster />);
    const closeButtons = getAllByTestId('LayoutToaster--close-btn'); // Add this test id to your close button

    fireEvent.click(closeButtons[0]);
    expect(toastLib.toast.dismiss).toHaveBeenCalledWith(mockToasts[0].id);
    expect(toastQueueService.processQueue).toHaveBeenCalled();
  });

  it('sorts important toasts correctly', async () => {
    // Mock toasts with different types
    const mockToasts = [
      { id: '1', type: 'default', visible: true, message: 'Toast 1' },
      { id: '2', type: 'important', visible: true, message: 'Toast 2' },
      { id: '3', type: 'default', visible: true, message: 'Toast 3' },
    ];

    (toastLib.useToaster as jest.Mock).mockImplementation(() => ({
      toasts: mockToasts,
      handlers: mockHandlers,
    }));

    const { getAllByTestId } = render(<LayoutToaster />);
    const renderedToasts = getAllByTestId('LayoutToaster--notification');

    waitTime(10);
    // Expect the important toast to be sorted first
    // technically its last because we have reverse order set to true on calculateOffset
    expect(renderedToasts[mockToasts.length - 1]).toHaveTextContent('Toast 2');
  });
});
