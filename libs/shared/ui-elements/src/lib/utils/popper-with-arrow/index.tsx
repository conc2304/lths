import React from 'react';
import { Box, ClickAwayListener, Fade, Paper, Popper, PopperProps, useTheme } from '@mui/material';
import { Property } from 'csstype';

import { PopperArrow } from './arrow';

type PopperWithArrowProps = PopperProps & {
  children?: JSX.Element;
  onClickAway: () => void;
  arrow?: boolean;
  arrowSize?: Property.Width;
};

export const PopperWithArrow = (props: PopperWithArrowProps) => {
  const {
    anchorEl,
    open,
    onClickAway,
    children,
    placement = 'right-start',
    arrow = true,
    arrowSize = '1.5rem',
  } = props;
  const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null);
  const theme = useTheme();

  return (
    <Popper
      data-testid="Popper-with-arrow--root"
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      transition
      sx={{
        // force to sit under modals
        zIndex: theme.zIndex.modal - 10,
      }}
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: arrowRef,
            padding: 10,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 30],
          },
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <ClickAwayListener onClickAway={onClickAway}>
              <Paper elevation={8} sx={{ backgroundColor: theme.palette.background.paper, maxWidth: 1000 }}>
                {arrow ? (
                  <PopperArrow placement={placement} size={arrowSize} ref={setArrowRef} data-testid="Popper--arrow" />
                ) : null}
                <Box>{children}</Box>
              </Paper>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};
