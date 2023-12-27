import { ListItem, ListItemAvatar, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SettingsIcon from '@mui/icons-material/Settings';

import { DraggableCard, EditableListItemText } from '../../../../../elements';
import { useToolbarChange } from '../../../hooks';

interface DraggableCarouselListItemProps {
  id: string;
  index: number;
  text?: string;
  onDrag: (dragIndex: number, hoverIndex: number) => void;
  onDelete?: (index: number) => void;
  onEdit?: (index: number) => void;
}

const DraggableCarouselListItem = ({ id, index, text, onDrag, onDelete, onEdit }: DraggableCarouselListItemProps) => {
  const ItemTypes = {
    LISTITEM: 'carousel item',
  };
  const { handleNameValueChange } = useToolbarChange();
  const parentKeys = ['sub_component_data'];

  const handleDeleteClick = () => {
    onDelete && onDelete(index);
  };

  const handleEdit = () => {
    onEdit && onEdit(index);
  };

  const handleSave = (value: string) => {
    handleNameValueChange(value, index, parentKeys);
  };

  return (
    <DraggableCard id={id} index={index} onDrag={onDrag} typeName={ItemTypes.LISTITEM}>
      <ListItem aria-label={`carousel-item-${index}`} dense={true} sx={{ paddingLeft: 0, paddingRight: 7, gap: 1 }}>
        <ListItemAvatar sx={{ minWidth: 0 }}>
          <DragHandleIcon sx={{ paddingTop: '4px' }} />
        </ListItemAvatar>
        <EditableListItemText
          text={text || 'Carousel Item'}
          sx={{ margin: 0 }}
          textStyle={{ fontSize: 14, lineHeight: 1.43 }}
          onLabelClick={handleEdit}
          onSave={handleSave}
        />
        <ListItemSecondaryAction sx={{ right: 0 }}>
          <IconButton onClick={handleDeleteClick} size="small" aria-label="delete" data-testid={'delete_' + index}>
            <DeleteIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
          <IconButton data-testid={'edit_' + index} onClick={handleEdit} size="small" edge="end" aria-label="edit">
            <SettingsIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </DraggableCard>
  );
};

export default DraggableCarouselListItem;
