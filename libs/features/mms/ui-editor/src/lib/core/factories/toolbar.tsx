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
  ExternalDataToolbar,
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
} from '../components';

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
      return <HalfWidthCarouselFloatingTextToolbar {...(props as HalfWidthCarouselFloatingTextComponentProps)} />;
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
      return (
        <ExternalDataToolbar
          component_id={props.component_id}
          id={props.__ui_id__}
          title="Event"
          desc="Content and data from Ticketmaster"
        />
      );
    case Component.FullHeightEvent:
      return (
        <ExternalDataToolbar
          component_id={props.component_id}
          id={props.__ui_id__}
          title="Event"
          desc="Content and data from Ticketmaster."
        />
      );
    case Component.HalfWidthCarousel:
      return <HalfWidthCarouselToolbar {...(props as HalfWidthCarouselComponentProps)} />;
    case Component.HeroEvent:
      return (
        <ExternalDataToolbar
          component_id={props.component_id}
          id={props.__ui_id__}
          title="Event"
          desc="Content and data from NHL.com."
        />
      );
    case Component.HeroGameBox:
      return (
        <ExternalDataToolbar
          component_id={props.component_id}
          id={props.__ui_id__}
          title="Gamebox"
          desc="Content and data from NHL.com."
        />
      );
    case Component.HalfHeightMatchup:
      return (
        <ExternalDataToolbar
          component_id={props.component_id}
          id={props.__ui_id__}
          title="Matchup"
          desc="Content and data from NHL.com."
        />
      );
    case Component.FullHeightCarousel:
      return <FullHeightCarouselToolbar {...(props as FullHeightCarouselComponentProps)} />;
    case Component.TextButton:
      return <TextButtonToolbar {...(props as TextButtonProps)} />;
    case Component.SocialIconButton:
      return <SocialIconButtonToolbar {...(props as SocialIconButtoncomponentProps)} />;
    default:
      return <GenericToolbar {...props} />;
  }
};
