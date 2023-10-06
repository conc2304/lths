import { ChangeEvent, useState, useEffect } from 'react';

import {
  ToolContainer,
  OutlinedTextField,
  ToolbarLabel,
  ImageAutocomplete,
  AutocompleteOptionProps,
} from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { EventInfoComponentProps } from '../../types';

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

  const handleLocationDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('location_text', event.target.value);
  };

  const handleTimeDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateComponentProp('time_text', event.target.value);
  };

  const handleIconChange = (value: string) => {
    updateComponentProp('location_text_icon', value);
  };

  const handletimeIconChange = (value: string) => {
    updateComponentProp('time_icon', value);
  };

  return (
    <ToolContainer id={id} aria-label="Event Info Button Toolbar">
      <ToolbarLabel label={'Event Info'} />
      <OutlinedTextField label={'Text1'} value={location_text} onChange={handleLocationDataChange} />
      <ImageAutocomplete
        aria-label="Icon"
        data-testid="location_text_icon"
        label="Icon"
        value={location_icon}
        data={icons}
        onChange={(value) => handleIconChange(value)}
      />
      <OutlinedTextField label={'Text2'} value={time_text} onChange={handleTimeDataChange} />
      <ImageAutocomplete
        aria-label="Icon"
        data-testid="time_icon"
        label="Icon"
        value={time_icon}
        data={icons}
        onChange={(value) => handletimeIconChange(value)}
      />
    </ToolContainer>
  );
};
export default EventInfoToolbar;
