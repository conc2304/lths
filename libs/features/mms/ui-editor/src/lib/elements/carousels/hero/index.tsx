import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Pagination, Swiper as SwiperProps } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HeroCarouselProps } from '../../../core/components';
import heroCarouselComponentFactory from '../../../core/components/hero-carousel/component/factory';
import Header from '../../../core/components/hero-gamebox/component/header';
import { HeroCarouselMetaDataProps } from '../../../core/components/types';

import './index.scss';

type CarouselProps = {
  items: HeroCarouselProps[];
  headerText: string;
  metaData?: HeroCarouselMetaDataProps;
  onSlideIndexChange?: (index: number) => void;
};

const HeroCarousel = ({ items, metaData, headerText = '', onSlideIndexChange }: CarouselProps) => {
  const swiperRef = useRef<SwiperProps>();

  useEffect(() => {
    const selectedSlideIndex = metaData ? metaData.selectedSlideIndex : 0;
    swiperRef.current && swiperRef.current.slideTo(selectedSlideIndex);
  }, [swiperRef, metaData]);

  const handleSlideChange = (swiper: SwiperProps) => {
    (onSlideIndexChange && swiper?.activeIndex >= 0) && onSlideIndexChange(swiper.activeIndex);
  };

  if (!Array.isArray(items)) return <Typography>Requires an array instead received an object</Typography>;
  else
    return (
      <Box position="relative">
        <Header headerText={headerText} sx={{ position: 'absolute', top: 0, padding: 2.5, width: '100%', zIndex: 2 }} />
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          modules={[Pagination]} //you can add any other module here such as navigation and whatever else
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
        >
          {items.map((item) => (
            <SwiperSlide key={item.__ui_id__} style={{ marginRight: '0' }}>
              {heroCarouselComponentFactory(item)}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    );
};

export default HeroCarousel;
