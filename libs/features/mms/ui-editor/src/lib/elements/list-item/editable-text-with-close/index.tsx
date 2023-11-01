import {CSSProperties } from 'react';
import { IconButton, Stack } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import EditableListItemText from '../editable-text';

const EditableListItemTextWithClose = ({ text = 'New Item', sx, textStyle, onSave, onClose }: { text: string; sx?: CSSProperties;  textStyle?: CSSProperties; onSave: (value: string) => void, onClose: () => void; }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
    >
      <IconButton aria-label="Close Carousel Item" 
        onClick={onClose}
        sx={{ margin: theme.spacing(-1), padding: theme.spacing(1) }}
      >
        {theme.direction === 'rtl' ? <ArrowForward sx={{ fontSize: theme.spacing(3) }}/> : <ArrowBack sx={{ fontSize: theme.spacing(3) }}/>}
      </IconButton>
      <EditableListItemText text={text} 
        sx={{ height: 32,  margin: 0, display: "flex", alignItems: "center", ...sx }} 
        textStyle={{ fontSize: theme.spacing(2.5), fontWeight: 500, color: "text.secondary", whiteSpace: 'nowrap', ...textStyle}}
        onSave={onSave} 
      />
    </Stack>
  );
};

export default EditableListItemTextWithClose;
