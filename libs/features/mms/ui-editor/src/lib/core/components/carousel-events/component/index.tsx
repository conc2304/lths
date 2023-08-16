import { EventCardCarousel } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { CarouselEventsComponentProps } from '../../types';

const CarouselEventsComponent = (props: CarouselEventsComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <EventCardCarousel items={sub_properties_data} />
    </BasicContainer>
  );
};

export default CarouselEventsComponent;
