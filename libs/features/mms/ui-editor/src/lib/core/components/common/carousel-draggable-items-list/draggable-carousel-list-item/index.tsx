import { ListItem, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SettingsIcon from '@mui/icons-material/Settings';

import colors from '../../../../../common/colors';
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
    <DraggableCard id={id} index={index} boxStyle={{ marginTop : index > 0 ? 1 : 0 }}
      onDrag={onDrag} 
      typeName={ItemTypes.LISTITEM}
    >
      <ListItem aria-label={`carousel-item-${index}`} dense={true} sx={{ paddingLeft: 0, paddingY: 0.25, paddingRight: 8, gap: 1 }}>
        <DragHandleIcon sx={{ fontSize: 20, color: colors.icon.color, marginY: 0.25, marginX: 0.25 }} />
        <EditableListItemText 
          text={text || 'Carousel Item'} 
          sx={{ margin: 0, flexShrink: 3 }} 
          textStyle={{ color: 'text.secondary', fontSize: 14, lineHeight: 1.57, textTransform: 'capitalize' }} 
          onLabelClick={handleEdit}
          onSave={handleSave} 
        />
        <ListItemSecondaryAction sx={{ right: 12 }}>
          <IconButton onClick={handleDeleteClick} sx={{ padding: '4px', marginRight: 1 }} aria-label="delete" data-testid={'delete_' + index}>
            <DeleteIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            data-testid={'edit_' + index}
            onClick={handleEdit}
            sx={{ padding: '4px' }}
            edge="end"
            aria-label="edit"
          >
            <SettingsIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </DraggableCard>
  );
};

export default DraggableCarouselListItem;
