import FullHeightCarousel from './carousel';
import { BasicContainer } from '../../../../elements';
import { FullHeightCarouselComponentProps } from '../../types';

const FullHeightCarouselComponent = (props: FullHeightCarouselComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <FullHeightCarousel items={component_data} />
    </BasicContainer>
  );
};

export default FullHeightCarouselComponent;
