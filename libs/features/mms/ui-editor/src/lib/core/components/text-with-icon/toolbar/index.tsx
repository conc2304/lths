import React, { useState, useEffect } from 'react';

import { BasicTextField, ImageAutocomplete, AutocompleteOptionProps } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { TextWithIconProps } from '../../types';

const TextwithIconToolbar = (props: TextWithIconProps) => {
  const {
    data: { icon, title },
    onPropChange,
    __ui_id__: id,
  } = props;
  const [icons, setIcons] = useState<AutocompleteOptionProps[]>([]);

  const receiveIcons = (data: AutocompleteOptionProps[]) => {
    setIcons(data);
  };
  const fetchData = () => {
    onPropChange('quickLinkIcons', receiveIcons);
  };

  useEffect(() => fetchData(), []);

  const { handleTitleChange, updateComponentProp } = useToolbarChange();
  const handleIconChange = (value: string) => {
    console.log('value,index', value);
    updateComponentProp('icon', value);
  };

  return (
    <ToolContainer key={id} aria-label={'TextWithIcon Toolbar'}>
      <BasicTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <ImageAutocomplete
        aria-label="Icon"
        label="Icon"
        value={icon}
        data={icons}
        onChange={(value) => {
          console.log('eee', value);
          return handleIconChange(value);
        }}
      />
    </ToolContainer>
  );
};

export default TextwithIconToolbar;
