import React from 'react';
import { List } from '@mui/material';

import { DraggableCarouselListItem } from '../../common';
import { HalfWidthCarouselProps } from '../../types';

type CarouselDraggableItemsListProps = {
  data?: HalfWidthCarouselProps[];
  onDrag: (dragIndex: number, hoverIndex: number) => void;
  onDelete?: (index: number) => void;
  onEditItem?: (index: number) => void;
};

const CarouselDraggableItemsList: React.FC<CarouselDraggableItemsListProps> = ({
  data,
  onDrag,
  onDelete,
  onEditItem,
}) => {

  return (
    data && data.length > 0 && (
      <List>
        {data.map((item, index) => 
          <DraggableCarouselListItem
            key={index}
            index={index}
            data={data}
            onDrag={onDrag}
            onDelete={onDelete}
            onEditItem={onEditItem}
          />
        )}
      </List>
    )
  );
};

export default CarouselDraggableItemsList;
