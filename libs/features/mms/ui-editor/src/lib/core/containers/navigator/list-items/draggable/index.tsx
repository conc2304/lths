import { useState } from 'react';
import { ListItemIcon, ListItem, Box, Typography, useTheme, alpha, Divider, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Colors } from '../../../../../common';
import { OverflowMenu, EditableListItemText, DraggableCard } from '../../../../../elements';
import { DragCardProps, ItemTypes } from '../../types';

//TODO: use themes, define palette may be??
const style = {
  backgroundColor: Colors.sidebar.background,
};
//TODO: move this to constants??
const menuOptions = ['delete', 'duplicate', 'copy'];

export const Card = ({
  id,
  text,
  subText = '',
  index,
  onDrag,
  onClick,
  onRename,
  onMenuClick,
  selected,
  addComponent,
}: DragCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const handleRename = (id: string, newText: string) => {
    onRename && onRename(id, newText);
  };

  const handleClick = () => {
    onClick && onClick(index, id);
  };
  const listItemSx = {
    background: selected ? alpha(theme.palette.primary.main, 0.1) : Colors.sidebar.background,
    paddingLeft: 3,
    paddingRight: 1.5,
    paddingBottom: 0.125,
    paddingTop: 0,
    height: 48,
    '&:hover': {
      ...(!selected && { backgroundColor: Colors.editor.hoveredBg }),
      cursor: 'pointer !important',
    },
  };

  const addInLineComponentSx = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    lineHeight: theme.spacing(1.5),
    '&:hover': {
      cursor: 'pointer !important',
    },
  };
  return (
    <DraggableCard id={id} index={index} boxStyle={style} onDrag={onDrag} typeName={ItemTypes.CARD}>
      <Box
        sx={{ position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ListItem onClick={handleClick} sx={listItemSx}>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <EditableListItemText
              sx={{ margin: 0 }}
              textStyle={{ fontSize: 14, whiteSpace: 'nowrap' }}
              text={text}
              onSave={(value) => handleRename(id, value)}
            />
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 500,
                lineHeight: 1.4,
                color: Colors.sidebar.subText,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {subText}
            </Typography>
          </Box>
          <ListItemIcon sx={{ justifyContent: 'flex-end', minWidth: 'unset', marginLeft: 2 }}>
            <OverflowMenu items={menuOptions} onClick={(action) => onMenuClick(index, id, action)} />
          </ListItemIcon>
        </ListItem>
        {isHovered && (
          <Box
            sx={{
              ...addInLineComponentSx,
              position: 'absolute',
              paddingTop: theme.spacing(2.25),
              zIndex: 1,
              bottom: 0,
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                borderRadius: '50% !important',
                minWidth: '2rem',
                minHeight: '2rem',
                padding: theme.spacing(0.25),
              }}
              onClick={addComponent}
            >
              <AddIcon />
            </Button>
          </Box>
        )}
        <Divider
          sx={{
            borderColor: isHovered && Colors.editor.highlight,
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}
        />
      </Box>
    </DraggableCard>
  );
};
export default Card;
