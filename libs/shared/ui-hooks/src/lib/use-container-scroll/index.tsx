import { useEffect } from 'react';

import { useWindowHeight } from '../use-window-height';

/**
 * Custom React hook to adjust the height and overflow properties of specified containers to achieve custom scrolling effects
 *
 * @param {string[]} selectors - An array of CSS selectors for the containers to target
 * @param {string[]} classNames - An array of CSS classes to add to the target containers
 */
export const useContainerScroll = (selectors: string[], classNames: string[]) => {
  // Get the current window height using the custom 'useWindowHeight' hook
  const { windowHeight } = useWindowHeight();

  useEffect(() => {
    return () => {
      const bodyElement = document.querySelector('body');
      if (bodyElement) bodyElement.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (document) {
      // Find and adjust the document body's overflow property
      const bodyElement = document.querySelector('body');
      if (bodyElement) bodyElement.style.overflow = 'hidden';

      // Select the containers specified by the 'selectors' array
      const containers = document.querySelectorAll(selectors.join(','));
      if (containers.length > 0) {
        containers.forEach((c) => {
          if (c instanceof HTMLElement) {
            // Calculate and set the container's height based on the window height
            c.style.height = windowHeight - c.offsetTop + 'px';

            // Add the specified CSS classes to the container
            c.classList.add(classNames.join(','));
          }
        });
      }
    }

    // Cleanup function to reset the document body's overflow property when the component unmounts
    return () => {
      const bodyElement = document.querySelector('body');
      if (bodyElement) bodyElement.style.overflow = 'auto';
    };
  }, [windowHeight]); // Re-run the effect when 'windowHeight' changes
};
