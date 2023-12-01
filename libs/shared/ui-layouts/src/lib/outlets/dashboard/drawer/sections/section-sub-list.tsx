import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

import DrawerSectionListItem from './section-item';
import { DrawerSectionSubListProps } from './types';

const DrawerSectionSubList = ({
  visible,
  items,
  sectionId,
  sectionTitle,
  onListItemClick,
  selectedItemId,
}: DrawerSectionSubListProps) => {
  if (!!items && items.length > 0)
    return (
      <Collapse in={visible} timeout="auto" unmountOnExit>
        <List
          component="ul"
          role="group"
          disablePadding
          aria-label={`${sectionTitle} Submenu`}
          id={`${sectionTitle}-submenu`}
          data-testid="Dashboard-drawer--section-sub-list"
        >
          {items
            .filter((subitem) => !subitem.hidden)
            .map((subitem, b) => {
              const subitemId = `${sectionId}_${b}`;
              const selected = selectedItemId === subitemId;

              return (
                <DrawerSectionListItem
                  sx={{ pl: 4 }}
                  key={subitemId}
                  item={subitem}
                  itemId={subitemId}
                  onListItemClick={onListItemClick}
                  // onAccordionChange={(item, status) => console.log({ item, status })}
                  selected={selected}
                />
              );
            })}
        </List>
      </Collapse>
    );
  return null;
};
export default DrawerSectionSubList;
