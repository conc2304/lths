import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';

import CarouselItemEditor from './carousel-Item-editor';
import { FLEXIBLE_TRANSITION_MIN_WIDTH } from '../../../../common';
import { useEditorActions } from '../../../../context';
import { ToolContainer, ToolbarLabel, FlexibleTransition } from '../../../../elements';
import { CarouselDraggableItemsList } from '../../common';
import { HalfWidthCarouselComponentProps } from '../../types';

const HalfWidthCarouselToolbar = (props: HalfWidthCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
    onPropChange,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { selectComponent } = useEditorActions();

  const handleEdit = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseItem = () => {
    setSelectedIndex(-1);
  };

  useEffect(() => {
    handleCloseItem();
  }, [id]);

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
    selectComponent(data);
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
            <div>
              <Button
                data-testid={'Add Carousel Item'}
                variant="outlined"
                onClick={handleAdd}
                sx={{ padding: '4px 10px', gap: 1, fontSize: 13 }}
              >
                <AddIcon sx={{ width: '18px', height: '18px' }} />
                ADD ITEM
              </Button>
            </div>
          </ToolContainer>
        }
        rightItem={
          <ToolContainer
            id={`Carousel_Item${id}`}
            aria-label="Half Width Carousel Floating Text Toolbar: Carousel Item"
          >
            <CarouselItemEditor
              item={sub_component_data[selectedIndex]}
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
