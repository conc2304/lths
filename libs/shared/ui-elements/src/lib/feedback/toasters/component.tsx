import React from 'react';
import { useTheme } from '@mui/material';
import { Toaster } from 'react-hot-toast';

export const LayoutToaster: React.FC = () => {
  const theme = useTheme();
  return (
    <Toaster
      toastOptions={{
        style: { fontWeight: 'bold' },
        success: {
          style: {
            background: theme.palette.success.main,
            color: theme.palette.success.contrastText,
          },
        },
        error: {
          style: {
            background: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          },
        },
      }}
    />
  );
};
