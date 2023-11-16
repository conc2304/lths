import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Toast, ToastBar, Toaster, resolveValue, toast, useToaster } from 'react-hot-toast';

export const LayoutToaster = () => {
  const { handlers, toasts } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;

  const animTime = '900ms';

  const TOAST_LIMIT = 1;
  // const [visibleToasts, setVisibleToasts] = useState<Toast[]>(toasts);

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

  return (
    <Box
      data-testid="LayoutToaster--root"
      sx={{
        position: 'fixed',
        zIndex: 9999,
        inset: '1.5rem',
        pointerEvents: 'none',
      }}
    >
      <style>{fadeInKeyframes}</style>
      <style>{fadeOutKeyframes}</style>
      {toasts.map((t, i) => {
        const offset = calculateOffset(t, {
          reverseOrder: false,
          gutter: 8,
          defaultPosition: 'top-center',
        });

        const ref = (el) => {
          if (el && typeof t.height !== 'number') {
            const height = el.getBoundingClientRect().height;
            updateHeight(t.id, height);
          }
        };

        return (
          <Box
            data-testid="TOASTER"
            data-class={t.visible ? 'visible' : 'invisible'}
            key={t.id}
            ref={ref}
            sx={{
              maxWidth: '100%',
              minWidth: '100%',
              background: theme.palette.snackBar?.main || '#dfdfdf',
              color: theme.palette.snackBar?.contrastText || '#FFF',
              borderRadius: '0.25rem',
              padding: '0.375rem 1rem ',
              boxShadow:
                '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
              transition: 'all 0.5s ease-out',
              // opacity: t.visible ? 1 : 0,
              animation:
                i !== 0
                  ? undefined
                  : t.visible
                  ? `${animEnterName} ${animTime} ease`
                  : `${animExitName} ${animTime} ease forwards`, // forwards is needed to prevent animation end flickering
              left: '0px',
              right: '0px',
              display: 'flex',
              position: 'absolute',
              transform: `translateY(${-offset}px)`,
              bottom: '0px',
              pointerEvents: 'initial',
            }}
            // onMouseOver={() => {
            //   startPause();
            // }}
            // onMouseLeave={() => {
            //   endPause();
            // }}
          >
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
          </Box>
        );
      })}
    </Box>
  );
};
