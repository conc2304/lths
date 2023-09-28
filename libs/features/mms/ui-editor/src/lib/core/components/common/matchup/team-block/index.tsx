import { Stack, Typography } from '@mui/material';

import colors from '../../../../../common/colors';

type TeamBlockProps = {
  logo: string;
  name: string;
};

const TeamBlock = ({ logo, name }: TeamBlockProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <img src={logo} alt={`${name} logo`} width={24} height={24} />
      <Typography color={colors.editor.text}>{name}</Typography>
    </Stack>
  );
};

export default TeamBlock;
