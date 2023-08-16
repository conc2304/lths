import { CardCarousel } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { CarouselNewsComponentProps } from '../../types';

const CarouselNewsComponent = (props: CarouselNewsComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <CardCarousel items={sub_properties_data} />
    </BasicContainer>
  );
};

export default CarouselNewsComponent;
