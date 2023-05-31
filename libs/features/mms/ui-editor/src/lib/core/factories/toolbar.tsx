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
  ScoreBoardToolbar,
  ScoreBoardComponentProps,
  KeyValueToolbar,
  KeyValueComponentProps,
  NavListViewToolbar,
  NavListViewComponentProps,
  ChipSetViewToolbar,
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
    default:
      //return <UnsupportedToolbar {...props} />;
      return <GenericToolbar {...props} />;
  }
};
