import { CSSProperties } from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';
import { Property } from 'csstype';

import { pxToRem } from '@lths/shared/utils';

import { extractNumericValue } from '../../utils/string-utils';

type CloseButtonProps = {
  size?: Property.Width;
  thickness?: Property.Width;
  color?: Property.Color;
  onClick?: () => void;
  activeStyles?: CSSProperties;
  buttonStyles?: SxProps;
  hoverStyles?: CSSProperties;
};

export const CloseButton = ({
  size = pxToRem(17),
  thickness = '1px',
  color: colorProp,
  onClick,
  hoverStyles,
  buttonStyles,
  activeStyles,
}: CloseButtonProps) => {
  const [numericValue, unit] = extractNumericValue(size);
  const lineLength = Math.hypot(Number(numericValue), Number(numericValue));

  const theme = useTheme();
  const color = colorProp || theme.palette.action.active;
  const lineSx: SxProps<Theme> = {
    background: color,
    position: 'absolute',
    opacity: 1,
    top: 0,
    right: `${Number(numericValue) / 2}${unit}`,
    bottom: 0,
  };
  return (
    <Box
      width={size}
      height={size}
      onClick={onClick}
      className="Close-Button--root"
      data-testid="Close-Button--root"
      sx={{
        p: 0.25,
        cursor: 'pointer',
        position: 'relative',
        ...buttonStyles,
        '&:hover': { ...hoverStyles },
        '&:active': { ...activeStyles },
      }}
    >
      <Box
        width={thickness}
        height={`${lineLength}${unit}`}
        sx={{
          transform: 'rotate(45deg)',
          ...lineSx,
        }}
      />
      <Box
        width={thickness}
        height={`${lineLength}${unit}`}
        sx={{
          transform: 'rotate(135deg)',
          ...lineSx,
        }}
      />
    </Box>
  );
};
