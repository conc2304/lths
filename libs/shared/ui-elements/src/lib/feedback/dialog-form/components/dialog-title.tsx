import { DialogTitle as DialogTitleMui, DialogTitleProps, Typography } from '@mui/material';
import { Box, SxProps } from '@mui/system';

import { pxToRem } from '@lths/shared/utils';

import { CloseButton } from '../../../inputs';

type DialogTitleLTHSProps = {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  onClose?: () => void;
  sx?: SxProps;
  slotProps?: { DialogTitle?: DialogTitleProps };
};

export const DialogTitle = (props: DialogTitleLTHSProps) => {
  const {
    title,
    subtitle,
    onClose,
    sx = {},
    slotProps = {
      DialogTitle: {},
    },
  } = props;
  return (
    <DialogTitleMui position="relative" sx={sx} {...slotProps.DialogTitle}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontWeight: 500,
            fontSize: pxToRem(20),
            lineHeight: pxToRem(32),
            letterSpacing: '0.15px',
          }}
        >
          {title}
        </Typography>
        <Box>
          {onClose && (
            <CloseButton
              size={pxToRem(12)}
              thickness="2px"
              onClick={onClose}
              hoverStyles={{
                opacity: 0.7,
                transition: '0.1s linear',
              }}
            />
          )}
        </Box>
      </Box>
      {subtitle && <Box>{subtitle}</Box>}
    </DialogTitleMui>
  );
};
