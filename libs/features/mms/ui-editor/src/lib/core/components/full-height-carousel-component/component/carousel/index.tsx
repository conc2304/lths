import { Typography, Card, CardContent, CardMedia, CardActionArea, Stack } from '@mui/material';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { FullHeightCarouselProps } from '../../../types';

import './index.css';
type CarouselProps = {
  items: FullHeightCarouselProps[];
};

const FullHeightCarousel = ({ items }: CarouselProps) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
      {items.map((item, index) => {
        const { image, title, description, img_alt_text } = item;
        return (
          <SwiperSlide key={index}>
            <Stack direction="column" alignItems="center" spacing={1.5}>
              <Card key={index} sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    image={image}
                    alt={img_alt_text}
                  />
                  <CardContent sx={{ bgcolor: '#242526', width: '300px', padding: '16px' }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        paddingBottom: 0.5,
                        fontSize: '1rem',
                        fontWeight: 450,
                        color: '#ffffff',
                        wordWrap: 'break-word',
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.875rem', color: '#ABABAC', fontWeight: 400, wordWrap: 'break-word' }}
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Stack>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default FullHeightCarousel;
