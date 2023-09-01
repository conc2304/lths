import { CardCarousel } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { CarouselNewsComponentProps } from '../../types';

const CarouselNewsComponent = (props: CarouselNewsComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <CardCarousel items={component_data} />
    </BasicContainer>
  );
};

export default CarouselNewsComponent;
