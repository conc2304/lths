import { Stack, Typography } from '@mui/material';

import { ICON_HEIGHT, ICON_WIDTH } from '../../../../../common';
import colors from '../../../../../common/colors';

type TeamBlockProps = {
  logo: string;
  name: string;
};

const TeamBlock = ({ logo, name }: TeamBlockProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <img src={logo} alt={`${name} logo`} width={ICON_WIDTH} height={ICON_HEIGHT} />
      <Typography color={colors.editor.text}>{name}</Typography>
    </Stack>
  );
};

export default TeamBlock;
