import { OutlinedTextField, GroupLabel, SimpleImagePicker } from '../../../../../../elements';
import { ActionToolbar } from '../../../../common';
import { useToolbarChange } from '../../../../hooks';
import { CardTextComponentProps, ItemPositionalProps } from '../../../../types';

export type CardTextEditorProps = CardTextComponentProps & ItemPositionalProps;

const CardTextEditor = (props: CardTextEditorProps) => {
  const {
    data: { image, img_alt_text, title, description, action },

    keys: parentKeys,
    index,
    childKeys,
    onPropChange,
  } = props;

  const { handleTitleChange, handleDescriptionChange, handleImageChange, handleImageAltChange } = useToolbarChange();

  return (
    <>
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={handleImageAltChange} />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField label={'Description'} value={description} onChange={handleDescriptionChange} />
      <ActionToolbar
        action={action}
        onPropChange={onPropChange}
        keys={parentKeys}
        index={index}
        childKeys={childKeys}
      />
    </>
  );
};

export default CardTextEditor;
