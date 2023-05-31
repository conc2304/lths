import { ComponentProps } from '../../context/types';
import {
  CardComponent,
  HeroComponent,
  HeaderComponent,
  UnsupportedComponent,
  ButtonComponent,
  CarouselNewsComponent,
  ScoreBoardComponent,
  KeyValueComponent,
  NavListViewComponent,
  ChipSetViewComponent,
  EventInfoComponent,
  ButtonsViewComponent,
  VideoComponent,
  NewsComponent,
  CarouselEventsComponent,
  CarouselVendorComponent,
} from '../components';
import {
  ButtonComponentProps,
  CardComponentProps,
  CarouselNewsComponentProps,
  Component,
  HeaderComponentProps,
  HeroComponentProps,
  ScoreBoardComponentProps,
  KeyValueComponentProps,
  NavListViewComponentProps,
  ChipSetViewComponentProps,
  EventInfoComponentProps,
  ButtonsViewComponentProps,
  VideoComponentProps,
  NewsViewComponentProps,
  CarouselEventsComponentProps,
  CarouselVendorComponentProps,
} from '../components/types';

export const componentFactory = (props: ComponentProps) => {
  switch (props.component_id) {
    case Component.QuickLinkView:
      return <HeroComponent {...(props as HeroComponentProps)} />;
    case Component.CardView:
      return <CardComponent {...(props as CardComponentProps)} />;
    case Component.Header:
      return <HeaderComponent {...(props as HeaderComponentProps)} />;
    case Component.Button:
      return <ButtonComponent {...(props as ButtonComponentProps)} />;
    case Component.NewsCarousel:
      return <CarouselNewsComponent {...(props as CarouselNewsComponentProps)} />;
    case Component.ScoreBoard:
      return <ScoreBoardComponent {...(props as ScoreBoardComponentProps)} />;
    case Component.KeyValue:
      return <KeyValueComponent {...(props as KeyValueComponentProps)} />;
    case Component.NavListView:
      return <NavListViewComponent {...(props as NavListViewComponentProps)} />;
    case Component.ChipSetView:
      return <ChipSetViewComponent {...(props as ChipSetViewComponentProps)} />;
    case Component.EventInfo:
      return <EventInfoComponent {...(props as EventInfoComponentProps)} />;
    case Component.ButtonsView:
      return <ButtonsViewComponent {...(props as ButtonsViewComponentProps)} />;
    case Component.VideoView:
      return <VideoComponent {...(props as VideoComponentProps)} />;
    case Component.NewsView:
      return <NewsComponent {...(props as NewsViewComponentProps)} />;
    case Component.EventsCarousel:
      return <CarouselEventsComponent {...(props as CarouselEventsComponentProps)} />;
    case Component.VendorVCarousel:
      return <CarouselVendorComponent {...(props as CarouselVendorComponentProps)} />;
    default:
      return <UnsupportedComponent {...props} />;
  }
};
