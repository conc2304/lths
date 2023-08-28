import { ChangeEvent } from 'react';
import { useState } from 'react';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { EnumValue, useLazyGetUpcomingEventsQuery, useLazyGetEnumListQuery } from '@lths/features/mms/data-access';

import { OutlinedTextField, GroupLabel, ToolbarLabel } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { SocialIconButtoncomponentProps } from '../../types';

const SocialIconButtonToolbar = (props: SocialIconButtoncomponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { first_button, second_button, third_button, fourth_button },
  } = props;
  const { updateComponentProp } = useToolbarChange();
  const [getUpcomingEvents, { data: upcomingEvents }] = useLazyGetUpcomingEventsQuery();
  const [getEnumList] = useLazyGetEnumListQuery();
  const [eventStates, setEventStates] = useState<EnumValue[]>(null);

  console.log('getupcoming', getUpcomingEvents);
  console.log('data', upcomingEvents);
  const fetchEventStates = async (SocialIcons: string) => {
    try {
      const response = await getEnumList(SocialIcons).unwrap();
      if (response?.success) setEventStates(response?.data?.enum_values);
    } catch (error) {
      console.error(`Error in fetching event state list`);
    }
  };
  console.log('fetchEventState', fetchEventStates);
  const handleFirstButtonChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    updateComponentProp('first_button', { ...first_button, [key]: event.target.value });
  };

  return (
    <ToolContainer id={id} aria-label={'SocialLink Button Toolbar'}>
      <ToolbarLabel label={'Quick Link'} />
      <GroupLabel label={'FIRST'} />
      <OutlinedTextField
        aria-label="First Link"
        label={'Link'}
        value={first_button.link}
        onChange={(e) => {
          handleFirstButtonChange(e, 'link');
        }}
      />
      <GroupLabel label={'SECOND'} />
      <OutlinedTextField
        aria-label="Second Link"
        label={'Link'}
        value={second_button.link}
        onChange={(e) => {
          handleFirstButtonChange(e, 'link');
        }}
      />
      <GroupLabel label={'THIRD'} />
      <OutlinedTextField
        aria-label="Third Link"
        label={'Link'}
        value={third_button.link}
        onChange={(e) => {
          handleFirstButtonChange(e, 'link');
        }}
      />
      <GroupLabel label={'FORTH'} />
      <OutlinedTextField
        aria-label="Forth Link"
        label={'Link'}
        value={fourth_button.link}
        onChange={(e) => {
          handleFirstButtonChange(e, 'link');
        }}
      />
    </ToolContainer>
  );
};
export default SocialIconButtonToolbar;
