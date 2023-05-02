import * as React from 'react';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SxProps, Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import SectionItemButton from './section-item-button';
import { DrawerSectionItemProps } from './types';

type Props = {
  item: DrawerSectionItemProps;
  selected: boolean;
  onListItemClick: (itemId: string, collapsible: boolean, path?: string) => void;
  itemId: string;
  showAccordion?: boolean;
  accordionExpanded?: boolean;
  sx?: SxProps<Theme>;
};
const DrawerSectionListItem = ({
  item,
  selected,
  onListItemClick,
  itemId,
  showAccordion,
  accordionExpanded,
  sx,
}: Props) => {
  const navigate = useNavigate();

  const { title, icon, path } = item;

  const listItemProps = {};
  //TODO: Wrapping Link tag around icon preventing from triggering tranform styles, so the workaround is to manually navigate
  /*if (!showAccordion && path) {
    listItemProps = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      component: React.forwardRef((props, ref) => (
        //this is react-router-dom Link
        <Link {...props} to={path} target={target} style={{ color: 'inherit' }} />
      )),
    };
  }*/

  const arrowStyle = showAccordion
    ? {
        transform: `rotate(${!accordionExpanded ? '0deg' : '90deg'})`,
        transition: '.3s all',
      }
    : null;

  const _onListItemClick = () => {
    onListItemClick(itemId, showAccordion, path);
    //TODO: Wrapping Link tag around icon preventing from triggering tranform styles, so the workaround is to manually navigate
    if (path) {
      if (showAccordion) setTimeout(() => navigate(path), 310);
      else navigate(path);
    }
  };

  return (
    <SectionItemButton {...listItemProps} onClick={_onListItemClick} selected={selected} sx={sx}>
      {icon && <ListItemIcon sx={{ minWidth: 24, paddingRight: 1 }}>{icon}</ListItemIcon>}
      <ListItemText primary={title} />
      {showAccordion && <ChevronRight sx={arrowStyle} />}
    </SectionItemButton>
  );
};

export default DrawerSectionListItem;
