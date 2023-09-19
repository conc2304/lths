import { Typography, Avatar } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { TextWithIconProps } from '../../types';

const TextwithIcon = (props: TextWithIconProps) => {
  const {
    data: { icon, title },
    __ui_id__: id,
  } = props;
  console.log('textWithIcon', props);
  return (
    <BasicContainer id={id} sx={{ display: 'flex', flexDirection: 'row' }}>
      <Avatar alt="Icon" src={icon} sx={{ width: 20, height: 20, marginRight: 1 }} />
      <Typography
        variant="subtitle1"
        gutterBottom
        color={'#ABABAC'}
        fontSize={'14px'}
        fontWeight={400}
        lineHeight={'20px'}
      >
        {title}
      </Typography>
    </BasicContainer>
  );
};

export default TextwithIcon;
