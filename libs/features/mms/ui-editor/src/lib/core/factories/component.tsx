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
  SocialIconButtonComponent,
  SpacerComponent,
  TextwithIcon,
  DividerComponent,
  FullHeightImageComponent,
  HalfWidthTextComponent,
  CenterHeadlineText,
  CenterBodyTextBlock,
  ImageHeaderComponent,
  SegmentGroupComponent,
  CardViewCarouselComponent,
  FullHeightEventComponent,
  HalfHeightMatchupComponent,
  FullHeightEventFloatingTextComponent,
  TitleTextComponent,
  HeroGameboxComponent,
  HorizontalSmallComponent,
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
  SocialIconButtoncomponentProps,
  SpacerProps,
  TextWithIconProps,
  DividerProps,
  FullHeightImageComponentProps,
  HalfWidthTextComponentProps,
  CenterHeadlineTextProps,
  CenterBodyTextBlockProps,
  ImageHeaderComponentProps,
  SegmentGroupProps,
  CardViewCarouselComponentProps,
  FullHeightEventComponentProps,
  HalfHeightMatchUpComponentProps,
  FullHeightEventFloatingTextComponentProps,
  TitleTextComponentProps,
  HeroGameboxComponentProps,
  HorizontalSmallComponentProps,
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
      return <FullHeightEventFloatingTextComponent {...(props as FullHeightEventFloatingTextComponentProps)} />;
    case Component.FullHeightEvent:
      return <FullHeightEventComponent {...(props as FullHeightEventComponentProps)} />;
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
      return <HeroGameboxComponent {...(props as HeroGameboxComponentProps)} />;
    case Component.HalfHeightMatchup:
      return <HalfHeightMatchupComponent {...(props as HalfHeightMatchUpComponentProps)} />;
    case Component.FullHeightCarousel:
      return <FullHeightCarouselComponent {...(props as FullHeightCarouselComponentProps)} />;
    case Component.TextButton:
      return <TextButtonComponent {...(props as TextButtonProps)} />;
    case Component.SocialIconButton:
      return <SocialIconButtonComponent {...(props as SocialIconButtoncomponentProps)} />;
    case Component.Spacer:
      return <SpacerComponent {...(props as SpacerProps)} />;
    case Component.TextWithIcon:
      return <TextwithIcon {...(props as TextWithIconProps)} />;
    case Component.Divider:
      return <DividerComponent {...(props as DividerProps)} />;
    case Component.FullHeightImage:
      return <FullHeightImageComponent {...(props as FullHeightImageComponentProps)} />;
    case Component.HalfWidthText:
      return <HalfWidthTextComponent {...(props as HalfWidthTextComponentProps)} />;
    case Component.CenterHeadlineTextBlock:
      return <CenterHeadlineText {...(props as CenterHeadlineTextProps)} />;
    case Component.CenterBodyTextBlock:
      return <CenterBodyTextBlock {...(props as CenterBodyTextBlockProps)} />;
    case Component.ImageHeader:
      return <ImageHeaderComponent {...(props as ImageHeaderComponentProps)} />;
    case Component.SegmentGroup:
      return <SegmentGroupComponent {...(props as SegmentGroupProps)} />;
    case Component.CardViewCarousel:
      return <CardViewCarouselComponent {...(props as CardViewCarouselComponentProps)} />;
    case Component.TitleTextBlock:
      return <TitleTextComponent {...(props as TitleTextComponentProps)} />;
    case Component.HorizontalSmall:
      return <HorizontalSmallComponent {...(props as HorizontalSmallComponentProps)} />;
    default:
      return <UnsupportedComponent {...props} />;
  }
};
