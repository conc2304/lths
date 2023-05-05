/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react';
import { useCallback, useState } from 'react';

import { Card } from './card';
import { ComponentProps } from '../../../context';
import { useEditorActions } from '../../../context/hooks';

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export const Container: FC = () => {
  {
    const { components, orderComponent } = useEditorActions();
    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      orderComponent(dragIndex, hoverIndex);
    }, []);

    const renderCard = useCallback((component: ComponentProps, index: number) => {
      return (
        <Card key={component.__ui_id__} id={component.__ui_id__} index={index} moveCard={moveCard}>
          TEST - {component.__ui_id__} {component.name}
        </Card>
      );
    }, []);

    return <div>{components.map((component, i) => renderCard(component, i))}</div>;
  }
};
