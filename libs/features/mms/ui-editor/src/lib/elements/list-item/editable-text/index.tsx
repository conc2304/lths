import { ChangeEvent, KeyboardEvent, useRef, useState, useEffect, CSSProperties } from 'react';
import { ListItemText, TextField, Typography } from '@mui/material';

import { Colors } from '../../../common';
import { useClickOutside } from '../../hooks';

const EditableListItemText = ({ text = 'New Item', sx, textStyle, onSave }: { text: string; sx?: CSSProperties;  textStyle?: CSSProperties; onSave: (value: string) => void }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedText(text);
  }, [text]);

  const handleDoubleClick = () => {
    setEditing(true);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClickOutside();
    }
  };
  const handleClickOutside = () => {
    setEditing(false);
    if (editedText) {
      onSave(editedText);
    } else setEditedText(text);
  };

  useClickOutside(inputRef, handleClickOutside);

  return (
    <ListItemText
      onDoubleClick={handleDoubleClick}
      sx={sx}
      primary={
        editing ? (
          <TextField
            size="small"
            sx={{
              '& .MuiInputBase-input': {
                p: 1,
                pt: 0.5,
                pb: 0.5,
                m: 0,
                lineHeight: 1,
                backgroundColor: Colors.sidebar.textInput.background,
                ...textStyle,
              },
            }}
            ref={inputRef}
            value={editedText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Typography sx={{ fontSize: '1rem', ...textStyle }} >{editedText}</Typography>
        )
      }
    />
  );
};

export default EditableListItemText;
