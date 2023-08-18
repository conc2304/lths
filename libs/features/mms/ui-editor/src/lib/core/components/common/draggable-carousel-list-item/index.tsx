import { useRef, useEffect, useState } from 'react';
import { Box, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDrag, useDrop } from 'react-dnd';

import { DraggableCarouselListItemProps, DragItemProps, ItemTypes } from './types';

import type { Identifier, XYCoord } from 'dnd-core';

const DraggableCarouselListItem = ({
  text,
  sub_properties_data,
  index,
  onDrag,
  onDelete,
  onEditItem,
}: DraggableCarouselListItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setIsVisible(true);
  }, [sub_properties_data]);

  const [{ handlerId }, drop] = useDrop<DragItemProps, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.LISTITEM,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItemProps, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onDrag(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.LISTITEM,
    item: () => {
      return { id: 'id', index };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) setIsVisible(false);
  }, [isDragging]);

  drag(drop(ref));
  const opacity = isVisible ? 1 : 0;

  return (
    <Box ref={ref} sx={{ opacity }} data-handler-id={handlerId}>
      <ListItem dense={true} sx={{ paddingLeft: 0, paddingRight: 7, gap: 1 }}>
        <ListItemAvatar sx={{ minWidth: 0 }}>
          <DragHandleIcon sx={{ paddingTop: '4px' }} />
        </ListItemAvatar>
        <ListItemText sx={{ fontSize: 14 }} color="textSecondary" primary={text || 'carousel item'} />
        <ListItemSecondaryAction sx={{ right: 0 }}>
          <IconButton onClick={() => onDelete(index)} size="small" aria-label="delete" data-testid={'delete_' + index}>
            <DeleteIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
          <IconButton
            data-testid={'edit_' + index}
            onClick={() => onEditItem(index)}
            size="small"
            edge="end"
            aria-label="edit"
          >
            <SettingsIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Box>
  );
};

export default DraggableCarouselListItem;
