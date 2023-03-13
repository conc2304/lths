import { AppBarProps } from '@mui/material/AppBar';

import { DrawerSectionProps } from '../types';

export type LayoutHeaderContentProps = {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  drawerIcon?: React.ReactNode;
};

export type LayoutCommonProps = {
  fixedHeader: boolean | true;
};
export type LayoutDrawerStateProps = {
  open: boolean;
};
export type LayoutHeaderProps = AppBarProps &
  LayoutDrawerStateProps &
  LayoutCommonProps;

export type LayoutDrawerSectionProps = {
  sections: DrawerSectionProps[];
};

export type LayoutDrawerProps = LayoutCommonProps & {
  sections: DrawerSectionProps[];
  drawerHeader?: React.ReactNode;
};

export type LayoutExtendedProps = LayoutHeaderContentProps & LayoutDrawerProps;
