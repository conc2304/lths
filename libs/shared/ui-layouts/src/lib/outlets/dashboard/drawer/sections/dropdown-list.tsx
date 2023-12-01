import { useEffect, useState } from 'react';

import DrawerSectionListItem from './section-item';
import DrawerSectionSubList from './section-sub-list';
import { useLayoutActions } from '../../../../context';

export const NavMenuDropDownList = ({
  item,
  itemId,
  pageTitle,
  drawerCurrentItem,
  selectedSection,
  onItemClick,
  onSubSectionClick,
}) => {
  const { drawerVisible } = useLayoutActions();

  const { items: subitems = [], title } = item;
  const hasAccordion = subitems.filter((item) => !item.hidden).length > 0;
  // const itemId = `panel_${s}_${i}`;
  const visible = selectedSection === itemId;
  const selected = drawerCurrentItem === itemId || pageTitle === title;

  const [submenuOpen, setSubmenuOpen] = useState(visible);

  useEffect(() => {
    setSubmenuOpen(drawerVisible);
  }, [drawerVisible]);

  return (
    <>
      <DrawerSectionListItem
        item={item}
        itemId={itemId}
        onListItemClick={onItemClick}
        onAccordionChange={() => setSubmenuOpen(!submenuOpen)}
        selected={selected}
        showAccordion={hasAccordion}
        accordionExpanded={submenuOpen}
      />
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
