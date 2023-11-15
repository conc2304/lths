import React from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Toast, ToastBar, Toaster, resolveValue, toast } from 'react-hot-toast';

export const LayoutToaster: React.FC = () => {
  const theme = useTheme();

  const animEnterName = `toastEnter${Math.round(Math.random() * 100)}`;
  const animExitName = `toastExit${Math.round(Math.random() * 100)}`;

  const fadeInKeyframes = `
  @keyframes ${animEnterName} {
      from { opacity: 0; transform: translateY(150%); }
      to { opacity: 1; transform: translateY(0); }
  }`;

  const fadeOutKeyframes = `
  @keyframes ${animExitName} {
      from { opacity: 1; }
      to { opacity: 0; transform: translateY(150%); }
  }`;

  const animTime = '300ms';

  return (
    <Toaster
      position="bottom-center"
      containerStyle={{
        inset: '1.5rem',
      }}
      toastOptions={{
        duration: 4000,
        style: {
          maxWidth: '100%',
          minWidth: '100%',
          background: theme.palette.snackBar?.main || '#dfdfdf',
          color: theme.palette.snackBar?.contrastText || '#FFF',
        },
      }}
    >
      {(t: Toast) => (
        <Box width="100%">
          <style>{fadeInKeyframes}</style>
          <style>{fadeOutKeyframes}</style>
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              borderRadius: '0.25rem',
              padding: '0.375rem 1rem ',
              animation: t.visible ? `${animEnterName} ${animTime} ease` : `${animExitName} ${animTime} ease forwards`,
            }}
          >
            {() => {
              return (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '0.875rem', fontWeight: 400, lineHeight: '143%', letterSpacing: '0.01063rem' }}
                    >
                      {resolveValue(t.message, t)}
                    </Typography>
                  </Box>
                  <Box>
                    {t.type !== 'loading' && (
                      <IconButton
                        onClick={() => {
                          toast.dismiss(t.id);
                        }}
                      >
                        <Close fontSize="small" htmlColor="#C4C4C4" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              );
            }}
          </ToastBar>
        </Box>
      )}
    </Toaster>
  );
};
