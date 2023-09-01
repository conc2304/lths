import { BasicTextField, ColorPicker, ImagePicker } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { ImageComponentProps } from '../../types';

const ImageToolbar = (props: ImageComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, title, desc, color = '#000000' },
    onPropChange,
  } = props;

  const { handleTitleChange, handleDescChange, handleImageChange, updateComponentProp } = useToolbarChange();

  const handleColorChange = (color: string) => {
    updateComponentProp('color', color);
  };

  return (
    <ToolContainer id={id}>
      <ImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <ColorPicker label={'Color'} value={color} onChange={handleColorChange} />
      <BasicTextField label={'Description'} value={desc} onChange={handleDescChange} />
    </ToolContainer>
  );
};
export default ImageToolbar;
