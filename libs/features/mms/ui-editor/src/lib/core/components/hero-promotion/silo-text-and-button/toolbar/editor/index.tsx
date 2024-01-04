import { ChangeEvent } from 'react';

import { OutlinedTextField, GroupLabel, SimpleImagePicker } from '../../../../../../elements';
import { ActionToolbar } from '../../../../common';
import { useToolbarChange } from '../../../../hooks';
import { ItemPositionalProps, SiloTextAndButtonComponentProps } from '../../../../types';

export type SiloTextAndButtonEditorProps = SiloTextAndButtonComponentProps & ItemPositionalProps;

const SiloTextAndButtonEditor = (props: SiloTextAndButtonEditorProps) => {
  const {
    data: { image, img_alt_text, title, description, action, btn_text },
    keys: parentKeys,
    index,
    childKeys,
    onPropChange,
  } = props;

  const {
    handleTitleChange,
    handleDescriptionChange,
    handleButtonTextChange,
    handleImageChange,
    handleImageAltChange,
  } = useToolbarChange();

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

  const _handleButtonTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleButtonTextChange(event, index, parentKeys, childKeys);
  };

  return (
    <>
      <SimpleImagePicker value={image} onChange={_handleImageChange} onReplace={onPropChange} />
      <OutlinedTextField label={'Image alt-text'} value={img_alt_text} onChange={_handleImageAltChange} />

      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={_handleTitleChange} />
      <OutlinedTextField label={'Description'} value={description} onChange={_handleDescriptionChange} />

      <GroupLabel label={'Button'} />
      <OutlinedTextField label={'Label'} value={btn_text} onChange={_handleButtonTextChange} />
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

export default SiloTextAndButtonEditor;
