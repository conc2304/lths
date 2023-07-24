import { Components } from '@mui/material/styles';

export default function Dialog(): Components {
  return {
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
