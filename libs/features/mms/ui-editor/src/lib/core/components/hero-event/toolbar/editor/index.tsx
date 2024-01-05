import { Box, Chip } from '@mui/material';

import TMLogo from '../../../../../../assets/tm-logo.svg';
import { ICON_HEIGHT, ICON_WIDTH } from '../../../../../common';
import { GroupLabel } from '../../../../../elements';

const HeroEventEditor = () => {
  return (
    <>
      <GroupLabel label="Source Type" />
      <Box>
        <Chip
          label={'Ticketmaster'}
          variant="filled"
          icon={<img src={TMLogo} alt="ticketmaster Logo" width={ICON_WIDTH} height={ICON_HEIGHT} />}
          sx={{
            '& .MuiChip-label': { textTransform: 'none' },
          }}
        />
      </Box>
    </>
  );
};

export default HeroEventEditor;
