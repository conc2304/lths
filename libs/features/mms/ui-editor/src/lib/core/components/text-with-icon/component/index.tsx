import { Typography, Avatar, Stack } from '@mui/material';

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
      <Stack direction="row" paddingY={1} alignItems="center" spacing={0.5}>
        <Avatar alt="Icon" src={icon} sx={{ width: 14, height: 14 }} />
        <Typography variant="subtitle1" color={colors.typography.color} fontSize={'0.875rem'} fontWeight={400}>
          {title}
        </Typography>
      </Stack>
    </BasicContainer>
  );
};

export default TextwithIcon;
