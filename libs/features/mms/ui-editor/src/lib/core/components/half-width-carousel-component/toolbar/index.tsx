import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';

import CarouselItemEditor from './carousel-Item-editor';
import { FLEXIBLE_TRANSITION_MIN_WIDTH } from '../../../../common';
import { useEditorActions } from '../../../../context';
import { ToolContainer, AddButton, ToolbarLabel, FlexibleTransition } from '../../../../elements';
import { CarouselDraggableItemsList } from '../../common';
import { HalfWidthCarouselComponentProps, HalfWidthCarouselProps } from '../../types';

const HalfWidthCarouselToolbar = (props: HalfWidthCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
    onPropChange,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedItem, setSelectedItem] = useState<HalfWidthCarouselProps>();

  const { updateComponent } = useEditorActions();

  const handleEdit = (index: number) => {
    setSelectedIndex(index);
    setSelectedItem(sub_component_data[index]);
  };

  useEffect(() => {
    if(selectedIndex >= 0) setSelectedItem(sub_component_data[selectedIndex]);
  }, [sub_component_data]);

  const handleCloseItem = () => {
    setSelectedIndex(-1);
  };


  const handleAdd = () => {
    const data = {
      ...props,
      data: {
        sub_component_data: [
          ...sub_component_data,
          {
            _ui_id_: uuid(),
            title: 'New Card',
            description: 'Lorem ipsum dolor sit amet',
            action: { type: 'native' },
          },
        ],
      },
    };
    updateComponent(data);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <FlexibleTransition
        minWidth={FLEXIBLE_TRANSITION_MIN_WIDTH}
        displayRightItem={selectedIndex >= 0}
        leftItem={
          <ToolContainer id={`Carousel_${id}`} aria-label="Half Width Carousel Floating Text Toolbar: Carousel">
            <ToolbarLabel label={'Carousel'} />
            <CarouselDraggableItemsList props={props} onEdit={handleEdit} />
            <Divider/>
            <AddButton onClick={handleAdd}>
              ADD ITEM
            </AddButton>
          </ToolContainer>
        }
        rightItem={
          <ToolContainer
            id={`Carousel_Item${id}`}
            aria-label="Half Width Carousel Floating Text Toolbar: Carousel Item"
          >
            <CarouselItemEditor
              item={selectedItem}
              onClose={handleCloseItem}
              onPropChange={onPropChange}
              index={selectedIndex}
            />
          </ToolContainer>
        }
      />
    </DndProvider>
  );
};
export default HalfWidthCarouselToolbar;
