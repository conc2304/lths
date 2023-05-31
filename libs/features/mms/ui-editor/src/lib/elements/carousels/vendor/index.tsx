import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { VendorCard, VendorCardProps } from '../../cards';

import './index.css';
// core version + navigation, pagination modules:

type VendorCarouselProps = {
  items: VendorCardProps[];
};

const VendorVCardCarousel = ({ items }: VendorCarouselProps) => {
  return (
    <Swiper
      direction="vertical"
      spaceBetween={10}
      slidesPerView={1}
      modules={[Pagination]} //you can add any other module here such as navigation and whatever else
      pagination={{ clickable: true }}
      style={{ height: '25rem' }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <VendorCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VendorVCardCarousel;
