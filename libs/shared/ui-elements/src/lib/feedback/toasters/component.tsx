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
        inset: '1.5rem', // this controls the edge padding
      }}
      toastOptions={{
        duration: 4000,
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
              maxWidth: '100%',
              minWidth: '100%',
              background: theme.palette.snackBar?.main || '#dfdfdf',
              color: theme.palette.snackBar?.contrastText || '#FFF',
              borderRadius: '0.25rem',
              padding: '0.375rem 1rem ',
              boxShadow:
                '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
              animation: t.visible ? `${animEnterName} ${animTime} ease` : `${animExitName} ${animTime} ease forwards`, // forwards is needed to prevent animation end flickering
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
