import {
  HeroGameboxComponent,
  HeroEventComponent,
  SiloTextAndButtonComponent,
  CardTextComponent,
  CardTextOverlayAndButtonComponent,
} from '../../../components';
import {
  HeroGameboxComponentProps,
  HeroEventComponentProps,
  CardTextComponentProps,
  CardTextOverlayAndButtonComponentProps,
  ComponentProps,
  ItemPositionalProps,
  SiloTextAndButtonComponentProps,
} from '../../../components/types';
import { Component } from '../../enum';

type HeroCarouselComponentProps = ComponentProps & ItemPositionalProps;

const heroCarouselComponentFactory = (props: HeroCarouselComponentProps) => {
  switch (props.component_id) {
    case Component.HeroGameBox:
      return <HeroGameboxComponent {...(props as HeroGameboxComponentProps)} showHeader={false} />;
    case Component.HeroEvent:
      return <HeroEventComponent {...(props as HeroEventComponentProps)} />;
    case Component.HeroPromotionSiloTextAndButton:
      return <SiloTextAndButtonComponent {...(props as SiloTextAndButtonComponentProps)} />;
    case Component.HeroPromotionCardText:
      return <CardTextComponent {...(props as CardTextComponentProps)} />;
    case Component.HeroPromotionCardTextOverlayAndButton:
      return <CardTextOverlayAndButtonComponent {...(props as CardTextOverlayAndButtonComponentProps)} />;
  }
};

export default heroCarouselComponentFactory;
