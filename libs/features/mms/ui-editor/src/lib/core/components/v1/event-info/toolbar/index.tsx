import { useState, useEffect } from 'react';

import {
  ToolContainer,
  OutlinedTextField,
  ToolbarLabel,
  ImageAutocomplete,
  AutocompleteOptionProps,
} from '../../../../../elements';
import { useToolbarChange } from '../../../hooks';
import { EventInfoComponentProps } from '../../../types';

const EventInfoToolbar = (props: EventInfoComponentProps) => {
  const {
    __ui_id__: id,
    data: { location_text, time_text, location_icon, time_icon },
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

  const { handlePropChange } = useToolbarChange();

  const handlelocationtextChange = (value: string) => {
    handlePropChange('location_text', value);
  };
  const handletimetextChange = (value: string) => {
    handlePropChange('time_text', value);
  };
  const handlelocationIconChange = (value: string) => {
    handlePropChange('location_icon', value);
  };

  const handletimeIconChange = (value: string) => {
    handlePropChange('time_icon', value);
  };

  return (
    <ToolContainer id={id} aria-label="Event Info Button Toolbar">
      <ToolbarLabel label={'Event Info'} />
      <OutlinedTextField
        label={'Location Text'}
        value={location_text}
        onChange={(e) => handlelocationtextChange(e.target.value)}
      />
      <ImageAutocomplete
        aria-label="Icon"
        data-testid="location_text_icon"
        label="Location Icon"
        value={location_icon}
        data={icons}
        onChange={(e) => handlelocationIconChange(e)}
      />
      <OutlinedTextField label={'Time Text'} value={time_text} onChange={(e) => handletimetextChange(e.target.value)} />
      <ImageAutocomplete
        aria-label="Icon"
        data-testid="time_icon"
        label="Time Icon"
        value={time_icon}
        data={icons}
        onChange={(e) => handletimeIconChange(e)}
      />
    </ToolContainer>
  );
};
export default EventInfoToolbar;
