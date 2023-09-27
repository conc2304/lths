import { useCallback, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';

import CarouselDraggableItemsList from './carousel-draggable-items-list';
import CarouselItemEditor from './carousel-Item-editor';
import { useEditorActions } from '../../../../context';
import { ToolContainer, ToolbarLabel, FlexibleTransition } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { HalfWidthCarouselComponentProps } from '../../types';

const HalfWidthCarouselToolbar = (props: HalfWidthCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
    onPropChange,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  
  const { selectComponent } = useEditorActions();
  const { swapComponentProps, initSubComponentPropsUUID } = useToolbarChange();

  const handleEditItem = (index: number) => {
    setSelectedIndex(index);
  };
  const handleCloseItem = () => {
    setSelectedIndex(-1);
  };

  useEffect(() => {
    handleCloseItem();
    initSubComponentPropsUUID();
  }, [id]);

  const handleAdd = () => {
    const data = {
      ...props,
      data: {
        sub_component_data: [
          ...sub_component_data,
          {
            id: uuid(),
            title: 'New Card',
            description: 'Lorem ipsum dolor sit amet',
            action: { type: 'native' },
          },
        ],
      },
    };
    selectComponent(data);
  };

  const handleDelete = (index) => {
    const newData = [...props.data.sub_component_data];
    newData.splice(index, 1);

    const data = { ...props, data: { sub_component_data: newData } };
    selectComponent(data);
  };

  const handleDrag = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      swapComponentProps(dragIndex, hoverIndex);
    },
    [props.data]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <FlexibleTransition minWidth={352} displayRightItem={selectedIndex >= 0}
        leftItem={
          <ToolContainer id={`Carousel_${id}`} aria-label="Half Width Carousel Floating Text Toolbar: Carousel">
            <ToolbarLabel label={'Carousel'} />
            <CarouselDraggableItemsList
              data={sub_component_data}
              onDrag={handleDrag}
              onDelete={handleDelete}
              onEditItem={handleEditItem}
            />
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
          <ToolContainer id={`Carousel_Item${id}`} aria-label="Half Width Carousel Floating Text Toolbar: Carousel Item">
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
