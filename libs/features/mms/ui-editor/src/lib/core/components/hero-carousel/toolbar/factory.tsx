import { Component } from '../../enum';
import HeroEventEditor from '../../hero-event/toolbar/editor';
import GameBoxEditor, { GameboxEditorProps } from '../../hero-gamebox/toolbar/editor';
import CardTextEditor, { CardTextEditorProps } from '../../hero-promotion/card-text/toolbar/editor';
import CardTextOverlayAndButtonEditor, {
  CardTextOverlayAndButtonEditorProps,
} from '../../hero-promotion/card-text-overlay-and-button/toolbar/editor';
import SiloTextAndButtonEditor, {
  SiloTextAndButtonEditorProps,
} from '../../hero-promotion/silo-text-and-button/toolbar/editor';
import { ComponentProps, ItemPositionalProps } from '../../types';

type HeroCarouselComponentProps = ComponentProps & ItemPositionalProps;

const heroCarouselToolbarFactory = (props: HeroCarouselComponentProps) => {
  switch (props.component_id) {
    case Component.HeroGameBox:
      return <GameBoxEditor {...(props as GameboxEditorProps)} showHeader={false} />;
    case Component.HeroEvent:
      return <HeroEventEditor />;
    case Component.HeroPromotionSiloTextAndButton:
      return <SiloTextAndButtonEditor {...(props as SiloTextAndButtonEditorProps)} />;
    case Component.HeroPromotionCardText:
      return <CardTextEditor {...(props as CardTextEditorProps)} />;
    case Component.HeroPromotionCardTextOverlayAndButton:
      return <CardTextOverlayAndButtonEditor {...(props as CardTextOverlayAndButtonEditorProps)} />;
  }
};

export default heroCarouselToolbarFactory;
