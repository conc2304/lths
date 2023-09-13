import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { ListItemText, TextField, Typography } from '@mui/material';

import { Colors } from '../../../../../common';
import { useClickOutside } from '../../../../../elements';

const EditableListItemText = ({ text = 'New Item', onSave }: { text: string; onSave: (newText: string) => void }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);
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
              },
            }}
            ref={inputRef}
            value={editedText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Typography fontSize={'1rem'}>{editedText}</Typography>
        )
      }
    />
  );
};

export default EditableListItemText;
