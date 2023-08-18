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
  HeadLineTextBlockToolbar,
  HeadlineTextBlockComponentProps,
  BodyTextToolbar,
  BodyTextComponentProps,
  FullHeightCarouselToolbar,
  FullHeightCarouselComponentProps,
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
    case Component.HeadlineTextBlock:
      return <HeadLineTextBlockToolbar {...(props as HeadlineTextBlockComponentProps)} />;
    case Component.BodyTextBlock:
      return <BodyTextToolbar {...(props as BodyTextComponentProps)} />;
    case Component.FullHeightCarousel:
      return <FullHeightCarouselToolbar {...(props as FullHeightCarouselComponentProps)} />;
    default:
      return <GenericToolbar {...props} />;
  }
};
