import { EventCardCarousel } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { CarouselEventsComponentProps } from '../../types';

const CarouselEventsComponent = (props: CarouselEventsComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;
  return (
    <BasicContainer id={id} sx={{ margin: 0 }}>
      <EventCardCarousel items={sub_component_data} />
    </BasicContainer>
  );
};

export default CarouselEventsComponent;
