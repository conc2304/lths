import { Stack, SxProps, Typography } from '@mui/material';

import AvatarIcon from './../../../../../../assets/avatar-icon.svg';
import { Colors } from '../../../../../common';

type Props = {
  headerText: string;
  show_greetings: boolean;
  title: string;
  sx?: SxProps;
};

const Header = (props: Props) => {
  const { headerText, sx = {}, show_greetings = true, title } = props;

  return (
    <Stack direction="row" justifyContent="space-between" sx={sx}>
      {show_greetings ? (
        <Typography color={Colors.editor.text}>{headerText}</Typography>
      ) : (
        <Typography color={Colors.editor.text}>{title}</Typography>
      )}

      <img src={AvatarIcon} alt="avatar icon" width={24} height={24} />
    </Stack>
  );
};

export default Header;
