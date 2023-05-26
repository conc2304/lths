import {
  CardToolbar,
  HeroToolbar,
  CardComponentProps,
  HeroComponentProps,
  //UnsupportedToolbar,
  HeaderToolbar,
  HeaderComponentProps,
  ButtonToolbar,
  ButtonComponentProps,
  CarouselNewsToolbar,
  CarouselNewsComponentProps,
  ScoreBoardComponentProps,
  KeyValueComponentProps,
  NavListViewComponentProps,
  ChipSetViewComponentProps,
  ScoreBoardToolbar,
  KeyValueToolbar,
  NavListViewToolbar,
  ChipSetViewToolbar,
  VideoToolbar,
  VideoComponentProps,
  GenericToolbar,
  Component,
  NewsViewToolbar,
  NewsViewComponentProps,
  CarouselEventsToolbar,
  CarouselEventsComponentProps,
  CarouselVendorToolbar,
  CarouselVendorComponentProps,
  ComponentProps,
  SegmentControlComponentProps,
  SegmentControlToolbar,
  QuickLinksProps,
  QuickLinksToolbar,
  PhoneInquiryToolbar,
  PhoneInquiryComponentProps,
} from '../components';

export const toolbarFactory = (props: ComponentProps) => {
  switch (props.component_id) {
    case Component.QuickLinkView:
      return <HeroToolbar {...(props as HeroComponentProps)} />;
    case Component.CardView:
      return <CardToolbar {...(props as CardComponentProps)} />;
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
    case Component.VideoView:
      return <VideoToolbar {...(props as VideoComponentProps)} />;
    case Component.NewsView:
      return <NewsViewToolbar {...(props as NewsViewComponentProps)} />;
    case Component.EventsCarousel:
      return <CarouselEventsToolbar {...(props as CarouselEventsComponentProps)} />;
    case Component.VendorVCarousel:
      return <CarouselVendorToolbar {...(props as CarouselVendorComponentProps)} />;
    case Component.SegmentControl:
      return <SegmentControlToolbar {...(props as SegmentControlComponentProps)} />;
    case Component.QuickLinks:
      return <QuickLinksToolbar {...(props as QuickLinksProps)} />;
    case Component.PhoneInquiry:
      return <PhoneInquiryToolbar {...(props as PhoneInquiryComponentProps)} />;
    default:
      //return <UnsupportedToolbar {...props} />;
      return <GenericToolbar {...props} />;
  }
};
