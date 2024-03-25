import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Container, NavigatorProps } from './container';

export default function Navigator({ onAddComponent, onPropChange }: NavigatorProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container onAddComponent={onAddComponent} onPropChange={onPropChange} />
    </DndProvider>
  );
}
