import { ChangeEvent } from 'react';
import { MenuItem, Typography, TextField, Box } from '@mui/material';
import { Stack } from '@mui/system';

import { ToolContainer } from '../../../../elements';
import { ActionToolbar } from '../../common';
import { useToolbarChange } from '../../hooks';
import { TextButtonProps } from '../../types';
import { sizes } from '../utils';

const TextButtonToolbar = (props: TextButtonProps) => {
  const {
    __ui_id__: id,
    data: { btn_text, btn_text_size, action },
    onPropChange,
  } = props;
  const { updateComponentProp } = useToolbarChange();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('btn_text', event.target.value);
  };
  const handleStyleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateComponentProp('btn_text_size', event.target.value);
  };

  return (
    <ToolContainer id={id} aria-label="Text Button" sx={{ gap: 0, margin: 2, borderRadius: 0 }}>
      <Stack spacing={2}>
        <Box>
          <Typography
            gutterBottom
            variant="body1"
            sx={{
              fontSize: '1.25rem',
              fontWeight: '540',
              lineHeight: '160%',
              letterSpacing: '.15px',
              color: '#847d7d',
              marginBottom: 1.5,
            }}
          >
            Text Link
          </Typography>
          <TextField
            label={'Title'}
            value={btn_text}
            onChange={(e) => handleTitleChange(e)}
            sx={{ marginY: 1.5 }}
            fullWidth
          />
          <TextField
            value={btn_text_size}
            onChange={handleStyleChange}
            label="Text Size"
            select
            fullWidth
            sx={{ marginY: 1.5 }}
          >
            {sizes.map((s) => (
              <MenuItem key={`option-${s.value}`} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <ActionToolbar action={action} onPropChange={onPropChange} />
      </Stack>
    </ToolContainer>
  );
};
export default TextButtonToolbar;
