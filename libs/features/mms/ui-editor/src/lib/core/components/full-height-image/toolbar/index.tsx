import { SimpleImagePicker, ToolbarLabel } from '../../../../elements';
import { ToolPreviewContainer, ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { FullHeightImageComponentProps } from '../../types';

const FullHeightImageToolbar = (props: FullHeightImageComponentProps) => {
  const {
    __ui_id__: id,
    data: { image, action },
    onPropChange,
  } = props;

  const { handleImageChange } = useToolbarChange();

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id} aria-label={'Full Height Image'}>
      <ToolbarLabel label={'Full Height Image'} />
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />

      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolPreviewContainer>
  );
};
export default FullHeightImageToolbar;
