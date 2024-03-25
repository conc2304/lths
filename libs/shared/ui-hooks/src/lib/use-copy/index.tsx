import { DependencyList, useEffect } from 'react';

/**
 * Custom React hook to trigger a function when Ctrl + c is pressed.
 * @param {Function} handleCopyEvent - Function to call when Ctrl + c is pressed.
 * @param {DependencyList} [dependencyList=[]] - List of dependencies for the hook
 */
export const useCopy = (handleCopyEvent: () => void, dependencyList: DependencyList = []) => {
  useEffect(() => {
    // Event handler for key down event. Triggers handleCopyEvent if Ctrl + c is pressed
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        handleCopyEvent();
      }
    };

    // Add event listener for key down event
    document.addEventListener('keydown', handleKeyDownEvent);

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, dependencyList);
};
