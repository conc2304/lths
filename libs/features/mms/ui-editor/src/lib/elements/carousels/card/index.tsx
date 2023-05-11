import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NewsCard, NewsCardProps } from '../../cards';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css/pagination';

import './index.css';
// core version + navigation, pagination modules:

type CarouselProps = {
  items: NewsCardProps[];
};

const CardCarousel = ({ items }: CarouselProps) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      modules={[Pagination]} //you can add any other module here such as navigation and whatever else
      pagination={{ clickable: true }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <NewsCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardCarousel;
