import { Dispatch } from 'react';

import { LayoutStateType, LayoutProviderActionType, LayoutContextActionProps } from './types';
import { BreadcrumbPathProps } from '../outlets/dashboard/content';

export const setBreacrumbTests =
  (dispatch: Dispatch<LayoutContextActionProps>) => (breadcrumbs: BreadcrumbPathProps[] | string) => {
    const payload: LayoutStateType = {
      breadcrumbs: typeof breadcrumbs === 'string' ? { title: breadcrumbs, path: 'pathname' } : breadcrumbs,
    }; //.map((o:BreadcrumbPathProps) => o) };
    const type: LayoutProviderActionType = LayoutProviderActionType.LAYOUT_ACTION_SET_BREADCRUMBS;
    return dispatch({ type, payload });
  };
