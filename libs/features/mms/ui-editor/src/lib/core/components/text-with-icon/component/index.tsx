import { Typography, Avatar, Box } from '@mui/material';

import { BasicContainer } from '../../../../elements';
import { TextWithIconProps } from '../../types';

const TextwithIcon = (props: TextWithIconProps) => {
  const {
    data: { icon, title },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id}>
      <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'center', paddingTop: '8px' }}>
        <Avatar alt="Icon" src={icon} sx={{ width: 20, height: 20, marginRight: 2, fontSize: '14px' }} />
        <Typography variant="subtitle1" gutterBottom color={'#ABABAC'} fontSize={'14px'} fontWeight={400}>
          {title}
        </Typography>
      </Box>
    </BasicContainer>
  );
};

export default TextwithIcon;
