import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';
import { AppBarProps } from '@mui/material/AppBar';

import { BreadcrumbPathProps } from '../../content/breadcrumbs/types';

export type DrawerSectionProps = {
  header?: string;
  items?: DrawerSectionItemProps[];
};

export type DrawerSectionItemProps = BreadcrumbPathProps & {
  target?: string;
  icon?: ReactNode;
  hidden?: boolean;
  //file?: string;
  items?: DrawerSectionItemProps[];
};

export type LayoutHeaderContentProps = {
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  drawerIcon?: ReactNode;
};

export type LayoutCommonProps = {
  fixedHeader: boolean | true;
};
export type LayoutDrawerStateProps = {
  open: boolean;
};
export type LayoutHeaderProps = AppBarProps & LayoutDrawerStateProps & LayoutCommonProps;

export type LayoutDrawerContentProps = {
  sections: DrawerSectionProps[];
};

export type LayoutDrawerProps = LayoutCommonProps & {
  sections: DrawerSectionProps[];
  drawerHeader?: ReactNode;
};

export type LayoutExtendedProps = LayoutHeaderContentProps & LayoutDrawerProps;

export type DrawerSectionSubListProps = {
  visible: boolean;
  onListItemClick: (itemId: string, collapsible: boolean, path?: string) => void;
  items: DrawerSectionItemProps[];
  sectionId: string;
  sectionTitle: string;
  selectedItemId: string;
};
export type DrawerSectionListItemProps = {
  item: DrawerSectionItemProps;
  selected: boolean;
  onListItemClick: (itemId: string, collapsible: boolean, path?: string) => void;
  itemId: string;
  showAccordion?: boolean;
  accordionExpanded?: boolean;
  sx?: SxProps<Theme>;
};
