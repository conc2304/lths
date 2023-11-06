import React, { useCallback, useEffect } from 'react';
import { List } from '@mui/material';

import DraggableCarouselListItem from './draggable-carousel-list-item';
import { useEditorActions } from '../../../../context';
import { useToolbarChange } from '../../hooks';
import { ComponentProps } from '../../types';

type CarouselDraggableItemsListProps = {
  props: ComponentProps;
  onEdit?: (index: number) => void;
};

const CarouselDraggableItemsList: React.FC<CarouselDraggableItemsListProps> = ({ props, onEdit }) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;

  const { updateComponent } = useEditorActions();
  const { swapComponentProps, generateUniqueId } = useToolbarChange();

  useEffect(() => {
    generateUniqueId();
  }, [id]);

  const handleDelete = (index) => {
    const newData = [...props.data.sub_component_data];
    newData.splice(index, 1);

    const data = { ...props, data: { sub_component_data: newData } };
    updateComponent(data);
  };

  const handleDrag = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      swapComponentProps(dragIndex, hoverIndex);
    },
    [props.data]
  );

  return (
    sub_component_data &&
    sub_component_data.length > 0 && (
      <List>
        {sub_component_data.map((item, index) => (
          <DraggableCarouselListItem
            key={item._ui_id_}
            id={item._ui_id_}
            index={index}
            text={item.name}
            onDrag={handleDrag}
            onDelete={handleDelete}
            onEdit={onEdit}
          />
        ))}
      </List>
    )
  );
};

export default CarouselDraggableItemsList;
