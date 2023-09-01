import { useCallback, useState, useEffect } from 'react';

import { Button, List } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ToolContainer, ToolbarLabel } from '../../../../elements';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CarouselItemEditor from './carousel-item-editor';
import { DraggableCarouselListItem } from '../../common/index';

import { useEditorActions } from '../../../../context';
import { useToolbarChange } from '../../hooks';
import { HalfWidthCarouselFloatingTextProps, HalfWidthCarouselFloatingTextComponentProps } from '../../types';

const HalfWidthCarouselFloatingTextToolbar = (props: HalfWidthCarouselFloatingTextComponentProps) => {
  const {
    __ui_id__: id,
    default_data: { component_data },
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

  const handleUpdateItem = (newComponent: HalfWidthCarouselFloatingTextProps, index: number) => {
    const newComponentData = [...component_data];
    newComponentData[index] = newComponent;
    const data = { ...props, default_data: { component_data: newComponentData } };
    selectComponent(data);

    setSelectedIndex(-1);
  };

  const handleAdd = () => {
    const data = { ...props, default_data: { component_data: [...component_data, { title: 'New Card' }] } };
    selectComponent(data);
  };

  const handleDelete = (index) => {
    const newData = [...props.default_data.component_data];
    newData.splice(index, 1);

    const data = { ...props, default_data: { component_data: newData } };
    selectComponent(data);
  };

  const handleDrag = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      swapComponentProps(dragIndex, hoverIndex);
    },
    [props.default_data]
  );

  const renderCarouselDraggableItem = (item: any, index: number) => {
    return (
      <DraggableCarouselListItem
        key={index}
        index={index}
        component_data={component_data}
        onDrag={handleDrag}
        onDelete={handleDelete}
        onEditItem={handleEditItem}
        text={item?.name}
      ></DraggableCarouselListItem>
    );
  };

  return (
    <ToolContainer id={id} aria-label="Half Width Carousel Floating Text Toolbar">
      <DndProvider backend={HTML5Backend}>
        {selectedIndex >= 0 ? (
          <CarouselItemEditor
            item={component_data[selectedIndex]}
            handleCloseItem={handleCloseItem}
            handleUpdateItem={(newComponent) => handleUpdateItem(newComponent, selectedIndex)}
            onPropChange={onPropChange}
          />
        ) : (
          <>
            <ToolbarLabel label={'Carousel'} />
            {component_data && component_data.length > 0 && (
              <List>{component_data.map((item, i) => renderCarouselDraggableItem(item, i))}</List>
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
export default HalfWidthCarouselFloatingTextToolbar;
