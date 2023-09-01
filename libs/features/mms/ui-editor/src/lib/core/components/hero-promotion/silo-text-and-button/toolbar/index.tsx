import { OutlinedTextField, GroupLabel, ToolbarLabel, SimpleImagePicker } from '../../../../../elements';
import { ToolContainer } from '../../../../../elements/containers';
import { ActionToolbar } from '../../../common';
import { useToolbarChange } from '../../../hooks';
import { SiloTextAndButtonComponentProps } from '../../../types';

const SiloTextAndButtonToolbar = (props: SiloTextAndButtonComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { image, img_alt_text, title, description, action, btn_text },
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
    <ToolContainer id={id} aria-label="Silo Text And Button Toolbar">
      <ToolbarLabel label={'Promotion'} />
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={handleImageAltChange} />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField label={'Description'} value={description} onChange={handleDescriptionChange} />

      <GroupLabel label={'Button'} />
      <OutlinedTextField label={'Label'} value={btn_text} onChange={handleButtonTextChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolContainer>
  );
};
export default SiloTextAndButtonToolbar;
