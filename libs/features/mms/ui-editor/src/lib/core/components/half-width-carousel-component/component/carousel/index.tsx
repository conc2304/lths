import { Typography, Card, CardContent, CardMedia, CardActionArea, Stack } from '@mui/material';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import colors from '../../../../../common/colors';
import { HalfWidthCarouselProps } from '../../../types';

import './index.css';
type CarouselProps = {
  items: HalfWidthCarouselProps[];
};

const HalfWidthCarousel = ({ items }: CarouselProps) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
      {items.map((item, index) => {
        const { image, title, description, image_alt_text } = item;
        return (
          <SwiperSlide key={index}>
            <Stack direction="column" alignItems="center" spacing={1.5}>
              <Card key={index} sx={{ maxWidth: 144, bgcolor: colors.card.background }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ width: '144px', height: '96px', objectFit: 'cover', bgcolor: 'white' }}
                    image={image}
                    alt={image_alt_text}
                  />
                  <CardContent
                    sx={{ bgcolor: colors.card.background, padding: '16px', borderColor: colors.card.background }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 450,
                        color: colors.editor.text,
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.875rem', color: colors.editor.subText, fontWeight: 400 }}
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
export default HalfWidthCarousel;
