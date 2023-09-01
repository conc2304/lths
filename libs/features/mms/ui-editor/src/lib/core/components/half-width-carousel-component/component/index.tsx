import HalfWidthCarousel from './carousel';
import { BasicContainer } from '../../../../elements';
import { HalfWidthCarouselComponentProps } from '../../types';

const HalfWidthCarouselComponent = (props: HalfWidthCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;

  return (
    <BasicContainer id={id}>
      <HalfWidthCarousel items={sub_component_data} />
    </BasicContainer>
  );
};
export default HalfWidthCarouselComponent;
