import { Components, Theme } from '@mui/material/styles';

export default function Dialog(theme: Theme): Components {
  return {
    MuiDialog: {
      defaultProps: {
        disableEscapeKeyDown: false,
        PaperProps: {
          sx: {
            borderRadius: '0.25rem',
            width: '27.75em', // all dialogs should be 444px wide
          },
        },
        onClose: () => {
          console.log('close');
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          fontWeight: '400',
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: 'black',
        },
      },
    },
  };
}
