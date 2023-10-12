import { useEffect, useState } from 'react';

/**
 * Custom React hook to track and manage the current height of the browser window.
 * It automatically updates the height value whenever the browser window is resized.
 *
 * @returns {object} An object containing current browser window height.
 */
export const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    //Function to update the windowHeight state whenever a resize event occurs
    const handleWindowResize = () => setWindowHeight(window.innerHeight);

    // Add an event listener for the window resize event
    window.addEventListener('resize', handleWindowResize);

    //Initial call to set the windowHeight state
    handleWindowResize();

    // Cleanup by removing the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Return an object containing the current browser window height
  return { windowHeight };
};
