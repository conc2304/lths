import { useState, useEffect } from 'react';

import {
  ImageAutocomplete,
  OutlinedTextField,
  GroupLabel,
  ToolbarLabel,
  AutocompleteOptionProps,
} from '../../../../elements';
import { ActionToolbar, ToolPreviewContainer } from '../../common';
import { useToolbarChange } from '../../hooks';
import { QuicklinkButtonGroupComponentProps } from '../../types';

const QuicklinkButtonGroupToolbar = (props: QuicklinkButtonGroupComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
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

  const parentKeys = ['sub_component_data'];
  const { handleTitleChange, handlePropChange } = useToolbarChange();

  const handleIconChange = (value: string, index: number) => {
    handlePropChange('icon', value, index, parentKeys);
  };

  return (
    <ToolPreviewContainer onPropChange={onPropChange} id={id} aria-label={'Quicklink Button Group Toolbar'}>
      <ToolbarLabel label={'Quick Link'} />

      <GroupLabel label={'BUTTON 1'} />
      <OutlinedTextField
        data-testid="first_button_label"
        aria-label="Label"
        label={'Label'}
        value={sub_component_data[0]?.title}
        onChange={(e) => handleTitleChange(e, 0, parentKeys)}
      />
      <ImageAutocomplete
        aria-label="Icon"
        data-testid="first_button_icon"
        label="Icon"
        value={sub_component_data[0]?.icon}
        data={icons}
        onChange={(value) => handleIconChange(value, 0)}
      />
      <ActionToolbar
        action={sub_component_data[0]?.action}
        onPropChange={onPropChange}
        isRadioButton
        index={0}
        keys={parentKeys}
      />

      <GroupLabel label={'BUTTON 2'} />
      <OutlinedTextField
        aria-label="Label"
        label={'Label'}
        data-testid="second_button_label"
        value={sub_component_data[1]?.title}
        onChange={(e) => handleTitleChange(e, 1, parentKeys)}
      />
      <ImageAutocomplete
        label={'Icon'}
        aria-label="Icon"
        data-testid="second_button_icon"
        value={sub_component_data[1]?.icon}
        data={icons}
        onChange={(value) => {
          handleIconChange(value, 1);
        }}
      />
      <ActionToolbar
        action={sub_component_data[1]?.action}
        onPropChange={onPropChange}
        isRadioButton
        index={1}
        keys={parentKeys}
      />
    </ToolPreviewContainer>
  );
};
export default QuicklinkButtonGroupToolbar;
