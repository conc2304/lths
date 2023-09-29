import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';

import NHLLogo from '../../../../../assets/NHL-logo.svg';
import { GroupLabel, OutlinedTextField, ToolContainer, ToolbarLabel } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { HalfHeightMatchUpComponentProps } from '../../types';
const HalfHeightMatchUpToolbar = (props: HalfHeightMatchUpComponentProps) => {
  const {
    __ui_id__: id,
    data: { max_size, title, btn_text, source_type },
  } = props;
  const { handleTitleChange, handleMaxSizeChange, handleButtonTextChange } = useToolbarChange();

  return (
    <ToolContainer id={id}>
      <Stack spacing={2}>
        <ToolbarLabel label="Scheduled matchups" />
        <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
        <GroupLabel label="Games" />
        <FormControl fullWidth>
          <InputLabel sx={{ color: 'gray' }}>Number shown</InputLabel>
          <Select value={max_size} onChange={(e) => handleMaxSizeChange(e.target.value as string)} label="Number shown">
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </Select>
        </FormControl>
        <GroupLabel label="Button" />
        <OutlinedTextField label={'Label'} value={btn_text} onChange={handleButtonTextChange} multiline={false} />
        <GroupLabel label="Source Type" />
        <Box>
          <Chip
            label={source_type}
            variant="filled"
            icon={<img src={NHLLogo} alt="NHL Logo" width={24} height={24} />}
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
