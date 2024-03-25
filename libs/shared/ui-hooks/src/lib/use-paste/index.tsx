import { DependencyList, useEffect } from 'react';

/**
 * Custom React hook to trigger a function when Ctrl + v is pressed.
 * @param {Function} handlePasteEvent - Function to call when Ctrl + v is pressed.
 * @param {DependencyList} [dependencyList=[]] - List of dependencies for the hook
 */
export const usePaste = (handlePasteEvent: () => void, dependencyList: DependencyList = []) => {
  useEffect(() => {
    // Event handler for key down event. Triggers handleCopyEvent if Ctrl + v is pressed
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
        handlePasteEvent();
      }
    };

    // Add event listener for key down event
    document.addEventListener('keydown', handleKeyDownEvent);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, dependencyList);
};
