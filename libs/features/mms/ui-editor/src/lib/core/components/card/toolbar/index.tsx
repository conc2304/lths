import { BasicTextField } from '../../../../elements';
import { CardContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { CardComponentProps } from '../../types';

const CardToolbar = (props: CardComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, title, desc },
  } = props;

  const { handleTitleChange, handleDescChange, handleImageChange } = useToolbarChange();

  return (
    <CardContainer id={`${id}_toolbar`}>
      <BasicTextField label={'Image URL'} value={image} onChange={handleImageChange} />
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
    </CardContainer>
  );
};
export default CardToolbar;
