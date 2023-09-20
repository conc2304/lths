import { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SettingsIcon from '@mui/icons-material/Settings';

import { DraggableCard } from '../../../../elements';

interface DraggableCarouselListItemProps {
  id: string;
  index: number;
  text?: string;
  onDrag: (dragIndex: number, hoverIndex: number) => void;
  onDelete?: (index: number) => void;
  onEditItem?: (index: number) => void;
}

const DraggableCarouselListItem = ({ id, index, text, onDrag, onDelete, onEditItem }: DraggableCarouselListItemProps) => {
  const ItemTypes = {
    LISTITEM: 'carousel item',
  };

  const handleOnDelete = () => {
    onDelete && onDelete(index);
  };

  const handleOnEditItem= () => {
    onEditItem && onEditItem(index);
  };

  return (
    <DraggableCard id={id} index={index} 
      onDrag={onDrag} 
      typeName={ItemTypes.LISTITEM}
    >
      <ListItem dense={true} sx={{ paddingLeft: 0, paddingRight: 7, gap: 1 }}>
        <ListItemAvatar sx={{ minWidth: 0 }}>
          <DragHandleIcon sx={{ paddingTop: '4px' }} />
        </ListItemAvatar>
        <ListItemText sx={{ fontSize: 14 }} color="textSecondary" primary={text || 'carousel item'} />
        <ListItemSecondaryAction sx={{ right: 0 }}>
          <IconButton onClick={handleOnDelete} size="small" aria-label="delete" data-testid={'delete_' + index}>
            <DeleteIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
          <IconButton
            data-testid={'edit_' + index}
            onClick={handleOnEditItem}
            size="small"
            edge="end"
            aria-label="edit"
          >
            <SettingsIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </DraggableCard>
  );
};

export default DraggableCarouselListItem;
