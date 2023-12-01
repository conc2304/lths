import { useEffect, useState } from 'react';

import DrawerSectionListItem from './section-item';
import DrawerSectionSubList from './section-sub-list';
import { useLayoutActions } from '../../../../context';

export const NavMenuDropDownList = ({
  item,
  itemId,
  pageTitle,
  // drawerCurrentItem,
  selectedSection,
  onItemClick,
  onSubSectionClick,
}) => {
  const { drawerCurrentItem } = useLayoutActions();

  const { items: subitems = [], title } = item;
  const hasAccordion = subitems.filter((item) => !item.hidden).length > 0;
  const visible = selectedSection === itemId;
  const selected = drawerCurrentItem === itemId || pageTitle === title;

  const [componentIdGlobal, parentIdGlobal] = drawerCurrentItem ? drawerCurrentItem.split('_') : [null, null];
  const [componentIdThis, parentIdThis] = itemId ? itemId.split('_') : [null, null];

  const [submenuOpen, setSubmenuOpen] = useState(visible);
  const [childItemIsSelected, setChildItemIsSelected] = useState(parentIdGlobal === parentIdThis);
  const { drawerVisible } = useLayoutActions();

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
        selected={selected || (childItemIsSelected && !submenuOpen)}
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
