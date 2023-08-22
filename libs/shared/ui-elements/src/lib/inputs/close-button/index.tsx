import { CSSProperties } from 'react';
import { Box, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { Property } from 'csstype';
import { extractNumericValue } from 'libs/shared/ui-elements/src/lib/utils/string-utils';
import { pxToRem } from '@lths/shared/utils';

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
  color = '#000',
  onClick,
  hoverStyles,
  buttonStyles,
  activeStyles,
}: CloseButtonProps) => {
  const [numericValue, unit] = extractNumericValue(size);
  const lineLength = Math.hypot(Number(numericValue), Number(numericValue));

  const lineSx: SxProps<Theme> = {
    background: color,
    position: 'absolute',
    top: 0,
    right: `${Number(numericValue) / 2}${unit}`,
    bottom: 0,
  };
  return (
    <Box
      width={size}
      height={size}
      onClick={onClick}
      data-testid="Close-Button--root"
      sx={{
        p: 0.25,
        cursor: 'pointer',
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
