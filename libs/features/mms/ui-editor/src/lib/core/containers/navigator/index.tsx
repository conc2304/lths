import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Container, NavigatorProps } from './container';

export default function Navigator({ onAddComponentClick, onAddImageClick }: NavigatorProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container onAddComponentClick={onAddComponentClick} onAddImageClick={onAddImageClick} />
    </DndProvider>
  );
}
