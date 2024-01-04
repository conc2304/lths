import { ChangeEvent, useState } from 'react';
import { Button, Divider, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';

import CarouselItemEditor from './carousel-item-editor';
import { FLEXIBLE_TRANSITION_MIN_WIDTH } from '../../../../common';
import { useEditorActions } from '../../../../context';
import { FlexibleTransition, SwitchButton, ToolContainer, ToolbarLabel } from '../../../../elements';
import { CarouselDraggableItemsList } from '../../common';
import { useToolbarChange } from '../../hooks';
import { ComponentProps, HeroCarouselComponentProps } from '../../types';

const HeroCarouselToolbar = (props: HeroCarouselComponentProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data = [], title, show_greetings },
    data,
    onPropChange,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState<number>(null);

  const { handlePropChange } = useToolbarChange();
  const { updateComponent } = useEditorActions();

  const onClose = () => {
    setSelectedIndex(null);
  };

  const onEdit = (index: number) => {
    setSelectedIndex(index);
    handlePropChange('editor_meta_data', { selectedSlideIndex: index });
  };

  const handleComponentModalOpen = () => {
    onPropChange('hero_carousel_component_modal', receiveComponentDetailData);
  };

  const receiveComponentDetailData = (componentData: ComponentProps) => {
    const updatedComponentData = { ...componentData, _id: '', variation_id: '', __ui_id__: uuid() };
    const updatedData = {
      ...props,
      data: {
        ...data,
        sub_component_data: [...sub_component_data, updatedComponentData],
      },
    };
    updateComponent(updatedData);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handlePropChange('title', event.target.value);
  };

  const handleShowGreetingsPropchange = (event: ChangeEvent<HTMLInputElement>) => {
    handlePropChange('show_greetings', event.target.checked);
  };

  const selectedComponent = sub_component_data[selectedIndex];

  return (
    <DndProvider backend={HTML5Backend}>
      <FlexibleTransition
        minWidth={FLEXIBLE_TRANSITION_MIN_WIDTH}
        displayRightItem={Boolean(selectedComponent)}
        leftItem={
          <ToolContainer id={`hero_carousel_${id}`} aria-label="Hero Carousel Toolbar: Carousel">
            <ToolbarLabel label="Hero Carousel Toolbar" />
            <TextField value={title} onChange={handleTitleChange} label="Title" fullWidth />
            <SwitchButton isChecked={show_greetings} onChange={handleShowGreetingsPropchange} label="Show Greetings" />
            <Divider />
            {sub_component_data.length === 0 && (
              <Typography>There are no items in this carousel. Add an item to start building.</Typography>
            )}
            <CarouselDraggableItemsList props={props} onEdit={onEdit} />
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleComponentModalOpen}>
              Add Item
            </Button>
          </ToolContainer>
        }
        rightItem={
          <ToolContainer id={`hero_carousel_item_${id}`} aria-label="Hero Carousel Toolbar: Carousel Item">
            <CarouselItemEditor
              item={selectedComponent}
              index={selectedIndex}
              onClose={onClose}
              onPropChange={onPropChange}
            />
          </ToolContainer>
        }
      />
    </DndProvider>
  );
};

export default HeroCarouselToolbar;
