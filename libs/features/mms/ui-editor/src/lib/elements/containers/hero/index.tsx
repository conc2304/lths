import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { MOBILE_GUTTER } from '../../../common';

type HeroContainerProps = {
  id: string;
  width?: number;
  height?: number;
  image: string;
  children: ReactNode;
};
const HeroContainer = ({ id, width, height, image, children }: HeroContainerProps) => {
  const perc = (height / width) * 100;
  return (
    <Box
      id={id}
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: 0,
        position: 'relative',
        paddingTop: `${perc}%`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          padding: MOBILE_GUTTER,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
export default HeroContainer;
