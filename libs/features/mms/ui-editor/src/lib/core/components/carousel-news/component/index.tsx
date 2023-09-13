import { CardCarousel } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { CarouselNewsComponentProps } from '../../types';

const CarouselNewsComponent = (props: CarouselNewsComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;
  return (
    <BasicContainer id={id} sx={{ margin: 0 }}>
      <CardCarousel items={sub_component_data} />
    </BasicContainer>
  );
};

export default CarouselNewsComponent;
