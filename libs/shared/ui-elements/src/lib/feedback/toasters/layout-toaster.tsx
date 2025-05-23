import { useRef } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { resolveValue, toast as toast_rht, useToaster } from 'react-hot-toast';

import { toast } from './toast-service';

export const LayoutToaster = () => {
  const theme = useTheme();
  const { handlers, toasts } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;

  // Toast Animation State
  const renderedToastsRef = useRef(new Map());
  const firstRenderTimestampRef = useRef(new Map());
  const animationCompletedRef = useRef(new Map());
  const previousIndicesRef = useRef(new Map());

  // Animation Settings
  //
  // each toast should have an animation of their own, so adding math.random to avoid collision
  const animEnterName = `toastEnter${Math.round(Math.random() * 100)}`;
  const animExitName = `toastExit${Math.round(Math.random() * 100)}`;
  const animTime = '300ms';
  const fadeInKeyframes = `
  @keyframes ${animEnterName} {
      from { opacity: 0; transform: translateY(150%); }
      to {  opacity: 1; transform: translateY(0); }
  }`;
  const fadeOutKeyframes = `
  @keyframes ${animExitName} {
      from { }
      to {  opacity: 0; transform: translateY(150%); }
  }`;

  return (
    <Box
      data-testid="LayoutToasterContainer--root"
      sx={{
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        inset: '1.5rem',
        pointerEvents: 'none',
      }}
    >
      {/* inline styles for each of the toasts animations */}
      <style>{fadeInKeyframes}</style>
      <style>{fadeOutKeyframes}</style>
      {toasts
        .sort((t) => ((t?.type as string) === 'important' ? 1 : -1))
        .map((t, i) => {
          const offset = calculateOffset(t, {
            reverseOrder: false,
            gutter: 8,
            defaultPosition: 'bottom-center',
          });

          const ref = (el: HTMLElement) => {
            if (el && typeof t.height !== 'number') {
              const height = el.getBoundingClientRect().height;
              updateHeight(t.id, height);
            }
          };

          const millis = Date.now();
          const isInitialRender = !renderedToastsRef.current.has(t.id);
          if (isInitialRender) {
            firstRenderTimestampRef.current.set(t.id, millis);
          }
          const prevIndex = previousIndicesRef.current.get(t.id) || 0;
          const isIndexDecreased = i < prevIndex;
          const indexToZero = isIndexDecreased && i === 0;
          previousIndicesRef.current.set(t.id, i);

          // Allow the animation to finish before updating it to the next state
          const animTimeMillis = parseFloat(animTime) * (animTime.endsWith('ms') ? 1 : 1000);
          const firstRenderTime = firstRenderTimestampRef.current.get(t.id) || 0;
          const isWithinAnimTime = millis - firstRenderTime < animTimeMillis;
          const shouldAnimateEnter =
            t.visible && isWithinAnimTime && !indexToZero && !animationCompletedRef.current.get(t.id);

          // If the toast has ever completed its enter animation, it should never do it again
          // If the animation is starting, set a timeout to mark it as completed
          if (shouldAnimateEnter) {
            setTimeout(() => {
              animationCompletedRef.current.set(t.id, true);
            }, parseFloat(animTime));
          }

          const animation =
            i !== 0 // only first should have enter animation
              ? undefined // toast is not first - so no enter animation is needed, use the builtin transform translateY to the next spot
              : t.visible // check if toast is visible
              ? shouldAnimateEnter //  if it is visible, check if enter animation is needed
                ? `${animEnterName} ${animTime} ease` // apply enter transition
                : undefined // use the default 'transform translateY' property
              : `${animExitName} ${animTime} ease both`; // apply exit animation when toast becomes not visible

          return (
            <Box
              data-testid="LayoutToaster--notification"
              data-class={t.visible ? 'visible' : 'invisible'}
              key={t.id}
              ref={ref}
              sx={{
                maxWidth: '100%',
                minWidth: '100%',
                // current designs dictate that all notifications are the same color regardless of notification type
                background: theme.palette.snackBar?.main || '#dfdfdf',
                color: theme.palette.snackBar?.contrastText || '#FFF',
                borderRadius: '0.25rem',
                padding: '0.375rem 1rem ',
                boxShadow:
                  '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
                transition: `all ${animTime} ease-out`,
                transform: `translateY(-${offset}px)`,
                opacity: 1,
                animation,
                left: '0px',
                right: '0px',
                display: 'flex',
                position: 'absolute',
                bottom: '0px',
                pointerEvents: 'initial',
              }}
              onMouseEnter={() => {
                // dont pause if we transitioning state -> causes animation to flicker
                if (animationCompletedRef.current.size !== 0) {
                  startPause();
                }
              }}
              onMouseLeave={() => {
                endPause();
              }}
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
                    {resolveValue(t.message, t) || (t.message as string)}
                  </Typography>
                </Box>
                <Box>
                  {t.type !== 'loading' && (
                    <IconButton
                      data-testid="LayoutToaster--close-btn"
                      onClick={() => {
                        endPause();
                        toast_rht.dismiss(t.id);
                        toast.processQueue();
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
