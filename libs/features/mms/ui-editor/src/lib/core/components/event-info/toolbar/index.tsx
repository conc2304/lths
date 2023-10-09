import { useState, useEffect } from 'react';

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

  const { handlelocationIconChange, handleEventInfo1Change, handleEventInfo2Change, handletimeIconChange } =
    useToolbarChange();

  return (
    <ToolContainer id={id} aria-label="Event Info Button Toolbar">
      <ToolbarLabel label={'Event Info'} />
      <OutlinedTextField label={'Text1'} value={location_text} onChange={handleEventInfo1Change} />
      <ImageAutocomplete
        aria-label="Icon"
        data-testid="location_text_icon"
        label="Icon"
        value={location_icon}
        data={icons}
        onChange={handlelocationIconChange}
      />
      <OutlinedTextField label={'Text2'} value={time_text} onChange={handleEventInfo2Change} />
      <ImageAutocomplete
        aria-label="Icon"
        data-testid="time_icon"
        label="Icon"
        value={time_icon}
        data={icons}
        onChange={handletimeIconChange}
      />
    </ToolContainer>
  );
};
export default EventInfoToolbar;
