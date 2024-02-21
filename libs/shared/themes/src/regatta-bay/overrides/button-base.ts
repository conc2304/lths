import { Components, Theme, alpha } from '@mui/material/styles';

import { pxToRem } from '@lths/shared/utils';

export default function ButtonBase(theme: Theme): Components {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          const colorTheme = ownerState.color && ownerState.color !== 'inherit' ? ownerState.color : undefined;
          const actionDisabledBackground = alpha(theme.palette.common.black, 0.12);
          const actionDisabledText = alpha(theme.palette.common.black, 0.38);
          return {
            // Global Styles
            '&': {
              borderRadius: '4px',
              ...theme.typography.button,
            },
            '.MuiTouchRipple-child': {
              backgroundColor: colorTheme ? theme.palette[colorTheme].contrastText : undefined,
            },

            // Disabled Styles
            ...(ownerState.disabled && {
              '&&': {
                background: actionDisabledBackground,
                color: actionDisabledText,
              },
            }),

            // Outlined Variant Styles
            ...(ownerState.variant === 'outlined' && {
              '&&': {
                border: ownerState.disabled
                  ? undefined
                  : `1px solid ${colorTheme ? theme.palette[colorTheme].main : 'inherit'}`,
                backgroundColor: colorTheme ? alpha(theme.palette[colorTheme].main, 0.0) : undefined,
                '&:hover': {
                  backgroundColor: colorTheme ? alpha(theme.palette[colorTheme].main, 0.04) : undefined, // 4% opacity for Contained button
                },

                '.MuiTouchRipple-child': {
                  backgroundColor: colorTheme ? theme.palette[colorTheme].main : undefined,
                },
              },
            }),

            // Text Variant Styles
            ...(ownerState.variant === 'text' && {
              '&&': {
                background: colorTheme ? alpha(theme.palette[colorTheme].main, 0.0) : undefined,
                color: ownerState.disabled ? actionDisabledText : undefined,
                '&:hover': {
                  backgroundColor: colorTheme ? alpha(theme.palette[colorTheme].main, 0.05) : undefined, // 5% opacity for Text Button
                },
                '.MuiTouchRipple-child': {
                  backgroundColor: colorTheme ? theme.palette[colorTheme].main : undefined,
                },
              },
            }),

            // Typography by Button Size
            ...(ownerState.size === 'large' && {
              '&.MuiButton-sizeLarge': {
                fontSize: pxToRem(15),
                lineHeight: pxToRem(26),
                letterSpacing: '0.46px',
              },
            }),
            ...(ownerState.size === 'medium' && {
              '&.MuiButton-sizeMedium': {
                fontSize: pxToRem(14),
                lineHeight: pxToRem(24),
                letterSpacing: '0.4px',
              },
            }),
            ...(ownerState.size === 'small' && {
              '&.MuiButton-sizeSmall': {
                fontSize: pxToRem(13),
                lineHeight: pxToRem(23),
                letterSpacing: '0.46px',
              },
            }),
          };
        },
      },
    },
  };
}
