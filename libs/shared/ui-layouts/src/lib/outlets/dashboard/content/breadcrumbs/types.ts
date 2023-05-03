export type BreadcrumbPathProps = {
  title?: string;
  path?: string;
};
export type BreadcrumbTrailProps = { paths: BreadcrumbPathProps[]; activePageTitle?: string };
