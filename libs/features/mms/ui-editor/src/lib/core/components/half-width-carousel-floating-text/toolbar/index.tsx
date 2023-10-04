import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';

import CarouselItemEditor from './carousel-item-editor';
import { useEditorActions } from '../../../../context';
import { ToolContainer, ToolbarLabel, FlexibleTransition } from '../../../../elements';
import { CarouselDraggableItemsList } from '../../common';
import { HalfWidthCarouselFloatingTextComponentProps } from '../../types';

const HalfWidthCarouselFloatingTextToolbar = (props: HalfWidthCarouselFloatingTextComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
    onPropChange,
  } = props;

  const { selectComponent } = useEditorActions();

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const onEdit = (index: number) => {
    setSelectedIndex(index);
  };

  const onClose = () => {
    setSelectedIndex(-1);
  };

  useEffect(() => {
    onClose();
  }, [id]);

  const onAdd = () => {
    const data = { ...props, data: { sub_component_data: [...sub_component_data, { _ui_id_: uuid(), title: 'New Card' }] } };
    selectComponent(data);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <FlexibleTransition minWidth={352} displayRightItem={selectedIndex >= 0}
        leftItem={
          <ToolContainer id={`Carousel_${id}`} aria-label="Half Width Carousel Floating Text Toolbar: Carousel">
            <ToolbarLabel label={'Carousel'} />
            <CarouselDraggableItemsList
              props={props}
              onEdit={onEdit}
            />
            <div>
              <Button
                data-testid={'Add Carousel Item'}
                variant="outlined"
                onClick={onAdd}
                sx={{ padding: '4px 10px', gap: 1, fontSize: 13 }}
              >
                <AddIcon sx={{ width: '18px', height: '18px' }} />
                ADD ITEM
              </Button>
            </div>
          </ToolContainer>
        }
        rightItem={
          <ToolContainer id={`Carousel_Item${id}`} aria-label="Half Width Carousel Floating Text Toolbar: Carousel Item">
            <CarouselItemEditor
              item={sub_component_data[selectedIndex]}
              onClose={onClose}
              onPropChange={onPropChange}
              index={selectedIndex}
            />
          </ToolContainer>
        }
      />
    </DndProvider>
  );
};
export default HalfWidthCarouselFloatingTextToolbar;
