import { ReactNode } from 'react';
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
