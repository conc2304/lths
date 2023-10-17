import { Stack, SxProps, Typography } from '@mui/material';

import AvatarIcon from './../../../../../../assets/avatar-icon.svg';
import { Colors } from '../../../../../common';

type Props = {
  headerText: string;
  sx?: SxProps;
};

const Header = (props: Props) => {
  const { headerText, sx = {} } = props;

  return (
    <Stack direction="row" justifyContent="space-between" sx={sx}>
      <Typography color={Colors.editor.text}>{headerText}</Typography>
      <img src={AvatarIcon} alt="avatar icon" width={24} height={24} />
    </Stack>
  );
};

export default Header;
