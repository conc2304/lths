import { BasicTextField, ImagePicker } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { CardComponentProps } from '../../types';

const CardToolbar = (props: CardComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { image, title, desc },
    onPropChange,
  } = props;

  const { handleTitleChange, handleDescChange, handleImageChange } = useToolbarChange();

  return (
    <ToolContainer id={id}>
      <ImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
    </ToolContainer>
  );
};
export default CardToolbar;
