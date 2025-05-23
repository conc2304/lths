import {
  CardToolbar,
  HeroToolbar,
  CardComponentProps,
  CardImageComponentProps,
  HeroComponentProps,
  HeaderToolbar,
  HeaderComponentProps,
  ButtonToolbar,
  ButtonComponentProps,
  CarouselNewsToolbar,
  CarouselNewsComponentProps,
  ExpandCollapseViewComponentProps,
  ButtonHCarouselComponentProps,
  ScoreBoardToolbar,
  ScoreBoardComponentProps,
  KeyValueToolbar,
  KeyValueComponentProps,
  NavListViewToolbar,
  NavListViewComponentProps,
  ChipSetViewToolbar,
  ExpandCollapseViewToolbar,
  ButtonHCarouselToolbar,
  ChipSetViewComponentProps,
  EventInfoToolbar,
  EventInfoComponentProps,
  ButtonsViewToolbar,
  ButtonsViewComponentProps,
  VideoViewToolbar,
  VideoViewComponentProps,
  GenericToolbar,
  Component,
  NewsViewToolbar,
  NewsViewComponentProps,
  CarouselEventsToolbar,
  CarouselEventsComponentProps,
  CarouselVendorToolbar,
  CarouselVendorComponentProps,
  ComponentProps,
  CardImageToolbar,
  ImageToolbar,
  ImageComponentProps,
  SegmentControlComponentProps,
  SegmentControlToolbar,
  QuickLinksProps,
  QuickLinksToolbar,
  PhoneInquiryToolbar,
  PhoneInquiryComponentProps,
  TitleDescToolbar,
  TitleDescComponentProps,
  MapPathComponentProps,
  MapPathToolbar,
  NavCellViewToolbar,
  NavCellViewComponentProps,
  DescriptionToolbar,
  DescriptionComponentProps,
  CardTextToolbar,
  CardTextComponentProps,
  CardTextOverlayAndButtonToolbar,
  CardTextOverlayAndButtonComponentProps,
  SiloTextAndButtonToolbar,
  SiloTextAndButtonComponentProps,
  PromotionOneIsToOneAspectRatioToolbar,
  PromotionOneIsToOneAspectRatioComponentProps,
  FanGuideThreeIsToFourAspectRatioToolbar,
  FanGuideThreeIsToFourAspectRatioComponentProps,
  QuicklinkButtonGroupToolbar,
  QuicklinkButtonGroupComponentProps,
  HalfWidthCarouselFloatingTextToolbar,
  HalfWidthCarouselFloatingTextComponentProps,
  FullHeightFloatingTextToolbar,
  FullHeightFloatingTextProps,
  HalfHeightWithIconToolbar,
  HalfHeightWithIconProps,
  HeadLineTextBlockToolbar,
  HeadlineTextBlockComponentProps,
  BodyTextToolbar,
  BodyTextComponentProps,
  HalfWidthCarouselToolbar,
  HalfWidthCarouselComponentProps,
  FullHeightCarouselToolbar,
  FullHeightCarouselComponentProps,
  FullWidthButtonComponentProps,
  FullWidthButtonToolbar,
  TextButtonToolbar,
  TextButtonProps,
  SocialIconButtoncomponentProps,
  SocialIconButtonToolbar,
  SpacerToolbar,
  SpacerProps,
  TextWithIconProps,
  TextwithIconToolbar,
  DividerToolbar,
  DividerProps,
  FullHeightImageToolbar,
  FullHeightImageComponentProps,
  HalfWidthTextToolbar,
  HalfWidthTextComponentProps,
  CenterHeadlineTextToolbar,
  CenterHeadlineTextProps,
  CenterBodyTextBlockToolbar,
  CenterBodyTextBlockProps,
  ImageHeaderToolbar,
  ImageHeaderComponentProps,
  SegmentGroupProps,
  SegmentGroupToolbar,
  CardViewCarouselToolbar,
  CardViewCarouselComponentProps,
  FullHeightEventComponentProps,
  HalfHeightMatchUpComponentProps,
  FullHeightEventToolbar,
  HalfHeightMatchUpToolbar,
  FullHeightEventFloatingTextToolbar,
  FullHeightEventFloatingTextComponentProps,
  TitleTextToolbar,
  TitleTextComponentProps,
  HeroGameboxToolbar,
  HeroGameboxComponentProps,
  HeroEventToolbar,
  HeroEventComponentProps,
  HorizontalMediumToolbar,
  HorizontalMediumProps,
  HorizontalSmallToolbar,
  HorizontalSmallComponentProps,
  HeroCarouselComponentProps,
  CalendarViewToolbar,
  CalendarViewComponentProps,
  ScheduleListToolbar,
  ScheduleListComponentProps,
  GameCenterComponentProps,
  GameCenterToolbar,
} from '../components';
import HeroCarouselToolbar from '../components/hero-carousel/toolbar';

export const toolbarFactory = (props: ComponentProps) => {
  switch (props.component_id) {
    case Component.QuickLinkView:
      return <HeroToolbar {...(props as HeroComponentProps)} />;
    case Component.CardView:
      return <CardToolbar {...(props as CardComponentProps)} />;
    case Component.CardImage:
      return <CardImageToolbar {...(props as CardImageComponentProps)} />;
    case Component.Header:
      return <HeaderToolbar {...(props as HeaderComponentProps)} />;
    case Component.Button:
      return <ButtonToolbar {...(props as ButtonComponentProps)} />;
    case Component.NewsCarousel:
      return <CarouselNewsToolbar {...(props as CarouselNewsComponentProps)} />;
    case Component.ScoreBoard:
      return <ScoreBoardToolbar {...(props as ScoreBoardComponentProps)} />;
    case Component.KeyValue:
      return <KeyValueToolbar {...(props as KeyValueComponentProps)} />;
    case Component.NavListView:
      return <NavListViewToolbar {...(props as NavListViewComponentProps)} />;
    case Component.ChipSetView:
      return <ChipSetViewToolbar {...(props as ChipSetViewComponentProps)} />;
    case Component.ExpandCollapseView:
      return <ExpandCollapseViewToolbar {...(props as ExpandCollapseViewComponentProps)} />;
    case Component.ButtonHCarousel:
      return <ButtonHCarouselToolbar {...(props as ButtonHCarouselComponentProps)} />;
    case Component.EventInfo:
      return <EventInfoToolbar {...(props as EventInfoComponentProps)} />;
    case Component.ButtonsView:
      return <ButtonsViewToolbar {...(props as ButtonsViewComponentProps)} />;
    case Component.VideoView:
      return <VideoViewToolbar {...(props as VideoViewComponentProps)} />;
    case Component.NewsView:
      return <NewsViewToolbar {...(props as NewsViewComponentProps)} />;
    case Component.EventsCarousel:
      return <CarouselEventsToolbar {...(props as CarouselEventsComponentProps)} />;
    case Component.VendorVCarousel:
      return <CarouselVendorToolbar {...(props as CarouselVendorComponentProps)} />;
    case Component.Image:
      return <ImageToolbar {...(props as ImageComponentProps)} />;
    case Component.SegmentControl:
      return <SegmentControlToolbar {...(props as SegmentControlComponentProps)} />;
    case Component.QuickLinks:
      return <QuickLinksToolbar {...(props as QuickLinksProps)} />;
    case Component.PhoneInquiry:
      return <PhoneInquiryToolbar {...(props as PhoneInquiryComponentProps)} />;
    case Component.MapPath:
      return <MapPathToolbar {...(props as MapPathComponentProps)} />;
    case Component.TitleDesc:
      return <TitleDescToolbar {...(props as TitleDescComponentProps)} />;
    case Component.NavCellView:
      return <NavCellViewToolbar {...(props as NavCellViewComponentProps)} />;
    case Component.Desc:
      return <DescriptionToolbar {...(props as DescriptionComponentProps)} />;
    case Component.HeroPromotionCardText:
      return <CardTextToolbar {...(props as CardTextComponentProps)} />;
    case Component.HeroPromotionCardTextOverlayAndButton:
      return <CardTextOverlayAndButtonToolbar {...(props as CardTextOverlayAndButtonComponentProps)} />;
    case Component.HeroPromotionSiloTextAndButton:
      return <SiloTextAndButtonToolbar {...(props as SiloTextAndButtonComponentProps)} />;
    case Component.PromotionOneIsToOneAspectRatio:
      return <PromotionOneIsToOneAspectRatioToolbar {...(props as PromotionOneIsToOneAspectRatioComponentProps)} />;
    case Component.FanGuideThreeIsToFourAspectRatio:
      return <FanGuideThreeIsToFourAspectRatioToolbar {...(props as FanGuideThreeIsToFourAspectRatioComponentProps)} />;
    case Component.QuicklinkButtonGroup:
      return <QuicklinkButtonGroupToolbar {...(props as QuicklinkButtonGroupComponentProps)} />;
    case Component.HalfWidthCarouselFloatingText:
      return (
        <HalfWidthCarouselFloatingTextToolbar
          key={props.__ui_id__}
          {...(props as HalfWidthCarouselFloatingTextComponentProps)}
        />
      );
    case Component.FullWidthButton:
      return <FullWidthButtonToolbar {...(props as FullWidthButtonComponentProps)} />;
    case Component.FullHeightFloatingText:
      return <FullHeightFloatingTextToolbar {...(props as FullHeightFloatingTextProps)} />;
    case Component.HalfHeightWithIcon:
      return <HalfHeightWithIconToolbar {...(props as HalfHeightWithIconProps)} />;
    case Component.HeadlineTextBlock:
      return <HeadLineTextBlockToolbar {...(props as HeadlineTextBlockComponentProps)} />;
    case Component.BodyTextBlock:
      return <BodyTextToolbar {...(props as BodyTextComponentProps)} />;
    case Component.FullHeightEventFloatingText:
      return <FullHeightEventFloatingTextToolbar {...(props as FullHeightEventFloatingTextComponentProps)} />;
    case Component.FullHeightEvent:
      return <FullHeightEventToolbar {...(props as FullHeightEventComponentProps)} />;
    case Component.HalfWidthCarousel:
      return <HalfWidthCarouselToolbar key={props.__ui_id__} {...(props as HalfWidthCarouselComponentProps)} />;
    case Component.HeroEvent:
      return <HeroEventToolbar {...(props as HeroEventComponentProps)} />;
    case Component.HeroGameBox:
      return <HeroGameboxToolbar {...(props as HeroGameboxComponentProps)} />;
    case Component.HalfHeightMatchup:
      return <HalfHeightMatchUpToolbar {...(props as HalfHeightMatchUpComponentProps)} />;
    case Component.FullHeightCarousel:
      return <FullHeightCarouselToolbar key={props.__ui_id__} {...(props as FullHeightCarouselComponentProps)} />;
    case Component.TextButton:
      return <TextButtonToolbar {...(props as TextButtonProps)} />;
    case Component.SocialIconButton:
      return <SocialIconButtonToolbar {...(props as SocialIconButtoncomponentProps)} />;
    case Component.Spacer:
      return <SpacerToolbar {...(props as SpacerProps)} />;
    case Component.TextWithIcon:
      return <TextwithIconToolbar {...(props as TextWithIconProps)} />;
    case Component.Divider:
      return <DividerToolbar {...(props as DividerProps)} />;
    case Component.FullHeightImage:
      return <FullHeightImageToolbar {...(props as FullHeightImageComponentProps)} />;
    case Component.HalfWidthText:
      return <HalfWidthTextToolbar {...(props as HalfWidthTextComponentProps)} />;
    case Component.CenterHeadlineTextBlock:
      return <CenterHeadlineTextToolbar {...(props as CenterHeadlineTextProps)} />;
    case Component.CenterBodyTextBlock:
      return <CenterBodyTextBlockToolbar {...(props as CenterBodyTextBlockProps)} />;
    case Component.ImageHeader:
      return <ImageHeaderToolbar {...(props as ImageHeaderComponentProps)} />;
    case Component.SegmentGroup:
      return <SegmentGroupToolbar {...(props as SegmentGroupProps)} />;
    case Component.CardViewCarousel:
      return <CardViewCarouselToolbar key={props.__ui_id__} {...(props as CardViewCarouselComponentProps)} />;
    case Component.TitleTextBlock:
      return <TitleTextToolbar {...(props as TitleTextComponentProps)} />;
    case Component.HorizontalMedium:
      return <HorizontalMediumToolbar {...(props as HorizontalMediumProps)} />;
    case Component.HorizontalSmall:
      return <HorizontalSmallToolbar {...(props as HorizontalSmallComponentProps)} />;
    case Component.HeroCarousel:
      return <HeroCarouselToolbar {...(props as HeroCarouselComponentProps)} />;
    case Component.CalendarView:
      return <CalendarViewToolbar {...(props as CalendarViewComponentProps)} />;
    case Component.ScheduleList:
      return <ScheduleListToolbar {...(props as ScheduleListComponentProps)} />;
    case Component.GameCenter:
      return <GameCenterToolbar {...(props as GameCenterComponentProps)} />;
    default:
      return <GenericToolbar {...props} />;
  }
};
