import { useState } from 'react';
import { List } from '@mui/material';

import { NavMenuDropDownList } from './dropdown-list';
import DrawerSectionList from './section-list';
import { LayoutDrawerContentProps } from './types';
import { useLayoutActions } from '../../../../context';

export default function DrawerContent({ sections }: LayoutDrawerContentProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const { setDrawerSelectedItem, drawerCurrentItem, pageTitle } = useLayoutActions();

  // on drawer close, if subsection is selected, select its parent as the highlight
  const handleListItemClick = (id: string) => {
    setDrawerSelectedItem(id);
  };

  const handleListSectionClick = (sectionId: string, path: string) => {
    setSelectedSection(sectionId === selectedSection ? null : sectionId);
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
            {items
              .filter((item) => !item.hidden)
              .map((item, i) => (
                <NavMenuDropDownList
                  item={item}
                  itemId={`panel_${s}_${i}`}
                  pageTitle={pageTitle}
                  drawerCurrentItem={drawerCurrentItem}
                  selectedSection={selectedSection}
                  onItemClick={handleListItemOrSectionClick}
                  onSubSectionClick={handleListItemClick}
                  key={`drawer_section_${s}_${i}`}
                />
              ))}
          </DrawerSectionList>
        );
      })}
    </List>
  );
}
