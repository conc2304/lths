import { useEffect, useRef, useState } from 'react';
import { List } from '@mui/material';

import { NavMenuDropDownList } from './dropdown-list';
import DrawerSectionList from './section-list';
import { LayoutDrawerContentProps } from './types';
import { useLayoutActions } from '../../../../context';

export default function DrawerContent({ sections }: LayoutDrawerContentProps) {
  const { drawerVisible } = useLayoutActions();

  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const { setDrawerSelectedItem, drawerCurrentItem, pageTitle } = useLayoutActions();
  const prevDrawerItem = useRef<string>();

  useEffect(() => {
    // on drawer close, if subsection is selected, select its parent as the highlight
    // store the previous selection and set back on reopening
    if (!drawerCurrentItem || drawerCurrentItem === '/') return;
    if (!drawerVisible) {
      prevDrawerItem.current = drawerCurrentItem;
      const [componentId, parentId] = drawerCurrentItem.split('_'); // ie panel_1_0_2
      const newCurrentItem = `${componentId}_${parentId}_0`;
      setSelectedSection(newCurrentItem);
      setDrawerSelectedItem(newCurrentItem);
    } else {
      setSelectedSection(prevDrawerItem.current);
      setDrawerSelectedItem(prevDrawerItem.current);
    }
  }, [drawerVisible]);

  const handleListItemClick = (id: string) => {
    setDrawerSelectedItem(id);
  };

  const handleListSectionClick = (sectionId: string, path: string) => {
    setSelectedSection(sectionId === selectedSection ? null : sectionId);
    if (path) setDrawerSelectedItem(sectionId);
  };

  const handleListItemOrSectionClick = (sectionId: string, collapsible: boolean, path: string) => {
    console.log('handleListItemOrSectionClick', sectionId);
    return collapsible ? handleListSectionClick(sectionId, path) : handleListItemClick(sectionId);
  };

  return (
    <List data-testid="Dashboard-drawer--list-content" aria-label="Dashboard Navigation Menu" role="tree">
      {sections.map((section, s) => {
        const { items, header } = section;
        if (!items) return null;
        return (
          <DrawerSectionList key={`list_section_${s}`} header={header}>
            {items
              .filter((item) => !item.hidden)
              .map((item, i) => {
                return (
                  <NavMenuDropDownList
                    item={item}
                    itemId={`panel_${s}_${i}`}
                    pageTitle={pageTitle}
                    selectedSection={selectedSection}
                    onItemClick={handleListItemOrSectionClick}
                    onSubSectionClick={handleListItemClick}
                    key={`drawer_section_${s}_${i}`}
                  />
                );
              })}
          </DrawerSectionList>
        );
      })}
    </List>
  );
}
