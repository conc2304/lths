import { useCallback, useEffect, useState } from 'react';
import { unstable_BlockerFunction as BlockerFunction, unstable_useBlocker as useBlocker } from 'react-router-dom';

/**
 * Custom hook to block and manage the navigation
 *
 * @param {boolean} block - Determines whether to block the navigation or not.
 * @returns NavigationBlocker - An object containing property and functions to manage blocked navigation
 */
export const useNavigationBlocker = (block: boolean) => {
  // to track whether to show a navigation prompt
  const [showPrompt, setShowPrompt] = useState(false);

  // blocker function to determine if navigation should be blocked
  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => block && currentLocation.pathname !== nextLocation.pathname,
    [block]
  );

  const blocker = useBlocker(shouldBlock);

  // cancel the navigation if blocked to abandon the current navigation attempt
  const cancelNavigation = useCallback(() => {
    if (blocker && blocker.reset) blocker.reset();
  }, [blocker]);

  // confirm and proceeed with the navigation, overriding the block
  const confirmNavigation = useCallback(() => {
    if (blocker && blocker.proceed) blocker.proceed();
  }, [blocker]);

  useEffect(() => {
    const isBlocked = blocker ? blocker.state === 'blocked' : false;
    setShowPrompt(isBlocked);
  }, [blocker]);

  return { showPrompt, confirmNavigation, cancelNavigation };
};
