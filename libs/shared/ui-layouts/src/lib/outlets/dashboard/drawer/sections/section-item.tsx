import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

import SectionItemButton from './section-item-button';
import { DrawerSectionListItemProps } from './types';
import { useLayoutActions } from '../../../../context';

const DrawerSectionListItem = ({
  item,
  selected,
  onListItemClick,
  onAccordionChange,
  itemId,
  showAccordion,
  accordionExpanded: accordionExpandedProp,
  sx,
}: DrawerSectionListItemProps) => {
  const navigate = useNavigate();
  const { drawerOpen } = useLayoutActions();
  const [accordionExpanded, setAccordionExpanded] = React.useState(accordionExpandedProp);

  const { title, icon, path } = item;

  const arrowStyle = showAccordion
    ? {
        transform: `rotate(${!accordionExpanded ? '0deg' : '90deg'})`,
        transition: '.3s all',
      }
    : null;

  const handleListItemClick = () => {
    onListItemClick(itemId, showAccordion, path);
    //TODO: Wrapping Link tag around icon preventing from triggering tranform styles, so the workaround is to manually navigate
    if (path) {
      if (showAccordion) setTimeout(() => navigate(path), 310);
      else navigate(path);
    }
  };

  const handleListItemArrowClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccordionExpanded(!accordionExpanded);
    onAccordionChange && onAccordionChange(itemId, !accordionExpanded);
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <SectionItemButton
      data-testid="Dashboard-drawer--section-item-button"
      onClick={handleListItemClick}
      selected={selected}
      sx={sx}
      role="treeitem"
      aria-label={`${title} Page`}
      aria-current={selected ? 'page' : undefined}
      aria-haspopup={showAccordion ? 'true' : 'false'}
      tabIndex={selected ? 0 : undefined}
    >
      <Box
        sx={{
          width: '100%',
          height: '32px',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        {icon && (
          <ListItemIcon color="red" sx={{ minWidth: 24, display: 'flex', alignItems: 'center' }}>
            {icon}
          </ListItemIcon>
        )}

        {drawerOpen && (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ListItemText primary={title} sx={{ paddingLeft: 1 }} />
            {showAccordion && (
              <IconButton
                color="inherit"
                onClick={handleListItemArrowClick}
                data-testid="Dashboard-Drawer--section-accordion-btn"
              >
                <ChevronRight
                  sx={{ ...arrowStyle }}
                  role="checkbox"
                  aria-expanded={accordionExpanded ? 'true' : 'false'}
                  aria-controls={showAccordion ? `${title}-submenu` : undefined}
                />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </SectionItemButton>
  );
};

export default DrawerSectionListItem;
