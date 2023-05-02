import { ReactNode } from 'react';
import { AppBarProps } from '@mui/material/AppBar';

import { DrawerSectionProps } from '../types';

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

export type LayoutDrawerSectionProps = {
  sections: DrawerSectionProps[];
};

export type LayoutDrawerProps = LayoutCommonProps & {
  sections: DrawerSectionProps[];
  drawerHeader?: ReactNode;
};

export type LayoutExtendedProps = LayoutHeaderContentProps & LayoutDrawerProps;
