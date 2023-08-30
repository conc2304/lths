import { CSSProperties } from 'react';
import { Box, BoxProps, PopperPlacementType, Theme, styled } from '@mui/material';
import { Property } from 'csstype';

import { extractNumericValue } from '../string-utils';

export type PopperArrowProps = BoxProps & {
  placement: PopperPlacementType;
  size?: Property.Width;
  theme?: Theme;
};

export const PopperArrow = styled(Box)<PopperArrowProps>(({ theme, size = '1rem', placement }) => {
  const [numericValue, unit] = extractNumericValue(size);

  let height = Number(numericValue);
  let width = Math.hypot(height, height);

  if (placement === 'top' || placement === 'bottom') {
    const temp = height;
    height = width;
    width = temp;
  }

  const getTransformOrigin = (placement: PopperPlacementType): Property.TransformOrigin => {
    switch (placement) {
      case 'right-end':
        return '100% 100%';
      case 'right-start':
        return '100% 100%';
      case 'left-start':
        return '0 0';
      case 'left-end':
        return '0 0';
      case 'top':
        return '0 0';
      case 'bottom':
        return '100% 100%';

      default:
        return '0 0';
    }
  };

  const getPlacementStyles = (placement: PopperPlacementType): CSSProperties => {
    switch (placement) {
      case 'right-end':
        return {
          left: 0,
          marginLeft: `-${height}${unit}`,
          height: `${width}${unit}`,
          width: `${height}${unit}`,
          marginTop: 4,
          marginBottom: 4,
        };
      case 'right-start':
        return {
          left: 0,
          marginLeft: `-${height}${unit}`,
          height: `${width}${unit}`,
          width: `${height}${unit}`,
          marginTop: 4,
          marginBottom: 4,
        };
      case 'left-start':
        return {
          right: 0,
          marginRight: `-${height}${unit}`,
          height: `${width}${unit}`,
          width: `${height}${unit}`,
          marginTop: 4,
          marginBottom: 4,
        };
      case 'left-end':
        return {
          right: 0,
          marginRight: `-${height}${unit}`,
          height: `${width}${unit}`,
          width: `${height}${unit}`,
          marginTop: 4,
          marginBottom: 4,
        };
      case 'top':
        return {
          bottom: 0,
          height: `${width}${unit}`,
          width: `${height}${unit}`,
          marginBottom: `-${width}${unit}`,
        };
      case 'bottom': {
        return {
          top: 0,
          height: `${width}${unit}`,
          width: `${height}${unit}`,
          marginTop: `-${width}${unit}`,
        };
      }
      default:
        return {};
    }
  };

  const getBoxShadowMap = () => {
    if (placement.includes('right')) {
      return '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)';
    }

    if (placement.includes('left')) {
      return '4px -2px 1px -2px rgba(0,0,0,0.2), 3px -1px 4px 0px rgba(0,0,0,0.14), 3px 0px 5px 0px rgba(0,0,0,0.12)';
    }

    if (placement === 'bottom') {
      return '0px 2px 4px 0px rgba(0,0,0,0.15)';
    }

    if (placement === 'top') {
      return '-4px -1px 4px 0px rgba(0,0,0,0.15)';
    }
    return '-4px -1px 4px 0px rgba(0,0,0,0.15)';
  };

  return {
    overflow: 'hidden',
    position: 'absolute',
    width: `${width}rem`,
    height: `${height}rem`,
    boxSizing: 'border-box',
    color: theme.palette.background.paper,
    ...getPlacementStyles(placement),

    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: '100%',
      height: '100%',
      boxShadow: getBoxShadowMap(),
      backgroundColor: 'currentColor',
      transform: `rotate(${['top', 'bottom'].includes(placement) ? '315deg' : '45deg'})`,
      transformOrigin: getTransformOrigin(placement),
    },
  };
});
