import { useCallback, useState, useEffect } from 'react';
import { Button, List } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import CarouselItemEditor from './carousel-Item-editor';
import { useEditorActions } from '../../../../context';
import { ToolContainer, ToolbarLabel } from '../../../../elements';
import { DraggableCarouselListItem } from '../../common/index';
import { useToolbarChange } from '../../hooks';
import { FullHeightCarouselComponentProps } from '../../types';

//TODO: Fix lint, create onChange wrapper function, change event prop names to start with 'on'

const FullHeightCarouselToolbar = (props: FullHeightCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
    onPropChange,
  } = props;

  const { selectComponent } = useEditorActions();
  const { swapComponentProps } = useToolbarChange();

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleEditItem = (index: number) => {
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
          { title: 'New Card', description: 'Lorem ipsum dolor sit amet, consecteur adipiscing elit,sed do eiusmod' },
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

  const renderCarouselDraggableItem = (item: any, index: number) => {
    return (
      <DraggableCarouselListItem
        key={index}
        index={index}
        sub_component_data={sub_component_data}
        onDrag={handleDrag}
        onDelete={handleDelete}
        onEditItem={handleEditItem}
        text={item?.name}
      ></DraggableCarouselListItem>
    );
  };

  return (
    <ToolContainer id={id} aria-label="Full Height Carousel Text Toolbar">
      <DndProvider backend={HTML5Backend}>
        {selectedIndex >= 0 ? (
          <CarouselItemEditor
            item={sub_component_data[selectedIndex]}
            handleCloseItem={handleCloseItem}
            onPropChange={onPropChange}
            index={selectedIndex}
          />
        ) : (
          <>
            <ToolbarLabel label={'Carousel'} />
            {sub_component_data && sub_component_data.length > 0 && (
              <List>{sub_component_data.map((item, i) => renderCarouselDraggableItem(item, i))}</List>
            )}
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
          </>
        )}
      </DndProvider>
    </ToolContainer>
  );
};
export default FullHeightCarouselToolbar;
