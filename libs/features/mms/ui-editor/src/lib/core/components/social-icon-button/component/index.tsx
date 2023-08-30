import { Stack } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import SocialIcon from '../../social-icon-button/component/social-button';
import { SocialIconButtoncomponentProps } from '../../types';
const SocialIconButtonComponent = (props: SocialIconButtoncomponentProps) => {
  console.log('props', props);
  const {
    properties_data: { sub_properties_data },
    __ui_id__: id,
  } = props;

  return (
    <BasicContainer id={id} sx={{ backgroundColor: '#121213' }}>
      <Stack direction="row" spacing={3} justifyContent={'center'}>
        {sub_properties_data.map((data, index) => {
          console.log('data', data);
          const { icon } = data;
          return <SocialIcon icon={icon} key={index} />;
        })}
      </Stack>
    </BasicContainer>
  );
};
export default SocialIconButtonComponent;
