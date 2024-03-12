import { Components, Theme } from '@mui/material/styles';

export default function Dialog(theme: Theme): Components {
  return {
    MuiDialog: {
      styleOverrides: {
        root: {
          padding: '1rem, 1rem, 1rem, 1.5rem',
        },
      },
      defaultProps: {
        disableEscapeKeyDown: false,
        PaperProps: {
          sx: {
            borderRadius: '0.25rem',
            width: '27.75em', // all dialogs should be 444px wide
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          fontWeight: '500',
          color: theme.palette.text.primary,
          lineHeight: '2rem',
          letterSpacing: '0.15px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1.5rem',
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          p: '1.5rem',
        },
      },
    },
  };
}
