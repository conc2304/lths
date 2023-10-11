import { act, fireEvent, render, screen } from '@testing-library/react';
import toast from 'react-hot-toast';

import { LayoutToaster } from './component';

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
  beforeEach(() => {
    jest.useFakeTimers({ advanceTimers: true });
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(1);
      return 1;
    });
  });

  afterEach((done) => {
    (window.requestAnimationFrame as jest.Mock).mockRestore();
    act(() => {
      jest.runAllTimers();
      jest.useRealTimers();
      done();
    });
  });

  const waitTime = (time: number) => {
    act(() => {
      jest.advanceTimersByTime(time);
    });
  };

  it('should render an toasts and dismisses them from view', () => {
    const { container } = render(<LayoutToaster />);

    expect(container).toBeTruthy();

    act(() => {
      toast.success('MockMessage_1');
      toast.error('MockMessage_2');
    });

    const toasts = screen.queryAllByText(/MockMessage/);
    expect(toasts.length).toBe(2);

    act(() => {
      toast.dismiss();
    });

    triggerAnimationEnd(toasts);

    expect(screen.queryAllByText(/MockMessage/).length).toBe(0);
  });

  it('should NOT render multiple toasts of with the same ID', async () => {
    render(<LayoutToaster />);

    const toastID = 'MockMessage_id';

    act(() => {
      toast.success('MockMessage_1', { id: toastID });
    });

    waitTime(10);

    let toasts = screen.queryAllByText(/MockMessage/);
    expect(toasts.length).toBe(1);

    act(() => {
      toast.error('MockMessage_2', { id: toastID });
    });

    toasts = screen.queryAllByText(/MockMessage/);
    expect(toasts.length).toBe(1);
  });
});
