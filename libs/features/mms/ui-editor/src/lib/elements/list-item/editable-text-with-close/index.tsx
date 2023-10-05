import {CSSProperties } from 'react';
import { IconButton } from '@mui/material';
import {ChevronLeft, ChevronRight} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import EditableListItemText from '../editable-text';

const EditableListItemTextWithClose = ({ text = 'New Item', sx, textStyle, onSave, onClose }: { text: string; sx?: CSSProperties;  textStyle?: CSSProperties; onSave: (value: string) => void, onClose: () => void; }) => {
  const theme = useTheme();

  return (
    <div style={{ position: 'relative' }} >
      <EditableListItemText text={text} 
        sx={{ height: 30, paddingRight: theme.spacing(6),  margin: 0, display: "flex", alignItems: "center", ...sx }} 
        textStyle={{ fontSize: '1.25rem', fontWeight: 600, color: "text.secondary", whiteSpace: 'nowrap', ...textStyle}}
        onSave={onSave} 
      />
      <IconButton aria-label="Close Carousel Item" 
        onClick={onClose}
        style={{ position: 'absolute', top: '50%', right: '0', transform: 'translate(0, -50%)' }}
      >
        {theme.direction === 'rtl' ? <ChevronLeft sx={{ fontSize: theme.spacing(4) }}/> : <ChevronRight sx={{ fontSize: theme.spacing(4) }}/>}
      </IconButton>
    </div>
  );
};

export default EditableListItemTextWithClose;
