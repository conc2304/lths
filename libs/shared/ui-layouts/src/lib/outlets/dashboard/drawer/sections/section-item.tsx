import * as React from 'react';
import { Box } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLayoutActions } from 'libs/shared/ui-layouts/src/lib/context';
import { useNavigate } from 'react-router-dom';

import SectionItemButton from './section-item-button';
import { DrawerSectionListItemProps } from './types';

const DrawerSectionListItem = ({
  item,
  selected,
  onListItemClick,
  itemId,
  showAccordion,
  accordionExpanded,
  sx,
}: DrawerSectionListItemProps) => {
  const navigate = useNavigate();
  const { drawerVisible } = useLayoutActions();

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

  const handleListItemArrowClick = (event: React.MouseEvent<SVGSVGElement>) => {
    onListItemClick(itemId, showAccordion, path);
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
          height: '32px',
          display: 'flex',
          justifyContent: drawerVisible ? 'initial' : 'center',
          alignItems: 'center',
        }}
      >
        {icon && (
          <ListItemIcon sx={{ minWidth: 24, paddingRight: 1, display: 'flex', alignItems: 'center' }}>
            {icon}
          </ListItemIcon>
        )}
        {drawerVisible && (
          <Box sx={{}}>
            <ListItemText primary={title} />
            {showAccordion && (
              <ChevronRight
                sx={arrowStyle}
                onClick={handleListItemArrowClick}
                role="checkbox"
                aria-expanded={accordionExpanded ? 'true' : 'false'}
                aria-controls={showAccordion ? `${title}-submenu` : undefined}
              />
            )}
          </Box>
        )}
      </Box>
    </SectionItemButton>
  );
};

export default DrawerSectionListItem;
