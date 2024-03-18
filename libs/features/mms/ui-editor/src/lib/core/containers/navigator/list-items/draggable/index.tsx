import { ListItemIcon, ListItem, Box, Typography, useTheme, alpha } from '@mui/material';

import { Colors } from '../../../../../common';
import { OverflowMenu, EditableListItemText, DraggableCard } from '../../../../../elements';
import { DragCardProps, ItemTypes } from '../../types';

//TODO: use themes, define palette may be??
const style = {
  borderBottom: `1px solid ${Colors.sidebar.divider}`,
  backgroundColor: Colors.sidebar.background,
};
//TODO: move this to constants??
const menuOptions = ['delete', 'duplicate'];

export const Card = ({ id, text, subText = '', index, onDrag, onClick, onRename, onMenuClick, selected }: DragCardProps) => {
  const theme = useTheme();
  
  const handleRename = (id: string, newText: string) => {
    onRename && onRename(id, newText);
  };

  const handleClick = () => {
    onClick && onClick(index, id);
  };
  const listItemSx = { 
    background: selected ? alpha(theme.palette.primary.main, 0.10) : Colors.sidebar.background,
    paddingLeft: 3, paddingRight: 1.5, paddingBottom: 0.125, paddingTop: 0,
    height: 48,
  };
  return (
    <DraggableCard id={id} index={index} boxStyle={style} onDrag={onDrag} typeName={ItemTypes.CARD}>
      <ListItem onClick={handleClick} sx={listItemSx}>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <EditableListItemText 
            sx={{ margin: 0 }} 
            textStyle={{ fontSize: 14, whiteSpace: 'nowrap' }} 
            text={text} onSave={(value) => handleRename(id, value)} 
          />
          <Typography 
            sx={{ 
              fontSize: 10, fontWeight: 500, lineHeight: 1.4, 
              color: Colors.sidebar.subText, 
              overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
            }}
          >
            {subText}
          </Typography>
        </Box>
        <ListItemIcon sx={{ justifyContent: 'flex-end', minWidth: 'unset', marginLeft: 2 }}>
          <OverflowMenu items={menuOptions} onClick={(action) => onMenuClick(index, id, action)} />
        </ListItemIcon>
      </ListItem>
    </DraggableCard>
  );
};
export default Card;
