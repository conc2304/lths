import { Stack } from '@mui/system';

import colors from '../../../../../common/colors';

type Props = {
  imageSrc: string;
};
const TeamLogo = (props: Props) => {
  const { imageSrc } = props;
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width={84}
      height={84}
      borderRadius="50%"
      sx={{ background: colors.card.background }}
    >
      <img src={imageSrc} alt="team logo" />
    </Stack>
  );
};

export default TeamLogo;
