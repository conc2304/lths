/* eslint-disable @nx/enforce-module-boundaries */
import { useEffect } from 'react';
import { useState } from 'react';

import { EnumValue, useLazyGetEnumListQuery } from '@lths/features/mms/data-access';

import SocialAction from './action';
import { OutlinedTextField, GroupLabel, ToolbarLabel } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { SocialIconButtoncomponentProps } from '../../types';

const SocialIconButtonToolbar = (props: SocialIconButtoncomponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
    onPropChange,
  } = props;
  const { handleIconChange } = useToolbarChange();
  const [getEnumList] = useLazyGetEnumListQuery();
  const [socialIcons, setSocialIcons] = useState<EnumValue[]>(null);

  console.log('sub_properties_data', sub_properties_data);
  console.log('socialIcons', socialIcons);

  const fetchSocialIcons = async () => {
    try {
      const response = await getEnumList('SocialIcons').unwrap();
      if (response?.success) setSocialIcons(response?.data?.enum_values);
    } catch (error) {
      console.error(`Error in fetching event state list`);
    }
  };

  useEffect(() => {
    fetchSocialIcons();
  }, []);

  return (
    <ToolContainer id={id} aria-label={'SocialLink Button Toolbar'}>
      <ToolbarLabel label={'Quick Link'} />
      {sub_properties_data.map(({ icon, action }, index) => {
        return (
          <>
            <GroupLabel label={'FIRST'} key={index} />
            <OutlinedTextField label={'Icon'} value={icon} onChange={handleIconChange} />
            <SocialAction action={action} onPropChange={onPropChange} />
          </>
        );
      })}
    </ToolContainer>
  );
};
export default SocialIconButtonToolbar;
