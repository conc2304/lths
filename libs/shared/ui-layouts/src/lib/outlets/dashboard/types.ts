import { ReactNode } from 'react';

import { BreadcrumbPathProps } from './content/types';

export type DrawerSectionProps = {
  header?: string;
  items?: DrawerSectionItemProps[];
};

export type DrawerSectionItemProps = BreadcrumbPathProps & {
  target?: string;
  icon?: ReactNode;
  items?: DrawerSectionItemProps[];
};
