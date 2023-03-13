export type DrawerSectionProps = {
  header?: string;
  items?: DrawerSectionItemProps[];
};
export type DrawerSectionItemProps = {
  title: string;
  path?:string,
  target?:string,
  icon?: React.ReactNode;
  items?: DrawerSectionItemProps[];
};