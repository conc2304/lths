import { ReactNode } from 'react';

export type BreadcrumbPathProps = {
  title?: string;
  path?: string;
  children?: ReactNode;
};
export type BreadcrumbTrailProps = { paths: BreadcrumbPathProps[]; activePageTitle?: string };
