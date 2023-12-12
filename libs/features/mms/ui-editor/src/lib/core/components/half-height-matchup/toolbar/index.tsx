import { Box, Chip, Stack } from '@mui/material';

import NHLLogo from '../../../../../assets/NHL-logo.svg';
import { ICON_WIDTH, ICON_HEIGHT } from '../../../../common';
import { GroupLabel, OutlinedTextField, ToolContainer, ToolbarLabel } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { HalfHeightMatchUpComponentProps } from '../../types';
const HalfHeightMatchUpToolbar = (props: HalfHeightMatchUpComponentProps) => {
  const {
    __ui_id__: id,
    data: { title, btn_text, source_type },
  } = props;
  const { handleTitleChange, handleButtonTextChange } = useToolbarChange();

  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <ToolbarLabel label="Scheduled matchups" />
        <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
        <GroupLabel label="Button" />
        <OutlinedTextField label={'Label'} value={btn_text} onChange={handleButtonTextChange} multiline={false} />
        <GroupLabel label="Source Type" />
        <Box>
          <Chip
            label={source_type}
            variant="filled"
            icon={<img src={NHLLogo} alt="NHL Logo" width={ICON_WIDTH} height={ICON_HEIGHT} />}
            sx={{
              '& .MuiChip-label': { textTransform: 'none' },
            }}
          />
        </Box>
      </Stack>
    </ToolContainer>
  );
};

export default HalfHeightMatchUpToolbar;
