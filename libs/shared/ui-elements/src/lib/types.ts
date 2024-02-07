import { OverridableStringUnion } from '@mui/types';

export type ProgressLoadingProps = {
  loading: boolean;
};

export type ProgressProps = ProgressLoadingProps & {
  fetching: boolean;
};

export type ColorThemeMui = OverridableStringUnion<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'>;
