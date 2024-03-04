import { FocusEvent, MouseEvent, ChangeEvent, KeyboardEvent, useRef, useState, useEffect, CSSProperties, useCallback } from 'react';
import { SxProps, ListItemText, TextField, Typography } from '@mui/material';

import { Colors } from '../../../common';
import { useClickOutside } from '../../hooks';

interface EditableListItemTextProps {
  text: string; 
  sx?: SxProps;  
  textStyle?: CSSProperties;
  onLabelClick?: (event: MouseEvent<HTMLInputElement>) => void;
  onSave: (value: string) => void;
  fullWidth?: boolean;
  multiline?: boolean;
}

const EditableListItemText = ({ text = 'New Item', sx, textStyle, onLabelClick, onSave, fullWidth = false, multiline = false}: EditableListItemTextProps) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);
  const [singleClickTimer, setSingleClickTimer] = useState(null);
  useEffect(() => {
    setEditedText(text);
  }, [text]);

  const handleDoubleClick = () => {
    clearTimeout(singleClickTimer);
    setEditing(true);
  };

  const handleSingleClick = (event: MouseEvent<HTMLInputElement>) => {
    if (onLabelClick && event.detail === 1) {
      clearTimeout(singleClickTimer);
      const timer = setTimeout(() => onLabelClick(event), 450)
      setSingleClickTimer(timer);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleClickOutside();
    }
  };

  const handleClickOutside = useCallback(() => {
    setEditing(false);
    if (editedText && editedText.trim() !== '') {
      onSave(editedText);
    } else {
      setEditedText(text);
    }
  }, [editedText]);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.currentTarget?.select();
  }

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
              '& .MuiInputBase-root': { p: 0 }
            }}
            multiline={multiline}
            fullWidth={fullWidth}
            ref={inputRef}
            value={editedText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            autoFocus={true}
          />
        ) : (
          <Typography 
            onClick={handleSingleClick}
            sx={{ overflow: 'hidden', overflowWrap: "break-word", textOverflow: 'ellipsis', fontSize: '1rem', userSelect: 'none', ...textStyle }} 
          >
            {editedText}
          </Typography>
        )
      }
    />
  );
};

export default EditableListItemText;
