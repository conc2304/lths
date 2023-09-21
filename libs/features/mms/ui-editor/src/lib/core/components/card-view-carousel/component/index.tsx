import CardViewCarousel from './carousel';
import { BasicContainer } from '../../../../elements/containers';
import { CardViewCarouselComponentProps } from '../../types';

const CardViewCarouselComponent = (props: CardViewCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;
  return (
    <BasicContainer id={id}>
      <CardViewCarousel items={sub_component_data} />
    </BasicContainer>
  );
};

export default CardViewCarouselComponent;
