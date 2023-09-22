import { useState, useEffect } from 'react';

import {
  ImageAutocomplete,
  OutlinedTextField,
  GroupLabel,
  ToolbarLabel,
  AutocompleteOptionProps,
} from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { ActionToolbar } from '../../common';
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
    <ToolContainer id={id} aria-label={'Quicklink Button Group Toolbar'}>
      <ToolbarLabel label={'Quick Link'} />

      <GroupLabel label={'BUTTON 1'} />
      <OutlinedTextField
        aria-label="Label"
        label={'Label'}
        value={sub_component_data[0]?.title}
        onChange={(e) => handleTitleChange(e, 0, parentKeys)}
      />
      <ImageAutocomplete
        aria-label="Icon"
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
        value={sub_component_data[1]?.title}
        onChange={(e) => handleTitleChange(e, 1, parentKeys)}
      />
      <ImageAutocomplete
        label={'Icon'}
        aria-label="Icon"
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
    </ToolContainer>
  );
};
export default QuicklinkButtonGroupToolbar;
