import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

import DrawerSectionListItem from './section-item';
import DrawerSectionList from './section-list';
import { LayoutDrawerContentProps } from './types';
import { useLayoutActions } from '../../../../context';

//TODO: item selection login is not solid, needs to switch it to route path
export default function DrawerContent({ sections }: LayoutDrawerContentProps) {
  const [open, setSelectedSection] = React.useState<string | null>(null);

  const { setDrawerSelectedItem, drawerCurrentItem } = useLayoutActions();
  const onListItemClick = (id: string) => {
    setDrawerSelectedItem(id);
    console.log(id);
  };

  const onListSectionClick = (panelId: string) => {
    setSelectedSection(panelId === open ? null : panelId);
  };
  const onListItemOrCollapsibleClick = (panelId: string, collapsible: boolean) => {
    return collapsible ? onListSectionClick(panelId) : onListItemClick(panelId);
  };

  //if (!sections) return null;
  return (
    <>
      {sections.map((section, s) => {
        const { items, header } = section;
        if (!items) return null;
        return (
          <DrawerSectionList key={`list_section_${s}`} header={header}>
            {items.map((item, i) => {
              const { items: subitems } = item;
              const collapsible = !!subitems && subitems.length > 0;
              const panelId = `panel_${s}_${i}`;
              const visible = open === panelId;

              const selectedItemId = drawerCurrentItem === panelId;

              return (
                <React.Fragment key={`drawer_section_${s}_${i}`}>
                  <DrawerSectionListItem
                    item={item}
                    itemId={panelId}
                    //  onListItemClick={() => onListItemOrCollapsibleClick(panelId, collapsible)}
                    onListItemClick={onListItemOrCollapsibleClick}
                    selected={selectedItemId}
                    showAccordion={collapsible}
                    accordionExpanded={visible}
                  />

                  {collapsible && (
                    <Collapse in={visible} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {subitems
                          .filter((subitem) => !subitem.hidden)
                          .map((subitem, b) => {
                            const subitemId = `panel_${s}_${i}_${b}`;
                            const selectedItemId = drawerCurrentItem === subitemId;

                            return (
                              <DrawerSectionListItem
                                sx={{ pl: 4 }}
                                key={subitemId}
                                item={subitem}
                                itemId={subitemId}
                                onListItemClick={onListItemClick}
                                selected={selectedItemId}
                              />
                            );
                          })}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
          </DrawerSectionList>
        );
      })}
    </>
  );
}
