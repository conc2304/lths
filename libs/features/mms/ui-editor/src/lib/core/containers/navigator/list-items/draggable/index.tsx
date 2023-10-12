import { ListItemIcon, ListItem } from '@mui/material';

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

export const Card = ({ id, text, index, onDrag, onClick, onRename, onMenuClick, selected }: DragCardProps) => {
  const handleRename = (id: string, newText: string) => {
    onRename && onRename(id, newText);
  };

  const handleClick = () => {
    onClick && onClick(index, id);
  };
  const listItemSx = { background: selected ? Colors.editor.background : Colors.sidebar.background, paddingX: 3 };
  return (
    <DraggableCard id={id} index={index} boxStyle={style} onDrag={onDrag} typeName={ItemTypes.CARD}>
      <ListItem onClick={handleClick} sx={listItemSx}>
        <EditableListItemText text={text} onSave={(value) => handleRename(id, value)} />
        <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
          <OverflowMenu items={menuOptions} onClick={(action) => onMenuClick(index, id, action)} />
        </ListItemIcon>
      </ListItem>
    </DraggableCard>
  );
};
export default Card;
