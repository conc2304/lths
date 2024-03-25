import { ComponentProps } from '../pages/types';
import { RootState } from '../store';

export const selectComponentFromClipboard = (state: RootState): ComponentProps => state.pagesData.clipboard.component;
