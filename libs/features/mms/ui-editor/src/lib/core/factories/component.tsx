import { ComponentProps } from '../../context/types';
import {
  CardComponent,
  HeroComponent,
  HeaderComponent,
  UnsupportedComponent,
  ButtonComponent,
  CarouselNewsComponent,
  ScoreBoardComponent,
} from '../components';
import {
  ButtonComponentProps,
  CardComponentProps,
  CarouselNewsComponentProps,
  HeaderComponentProps,
  HeroComponentProps,
  ScoreBoardComponentProps,
} from '../components/types';

export const componentFactory = (props: ComponentProps) => {
  switch (props.component_id) {
    case 'cQuickLinkView':
      return <HeroComponent {...(props as HeroComponentProps)} />;
    case 'cCardView':
      return <CardComponent {...(props as CardComponentProps)} />;
    case 'cHeader':
      return <HeaderComponent {...(props as HeaderComponentProps)} />;
    case 'cButton':
      return <ButtonComponent {...(props as ButtonComponentProps)} />;
    case 'cNewsCarousel':
      return <CarouselNewsComponent {...(props as CarouselNewsComponentProps)} />;
    case 'cScoreBoard':
      return <ScoreBoardComponent {...(props as ScoreBoardComponentProps)} />;

    default:
      return <UnsupportedComponent {...props} />;
  }
};
