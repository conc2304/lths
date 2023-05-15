import { useCallback, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Accordion, AccordionSummary } from './accordion';
import AccordionDetails from './accordion/details';
import { Card } from './dragable-list-item';
import { ComponentProps } from '../../../context';
import { useEditorActions } from '../../../context/hooks';
import { areEqual } from '../../utils';

export type NavigatorProps = {
  onAddComponentClick: () => void;
};
export const Container = ({ onAddComponentClick }: NavigatorProps) => {
  const { components, orderComponent, selectComponent, duplicateComponent, removeComponent } = useEditorActions();

  const handleDrag = useCallback((dragIndex: number, hoverIndex: number) => {
    orderComponent(dragIndex, hoverIndex);
  }, []);

  //TODO: work in progress
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = (index: number, id: string) => {
    // scroll to the corresponding component in the editor
    document.getElementById(`editor-component-${index}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    const component = components.find((o) => o.__ui_id__ === id);
    if (component) selectComponent(component);
  };

  const handleMenuClick = (index: number, id: string, action: string) => {
    if (areEqual(action, 'delete')) removeComponent(id);
    else if (areEqual(action, 'duplicate')) {
      duplicateComponent(id);
    }
  };

  const renderCard = useCallback((component: ComponentProps, index: number) => {
    return (
      <Card
        key={component.__ui_id__}
        id={component.__ui_id__}
        index={index}
        onDrag={handleDrag}
        //TODO: there is a bug, scroll needs to appear for the editor only
        // onClick={handleClick}
        onMenuClick={handleMenuClick}
        text={component.component_name || component.component_id}
      ></Card>
    );
  }, []);
  const [expanded, setExpanded] = useState(true);

  const handleChange = () => setExpanded(!expanded);

  return (
    <Box>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography fontSize={13} fontWeight={500} textTransform={'uppercase'}>
            Component Navigator
          </Typography>
        </AccordionSummary>
        {components && (
          <AccordionDetails>{components.map((component, i) => renderCard(component, i))}</AccordionDetails>
        )}
      </Accordion>
      <Box sx={{ margin: 5 }}>
        <Button variant="outlined" onClick={onAddComponentClick} fullWidth>
          Add Component
        </Button>
      </Box>
    </Box>
  );
};
