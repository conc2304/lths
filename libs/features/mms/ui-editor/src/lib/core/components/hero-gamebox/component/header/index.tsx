import { Stack, SxProps, Typography } from '@mui/material';

import AvatarIcon from './../../../../../../assets/avatar-icon.svg';
import { Colors } from '../../../../../common';
import { ICON_WIDTH, ICON_HEIGHT } from '../../../../../common';

type Props = {
  headerText: string;
  sx?: SxProps;
};

const Header = (props: Props) => {
  const { headerText, sx = {} } = props;

  return (
    <Stack direction="row" justifyContent="space-between" sx={sx}>
      <Typography color={Colors.editor.text}>{headerText}</Typography>
      <img src={AvatarIcon} alt="avatar icon" width={ICON_WIDTH} height={ICON_HEIGHT} />
    </Stack>
  );
};

export default Header;
