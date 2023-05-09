import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import { ListItem, ListItemIcon } from '@mui/material';
import DragHandle from '@mui/icons-material/DragIndicator';
import { useDrag, useDrop } from 'react-dnd';

import { EditableListItemText } from './editable-list-item';
import colors from '../../../colors';

import type { Identifier, XYCoord } from 'dnd-core';

export const ItemTypes = {
  CARD: 'card',
};
//TODO: use themes, define palette may be??
const style = {
  border: '1px dashed gray',
  backgroundColor: colors.sidebar,
  //cursor: 'move',
};

export interface CardProps {
  id: string;
  children?: ReactNode;
  text: string;
  index: number;
  onDrag: (dragIndex: number, hoverIndex: number) => void;
  onClick?: (index: number, id: string) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = ({ id, text, index, onDrag, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
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
  const onSave = (index: number, newText: string) => {
    console.log(index, newText);
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
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
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      <ListItem onClick={handleClick}>
        <EditableListItemText text={text} onSave={(newText) => onSave(index, newText)} />
        <ListItemIcon>
          <DragHandle />
        </ListItemIcon>
      </ListItem>
    </div>
  );
};
