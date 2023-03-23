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
          marginTop: theme.spacing(0.7),
          // marginBottom: theme.spacing(0.5),
          padding: `${theme.spacing(1)} ${theme.spacing(1.5)}  }`,
          boxSizing: 'border-box',

          '&&.MuiToggleButtonGroup-grouped': {
            borderLeft: `1px solid ${theme.palette.grey[300]}`,
          },
          
          '&.MuiToggleButton-sizeSmall': {
            height: '2.188rem',
          },

          '&.Mui-selected': {},

          '&.MuiToggleButton-secondary, &.MuiToggleButton-info': {
            borderColor: theme.palette.grey[300],
            backgroundColor: 'transparent',
            color: theme.palette.info.contrastText,
            '&&.MuiToggleButtonGroup-grouped': {
              borderLeft: `1px solid ${theme.palette.grey[300]}`,
            },
            '&.Mui-selected': {
              backgroundColor: theme.palette.info.light,
              color: theme.palette.info.contrastText,
            },
            '&:hover': {
              backgroundColor: theme.palette.info.main,
            },
          },
          '&.MuiToggleButton-primary': {
            borderColor: theme.palette.grey[900],
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&&.MuiToggleButtonGroup-grouped': {
              borderLeft: `1px solid ${theme.palette.grey[900]}`,
            },
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            },
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        },
      },
    },
  };
}
