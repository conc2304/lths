import { Typography, Avatar } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { TextWithIconProps } from '../../types';

const TextwithIcon = (props: TextWithIconProps) => {
  const {
    data: { icon, title },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Avatar alt="Icon" src={icon} sx={{ width: 20, height: 20, marginRight: 2, fontSize: '14px' }} />
      <Typography variant="subtitle1" gutterBottom color={'#ABABAC'} fontSize={'14px'} fontWeight={400}>
        {title}
      </Typography>
    </BasicContainer>
  );
};

export default TextwithIcon;
