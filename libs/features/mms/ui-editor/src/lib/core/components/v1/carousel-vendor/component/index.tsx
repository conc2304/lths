import { VendorVCardCarousel } from '../../../../../elements';
import { BasicContainer } from '../../../../../elements/containers';
import { CarouselVendorComponentProps } from '../../../types';

const CarouselVendorComponent = (props: CarouselVendorComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;
  return (
    <BasicContainer id={id} sx={{ margin: 0 }}>
      <VendorVCardCarousel items={sub_component_data} />
    </BasicContainer>
  );
};

export default CarouselVendorComponent;
