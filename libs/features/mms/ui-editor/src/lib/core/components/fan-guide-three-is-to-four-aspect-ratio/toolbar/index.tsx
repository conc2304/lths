import { OutlinedTextField, GroupLabel, ToolbarLabel, SimpleImagePicker } from '../../../../elements';
import { ToolPreviewContainer, ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { FanGuideThreeIsToFourAspectRatioComponentProps } from '../../types';

const FanGuideThreeIsToFourAspectRatioToolbar = (props: FanGuideThreeIsToFourAspectRatioComponentProps) => {
  const {
    __ui_id__: id,
    data: { image, img_alt_text, title, description, action, btn_text },
    onPropChange,
  } = props;

  const {
    handleTitleChange,
    handleDescriptionChange,
    handleButtonTextChange,
    handleImageChange,
    handleImageAltChange,
  } = useToolbarChange();

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id} aria-label={'Fan Guide Three Is To Four Aspect Ratio Toolbar'}>
      <ToolbarLabel label={'Fan guide'} />
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={handleImageAltChange} />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField label={'Description'} value={description} onChange={handleDescriptionChange} />

      <GroupLabel label={'Button'} />
      <OutlinedTextField label={'Label'} value={btn_text} onChange={handleButtonTextChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolPreviewContainer>
  );
};
export default FanGuideThreeIsToFourAspectRatioToolbar;
