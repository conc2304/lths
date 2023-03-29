import { Components, Theme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export default function ToggleButtonGroup(theme: Theme): Components {
  return {
    MuiToggleButtonGroup: {
      defaultProps: {
        color: 'info',
        size: 'small',
      },
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          color: theme.palette.info.contrastText,
          fontSize: '0.688rem',
        },
      },
    },
  };
}
