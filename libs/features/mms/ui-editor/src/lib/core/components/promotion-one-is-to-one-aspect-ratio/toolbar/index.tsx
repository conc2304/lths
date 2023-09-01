import { OutlinedTextField, ActionInput, GroupLabel, ToolbarLabel, SimpleImagePicker } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { PromotionOneIsToOneAspectRatioComponentProps } from '../../types';

const PromotionOneIsToOneAspectRatioToolbar = (props: PromotionOneIsToOneAspectRatioComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { image, img_alt_text, action, btn_text },
    onPropChange,
  } = props;

  const { handleImageChange, handleImageAltChange, handleActionChange, handleButtonTextChange } = useToolbarChange();

  return (
    <ToolContainer id={id} aria-label={'Promotion One Is To One Aspect Ratio Toolbar'}>
      <ToolbarLabel label={'Promotion'} />
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={handleImageAltChange} />

      <GroupLabel label={'Button'} />
      <OutlinedTextField label={'Label'} value={btn_text} onChange={handleButtonTextChange} />
      <ActionInput action={action} handleActionChange={handleActionChange} />
    </ToolContainer>
  );
};
export default PromotionOneIsToOneAspectRatioToolbar;
