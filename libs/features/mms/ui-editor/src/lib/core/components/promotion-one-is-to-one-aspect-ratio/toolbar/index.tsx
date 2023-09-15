import { OutlinedTextField, GroupLabel, ToolbarLabel, SimpleImagePicker } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { PromotionOneIsToOneAspectRatioComponentProps } from '../../types';

const PromotionOneIsToOneAspectRatioToolbar = (props: PromotionOneIsToOneAspectRatioComponentProps) => {
  const {
    __ui_id__: id,
    data: { image, img_alt_text, action, btn_text },
    onPropChange,
  } = props;

  const { handleImageChange, handleImageAltChange, handleButtonTextChange } = useToolbarChange();

  return (
    <ToolContainer id={id} aria-label={'Promotion One Is To One Aspect Ratio Toolbar'}>
      <ToolbarLabel label={'Promotion'} />
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={handleImageAltChange} />

      <GroupLabel label={'Button'} />
      <OutlinedTextField label={'Label'} value={btn_text} onChange={handleButtonTextChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolContainer>
  );
};
export default PromotionOneIsToOneAspectRatioToolbar;
