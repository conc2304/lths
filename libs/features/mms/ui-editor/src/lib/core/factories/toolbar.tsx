import { ComponentProps } from '../../context';
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
  ScoreBoardToolbar,
  KeyValueToolbar,
  NavListViewToolbar,
  VideoToolbar,
  VideoComponentProps,
  GenericToolbar,
  Component,
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
    case Component.VideoView:
      return <VideoToolbar {...(props as VideoComponentProps)} />;

    default:
      //return <UnsupportedToolbar {...props} />;
      return <GenericToolbar {...props} />;
  }
};
