import { ChangeEvent } from 'react';

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

  const _handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleTitleChange(event, index, parentKeys, childKeys);
  };

  const _handleImageChange = (value: string) => {
    handleImageChange(value, index, parentKeys, childKeys);
  };

  const _handleImageAltChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleImageAltChange(event, index, parentKeys, childKeys);
  };
  const _handleDescriptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleDescriptionChange(event, index, parentKeys, childKeys);
  };

  return (
    <>
      <SimpleImagePicker value={image} onChange={_handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={_handleImageAltChange} />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={_handleTitleChange} />
      <OutlinedTextField label={'Description'} value={description} onChange={_handleDescriptionChange} />
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
