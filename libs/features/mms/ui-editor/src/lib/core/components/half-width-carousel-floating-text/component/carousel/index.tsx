import { Pagination } from 'swiper';
import { Typography, Card, CardMedia, Stack } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HalfWidthCarouselFloatingTextProps } from '../../../types';
import './index.css';

type CarouselProps = {
  items: HalfWidthCarouselFloatingTextProps[];
};

const HalfWidthCarousel = ({ items }: CarouselProps) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      modules={[Pagination]}
      pagination={{ clickable: true }}
    > 
      {items.map((item, index) => {
        const { image, img_alt_text, title } = item;
        
        return (
          <SwiperSlide key={index}>
            <Stack
              direction="column" alignItems="center" spacing={1.5}
            >
              <Card sx={{ 
                width: "144px", height: "144px",
                borderRadius: "10px",
                boxShadow: "none"
              }}>
                <CardMedia
                  component="img"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  image={image}
                  alt={img_alt_text}
                />
              </Card>
              <Typography sx={{ width: "144px", fontSize: 14, textAlign: "left", color: "white" }}>
                {title}
              </Typography>
            </Stack>
          </SwiperSlide>
        )
      }
      )}
    </Swiper>
  );
};

export default HalfWidthCarousel;
