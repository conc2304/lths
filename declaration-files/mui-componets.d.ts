import { LoadingButtonProps } from '@mui/lab';
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Components<Theme = unknown> {
    MuiLoadingButton?: {
      defaultProps?: LoadingButtonProps;
      styleOverrides?: ComponentsOverrides<Theme>['MuiButton'];
      variants?: ComponentsVariants['MuiButton'];
    };
  }
}
