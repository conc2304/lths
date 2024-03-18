import { Typography } from '@mui/material';
import { Stack, SxProps } from '@mui/system';

type Props = {
  color?: string;
  sx?: SxProps;
  score: number;
};

const TeamScore = (props: Props) => {
  const { sx, color, score } = props;
  return (
    <Stack>
      <Typography sx={sx} color={color}>
        {score}
      </Typography>
    </Stack>
  );
};

export default TeamScore;
