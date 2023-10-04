import { useState, useEffect, ChangeEvent } from 'react';

import { ToolbarLabel, OutlinedTextField, GroupLabel, ImageAutocomplete, SimpleImagePicker, AutocompleteOptionProps } from '../../../../elements';
import { ToolContainer } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HalfWidthTextComponentProps } from '../../types';

const HalfWidthTextToolbar = (props: HalfWidthTextComponentProps) => {
  const {
    __ui_id__: id,
    data: {
      btn_text,
      description,
      icon,
      image,
      section,
      sub_title,
      title,
      action,
    },
    onPropChange,
  } = props;

  const [icons, setIcons] = useState<AutocompleteOptionProps[]>([]);

  const receiveIcons = (data: AutocompleteOptionProps[]) => {
    setIcons(data);
  };

  const fetchData = () => {
    if (icons.length === 0) {
      onPropChange('quickLinkIcons', receiveIcons);
    }
  };

  useEffect(() => fetchData(), []);
  
  const { 
    handlePropChange, 
    handleTitleChange, handleSubTitleChange, handleDescriptionChange,
    handleButtonTextChange,
    handleIconValueChange, handleImageChange 
  } = useToolbarChange();

  const handleSectionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handlePropChange('section', e.target.value, undefined, undefined);
  };

  return (
    <ToolContainer id={id} aria-label={'Half Width Text Toolbar'}>
      <ToolbarLabel label={'Component'} />
      <SimpleImagePicker value={image} onChange={handleImageChange} onReplace={onPropChange} />
      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField label={'Sub Title'} value={sub_title} onChange={handleSubTitleChange} />
      <OutlinedTextField
        label={'Description'}
        value={description}
        onChange={handleDescriptionChange}
      />
      <GroupLabel label={'Section'} />
      <OutlinedTextField label={'Label'} value={section} onChange={handleSectionChange} />
      <ImageAutocomplete
        aria-label="Icon"
        label="Icon"
        value={icon}
        data={icons}
        onChange={handleIconValueChange}
      />
      <GroupLabel label={'Button'} />
      <OutlinedTextField label={'Label'} value={btn_text} onChange={handleButtonTextChange} />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolContainer>
  );
};

export default HalfWidthTextToolbar;
