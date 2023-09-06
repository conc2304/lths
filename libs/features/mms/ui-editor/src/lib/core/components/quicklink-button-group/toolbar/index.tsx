import { useState, useEffect } from 'react';

import { ImageAutocomplete, OutlinedTextField, ActionInput, GroupLabel, ToolbarLabel, AutocompleteOptionProps } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { QuicklinkButtonGroupComponentProps } from '../../types';


const QuicklinkButtonGroupToolbar = (props: QuicklinkButtonGroupComponentProps) => {

  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
    onPropChange,
  } = props;

  const [icons, setIcons] = useState<AutocompleteOptionProps[]>([]);
  
  const receiveIcons = (data: AutocompleteOptionProps[]) => { setIcons(data); };

  const fetchData = () => {
      if (icons.length === 0) {
        onPropChange('quickLinkIcons', receiveIcons);
      }
  };

  useEffect(() => fetchData(), []);

  const parentKeys = ['sub_properties_data'];
  const { handleTitleChange, handlePropChange} = useToolbarChange();

  const handleIconChange = (value: string, index: number) => {
    handlePropChange('icon', value, index, parentKeys);
  };

  return (
    <ToolContainer id={id} aria-label={"Quicklink Button Group Toolbar"}>
      <ToolbarLabel label={"Quick Link"}/>

      <GroupLabel label={"First"}/>
      <OutlinedTextField aria-label="First Label"
        label={'Label'} value={sub_properties_data[0]?.title} 
        onChange={(e) => handleTitleChange(e, 0, parentKeys)} 
      />
      <ImageAutocomplete
        aria-label="First Icon"
        label="Icon"
        value={sub_properties_data[0]?.icon}
        data={icons}
        onChange={(value) => handleIconChange(value, 0)}
      />
      <ActionInput
        action={sub_properties_data[0]?.action} index={0}
        keys={parentKeys}
      />

      <GroupLabel label={"Second"}/>
      <OutlinedTextField aria-label="Second Label"
        label={'Label'} value={sub_properties_data[1]?.title}
        onChange={(e) => handleTitleChange(e, 1, parentKeys) } 
      />
      <ImageAutocomplete
        label={'Icon'} aria-label="Second Icon"
        value={sub_properties_data[1]?.icon}
        data={icons}
        onChange={(value) => { handleIconChange(value, 1) }}
      />
      <ActionInput
        action={sub_properties_data[1]?.action} index={1}
        keys={parentKeys}
      />
    </ToolContainer>
  );
};
export default QuicklinkButtonGroupToolbar;