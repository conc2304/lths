import { ComponentProps as BaseProps, ToolbarProps } from '../../context';

export * from './enum';

export type ComponentProps = BaseProps & {
  onPropChange?: ToolbarProps['onPropChange'];
};

export type ComponentType = 'native' | 'web';

export enum SourceType {
  NHL_SCHEDULE = 'NHL_Schedule',
  NHL_VIDEO = 'NHL_Video',
  NHL_NEWS = 'NHL_News',
}

export enum GameEventState {
  PRE_GAME = 'Pre_Game',
  IN_GAME = 'In_Game',
  POST_GAME = 'Post_Game',
}

export type PageAutocompleteItemProps = {
  label: string;
  value: string;
  type: string;
  static: boolean;
  image?: string;
};

export enum ActionType {
  NATIVE = 'native',
  WEBVIEW = 'web',
}
export type ItemPositionalProps = {
  keys?: string[] | undefined; //parentKeys
  index?: number;
  childKeys?: string[] | undefined;
};
export type ActionProps = {
  type: ComponentType;
  page_id: string;
  page_link: string;
};

export type CarouselProps = {
  _ui_id_?: string;
  name?: string;
};

export type SpacerProps = ComponentProps & {
  data: {
    space: number;
    type: string;
    background_color: string;
  };
};

export type TextWithIconProps = ComponentProps & {
  data: {
    icon: string;
    title: string;
  };
};

export type DividerProps = ComponentProps & {
  data: {
    color: string;
  };
};

export type CenterHeadlineTextProps = ComponentProps & {
  data: {
    title: string;
    text_size: string;
    linked_text: LinkedTextProps[];
  };
};

export type CenterBodyTextBlockProps = ComponentProps & {
  data: {
    title: string;
    text_size: string;
    linked_text: LinkedTextProps[];
  };
};

export type FullHeightCarouselProps = CarouselProps & {
  title: string;
  img_alt_text: string;
  image: string;
  description: string;
  action: ActionProps;
};
export type FullHeightCarouselComponentProps = ComponentProps & {
  data: {
    sub_component_data: FullHeightCarouselProps[];
  };
};

export type SocialIconButtonProps = {
  icon: string;
  action: ActionProps;
};
export type SocialIconButtoncomponentProps = ComponentProps & {
  data: {
    sub_component_data: SocialIconButtonProps[];
  };
};
export type HeroComponentProps = ComponentProps & {
  image: string;
  title: string;
  desc: string;
  link_title: string;
  sub_component_data: QuickLinkProps[];
};
export type HalfHeightWithIconProps = ComponentProps & {
  data: {
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
  data: {
    sub_component_data: QuickLinkProps[];
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
  data: {
    location_text: string;
    time_text: string;
    location_icon: string;
    time_icon: string;
  };
};

export type CardComponentProps = ComponentProps & {
  data: {
    image: string;
    title: string;
    desc: string;
    type: ComponentType;
  };
};

export type HalfWidthCarouselProps = CarouselProps & {
  title: string;
  image: string;
  description: string;
  img_alt_text: string;
  action: ActionProps;
};
export type HalfWidthCarouselComponentProps = ComponentProps & {
  data: {
    sub_component_data: HalfWidthCarouselProps[];
  };
};

export type NewsViewComponentProps = ComponentProps & {
  data: {
    image: string;
    title: string;
    desc: string;
    hint: string;
    author: string;
    date_info: string;
  };
};

export type TextButtonProps = ComponentProps & {
  data: {
    btn_text: string;
    btn_text_size: string;
    text_size_unit: string;
    text_color: string;
    card_background_color: string;
    text_font_family: string;
    linked_text: LinkedTextProps[];
  };
};

export type HeaderComponentProps = ComponentProps & {
  data: { title: string; color: string; desc: string; action: ActionProps };
};
export type LinkedTextProps = {
  link_key: string;
  link_color: string;
  link_id: string;
  action: ActionProps;
};
export type HeadlineTextBlockComponentProps = ComponentProps & {
  data: {
    title: string;
    card_background_color: string;
    text_size: string;
    text_size_unit: string;
    text_color: string;
    text_font_family: string;
    linked_text: LinkedTextProps[];
  };
};

//TODO: verify with mok team
export enum ButtonStyle {
  Blank = '',
  Bold = 'bold',
  Fill = 'fill',
}
export type ButtonComponentProps = ComponentProps & {
  data: { title: string; style: ButtonStyle; action: ActionProps };
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
  data: {
    sub_component_data: EventCardProps[];
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
  data: {
    sub_component_data: VendorVCardProps[];
  };
};

export type CarouselNewsComponentProps = ComponentProps & {
  data: {
    sub_component_data: CardNewsProps[];
  };
};

export type ScoreBoardComponentProps = ComponentProps & {
  data: {
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
  data: {
    title: string;
    desc: string;
    sub_component_data: KeyValueProps[];
  };
};

export type TitleActionProps = {
  title: string;
  action: ActionProps;
};

export type NavListViewComponentProps = ComponentProps & {
  data: {
    sub_component_data: TitleActionProps[];
  };
};

export type ChipSetViewComponentProps = ComponentProps & {
  data: {
    title: string;
    sub_component_data: TitleActionProps[];
  };
};

export type ExpandCollapseViewProps = {
  action: ActionProps;
  desc: string;
  title: string;
};

export type ExpandCollapseViewComponentProps = ComponentProps & {
  data: {
    sub_component_data: ExpandCollapseViewProps[];
  };
};

export type ButtonHCarouselComponentProps = ComponentProps & {
  data: {
    sub_component_data: TitleActionProps[];
  };
};

export type ButtonsViewComponentProps = ComponentProps & {
  data: {
    title: string;
    desc: string;
    image: string;
    sub_component_data: TitleActionProps[];
  };
};

export type VideoViewComponentProps = ComponentProps & {
  data: { video_link: string; image: string; action: ActionProps };
};

export type CardImageComponentProps = ComponentProps & {
  data: {
    title: string;
    image: string;
  };
};

export type FullHeightImageComponentProps = ComponentProps & {
  data: {
    image: string;
    action: ActionProps;
  };
};

export type HalfWidthTextComponentProps = ComponentProps & {
  data: {
    action: ActionProps;
    btn_text: string;
    description: string;
    icon: string;
    image: string;
    section: string;
    sub_title: string;
    title: string;
  };
};

export type ImageComponentProps = ComponentProps & {
  data: {
    image: string;
    action: ActionProps;
  };
};
export type TitleDescComponentProps = ComponentProps & {
  data: {
    title: string;
    desc: string;
    color: string;
    action: ActionProps;
  };
};

export type MapPathComponentProps = ComponentProps & {
  data: {
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
  data: {
    sub_component_data: NavCellViewItem[];
  };
};

export type SegmentControlComponentProps = ComponentProps & {
  data: {
    sub_component_data: TitleActionProps[];
  };
};

export type SegmentProps = {
  title: string;
  description: string;
  segment_id: string;
  action: ActionProps;
};

export type SegmentGroupProps = ComponentProps & {
  data: {
    sub_component_data: SegmentProps[];
  };
};

export type DescriptionComponentProps = ComponentProps & {
  data: {
    title: string;
    color: string;
    style: 'bold' | 'light' | 'medium';
  };
};

export type PromotionOneIsToOneAspectRatioComponentProps = ComponentProps & {
  data: {
    image: string;
    img_alt_text: string;
    action: ActionProps;
    btn_text: string;
  };
};

export type ImageHeaderComponentProps = ComponentProps & {
  data: {
    title: string;
    sub_title: string;
    image: string;
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
  data: {
    sub_component_data: QuicklinkButton[];
  };
};

export type FanGuideThreeIsToFourAspectRatioComponentProps = ComponentProps & {
  data: {
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
  data: {
    image: string;
    img_alt_text: string;
    title: string;
    description: string;
    action: ActionProps;
    btn_text: string;
  };
};

export type CardTextComponentProps = ComponentProps & {
  data: {
    image: string;
    img_alt_text: string;
    title: string;
    description: string;
    action: ActionProps;
  };
};

export type SiloTextAndButtonComponentProps = ComponentProps & {
  data: {
    image: string;
    img_alt_text: string;
    title: string;
    description: string;
    action: ActionProps;
    btn_text: string;
  };
};

export type HalfWidthCarouselFloatingTextProps = CarouselProps & {
  image: string;
  img_alt_text: string;
  title: string;
  action: ActionProps;
};

export type HalfWidthCarouselFloatingTextComponentProps = ComponentProps & {
  data: {
    sub_component_data: HalfWidthCarouselFloatingTextProps[];
  };
};

export type CardViewCarouselProps = CarouselProps & {
  image: string;
  action: ActionProps;
};

export type CardViewCarouselComponentProps = ComponentProps & {
  data: {
    sub_component_data: CardViewCarouselProps[];
  };
};

export type FullWidthButtonComponentProps = ComponentProps & {
  data: {
    btn_text: string;
    btn_style: string;
    action: ActionProps;
  };
};
export type FullHeightFloatingTextProps = ComponentProps & {
  data: {
    title: string;
    image: string;
    description: string;
    action: ActionProps;
  };
};

export type TitleTextComponentProps = ComponentProps & {
  data: {
    title: string;
    card_background_color: string;
    text_color: string;
    linked_text: LinkedTextProps[];
  };
};

export type BodyTextComponentProps = ComponentProps & {
  data: {
    title: string;
    card_background_color: string;
    text_color: string;
    linked_text: LinkedTextProps[];
  };
};

export type HorizontalSmallComponentProps = ComponentProps & {
  data: {
    title: string;
    image: string;
    action: ActionProps;
  };
};
export type FullHeightEventComponentProps = ComponentProps & {
  data: {
    max_size: string;
    title: string;
    btn_text: string;
    source_type: SourceType;
  };
};

export type HalfHeightMatchUpComponentProps = ComponentProps & {
  data: {
    max_size: number;
    title: string;
    btn_text: string;
    source_type: SourceType;
  };
};

export type HorizontalMediumProps = ComponentProps & {
  data: {
    title: string;
    file: string;
    action: ActionProps;
  };
};

export type FullHeightEventFloatingTextComponentProps = ComponentProps;

export type HeroGameBoxPreGameProps = {
  show_date_text: boolean;
  show_time_text: boolean;
  show_at_text: boolean;
};

export type HeroGameBoxInGameProps = {
  show_period_text: boolean;
  show_time_remain_text: boolean;
  show_stats_btn: boolean;
  btn_text: string;
  btn_text_color: string;
  btn_action: ActionProps;
};

export type HeroGameBoxPostGameProps = {
  show_final_text: boolean;
  show_highlights_btn: boolean;
  btn_text_play_icon: boolean;
  btn_text: string;
  btn_text_color: string;
  btn_action: ActionProps;
};

export type HeroGameboxComponentProps = ComponentProps & {
  data: {
    away_team_name: string;
    away_team_logo: string;
    home_team_name: string;
    home_team_logo: string;
    show_game: string;
    date: string;
    time: string;
    at: string;
    period: string;
    time_remain: string;
    title: string;
    show_greetings: boolean;
    final: string;
    home_team_text_color: string;
    away_team_text_color: string;
    date_text_color: string;
    time_text_color: string;
    at_text_color: string;
    final_text_color: string;
    pregame: HeroGameBoxPreGameProps;
    ingame: HeroGameBoxInGameProps;
    postgame: HeroGameBoxPostGameProps;
    image: string;
    action: ActionProps;
    editor_meta_data?: {
      game_event_state: GameEventState;
    };
  };
  showHeader?: boolean;
};

export type HeroEventComponentProps = ComponentProps;

export type HeroCarouselProps =
  | HeroGameboxComponentProps
  | HeroEventComponentProps
  | SiloTextAndButtonComponentProps
  | CardTextComponentProps
  | CardTextOverlayAndButtonComponentProps;

export type HeroCarouselMetaDataProps = {
  selectedSlideIndex: number;
};

export type HeroCarouselComponentProps = ComponentProps & {
  data: {
    title: string;
    show_greetings: boolean;
    component_data: HeroCarouselProps[];
    editor_meta_data?: HeroCarouselMetaDataProps;
  };
};

export type MonthAndYear = {
  month: number;
  year: number;
};

export type GameCenterComponentProps = ComponentProps & {
  data: {
    default_tab: number;
    tab_mode: string;
  };
};

export type CalendarViewComponentProps = ComponentProps & {
  data: {
    tab_mode: string;
    start_month: string;
    start_year: string;
    end_month: string;
    end_year: string;
    selected_month: string;
    selected_year: string;
  };
};
export type ScheduleListComponentProps = ComponentProps & {
  data: {
    allow_infinite_scroll?: boolean;
    update_frequency_in_ms?: number;
    selected_month: string;
    selected_year: string;
    btn_buy_tickets_txt: string;
    btn_ingame_txt: string;
    btn_more_info_txt: string;
    btn_post_game_txt: string;
    is_show_ingame_btn_icon: boolean;
  };
};
