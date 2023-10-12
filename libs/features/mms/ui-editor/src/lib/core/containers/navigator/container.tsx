import { useCallback } from 'react';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Card from './list-items/draggable';
import colors from '../../../common/colors';
import { ComponentProps } from '../../../context';
import { useEditorActions } from '../../../context/hooks';
import { areEqual } from '../../utils';
import { PAGE_EDITOR_CONTAINER, PAGE_EDITOR_NAVIGATOR_CONTAINER } from '../constants';

export type NavigatorProps = {
  onAddComponent: () => void;
};
export const Container = ({ onAddComponent }: NavigatorProps) => {
  const {
    components,
    orderComponent,
    selectComponent,
    duplicateComponent,
    removeComponent,
    renameComponent,
    selectedComponent,
  } = useEditorActions();

  const handleDrag = useCallback((dragIndex: number, hoverIndex: number) => {
    orderComponent(dragIndex, hoverIndex);
  }, []);

  //TODO: work in progress
  const handleClick = (index: number, id: string) => {
    const component = components.find((o) => o.__ui_id__ === id);

    if (component) {
      selectComponent(component);
    }
  };

  const handleMenuClick = (index: number, id: string, action: string) => {
    if (areEqual(action, 'delete')) removeComponent(id);
    else if (areEqual(action, 'duplicate')) {
      duplicateComponent(id);
    }
  };
  const handleRename = (id: string, value: string) => {
    renameComponent(id, value);
  };

  const renderCard = (component: ComponentProps, index: number) => {
    const { __ui_id__, name, component_id } = component;
    const text = name || component_id;
    const selected = selectedComponent?.__ui_id__ === __ui_id__;

    return (
      <Card
        key={__ui_id__}
        id={__ui_id__}
        index={index}
        onDrag={handleDrag}
        onClick={handleClick}
        onRename={handleRename}
        onMenuClick={handleMenuClick}
        text={text}
        selected={selected}
      ></Card>
    );
  };

  return (
    <Box className={PAGE_EDITOR_CONTAINER} id={PAGE_EDITOR_NAVIGATOR_CONTAINER}>
      <Typography
        fontSize={'.875rem'}
        fontWeight={500}
        textTransform={'uppercase'}
        paddingX={3}
        paddingY={2}
        color={colors.navigator.title}
        letterSpacing="0.17px"
      >
        Page Components
      </Typography>
      <Divider />
      {components.map((component, i) => renderCard(component, i))}
      <Box sx={{ margin: 5 }}>
        <Button variant="outlined" onClick={onAddComponent} fullWidth>
          Add Component
        </Button>
      </Box>
    </Box>
  );
};
