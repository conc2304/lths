import { Components, Theme } from '@mui/material';

export default function ButtonGroup(theme: Theme): Components {
  return {
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
        },
        outlined: {
          backgroundColor: 'transparent',
        },
        grouped: {
          textTransform: 'uppercase',
          fontFamily: `'Roboto', sans-serif`,
          fontWeight: 400,
          fontSize: '0.9rem',
          padding: '9px 12px',
          transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          '&.MuiButton-outlinedInfo': {
            color: theme.palette.info.contrastText,
            border: `1px solid ${theme.palette.grey[300]}`,
            '&:hover': {
              backgroundColor: theme.palette.info.light,
            },
            '&.active': {
              background: theme.palette.info.main,
            },
            '& .MuiTouchRipple-child': {
              backgroundColor: theme.palette.info.dark,
            },
          },
        },
        groupedOutlinedPrimary: {
          border: '1px solid #D9D9D9',
          '&.active': {
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          },
        },
        groupedContainedPrimary: {
          '&.active': {
            background: theme.palette.primary.light,
          },
        },
      },
    },
  };
}
