import { Stack, SxProps, Typography } from '@mui/material';

import { Colors } from '../../../../../common';

type Props = {
  dayDate: string;
  time: string;
  showDateText?: boolean;
  showTimeText?: boolean;
  sx?: SxProps;
};

const Details = (props: Props) => {
  const { dayDate, time, showDateText = true, showTimeText = true, sx = {} } = props;

  return (
    <Stack direction="column" alignItems="center" sx={sx}>
      {showDateText && (
        <Typography fontWeight={450} color={Colors.editor.text}>
          {dayDate}
        </Typography>
      )}
      {showTimeText && (
        <Typography fontSize="0.875rem" color={Colors.editor.subText}>
          {time}
        </Typography>
      )}
    </Stack>
  );
};

export default Details;
