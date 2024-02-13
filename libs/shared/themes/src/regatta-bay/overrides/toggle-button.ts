import { Components, Theme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export default function ToggleButton(theme: Theme): Components {
  return {
    MuiToggleButton: {
      defaultProps: {
        size: 'small',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontSize: '0.688rem',
          whiteSpace: 'nowrap',
          padding: theme.spacing(1, 1.5),
          boxSizing: 'border-box',

          '&.MuiToggleButton-sizeSmall': {
            height: '2.188rem',
          },
        },
      },
    },
  };
}
