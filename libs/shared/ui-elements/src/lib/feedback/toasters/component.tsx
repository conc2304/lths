import React from 'react';
import { useTheme } from '@mui/material';
import { Toaster } from 'react-hot-toast';

export const TOAST_DURATIONS = {
  blank: 4000,
  error: 4000,
  success: 2000,
};

export const LayoutToaster: React.FC = () => {
  const theme = useTheme();
  return (
    <Toaster
      toastOptions={{
        style: { fontWeight: 'bold' },
        duration: TOAST_DURATIONS.blank,
        success: {
          duration: TOAST_DURATIONS.success,
          style: {
            background: theme.palette.success.main,
            color: theme.palette.success.contrastText,
          },
        },
        error: {
          duration: TOAST_DURATIONS.error,
          style: {
            background: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          },
        },
      }}
    />
  );
};
