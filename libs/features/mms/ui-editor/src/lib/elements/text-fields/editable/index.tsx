import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ListItemText, TextField } from '@mui/material';

import { Colors } from '../../../common';

export const EditableTextField = ({ text, onSave }: { text: string; onSave: (newText: string) => void }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSave(editedText);
      setEditing(false);
    }
  };
  const handleSave = () => {
    setEditing(false);
    onSave(editedText);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      console.log('Clicked outside TextField');
      handleSave();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return editing ? (
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
      onChange={(event) => setEditedText(event.target.value)}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span>{editedText}</span>
  );
};
