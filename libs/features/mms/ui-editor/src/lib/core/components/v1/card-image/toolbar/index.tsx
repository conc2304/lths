import { BasicTextField, ImagePicker } from '../../../../../elements';
import { ToolContainer } from '../../../../../elements/containers';
import { useToolbarChange } from '../../../hooks';
import { CardImageComponentProps } from '../../../types';

const CardImageToolbar = (props: CardImageComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, image },
    onPropChange,
  } = props;

  const { handleTitleChange, handleImageChange } = useToolbarChange();

  return (
    <ToolContainer id={id}>
      <ImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
    </ToolContainer>
  );
};
export default CardImageToolbar;
