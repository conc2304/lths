import { ComponentProps } from '../../context';
import {
  CardToolbar,
  HeroToolbar,
  CardComponentProps,
  HeroComponentProps,
  UnsupportedToolbar,
  HeaderToolbar,
  HeaderComponentProps,
  ButtonToolbar,
  ButtonComponentProps,
  CarouselNewsToolbar,
  CarouselNewsComponentProps,
  ScoreBoardComponentProps,
  ScoreBoardToolbar,
} from '../components';

export const toolbarFactory = (props: ComponentProps) => {
  switch (props.component_id) {
    case 'cQuickLinkView':
      return <HeroToolbar {...(props as HeroComponentProps)} />;
    case 'cCardView':
      return <CardToolbar {...(props as CardComponentProps)} />;
    case 'cHeader':
      return <HeaderToolbar {...(props as HeaderComponentProps)} />;
    case 'cButton':
      return <ButtonToolbar {...(props as ButtonComponentProps)} />;
    case 'cNewsCarousel':
      return <CarouselNewsToolbar {...(props as CarouselNewsComponentProps)} />;
    case 'cScoreBoard':
      return <ScoreBoardToolbar {...(props as ScoreBoardComponentProps)} />;
    default:
      return <UnsupportedToolbar {...props} />;
  }
};
