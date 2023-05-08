import { KeyboardEvent, useRef, useState } from 'react';
import { ListItemText } from '@mui/material';

export const EditableListItemText = ({ text, onSave }: { text: string; onSave: (newText: string) => void }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDoubleClick = () => {
    setEditing(true);
  };

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

  return (
    <ListItemText
      onDoubleClick={handleDoubleClick}
      primary={
        editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedText}
            onChange={(event) => setEditedText(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
          />
        ) : (
          <span>{editedText}</span>
        )
      }
    />
  );
};
