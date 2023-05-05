import { useEffect, useRef, useState } from 'react';
import { ListItemText } from '@mui/material';

export const EditableListItemText = ({ text, onSave }: { text: string; onSave: (newText: string) => void }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDoubleClick = () => {
    setEditing(true);
  };
  const handleClick = () => {
    console.log('handleDoubleClick');
    setEditing(false);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSave(editedText);
      setEditing(false);
    }
  };
  const handleSave = () => {
    setEditing(false);
    onSave(editedText);
    // onSave(value);
  }; /*
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);*/
  /*
  return editing ? (
    <input
      ref={inputRef}
      type="text"
      value={editedText}
      onChange={(event) => setEditedText(event.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleSave}
    />
  ) : (
    <ListItemText primary={text} onDoubleClick={handleDoubleClick} onClick={handleClick} />
  );*/

  return (
    <ListItemText
      onDoubleClick={handleDoubleClick}
      //onClick={handleClick}
      primary={
        editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedText}
            onChange={(event) => setEditedText(event.target.value)}
            //onKeyDown={handleKeyDown}
            //onBlur={handleSave}
          />
        ) : (
          <span>{editedText}</span>
        )
      }
    />
  );
};
