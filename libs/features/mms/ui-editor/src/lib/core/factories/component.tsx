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
  ExpandCollapseViewComponent,
  ButtonHCarouselComponent,
  EventInfoComponent,
  ButtonsViewComponent,
  VideoViewComponent,
  NewsComponent,
  CarouselEventsComponent,
  CarouselVendorComponent,
  CardImageComponent,
  ImageComponent,
  SegmentControlComponent,
  QuickLinksComponent,
  PhoneInquiryComponent,
  TitleDescComponent,
  MapPathComponent,
  NavCellViewComponent,
  DescriptionComponent,
  CardTextComponent,
  CardTextOverlayAndButtonComponent,
  SiloTextAndButtonComponent,
  PromotionOneIsToOneAspectRatioComponent,
  FanGuideThreeIsToFourAspectRatioComponent,
  QuicklinkButtonGroupComponent,
  HalfWidthCarouselFloatingTextComponent,
  ExternalDataComponent,
  FullHeightFloatingTextComponent,
  HalfHeightWithIconComponent,
  HeadlineTextBlockComponent,
  BodyTextComponent,
  HalfWidthCarouselComponent,
  FullHeightCarouselComponent,
  FullWidthButtonComponent,
  TextButtonComponent,
  SpacerComponent,
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
  ExpandCollapseViewComponentProps,
  ButtonHCarouselComponentProps,
  EventInfoComponentProps,
  ButtonsViewComponentProps,
  VideoViewComponentProps,
  NewsViewComponentProps,
  CarouselEventsComponentProps,
  CarouselVendorComponentProps,
  ImageComponentProps,
  SegmentControlComponentProps,
  QuickLinksProps,
  PhoneInquiryComponentProps,
  TitleDescComponentProps,
  MapPathComponentProps,
  NavCellViewComponentProps,
  DescriptionComponentProps,
  CardImageComponentProps,
  CardTextOverlayAndButtonComponentProps,
  CardTextComponentProps,
  SiloTextAndButtonComponentProps,
  PromotionOneIsToOneAspectRatioComponentProps,
  FanGuideThreeIsToFourAspectRatioComponentProps,
  QuicklinkButtonGroupComponentProps,
  HalfWidthCarouselFloatingTextComponentProps,
  FullHeightFloatingTextProps,
  HalfHeightWithIconProps,
  HeadlineTextBlockComponentProps,
  BodyTextComponentProps,
  HalfWidthCarouselComponentProps,
  FullHeightCarouselComponentProps,
  FullWidthButtonComponentProps,
  TextButtonProps,
  SpacerProps,
} from '../components/types';

export const componentFactory = (props: ComponentProps) => {
  switch (props.component_id) {
    case Component.QuickLinkView:
      return <HeroComponent {...(props as HeroComponentProps)} />;
    case Component.CardView:
      return <CardComponent {...(props as CardComponentProps)} />;
    case Component.CardImage:
      return <CardImageComponent {...(props as CardImageComponentProps)} />;
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
    case Component.ExpandCollapseView:
      return <ExpandCollapseViewComponent {...(props as ExpandCollapseViewComponentProps)} />;
    case Component.ButtonHCarousel:
      return <ButtonHCarouselComponent {...(props as ButtonHCarouselComponentProps)} />;
    case Component.EventInfo:
      return <EventInfoComponent {...(props as EventInfoComponentProps)} />;
    case Component.ButtonsView:
      return <ButtonsViewComponent {...(props as ButtonsViewComponentProps)} />;
    case Component.VideoView:
      return <VideoViewComponent {...(props as VideoViewComponentProps)} />;
    case Component.NewsView:
      return <NewsComponent {...(props as NewsViewComponentProps)} />;
    case Component.EventsCarousel:
      return <CarouselEventsComponent {...(props as CarouselEventsComponentProps)} />;
    case Component.VendorVCarousel:
      return <CarouselVendorComponent {...(props as CarouselVendorComponentProps)} />;
    case Component.Image:
      return <ImageComponent {...(props as ImageComponentProps)} />;
    case Component.SegmentControl:
      return <SegmentControlComponent {...(props as SegmentControlComponentProps)} />;
    case Component.QuickLinks:
      return <QuickLinksComponent {...(props as QuickLinksProps)} />;
    case Component.PhoneInquiry:
      return <PhoneInquiryComponent {...(props as PhoneInquiryComponentProps)} />;
    case Component.MapPath:
      return <MapPathComponent {...(props as MapPathComponentProps)} />;
    case Component.TitleDesc:
      return <TitleDescComponent {...(props as TitleDescComponentProps)} />;
    case Component.NavCellView:
      return <NavCellViewComponent {...(props as NavCellViewComponentProps)} />;
    case Component.Desc:
      return <DescriptionComponent {...(props as DescriptionComponentProps)} />;
    case Component.HeroPromotionCardText:
      return <CardTextComponent {...(props as CardTextComponentProps)} />;
    case Component.HeroPromotionCardTextOverlayAndButton:
      return <CardTextOverlayAndButtonComponent {...(props as CardTextOverlayAndButtonComponentProps)} />;
    case Component.HeroPromotionSiloTextAndButton:
      return <SiloTextAndButtonComponent {...(props as SiloTextAndButtonComponentProps)} />;
    case Component.PromotionOneIsToOneAspectRatio:
      return <PromotionOneIsToOneAspectRatioComponent {...(props as PromotionOneIsToOneAspectRatioComponentProps)} />;
    case Component.FanGuideThreeIsToFourAspectRatio:
      return (
        <FanGuideThreeIsToFourAspectRatioComponent {...(props as FanGuideThreeIsToFourAspectRatioComponentProps)} />
      );
    case Component.QuicklinkButtonGroup:
      return <QuicklinkButtonGroupComponent {...(props as QuicklinkButtonGroupComponentProps)} />;
    case Component.HalfWidthCarouselFloatingText:
      return <HalfWidthCarouselFloatingTextComponent {...(props as HalfWidthCarouselFloatingTextComponentProps)} />;
    case Component.FullWidthButton:
      return <FullWidthButtonComponent {...(props as FullWidthButtonComponentProps)} />;
    case Component.FullHeightFloatingText:
      return <FullHeightFloatingTextComponent {...(props as FullHeightFloatingTextProps)} />;
    case Component.HalfHeightWithIcon:
      return <HalfHeightWithIconComponent {...(props as HalfHeightWithIconProps)} />;
    case Component.HeadlineTextBlock:
      return <HeadlineTextBlockComponent {...(props as HeadlineTextBlockComponentProps)} />;
    case Component.BodyTextBlock:
      return <BodyTextComponent {...(props as BodyTextComponentProps)} />;
    case Component.FullHeightEventFloatingText:
      return (
        <ExternalDataComponent
          img_alt="FullHeightEventFloatingText"
          id={props.__ui_id__}
          image={
            'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/cFullHeightEventFloatingText.png'
          }
        />
      );
    case Component.FullHeightEvent:
      return (
        <ExternalDataComponent
          img_alt="FullHeightEvent"
          id={props.__ui_id__}
          image={
            'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/cFullHeightEvent.svg'
          }
        />
      );
    case Component.HalfWidthCarousel:
      return <HalfWidthCarouselComponent {...(props as HalfWidthCarouselComponentProps)} />;
    case Component.HeroEvent:
      return (
        <ExternalDataComponent
          img_alt="Hero Event"
          id={props.__ui_id__}
          image={'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/cHeroEvent.svg'}
        />
      );
    case Component.HeroGameBox:
      return (
        <ExternalDataComponent
          img_alt="Hero GameBox"
          id={props.__ui_id__}
          image={'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/cHeroGameBox.svg'}
        />
      );
    case Component.HalfHeightMatchup:
      return (
        <ExternalDataComponent
          img_alt="HalfHeightMatchup"
          id={props.__ui_id__}
          image={
            'https://devblobstorageacc.blob.core.windows.net/files-lths-dev/files-lths-mok-dev/cHalfHeightMatchup.svg'
          }
        />
      );
    case Component.FullHeightCarousel:
      return <FullHeightCarouselComponent {...(props as FullHeightCarouselComponentProps)} />;
    case Component.TextButton:
      return <TextButtonComponent {...(props as TextButtonProps)} />;
    case Component.Spacer:
      return <SpacerComponent {...(props as SpacerProps)} />;
    default:
      return <UnsupportedComponent {...props} />;
  }
};
