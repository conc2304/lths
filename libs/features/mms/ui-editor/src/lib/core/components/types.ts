import { ComponentProps } from '../../context';
/**NOTE: WE MAY HAVE TO RELAX ON THE NAMING CONVENTION HERE, SO THAT WE CAN FOLLOW EXACT JSON NAMES

*/
export type ComponentType = 'native' | 'webview';
export type ActionProps = {
  type: ComponentType;
  page_id: string;
  page_link: string;
};
export type HeroComponentProps = ComponentProps & {
  image: string;
  title: string;
  desc: string;
  link_title: string;
  component_data: QuickLinkProps[];
};
export type QuickLinkProps = ComponentProps & {
  icon: string;
  title: string;
  action: ActionProps;
};
export type CardComponentProps = ComponentProps & {
  default_data: {
    image: string;
    title: string;
    desc: string;
    type: ComponentType;
  };
};
