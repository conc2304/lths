import { ReactNode, CSSProperties } from 'react';

export type DragCardProps = {
  id: string;
  children?: ReactNode;
  boxStyle?: CSSProperties;
  typeName: string;
  index: number;
  onDrag: (dragIndex: number, hoverIndex: number) => void;
};

export type DragItemProps = {
  index: number;
  id: string;
  type: string;
};