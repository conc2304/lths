import { Typography, Avatar, Box } from '@mui/material';

import colors from '../../../../common/colors';
import { BasicContainer } from '../../../../elements';
import { TextWithIconProps } from '../../types';

const TextwithIcon = (props: TextWithIconProps) => {
  const {
    data: { icon, title },
    __ui_id__: id,
  } = props;
  return (
    <BasicContainer id={id}>
      <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'center', paddingTop: '4px' }}>
        <Avatar alt="Icon" src={icon} sx={{ width: 14, height: 17, marginRight: 2, marginTop: '2px' }} />
        <Typography variant="subtitle1" gutterBottom color={colors.typography.color} fontSize={'14px'} fontWeight={400}>
          {title}
        </Typography>
      </Box>
    </BasicContainer>
  );
};

export default TextwithIcon;
