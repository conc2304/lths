import FullHeightCarousel from './carousel';
import { BasicContainer } from '../../../../elements';
import { FullHeightCarouselComponentProps } from '../../types';

const FullHeightCarouselComponent = (props: FullHeightCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <FullHeightCarousel items={sub_component_data} />
    </BasicContainer>
  );
};

export default FullHeightCarouselComponent;
