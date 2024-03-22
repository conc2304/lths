import {CSSProperties } from 'react';
import { IconButton, Stack } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { ToolbarStickyTop } from '../../sticky';
import EditableListItemText from '../editable-text';

const EditableListItemTextWithClose = ({ text = 'New Item', sx, textStyle, onSave, onClose }: { text: string; sx?: CSSProperties;  textStyle?: CSSProperties; onSave: (value: string) => void, onClose: () => void; }) => {
  const theme = useTheme();

  return (
    <ToolbarStickyTop> 
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <IconButton aria-label="Close" 
          onClick={onClose}
          sx={{ marginX: theme.spacing(-1), marginY: theme.spacing(-0.5), padding: theme.spacing(1) }}
        >
          {theme.direction === 'rtl' ? <ArrowForward sx={{ fontSize: theme.spacing(3) }}/> : <ArrowBack sx={{ fontSize: theme.spacing(3) }}/>}
        </IconButton>
        <EditableListItemText text={text} 
          sx={{ margin: 0, ...sx }} 
          textStyle={{ fontSize: theme.spacing(2.5), lineHeight: 1.6, fontWeight: 600, color: "text.secondary", ...textStyle }}
          onSave={onSave}
          multiline={true} fullWidth={true}
        />
      </Stack>
    </ToolbarStickyTop>
  );
};

export default EditableListItemTextWithClose;
