import { Fragment, useState } from 'react';
import { List } from '@mui/material';

import DrawerSectionListItem from './section-item';
import DrawerSectionList from './section-list';
import DrawerSectionSubList from './section-sub-list';
import { LayoutDrawerContentProps } from './types';
import { useLayoutActions } from '../../../../context';

//TODO: item selection login is not solid, needs to switch it to route path
export default function DrawerContent({ sections }: LayoutDrawerContentProps) {
  const [open, setSelectedSection] = useState<string | null>(null);

  const { setDrawerSelectedItem, drawerCurrentItem, pageTitle } = useLayoutActions();
  const handleListItemClick = (id: string) => {
    setDrawerSelectedItem(id);
  };

  const handleListSectionClick = (sectionId: string, path: string) => {
    setSelectedSection(sectionId === open ? null : sectionId);
    if (path) setDrawerSelectedItem(sectionId);
  };
  const handleListItemOrSectionClick = (sectionId: string, collapsible: boolean, path: string) => {
    return collapsible ? handleListSectionClick(sectionId, path) : handleListItemClick(sectionId);
  };

  return (
    <List data-testid="Dashboard-drawer--list-content" aria-label="Dashboard Navigation Menu" role="tree">
      {sections.map((section, s) => {
        const { items, header } = section;
        if (!items) return null;
        return (
          <DrawerSectionList key={`list_section_${s}`} header={header}>
            {items.map((item, i) => {
              const { items: subitems = [], title } = item;
              const hasAccordion = subitems.filter((item) => !item.hidden).length > 0;
              const itemId = `panel_${s}_${i}`;
              const visible = open === itemId;
              const selected = drawerCurrentItem === itemId || pageTitle === title;

              return (
                <Fragment key={`drawer_section_${s}_${i}`}>
                  <DrawerSectionListItem
                    item={item}
                    itemId={itemId}
                    onListItemClick={handleListItemOrSectionClick}
                    selected={selected}
                    showAccordion={hasAccordion}
                    accordionExpanded={visible}
                  />
                  <DrawerSectionSubList
                    visible={visible}
                    selectedItemId={drawerCurrentItem}
                    items={subitems}
                    sectionId={itemId}
                    sectionTitle={item.title}
                    onListItemClick={handleListItemClick}
                  />
                </Fragment>
              );
            })}
          </DrawerSectionList>
        );
      })}
    </List>
  );
}
