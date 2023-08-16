import { VendorVCardCarousel } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { CarouselVendorComponentProps } from '../../types';

const CarouselVendorComponent = (props: CarouselVendorComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <VendorVCardCarousel items={sub_properties_data} />
    </BasicContainer>
  );
};

export default CarouselVendorComponent;
