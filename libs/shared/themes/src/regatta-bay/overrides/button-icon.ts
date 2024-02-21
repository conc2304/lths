import { Components, Theme, alpha } from '@mui/material/styles';

export default function ButtonIcon(theme: Theme): Components {
  return {
    MuiIconButton: {
      defaultProps: {
        size: 'medium',
      },
      styleOverrides: {
        root: ({ ownerState: { color } }) => {
          const colorTheme = !!color && color !== 'inherit' && color !== 'default' ? color : undefined;
          return {
            '&&': {
              '&:hover': {
                backgroundColor: colorTheme ? alpha(theme.palette[colorTheme].main, 0.1) : undefined,
              },
            },
            // Global Styles
            '.MuiTouchRipple-child': {
              backgroundColor: colorTheme ? alpha(theme.palette[colorTheme].main, 0.2) : undefined,
            },
          };
        },
      },
    },
  };
}
