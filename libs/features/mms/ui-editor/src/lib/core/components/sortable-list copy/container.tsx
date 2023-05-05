/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react';
import { useCallback, useState } from 'react';

import { Card } from './card';

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export const Container: FC = () => {
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },
      {
        id: 3,
        text: 'Write README',
      },
      {
        id: 4,
        text: 'Create some examples',
      },
      {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      },
      {
        id: 6,
        text: '???',
      },
      {
        id: 7,
        text: 'PROFIT',
      },
    ]);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      //setCards((prevCards: Item[]) =>
      /* update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })*/
      // );
      setCards((prevCards) => {
        const draggedCard = prevCards[dragIndex];
        const newCards = [...prevCards];
        newCards.splice(dragIndex, 1);
        newCards.splice(hoverIndex, 0, draggedCard);
        return newCards;
      });
    }, []);

    const renderCard = useCallback((item: { id: number; text: string }, index: number) => {
      return (
        <Card key={item.id} id={item.id} index={index} moveCard={moveCard}>
          TEST - {index} {item.text}
        </Card>
      );
    }, []);

    return <div>{cards.map((card, i) => renderCard(card, i))}</div>;
  }
};
