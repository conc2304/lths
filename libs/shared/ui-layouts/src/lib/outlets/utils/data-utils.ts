import { DrawerSectionProps } from "../dashboard/types";

export const findRouteTitleByPath = (sections: DrawerSectionProps[], path: string) => {
  const paths: string[] = [];
  sections.forEach((s) => {
    s.items?.every((i) => {
      if (i.path === path) {
        paths.push(i.title);
        return false;
      } else {
        i.items?.forEach((sub) => {
          if (sub.path === path) {
            console.log(sub);
            paths.push(i.title);
            paths.push(sub.title);
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
