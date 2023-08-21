
import { OutlinedTextField, ActionInput, GroupLabel, ToolbarLabel, SimpleImagePicker } from '../../../../../elements';
import { ToolContainer } from '../../../../../elements/containers';
import { useToolbarChange } from '../../../hooks';
import { CardTextComponentProps } from '../../../types';

const CardTextToolbar = (props: CardTextComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { 
      image, img_alt_text,
      title, description,
      action
    },
    onPropChange,
  } = props;

  const { handleTitleChange, handleActionChange, handleDescriptionChange, handleImageChange, handleImageAltChange } = useToolbarChange();

  return (
    <ToolContainer id={id} aria-label={"Card Text Toolbar"}>
      <ToolbarLabel label={"Hero Promotion"}/>
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={handleImageAltChange} />
      
      <GroupLabel label={"Text"}/>
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField label={'Description'} value={description} onChange={handleDescriptionChange} />
      
      <GroupLabel label={"Link"}/>
      <ActionInput
        action={action}
        handleActionChange={handleActionChange}
      />
    </ToolContainer>
  );
};
export default CardTextToolbar;
