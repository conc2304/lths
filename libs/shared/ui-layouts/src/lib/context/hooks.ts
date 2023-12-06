import { useMemo } from 'react';

import { setPageTitle, setBreadcrumbs, setDrawerSelectedItem, setDrawerOpen } from './actions';
import { useLayout } from './context';
/*
* useLayoutActions is a custom React Hook that returns an object containing functions to update the layout state.
* These functions use the useLayoutContext hook internally to access the layout context and dispatch actions to
* update the layout state.

NOTE: Passing functions as values in a context is generally not considered a good idea because
it can lead to unnecessary re-renders of components. This happens because when the function value
is passed down as a prop through the context provider, it creates a new reference every time the component renders.
This new reference is then passed down to all child components that use the context, causing them to re-render even if the
actual value of the function hasn't changed.
*/
export const useLayoutActions = () => {
  const { state, dispatch } = useLayout();
  //useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Memo is used instead of useCallback to avoid lint error
  return {
    setDrawerOpen: useMemo(() => setDrawerOpen(dispatch), [dispatch]),
    setDrawerSelectedItem: useMemo(() => setDrawerSelectedItem(dispatch), [dispatch]),
    setBreadcrumbs: useMemo(() => setBreadcrumbs(dispatch), [dispatch]),
    setPageTitle: useMemo(() => setPageTitle(dispatch), [dispatch]),

    ...state,
  };
};
