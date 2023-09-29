import { ReactNode } from 'react';
import { Stack } from '@mui/material';

import './index.scss';

type CarouselProps = {
  items: ReactNode[];
  spacing?: string | number;
};

const Carousel = (props: CarouselProps) => {
  const { items, spacing = 1.5 } = props;
  return (
    <Stack
      spacing={spacing}
      direction="row"
      sx={{
        flexWrap: 'nowrap',
        overflowX: 'hidden',
        '&:hover': {
          overflowX: 'scroll',
        },
      }}
      className="carousel-container"
    >
      {items}
    </Stack>
  );
};

export default Carousel;
