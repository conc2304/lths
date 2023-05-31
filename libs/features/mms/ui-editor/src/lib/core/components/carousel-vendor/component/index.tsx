import { VendorVCardCarousel } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { CarouselVendorComponentProps } from '../../types';

const CarouselVendorComponent = (props: CarouselVendorComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <VendorVCardCarousel items={component_data} />
    </BasicContainer>
  );
};

export default CarouselVendorComponent;
