import { useRef } from 'react';
import { ListItemIcon, Box, ListItemButton } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

import { Colors } from '../../../../../common';
import { OverflowMenu } from '../../../../../elements';
import { DragCardProps, DragItemProps, ItemTypes } from '../../types';
import EditableListItemText from '../editable';

import type { Identifier, XYCoord } from 'dnd-core';

//TODO: use themes, define palette may be??
const style = {
  borderBottom: `1px solid ${Colors.sidebar.divider}`,
  backgroundColor: Colors.sidebar.background,
};
//TODO: move this to constants??
const menuOptions = ['delete', 'duplicate'];

const DraggableCard = ({ id, text, index, onDrag, onClick, onMenuClick, selected }: DragCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItemProps, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.CARD,
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

      // Time to actually perform the action
      onDrag(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  const onSave = (index: number, newText: string) => {};

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleClick = () => {
    onClick && onClick(index, id);
  };

  return (
    <Box ref={ref} sx={{ ...style, opacity }} data-handler-id={handlerId}>
      <ListItemButton onClick={handleClick} selected={selected}>
        <EditableListItemText text={text} onSave={(newText) => onSave(index, newText)} />
        <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
          <OverflowMenu items={menuOptions} onClick={(action) => onMenuClick(index, id, action)} />
        </ListItemIcon>
      </ListItemButton>
    </Box>
  );
};

export default DraggableCard;
