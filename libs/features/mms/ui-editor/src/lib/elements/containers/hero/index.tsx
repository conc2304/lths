import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { MOBILE_GUTTER } from '../../../common';

type HeroContainerProps = {
  id: string;
  width?: number;
  height?: number;
  image: string;
  children: ReactNode;
  disableGutter?: boolean;
};

const HeroContainer = ({ id, width, height, image, children, disableGutter = false }: HeroContainerProps) => {
  const perc = (height / width) * 100;
  return (
    <Box sx={{ margin: disableGutter ? 0 : MOBILE_GUTTER }}>
      <Box
        id={`${id}-component`}
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: 0,
          position: 'relative',
          paddingTop: `${perc}%`,
          borderRadius: disableGutter ? 0 : MOBILE_GUTTER,
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
    </Box>
  );
};
export default HeroContainer;
