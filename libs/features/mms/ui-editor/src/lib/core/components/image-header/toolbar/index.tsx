import { ToolbarLabel, SimpleImagePicker, OutlinedTextField } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { ImageHeaderComponentProps } from '../../types';

const ImageHeaderToolbar = (props: ImageHeaderComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, sub_title, image },
    onPropChange,
  } = props;

  const { handleImageChange, handleTitleChange, handleSubTitleChange } = useToolbarChange();

  return (
    <ToolContainer id={id} aria-label={'Image Header Toolbar'}>
      <ToolbarLabel label={'Image Header'} />
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField label={'Sub Title'} value={sub_title} onChange={handleSubTitleChange} />
    </ToolContainer>
  );
};
export default ImageHeaderToolbar;
