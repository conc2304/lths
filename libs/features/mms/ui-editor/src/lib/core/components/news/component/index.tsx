import { CardCarousel } from '../../../../elements';
import { BasicContainer } from '../../../../elements/containers';
import { CarouselNewsComponentProps } from '../../types';

const NewsComponent = (props: CarouselNewsComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
  } = props;
  return (
    <BasicContainer id={`${id}_component`}>
      <CardCarousel items={component_data} />
    </BasicContainer>
  );
};

export default NewsComponent;
