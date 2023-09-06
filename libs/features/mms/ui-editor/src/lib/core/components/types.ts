import { ComponentProps as BaseProps, ToolbarProps } from '../../context';

export * from './enum';

export type ComponentProps = BaseProps & {
  onPropChange?: ToolbarProps['onPropChange'];
};

export type ComponentType = 'native' | 'webview';

export type AutocompleteItemProps = {
  label: string;
  value: string;
  type: string;
};

export type AutocompleteOptionProps = {
  name: string;
  value: string;
};

export type ActionProps = {
  type: ComponentType;
  page_id: string;
  page_link: string;
};

export type SpacerProps = ComponentProps & {
  properties_data: {
    space: string;
    type: string;
    background_color: string;
  };
};

export type FullHeightCarouselProps = {
  title: string;
  img_alt_text: string;
  image: string;
  description: string;
  action: ActionProps;
};
export type FullHeightCarouselComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: FullHeightCarouselProps[];
  };
};

export type HeroComponentProps = ComponentProps & {
  image: string;
  title: string;
  desc: string;
  link_title: string;
  sub_properties_data: QuickLinkProps[];
};
export type HalfHeightWithIconProps = ComponentProps & {
  properties_data: {
    title: string;
    icon: string;
    icon_alt_text: string;
    description: string;
    action: ActionProps;
  };
};
export type QuickLinkProps = ComponentProps & {
  icon: string;
  title: string;
  action: ActionProps;
};

export type QuickLinksProps = ComponentProps & {
  properties_data: {
    sub_properties_data: QuickLinkProps[];
  };
};
export type PhoneInquiryComponentProps = ComponentProps & {
  title: string;
  style: string;
  desc: string;
  linkcolor: string;
  linktitle: string;
  action: ActionProps;
};

export type EventInfoComponentProps = ComponentProps & {
  properties_data: {
    title: string;
    desc: string;
    date_lbl_txt: string;
    date_lbl_txt_color: string;
    date_data_txt: string;
    date_data_txt_color: string;
    location_lbl_txt: string;
    location_lbl_txt_color: string;
    location_data_txt: string;
    location_data_txt_color: string;
  };
};

export type CardComponentProps = ComponentProps & {
  properties_data: {
    image: string;
    title: string;
    desc: string;
    type: ComponentType;
  };
};

export type HalfWidthCarouselProps = {
  title: string;
  image: string;
  description: string;
  image_alt_text: string;
  action: ActionProps;
};
export type HalfWidthCarouselComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: HalfWidthCarouselProps[];
  };
};

export type NewsViewComponentProps = ComponentProps & {
  properties_data: {
    image: string;
    title: string;
    desc: string;
    hint: string;
    author: string;
    date_info: string;
  };
};

export type TextButtonProps = ComponentProps & {
  properties_data: {
    title: string;
    text_size: string;
    text_size_unit: string;
    text_color: string;
    card_background_color: string;
    text_font_family: string;
    linked_text: LinkedTextProps[];
  };
};

export type HeaderComponentProps = ComponentProps & {
  properties_data: { title: string; color: string; desc: string; action: ActionProps };
};
export type LinkedTextProps = {
  link_key: string;
  link_value: string;
  link_color: string;
  link_id: string;
};
export type HeadlineTextBlockComponentProps = ComponentProps & {
  properties_data: {
    card_background_color: string;
    title: string;
    text_size: string;
    text_size_unit: string;
    text_color: string;
    text_font_family: string;
    linked_text: LinkedTextProps[];
    action: ActionProps;
  };
};

//TODO: verify with mok team
export enum ButtonStyle {
  Blank = '',
  Bold = 'bold',
  Fill = 'fill',
}
export type ButtonComponentProps = ComponentProps & {
  properties_data: { title: string; style: ButtonStyle; action: ActionProps };
};

export type CardNewsProps = {
  image: string;
  tag: string;
  title: string;
  desc: string;
  date: string;
  action: ActionProps;
};

export type EventCardProps = {
  image: string;
  title: string;
  sub_title: string;
  desc: string;
  action: { page_link: string };
  btn_title: string;
};

export type CarouselEventsComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: EventCardProps[];
  };
};

export type VendorVCardProps = {
  image: string;
  title: string;
  sub_title: string;
  desc: string;
  action: { page_link: string };
  btn_title: string;
};

export type CarouselVendorComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: VendorVCardProps[];
  };
};

export type CarouselNewsComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: CardNewsProps[];
  };
};

export type ScoreBoardComponentProps = ComponentProps & {
  properties_data: {
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

export type KeyValueProps = {
  key: string;
  value: string;
};

export type KeyValueComponentProps = ComponentProps & {
  properties_data: {
    title: string;
    desc: string;
    sub_properties_data: KeyValueProps[];
  };
};

export type TitleActionProps = {
  title: string;
  action: ActionProps;
};

export type NavListViewComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: TitleActionProps[];
  };
};

export type ChipSetViewComponentProps = ComponentProps & {
  properties_data: {
    title: string;
    sub_properties_data: TitleActionProps[];
  };
};

export type ExpandCollapseViewProps = {
  action: ActionProps;
  desc: string;
  title: string;
};

export type ExpandCollapseViewComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: ExpandCollapseViewProps[];
  };
};

export type ButtonHCarouselComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: TitleActionProps[];
  };
};

export type ButtonsViewComponentProps = ComponentProps & {
  properties_data: {
    title: string;
    desc: string;
    image: string;
    sub_properties_data: TitleActionProps[];
  };
};

export type VideoViewComponentProps = ComponentProps & {
  properties_data: { video_link: string; image: string; action: ActionProps };
};

export type CardImageComponentProps = ComponentProps & {
  properties_data: {
    title: string;
    image: string;
  };
};

export type ImageComponentProps = ComponentProps & {
  properties_data: {
    title: string;
    color: string;
    desc: string;
    image: string;
    action: ActionProps;
  };
};
export type TitleDescComponentProps = ComponentProps & {
  properties_data: {
    title: string;
    desc: string;
    color: string;
    action: ActionProps;
  };
};

export type MapPathComponentProps = ComponentProps & {
  properties_data: {
    title: string;
    desc: string;
    style: string;
  };
};

export type NavCellViewItem = {
  title: string;
  icon: string;
  action: ActionProps;
};

export type NavCellViewComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: NavCellViewItem[];
  };
};

export type SegmentControlComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: TitleActionProps[];
  };
};

export type DescriptionComponentProps = ComponentProps & {
  properties_data: {
    title: string;
    color: string;
    style: 'bold' | 'light' | 'medium';
  };
};

export type PromotionOneIsToOneAspectRatioComponentProps = ComponentProps & {
  properties_data: {
    image: string;
    img_alt_text: string;
    action: ActionProps;
    btn_text: string;
  };
};
export type QuicklinkButton = {
  title: string;
  icon: string;
  card_background_color: string;
  text_color: string;
  action: ActionProps;
};

export type QuicklinkButtonGroupComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: QuicklinkButton[]
  };
};

export type FanGuideThreeIsToFourAspectRatioComponentProps = ComponentProps & {
  properties_data: {
    image: string;
    img_alt_text: string;
    title: string;
    description: string;
    action: ActionProps;
    btn_text: string;
  };
};

// Hero Promotion
export type CardTextOverlayAndButtonComponentProps = ComponentProps & {
  properties_data: {
    image: string;
    img_alt_text: string;
    title: string;
    description: string;
    action: ActionProps;
    btn_text: string;
  };
};

export type CardTextComponentProps = ComponentProps & {
  properties_data: {
    image: string;
    img_alt_text: string;
    title: string;
    description: string;
    action: ActionProps;
  };
};

export type SiloTextAndButtonComponentProps = ComponentProps & {
  properties_data: {
    image: string;
    img_alt_text: string;
    title: string;
    description: string;
    action: ActionProps;
    btn_text: string;
  };
};

export type HalfWidthCarouselFloatingTextProps = {
  name: string;
  image: string;
  img_alt_text: string;
  title: string;
  action: ActionProps;
};

export type HalfWidthCarouselFloatingTextComponentProps = ComponentProps & {
  properties_data: {
    sub_properties_data: HalfWidthCarouselFloatingTextProps[];
  };
};

export type FullWidthButtonComponentProps = ComponentProps & {
  properties_data: {
    label: string;
    action: ActionProps;
  };
};
export type FullHeightFloatingTextProps = ComponentProps & {
  properties_data: {
    title: string;
    image: string;
    description: string;
    action: ActionProps;
  };
};

export type BodyTextComponentProps = ComponentProps & {
  properties_data: {
    title: string;
    card_background_color: string;
    text_color: string;
    text_size: '12px' | '16px' | '32px';
    linked_text: BodyTextComponentsProps[];
    action: ActionProps;
  };
};

export type BodyTextComponentsProps = ComponentProps & {
  link_key: string;
  link_value: string;
  link_color: string;
  link_id: string;
};
