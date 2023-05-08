import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Container, SortableListProps } from './container';

export default function SortableList({ onAddComponentClick }: SortableListProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container onAddComponentClick={onAddComponentClick} />
    </DndProvider>
  );
}
