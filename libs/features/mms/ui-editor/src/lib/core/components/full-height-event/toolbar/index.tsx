import { ChangeEvent, HTMLAttributes } from 'react';
import {
  Autocomplete,
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { sources } from './utils';
import NHLLogo from '../../../../../assets/NHL-logo.svg';
import { ICON_HEIGHT, ICON_WIDTH } from '../../../../common';
import { GroupLabel, OutlinedTextField, ToolContainer, ToolbarLabel } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { FullHeightEventComponentProps, SourceType } from '../../types';

const FullHeightEventToolbar = (props: FullHeightEventComponentProps) => {
  const {
    __ui_id__: id,
    data: { max_size, title, btn_text, source_type },
  } = props;

  const { handleTitleChange, handleButtonTextChange, handleMaxSizeChange, handleSourceTypeChange } = useToolbarChange();

  const getOptionLabel = (option: SourceType) => option || '';

  const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: SourceType) => {
    return (
      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
        <img src={NHLLogo} alt="NHL Logo" width={ICON_WIDTH} height={ICON_HEIGHT} />
        <Typography sx={{ fontSize: 12 }}>{option}</Typography>
      </Box>
    );
  };

  const handleAutocompleteChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, item: SourceType) => {
    handleSourceTypeChange(item || '');
  };

  return (
    <ToolContainer id={id}>
      <ToolbarLabel label="Full Height Event" />
      <GroupLabel label={'Text'} />
      <OutlinedTextField label={'Title'} value={title} onChange={handleTitleChange} />
      <OutlinedTextField label={'Button Text'} value={btn_text} onChange={handleButtonTextChange} />
      <GroupLabel label="Items" />
      <OutlinedTextField select value={max_size} onChange={(e) => handleMaxSizeChange(e.target.value)} label="Number shown">
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="4">4</MenuItem>
        <MenuItem value="5">5</MenuItem>
      </OutlinedTextField>
      <GroupLabel label="Source" />
      <Autocomplete
        value={source_type}
        options={sources}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
        onChange={handleAutocompleteChange}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Source Type"
            InputProps={{
              ...params.InputProps,
              autoComplete: 'off', // disable autofill
              startAdornment: (
                <InputAdornment position="start">
                  <img src={NHLLogo} alt="NHL Logo" width={ICON_WIDTH} height={ICON_HEIGHT} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </ToolContainer>
  );
};

export default FullHeightEventToolbar;
