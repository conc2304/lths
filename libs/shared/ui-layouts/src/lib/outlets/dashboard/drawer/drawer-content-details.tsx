import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

import DrawerListSection from './drawer-content-section';
import { DrawerContentSectionListItem } from './drawer-content-section-item';
import { LayoutDrawerSectionProps } from './types';
import { setDrawerSelectedItem, useLayout } from '../../../context';

//TODO: item selection login is not solid, needs to switch it to route path
export default function DrawerSection({ sections }: LayoutDrawerSectionProps) {
  const [open, setSelectedSection] = React.useState<string | null>(null);
  const {
    state: { drawerCurrentItem },
    dispatch,
  } = useLayout();

  const onListItemClick = (id: string) => {
    setDrawerSelectedItem(dispatch, id);
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
          <DrawerListSection key={`list_section_${s}`} header={header}>
            {items.map((item, i) => {
              const { items: subitems } = item;
              const collapsible = !!subitems && subitems.length > 0;
              const panelId = `panel_${s}_${i}`;
              const visible = open === panelId;

              const selectedItemId = drawerCurrentItem === panelId;

              return (
                <React.Fragment key={`drawer_section_${s}_${i}`}>
                  <DrawerContentSectionListItem
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
                        {subitems.map((subitem, b) => {
                          const subitemId = `panel_${s}_${i}_${b}`;
                          const selectedItemId = drawerCurrentItem === subitemId;

                          return (
                            <DrawerContentSectionListItem
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
          </DrawerListSection>
        );
      })}
    </>
  );
}
