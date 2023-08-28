import { Stack } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import SocialIcon from '../../social-icon-button/component/social-button';
import { SocialIconButtoncomponentProps } from '../../types';
const SocialIconButtonComponent = (props: SocialIconButtoncomponentProps) => {
  const {
    properties_data: { first_button, second_button, third_button, fourth_button },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id}>
      <Stack direction="row" spacing={1}>
        <SocialIcon {...first_button} />
        <SocialIcon {...second_button} />
        <SocialIcon {...third_button} />
        <SocialIcon {...fourth_button} />
      </Stack>
    </BasicContainer>
  );
};
export default SocialIconButtonComponent;
