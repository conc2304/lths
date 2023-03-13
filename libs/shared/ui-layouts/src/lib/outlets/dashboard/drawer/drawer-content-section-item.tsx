import * as React from 'react';

import { SxProps, Theme } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronRight from '@mui/icons-material/ChevronRight';

import { Link } from 'react-router-dom';
import ListItemButtonStyled from './list-item-styled';

import { DrawerSectionItemProps } from '../types';

type Props = {
  item: DrawerSectionItemProps;
  selected: boolean;
  onListItemClick: (itemId: string) => void;
  itemId: string;
  showAccordion?: boolean;
  accordionExpanded?: boolean;
  sx?: SxProps<Theme>;
};


export const DrawerContentSectionListItem = ({
  item,
  selected,
  onListItemClick,
  itemId,
  showAccordion,
  accordionExpanded,
  sx,
}: Props) => {
  const { title, icon, path, target } = item;
  // const subitemId = `panel_${s}_${i}_${b}`;

  let listItemProps = {};
  if (path) {
    listItemProps = {
      component: React.forwardRef((props, ref) => (
        <Link {...props} to={path} target={target} />
      )),
    };
  }
  const arrowStyle = showAccordion
    ? {
        transform: `rotate(${!accordionExpanded ? '0deg' : '90deg'})`,
        transition: '.3s all',
      }
    : null;
  return (
    <ListItemButtonStyled
      {...listItemProps}
      onClick={() => onListItemClick(itemId)}
      selected={selected}
      sx={sx}
    >
      {icon && (
        <ListItemIcon sx={{ minWidth: 24, paddingRight: 1 }}>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText primary={title} />
      {showAccordion && <ChevronRight sx={arrowStyle} />}
    </ListItemButtonStyled>
  );
};
