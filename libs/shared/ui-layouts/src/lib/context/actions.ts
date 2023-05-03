import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { setBreacrumbTests } from './actions2';
import { useLayout } from './context';
import { LayoutStateType, LayoutProviderActionType } from './types';
import { BreadcrumbPathProps } from '../outlets/dashboard/content';

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
  const location = useLocation();
  const setDrawerVisibility = useCallback(
    (drawerVisible: boolean) => {
      const payload: LayoutStateType = { drawerVisible };
      const type: LayoutProviderActionType = LayoutProviderActionType.LAYOUT_ACTION_OPEN_DRAWER;
      return dispatch({ type, payload });
    },
    [dispatch]
  );

  const setDrawerSelectedItem = useCallback(
    (drawerCurrentItem: string) => {
      const payload: LayoutStateType = { drawerCurrentItem };
      const type: LayoutProviderActionType = LayoutProviderActionType.LAYOUT_ACTION_SET_ACTIVE_ITEM;
      //return dispatch({ type, LayoutStateType:{drawerCurrentItem}});
      return dispatch({ type, payload });
    },
    [dispatch]
  );

  /*
   * Set last part of the breadcrumbs
   *
   */

  const setBreacrumbs = useCallback(
    (breadcrumbs: BreadcrumbPathProps[] | string) => {
      const payload: LayoutStateType = {
        breadcrumbs: typeof breadcrumbs === 'string' ? { title: breadcrumbs, path: location.pathname } : breadcrumbs,
      }; //.map((o:BreadcrumbPathProps) => o) };
      const type: LayoutProviderActionType = LayoutProviderActionType.LAYOUT_ACTION_SET_BREADCRUMBS;
      return dispatch({ type, payload });
    },
    [dispatch, location.pathname]
  );
  //useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Memo is used instead of useCallback to avoid lint error
  const setBreacrumbsHook = useMemo(() => setBreacrumbTests(dispatch), [dispatch, location.pathname]);

  const setBreacrumbs2 = useCallback(
    (breadcrumbs: BreadcrumbPathProps[] | string) => {
      const payload: LayoutStateType = {
        breadcrumbs: typeof breadcrumbs === 'string' ? { title: breadcrumbs, path: location.pathname } : breadcrumbs,
      }; //.map((o:BreadcrumbPathProps) => o) };
      const type: LayoutProviderActionType = LayoutProviderActionType.LAYOUT_ACTION_SET_BREADCRUMBS;
      return dispatch({ type, payload });
    },
    [dispatch, location.pathname]
  );
  return { setDrawerVisibility, setDrawerSelectedItem, setBreacrumbs, setBreacrumbsHook, ...state };
};
