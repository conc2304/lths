import { Components, Theme } from '@mui/material/styles';

export default function Dialog(theme: Theme): Components {
  return {
    MuiDialog: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const { fullScreen, fullWidth } = ownerState;
          const isFixedSize = !fullScreen && !fullWidth;

          return {
            ...(isFixedSize && {
              '.MuiPaper-root': {
                width: '27.75rem', // all dialogs should be 444px wide unless set to fullwidth
              },
            }),
          };
        },
      },
      defaultProps: {
        disableRestoreFocus: true, // refocusing on the opening button causes mui button ripple to trigger indefinitely, which looks weird
        disableEscapeKeyDown: false, // already the default but lets make it explicit
        PaperProps: {
          sx: {
            borderRadius: '0.25rem',
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
