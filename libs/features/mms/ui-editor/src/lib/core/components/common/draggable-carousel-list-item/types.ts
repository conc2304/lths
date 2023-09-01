import { ReactNode } from 'react';

export const ItemTypes = {
  LISTITEM: 'carousel item',
};

export type DraggableCarouselListItemProps = {
  children?: ReactNode;
  component_data: any[];
  text?: string;
  index: number;
  onDrag: (dragIndex: number, hoverIndex: number) => void;
  onDelete?: (index: number) => void;
  onEditItem?: (index: number) => void;
};

export type DragItemProps = {
  index: number;
  id: string;
  type: string;
};
