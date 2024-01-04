import { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

type HeroCardContainerProps = {
  id: string;
  width?: string | number;
  height: number;
  image: string;
  sx?: SxProps;
  children: ReactNode;
};

const HeroCardContainer = ({
  id,
  children,
  width = '100%',
  height,
  image,
  sx = {},
  ...rest
}: HeroCardContainerProps) => {
  return (
    <Box
      id={`${id}-component`}
      sx={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: height,
        width: { width },
        padding: 2.5,
        textAlign: 'center',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default HeroCardContainer;
