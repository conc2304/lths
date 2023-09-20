import { matchPath } from 'react-router-dom';

import { BreadcrumbPathProps } from '../dashboard/content';
import { DrawerSectionItemProps, DrawerSectionProps } from '../dashboard/drawer/sections/types';

export const getActivePageTitle = (breadcrumbs: BreadcrumbPathProps[] | BreadcrumbPathProps) => {
  if (breadcrumbs != null) {
    if (Array.isArray(breadcrumbs)) {
      if (breadcrumbs.length > 0) return breadcrumbs[breadcrumbs.length - 1].title;
    } else return (breadcrumbs as BreadcrumbPathProps).title;
  }
  return null;
};

const findPathInSection = (path: string, section: DrawerSectionProps) => {
  const paths: BreadcrumbPathProps[] = [];
  section.items?.every((i) => {
    const match = matchPath({ path: i.path }, path);
    if (match) {
      paths.push({ title: i.title, path: i.path });
      return false;
    } else {
      const subPaths = findPathInItems(path, i.items);
      if (subPaths.length > 0) {
        paths.push({ title: i.title, path: i.path });
        paths.push(...subPaths);
        return false;
      }
    }
    return true;
  });
  return paths;
};

const findPathInItems = (path: string, items: DrawerSectionItemProps[]) => {
  const paths: BreadcrumbPathProps[] = [];
  items?.forEach((item) => {
    const match = matchPath({ path: item.path }, path);
    if (match) {
      paths.push({ title: item.title, path: item.path });
    } else {
      const subPaths = findPathInItems(path, item.items);
      if (subPaths.length > 0) {
        paths.push({ title: item.title, path: item.path });
        paths.push(...subPaths);
      }
    }
  });
  return paths;
};

export function findPath(path: string, sections: DrawerSectionProps[]) {
  const paths: BreadcrumbPathProps[] = [];
  sections.forEach((section) => {
    const sectionPaths = findPathInSection(path, section);
    paths.push(...sectionPaths);
  });
  return paths;
}
