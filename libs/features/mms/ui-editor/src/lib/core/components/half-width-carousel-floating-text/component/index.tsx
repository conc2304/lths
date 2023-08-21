import HalfWidthCarousel from './carousel'
import { BasicContainer } from '../../../../elements/containers';
import { HalfWidthCarouselFloatingTextComponentProps } from '../../types';

const HalfWidthCarouselFloatingTextComponent = (props: HalfWidthCarouselFloatingTextComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <HalfWidthCarousel items={sub_properties_data} />
    </BasicContainer>
  );
};

export default HalfWidthCarouselFloatingTextComponent;
