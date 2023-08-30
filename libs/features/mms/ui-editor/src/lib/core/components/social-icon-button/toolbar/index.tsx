/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeEvent, useEffect, useState } from 'react';
import SocailIconAutoComplete from './autocomplete';
import { EnumValue } from '@lths/features/mms/data-access';

import { OutlinedTextField, GroupLabel, ToolbarLabel } from '../../../../elements';
import { ToolContainer } from '../../../../elements/containers';
import { useToolbarChange } from '../../hooks';
import { SocialIconButtoncomponentProps } from '../../types';
import { ordinalifyNumber } from 'libs/shared/ui-elements/src/lib/utils/string-utils';
const SocialIconButtonToolbar = (props: SocialIconButtoncomponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
    onPropChange,
  } = props;

  const { updateComponentProp, handleActionChange } = useToolbarChange();
  const [socialIcons, setSocialIcons] = useState<EnumValue[]>(null);
  const receiveData = (socialIcons: EnumValue[]) => {
    setSocialIcons(socialIcons);
  };
  const fetchData = () => {
    onPropChange('social_icon', receiveData);
  };
  useEffect(() => fetchData());

  const handleIconChange = (item: EnumValue, index: number) => {
    updateComponentProp('icon', item?.value, index);
  };
  const handleActionLinkChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    handleActionChange(event, 'page_link', index, ['sub_properties_data']);
  };

  return (
    <ToolContainer id={id} aria-label={'SocialLink Button Toolbar'}>
      <ToolbarLabel label={'Social Icon Link'} />
      {sub_properties_data.map(({ icon, action }, index) => {
        return (
          <>
            <GroupLabel label={ordinalifyNumber(index + 1)} key={index} />
            <OutlinedTextField
              label={'Link'}
              value={action.page_link}
              onChange={(e) => handleActionLinkChange(e, index)}
            />
            <SocailIconAutoComplete
              socialIcons={socialIcons}
              onChange={(e, item) => handleIconChange(item, index)}
              value={icon}
            />
          </>
        );
      })}
    </ToolContainer>
  );
};
export default SocialIconButtonToolbar;
