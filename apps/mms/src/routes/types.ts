import { DrawerSectionItemProps, DrawerSectionProps } from '@lths/shared/ui-layouts';

export type SectionItemProps = DrawerSectionItemProps & {
  //if file is not specified, routes will be default to {`${path}-path`}
  file?: string;
  items?: SectionItemProps[];
};
export type SectionProps = DrawerSectionProps & { items: SectionItemProps[] };
