import { Stack, SxProps, Typography } from '@mui/material';

import AvatarIcon from './../../../../../../assets/avatar-icon.svg';
import { Colors } from '../../../../../common';

type Props = {
  greetings: string;
  showGeetings: boolean;
  title: string;
  sx?: SxProps;
};

const Header = (props: Props) => {
  const { greetings, sx = {}, showGeetings = true, title } = props;

  const headerText = showGeetings ? greetings : title;

  return (
    <Stack direction="row" justifyContent="space-between" sx={sx}>
      <Typography color={Colors.editor.text}>{headerText}</Typography>
      <img src={AvatarIcon} alt="avatar icon" width={24} height={24} />
    </Stack>
  );
};

export default Header;
