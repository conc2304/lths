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

  const { updateComponentProp } = useToolbarChange();

  const handleEventInfo1Change = (value: string) => {
    updateComponentProp('location_text', value);
  };
  const handleEventInfo2Change = (value: string) => {
    updateComponentProp('time_text', value);
  };
  const handlelocationIconChange = (value: string) => {
    updateComponentProp('location_icon', value);
  };

  const handletimeIconChange = (value: string) => {
    updateComponentProp('time_icon', value);
  };

  return (
    <ToolContainer id={id} aria-label="Event Info Button Toolbar">
      <ToolbarLabel label={'Event Info'} />
      <OutlinedTextField
        label={'Location Text'}
        value={location_text}
        onChange={(e) => handleEventInfo1Change(e.target.value)}
      />
      <ImageAutocomplete
        aria-label="Icon"
        data-testid="location_text_icon"
        label="Location Icon"
        value={location_icon}
        data={icons}
        onChange={(e) => handlelocationIconChange(e)}
      />
      <OutlinedTextField
        label={'Time Text'}
        value={time_text}
        onChange={(e) => handleEventInfo2Change(e.target.value)}
      />
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
