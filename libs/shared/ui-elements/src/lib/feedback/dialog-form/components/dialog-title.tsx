import { DialogTitle as DialogTitleMui, Typography } from '@mui/material';
import { Box, SxProps } from '@mui/system';

import { pxToRem } from '@lths/shared/utils';

import { CloseButton } from '../../../inputs';

type DialogTitleProps = {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  onClose: () => void;
  sx?: SxProps;
};

export const DialogTitle = (props: DialogTitleProps) => {
  const { title, subtitle, onClose, sx = {} } = props;
  return (
    <DialogTitleMui position="relative" mb={2} sx={sx}>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: pxToRem(24),
          lineHeight: pxToRem(42),
          letterSpacing: '0.15px',
          pt: 1.5,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: pxToRem(12),
            lineHeight: pxToRem(16),
            letterSpacing: '0.15px',
          }}
        >
          {subtitle}
        </Typography>
      )}

      <Box position="absolute" top={22} right={20}>
        <CloseButton
          size={pxToRem(17)}
          color="#000"
          thickness="1px"
          onClick={onClose}
          hoverStyles={{
            opacity: 0.7,
            transition: '0.1s ease-in ',
          }}
        />
      </Box>
    </DialogTitleMui>
  );
};
