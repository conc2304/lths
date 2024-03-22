import { SimpleImagePicker, ToolbarLabel } from '../../../../../elements';
import { ToolPreviewContainer, ActionToolbar } from '../../../common';
import { useToolbarChange } from '../../../hooks';
import { ImageComponentProps } from '../../../types';

const ImageToolbar = (props: ImageComponentProps) => {
  const {
    __ui_id__: id,
    data: { image, action },
    onPropChange,
  } = props;

  const { handleImageChange } = useToolbarChange();

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id} aria-label={'Image Toolbar'}>
      <ToolbarLabel label={'Image'} />
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />

      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolPreviewContainer>
  );
};
export default ImageToolbar;
