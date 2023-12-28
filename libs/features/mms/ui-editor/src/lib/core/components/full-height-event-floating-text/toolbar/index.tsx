import { Box, Chip, Stack } from '@mui/material';

import TMLogo from '../../../../../assets/tm-logo.svg';
import { ICON_HEIGHT, ICON_WIDTH } from '../../../../common';
import { GroupLabel, ToolContainer, ToolbarLabel } from '../../../../elements';
import { FullHeightEventFloatingTextComponentProps } from '../../types';

const FullHeightEventFloatingTextToolbar = (props: FullHeightEventFloatingTextComponentProps) => {
  const { __ui_id__: id } = props;

  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <ToolbarLabel label="Full Height Event Floating Text" />
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
      </Stack>
    </ToolContainer>
  );
};

export default FullHeightEventFloatingTextToolbar;
