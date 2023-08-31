import { Stack } from '@mui/material';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import SocialIcon from '../../social-icon-button/component/social-button';
import { SocialIconButtoncomponentProps } from '../../types';
const SocialIconButtonComponent = (props: SocialIconButtoncomponentProps) => {
  const {
    properties_data: { sub_properties_data },
    __ui_id__: id,
  } = props;

  return (
    <BasicContainer id={id} sx={{ backgroundColor: colors.container.background }}>
      <Stack direction="row" spacing={3} justifyContent={'center'} paddingY={1}>
        {sub_properties_data.map((data, index) => {
          const { icon } = data;
          return <SocialIcon icon={icon} key={`social_icon_${index}`} />;
        })}
      </Stack>
    </BasicContainer>
  );
};
export default SocialIconButtonComponent;
