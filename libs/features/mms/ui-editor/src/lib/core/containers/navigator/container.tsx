/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { Button } from '@mui/material';

import { Card } from './dragable-list-item';
import { ComponentProps } from '../../../context';
import { useEditorActions } from '../../../context/hooks';

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}
export type SortableListProps = {
  onAddComponentClick: () => void;
};
export const Container = ({ onAddComponentClick }: SortableListProps) => {
  {
    const { components, orderComponent, selectComponent } = useEditorActions();
    const handleDrag = useCallback((dragIndex: number, hoverIndex: number) => {
      orderComponent(dragIndex, hoverIndex);
    }, []);
    const handleClick = (index: number, id: string) => {
      // scroll to the corresponding component in the editor
      document.getElementById(`editor-component-${index}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
      const component = components.find((o) => o.__ui_id__ === id);
      if (component) selectComponent(component);
    };
    const renderCard = useCallback((component: ComponentProps, index: number) => {
      return (
        <Card
          key={component.__ui_id__}
          id={component.__ui_id__}
          index={index}
          onDrag={handleDrag}
          //there is a bug, scroll needs to appear for the editor only
          // onClick={handleClick}
          text={component.component_name || component.component_id}
        ></Card>
      );
    }, []);

    return (
      <div>
        {components.map((component, i) => renderCard(component, i))}
        <Button variant="outlined" onClick={onAddComponentClick}>
          Add Component
        </Button>
      </div>
    );
  }
};
