import { useState } from 'react';
import { ListItemText } from '@mui/material';

export const EditableListItemText = ({ text, onSave }: { text: string; onSave: (newText: string) => void }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSave(editedText);
      setEditing(false);
    }
  };

  return editing ? (
    <input
      type="text"
      value={editedText}
      onChange={(event) => setEditedText(event.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        onSave(editedText);
        setEditing(false);
      }}
    />
  ) : (
    <ListItemText primary={text} onDoubleClick={handleDoubleClick} />
  );
};
