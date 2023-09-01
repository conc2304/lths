import HalfWidthCarousel from './carousel';
import { BasicContainer } from '../../../../elements/containers';
import { HalfWidthCarouselFloatingTextComponentProps } from '../../types';

const HalfWidthCarouselFloatingTextComponent = (props: HalfWidthCarouselFloatingTextComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <HalfWidthCarousel items={component_data} />
    </BasicContainer>
  );
};

export default HalfWidthCarouselFloatingTextComponent;
