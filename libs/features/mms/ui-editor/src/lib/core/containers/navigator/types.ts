import { ReactNode } from 'react';

export const ItemTypes = {
  CARD: 'card',
};

export type DragCardProps = {
  id: string;
  children?: ReactNode;
  text: string;
  subText?: string;
  index: number;
  onDrag: (dragIndex: number, hoverIndex: number) => void;
  onClick?: (index: number, id: string) => void;
  onRename?: (id: string, value: string) => void;
  onMenuClick?: (index: number, id: string, action: string) => void;
  selected?: boolean;
  addComponent?: () => void;
};

export type DragItemProps = {
  index: number;
  id: string;
  type: string;
};
