import { EventCardCarousel } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { CarouselEventsComponentProps } from '../../types';

const CarouselEventsComponent = (props: CarouselEventsComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <EventCardCarousel items={component_data} />
    </BasicContainer>
  );
};

export default CarouselEventsComponent;
