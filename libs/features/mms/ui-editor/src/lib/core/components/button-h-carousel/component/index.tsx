import { Button } from '@mui/material';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BasicContainer } from '../../../../elements';
import { ButtonHCarouselComponentProps } from '../../types';

const colors = { brand: { primary: '#111921', secondary: '#BA9765' }, text: '#ffffff' };

const ButtonHCarouselComponent = (props: ButtonHCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;

  const handleClick = (index: number) => {
    window.open(sub_component_data[index].action.page_link, '_blank');
  };

  return (
    <BasicContainer id={id}>
      <Swiper
        direction="horizontal"
        spaceBetween={8}
        slidesPerView={5}
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {sub_component_data.map(({ title }, index) => {
          return (
            <SwiperSlide key={index}>
              <Button
                size="small"
                color="primary"
                onClick={() => handleClick(index)}
                sx={{
                  paddingX: '1rem',
                  paddingY: '0.35rem',
                  backgroundColor: '#BA9765',
                  color: colors.text,
                  marginTop: '1rem',
                  '&:hover': {
                    backgroundColor: '#BA9765', // This will keep the background color same on hover
                  },
                }}
              >
                {title}
              </Button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </BasicContainer>
  );
};
export default ButtonHCarouselComponent;
