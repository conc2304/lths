import { ComponentProps } from '../../context';
export * from './enum';
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

export type HeaderComponentProps = ComponentProps & {
  default_data: { title: string; color: string; desc: string; action: ActionProps };
};
//TODO: verify with mok team
export enum ButtonStyle {
  Blank = '',
  Bold = 'bold',
  Fill = 'fill',
}
export type ButtonComponentProps = ComponentProps & {
  default_data: { title: string; style: ButtonStyle; action: ActionProps };
};

export type CardNewsProps = {
  image: string;
  tag: string;
  title: string;
  desc: string;
  date: string;
  action: ActionProps;
};

export type CarouselNewsComponentProps = ComponentProps & {
  default_data: {
    component_data: CardNewsProps[];
  };
};

export type ScoreBoardComponentProps = ComponentProps & {
  default_data: {
    date_info: string;
    match_name: string;
    hint: string;
    left: ScoreBoardTeamProps;
    right: ScoreBoardTeamProps;
  };
};

export type ScoreBoardTeamProps = ComponentProps & {
  logo: string;
  name: string;
  info: string;
  point: string;
  btn_title: string;
  action: ActionProps;
};

export type VideoComponentProps = ComponentProps & {
  default_data: { video_link: string; image: string; action: ActionProps };
};
