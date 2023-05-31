import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EventsCard, EventsCardProps } from '../../cards';

import './index.css';
// core version + navigation, pagination modules:

type EventsCarouselProps = {
  items: EventsCardProps[];
};

const EventCardCarousel = ({ items }: EventsCarouselProps) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      modules={[Pagination]} //you can add any other module here such as navigation and whatever else
      pagination={{ clickable: true }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <EventsCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EventCardCarousel;
