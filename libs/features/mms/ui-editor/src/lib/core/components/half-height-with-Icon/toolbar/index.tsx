import { useState, useEffect } from 'react';

import {
  ToolbarLabel,
  OutlinedTextField,
  GroupLabel,
  ImageAutocomplete,
  AutocompleteOptionProps,
} from '../../../../elements';
import { ToolPreviewContainer, ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { HalfHeightWithIconProps } from '../../types';

const HalfHeightWithIconToolbar = (props: HalfHeightWithIconProps) => {
  const {
    __ui_id__: id,
    data: { title, icon, description, action, icon_alt_text },
    onPropChange,
  } = props;

  const [icons, setIcons] = useState<AutocompleteOptionProps[]>([]);

  const receiveIcons = (data: AutocompleteOptionProps[]) => {
    setIcons(data);
  };

  const fetchData = () => {
    onPropChange('quickLinkIcons', receiveIcons);
  };

  useEffect(() => fetchData(), []);

  const { updateComponentProp, handleTitleChange } = useToolbarChange();

  const handleIconChange = (value: string) => {
    updateComponentProp('icon', value);
  };

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id}>
      <ToolbarLabel label={'Half-Height with Icon'} />

      <ImageAutocomplete
        aria-label="Icon"
        label="Icon"
        value={icon}
        data={icons}
        onChange={(value) => handleIconChange(value)}
      />
      <OutlinedTextField
        label={'Icon alt text'}
        value={icon_alt_text}
        onChange={(e) => updateComponentProp('icon_alt_text', e.target.value)}
      />
      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField
        label={'Description'}
        value={description}
        onChange={(e) => updateComponentProp('description', e.target.value)}
      />
      <ActionToolbar action={action} onPropChange={onPropChange} />
    </ToolPreviewContainer>
  );
};
export default HalfHeightWithIconToolbar;
