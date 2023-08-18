import FullHeightCarousel from './carousel';
import { BasicContainer } from '../../../../elements';
import { FullHeightCarouselComponentProps } from '../../types';

const FullHeightCarouselComponent = (props: FullHeightCarouselComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <FullHeightCarousel items={sub_properties_data} />
    </BasicContainer>
  );
};

export default FullHeightCarouselComponent;
