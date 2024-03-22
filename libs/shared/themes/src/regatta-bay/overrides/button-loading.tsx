import { CircularProgress } from '@mui/material';
import { LoadingButtonProps } from '@mui/lab';
import { Components } from '@mui/material/styles';

import { pxToRem } from '@lths/shared/utils';

// Loading Button will inherit button styles from button base theme
export default function ButtonLoading(): Components {
  return {
    MuiLoadingButton: {
      defaultProps: {
        loadingPosition: 'start',
        loadingIndicator: <CircularProgress thickness={4.5} color="inherit" size={16} />,
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LoadingButtonProps }) => {
          return {
            // Global Styles
            '&': {
              borderRadius: '4px',
              fontStyle: 'normal',
              fontWeight: 500,
              textTransform: 'uppercase',
            },

            // Typography by Button Size
            ...(ownerState.size === 'large' && {
              fontSize: pxToRem(15),
              lineHeight: pxToRem(26),
              letterSpacing: '0.46px',
            }),
            ...(ownerState.size === 'medium' && {
              fontSize: pxToRem(14),
              lineHeight: pxToRem(24),
              letterSpacing: '0.4px',
            }),
            ...(ownerState.size === 'small' && {
              fontSize: pxToRem(13),
              lineHeight: pxToRem(23),
              letterSpacing: '0.46px',
            }),
          };
        },
      },
    },
  };
}
