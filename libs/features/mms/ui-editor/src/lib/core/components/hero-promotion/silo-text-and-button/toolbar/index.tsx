import { OutlinedTextField, ActionInput, GroupLabel, ToolbarLabel, SimpleImagePicker } from '../../../../../elements';
import { ToolContainer } from '../../../../../elements/containers';
import { useToolbarChange } from '../../../hooks';
import { SiloTextAndButtonComponentProps } from '../../../types';

const SiloTextAndButtonToolbar = (props: SiloTextAndButtonComponentProps) => {
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
    handleActionChange,
  } = useToolbarChange();

  return (
    <ToolContainer id={id} aria-label="Silo Text And Button Toolbar">
      <ToolbarLabel label={'Promotion'} />
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={handleImageAltChange} />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField label={'Description'} value={description} onChange={handleDescriptionChange} />

      <GroupLabel label={'Button'} />
      <OutlinedTextField label={'Label'} value={btn_text} onChange={handleButtonTextChange} />
      <ActionInput action={action} handleActionChange={handleActionChange} />
    </ToolContainer>
  );
};
export default SiloTextAndButtonToolbar;
