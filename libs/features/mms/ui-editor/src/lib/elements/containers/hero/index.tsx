import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

type HeroContainerProps = {
  width?: number;
  height?: number;
  image: string;
  children: ReactNode;
};
const HeroContainer: React.FC<HeroContainerProps> = ({ width, height, image, children }) => {
  const perc = (height / width) * 100;
  return (
    <Box
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
          padding: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
export default HeroContainer;
