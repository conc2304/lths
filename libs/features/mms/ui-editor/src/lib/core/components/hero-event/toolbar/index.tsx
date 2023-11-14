import { Box, Chip, Stack } from '@mui/material';

import TMLogo from '../../../../../assets/tm-logo.svg';
import { GroupLabel, ToolContainer, ToolbarLabel } from '../../../../elements';
import { HeroEventComponentProps } from '../../types';

const HeroEventToolbar = (props: HeroEventComponentProps) => {
  const { __ui_id__: id } = props;

  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <ToolbarLabel label="Hero Event" />
        <GroupLabel label="Source Type" />
        <Box>
          <Chip
            label={'Ticketmaster'}
            variant="filled"
            icon={<img src={TMLogo} alt="ticketmaster Logo" width={24} height={24} />}
            sx={{
              '& .MuiChip-label': { textTransform: 'none' },
            }}
          />
        </Box>
      </Stack>
    </ToolContainer>
  );
};

export default HeroEventToolbar;
