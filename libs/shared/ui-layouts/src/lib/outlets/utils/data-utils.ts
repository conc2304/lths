import { BreadcrumbPathProps } from '../dashboard/content/types';
import { DrawerSectionProps } from '../dashboard/types';

export const findRouteTitleByPath = (sections: DrawerSectionProps[], path: string) => {
  const paths: BreadcrumbPathProps[] = [];
  sections.forEach((s) => {
    s.items?.every((i) => {
      if (i.path === path) {
        console.log('🚀 ~ file: data-utils.ts:9 ~ s.items?.every ~ path:', i.path, 'title', i.title);

        paths.push({ title: i.title, path: i.path });
        return false;
      } else {
        i.items?.forEach((sub) => {
          if (sub.path === path) {
            console.log('🚀 ~ file: data-utils.ts:16 ~ i.items?.forEach ~ sub:', i, sub);

            paths.push({ title: i.title, path: i.path });
            paths.push({ title: sub.title, path: sub.path });
            return false;
          }
          return true;
        });
      }
      return true;
    });
  });
  return paths;
};
