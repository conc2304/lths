import { useEffect, useState } from 'react';

import DrawerSectionListItem from './section-item';
import DrawerSectionSubList from './section-sub-list';
import { DrawerSectionItemProps } from './types';
import { useLayoutActions } from '../../../../context';

type NavMenuDropDownListProps = {
  item: DrawerSectionItemProps;
  itemId: string;
  pageTitle: string;
  selectedSection: string;
  onItemClick: (itemId: string, collapsible: boolean, path?: string) => void;
  onSubSectionClick: (itemId: string, collapsible: boolean, path?: string) => void;
};

export const NavMenuDropDownList = ({
  item,
  itemId,
  pageTitle,
  selectedSection,
  onItemClick,
  onSubSectionClick,
}: NavMenuDropDownListProps) => {
  const { drawerCurrentItem, drawerVisible } = useLayoutActions();

  const { items: subitems = [], title } = item;
  const hasAccordion = subitems.filter((item) => !item.hidden).length > 0;
  const visible = selectedSection === itemId;
  const selected = drawerCurrentItem === itemId || pageTitle === title;
  const [_componentIdGlobal, parentIdGlobal] = drawerCurrentItem ? drawerCurrentItem.split('_') : [null, null];
  const [_componentIdThis, parentIdThis] = itemId ? itemId.split('_') : [null, null];

  const [submenuOpen, setSubmenuOpen] = useState(visible);
  const [childItemIsSelected, setChildItemIsSelected] = useState(parentIdGlobal === parentIdThis);

  useEffect(() => {
    // open the submenu everytime the drawer is reopened
    setSubmenuOpen(drawerVisible);
  }, [drawerVisible]);

  useEffect(() => {
    setChildItemIsSelected(parentIdGlobal === parentIdThis);
  }, [drawerCurrentItem]);

  const handleSubmenuOpened = () => {
    setSubmenuOpen(!submenuOpen);
    // if a submenu item is selected, then the parent should be selected when the menu is closed
    setChildItemIsSelected(parentIdGlobal === parentIdThis);
  };

  return (
    <>
      {/* the main parent nav item */}
      <DrawerSectionListItem
        item={item}
        itemId={itemId}
        onListItemClick={onItemClick}
        onAccordionChange={handleSubmenuOpened}
        selected={selected || childItemIsSelected}
        sx={{
          // Override 'selected' styles for styled(ListItemButton)
          // if child is selected, then use secondary text color
          // if child is selected when submenu is closed, apply regular selected styles
          '&.Mui-selected': {
            color: (theme) =>
              !selected && childItemIsSelected && submenuOpen ? theme.palette.text.secondary : undefined,
            'svg path': {
              fill: (theme) =>
                !selected && childItemIsSelected && submenuOpen ? theme.palette.text.secondary : undefined,
            },
          },
        }}
        showAccordion={hasAccordion}
        accordionExpanded={submenuOpen}
      />
      {/* the nested child nav items */}
      <DrawerSectionSubList
        visible={submenuOpen}
        selectedItemId={drawerCurrentItem}
        items={subitems}
        sectionId={itemId}
        sectionTitle={item.title}
        onListItemClick={onSubSectionClick}
      />
    </>
  );
};
