import { Card, CardMedia, Stack } from '@mui/material';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CardViewCarouselProps } from '../../../types';

import './index.css';

type CarouselProps = {
  items: CardViewCarouselProps[];
};

const CardViewCarousel = ({ items }: CarouselProps) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
      {items.map((item, index) => {
        const { image } = item;

        return (
          <SwiperSlide key={index}>
            <Stack direction="column" alignItems="center" spacing={1.5}>
              <Card
                sx={{
                  maxWidth: 275,
                  borderRadius: '10px',
                  boxShadow: 'none',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 275, height: 180, objectFit: 'cover' }}
                  image={image}
                />
              </Card>
            </Stack>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CardViewCarousel;
