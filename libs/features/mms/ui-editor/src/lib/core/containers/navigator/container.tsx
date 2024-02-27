import { useCallback } from 'react';
import { Divider, Stack, Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
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
      <Box 
        sx={{ 
          backgroundColor: colors.sidebar.background, 
          position: 'sticky', top: 0, zIndex: 1,
        }}
      >
        <Stack 
          direction="row" justifyContent="space-between" alignItems="center" spacing={1} 
          sx={{ padding: theme.spacing(1.5), paddingLeft: theme.spacing(3) }}
        >
          <Typography
            fontSize={'.875rem'}
            fontWeight={500}
            textTransform={'uppercase'}
            color={colors.navigator.title}
            letterSpacing="0.17px"
          >
            Page Components
          </Typography>
          <Button
            data-testid="Add Component"
            variant="outlined"
            sx={{ 
              fontSize: 13, fontWeight: 500, lineHeight: theme.spacing(2.75), letterSpacing: '0.46px',
              color: colors.navigator.addButton.color, border: `1px solid ${colors.navigator.addButton.border}`,
              padding: `${theme.spacing(0.5)} ${theme.spacing(1.25)}` 
            }}
            onClick={onAddComponent}
            startIcon={<AddIcon/>}
          >
            ADD
          </Button>
        </Stack>
        <Divider />
      </Box>
      {components.map((component, i) => renderCard(component, i))}
    </Box>
  );
};
