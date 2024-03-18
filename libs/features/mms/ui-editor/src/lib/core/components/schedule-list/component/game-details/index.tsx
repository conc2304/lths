import { Typography } from '@mui/material';
import { Stack, SxProps } from '@mui/system';

import colors from '../../../../../common/colors';

type Props = {
  text: string;
  time_date: string;
  sx?: SxProps;
};

const GameDetails = (props: Props) => {
  const { text, time_date } = props;
  return (
    <Stack direction="column" alignItems="center">
      <Typography fontWeight={450} color={colors.editor.text}>
        {text}
      </Typography>
      <Typography fontSize="0.875rem" color={colors.editor.subText}>
        {time_date}
      </Typography>
    </Stack>
  );
};

export default GameDetails;
