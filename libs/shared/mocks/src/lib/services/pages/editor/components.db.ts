import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';
type Component = {
  component_id: string;
  component_name: string;
  image_url: string;
};
//type ComponentType = 'cQuickLinkView' | 'cCardView' | 'cHeader' | 'cEventVCarousel' | 'cButton' | 'cNewsCarousel' | 'cPromotion' | 'cScoreBoard' | 'cVideoCarousel' | 'cEventHCarousel' | 'cVideoView' | 'cNavCellView' | 'cTitleDesc' | 'cExpandCollapseView' | 'cFilterView' | 'cVendorVCarousel' | 'cImage' | 'cNavListView' | 'cQuickLinks' | 'cPhoneInquiry' | 'cMapPath' | 'cLinkButton' | 'cHyperLinkText' | 'cButtonsView' | 'cButtonHCarousel' | 'cScoreBoardRecap' | 'cNewsView' | 'cTableHeader' | 'cTableDetails' | 'cSimpleScoreView' | 'cGameStats' | 'cLiveRadio' | 'cNewsList' | 'cAuthorView' | 'cTeamMembers' | 'cTeamPlayerInfo' | 'cKeyValue' | 'cVideoVCarousel' | 'cDesc' | 'cCardImage' | 'cWorkingHours' | 'cMonthSegment' | 'cEventInfo' | 'cChipSetView' | 'cEventsCarousel' | 'cSegmentControl';
const db = factory({
  components: {
    id: primaryKey(nanoid),
    component_id: String,
    component_name: String,
    image_url: String,
  },
});
const components: Component[] = [
  {
    component_id: 'cQuickLinkView',
    component_name: 'Quick Link View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cQuickLinkView.png',
  },
  {
    component_id: 'cCardView',
    component_name: 'Card View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cCardView.png',
  },
  {
    component_id: 'cHeader',
    component_name: 'Header',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cHeader.png',
  },
  {
    component_id: 'cEventVCarousel',
    component_name: 'Event Vertical Carousel',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cEventVCarousel.png',
  },
  {
    component_id: 'cButton',
    component_name: 'Button',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cButton.png',
  },
  {
    component_id: 'cNewsCarousel',
    component_name: 'News Carousel',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cNewsCarousel.png',
  },
  {
    component_id: 'cPromotion',
    component_name: 'Promotion',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cPromotion.png',
  },
  {
    component_id: 'cScoreBoard',
    component_name: 'Score Board',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cScoreBoard.png',
  },
  {
    component_id: 'cVideoCarousel',
    component_name: 'Video Carousel',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cVideoCarousel.png',
  },
  {
    component_id: 'cEventHCarousel',
    component_name: 'Event Horizontal Carousel',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cEventHCarousel.png',
  },
  {
    component_id: 'cVideoView',
    component_name: 'Video View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cVideoView.png',
  },
  {
    component_id: 'cNavCellView',
    component_name: 'Nav Cell View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cNavCellView.png',
  },
  {
    component_id: 'cTitleDesc',
    component_name: 'Title Description',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cTitleDesc.png',
  },
  {
    component_id: 'cExpandCollapseView',
    component_name: 'Expand Collapse View',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cExpandCollapseView.png',
  },
  {
    component_id: 'cFilterView',
    component_name: 'Filter View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cFilterView.png',
  },
  {
    component_id: 'cVendorVCarousel',
    component_name: 'Vendor Vertical Carousel',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cVendorVCarousel.png',
  },
  {
    component_id: 'cImage',
    component_name: 'Image',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cImage.png',
  },
  {
    component_id: 'cNavListView',
    component_name: 'Nav List View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cNavListView.png',
  },
  {
    component_id: 'cQuickLinks',
    component_name: 'Quick Links',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cQuickLinks.png',
  },
  {
    component_id: 'cPhoneInquiry',
    component_name: 'Phone Inquiry',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cPhoneInquiry.png',
  },
  {
    component_id: 'cMapPath',
    component_name: 'Map Path',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cMapPath.png',
  },
  {
    component_id: 'cLinkButton',
    component_name: 'Link Button',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cLinkButton.png',
  },
  {
    component_id: 'cHyperLinkText',
    component_name: 'Hyper Link Text',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cHyperLinkText.png',
  },
  {
    component_id: 'cButtonsView',
    component_name: 'Buttons View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cButtonsView.png',
  },
  {
    component_id: 'cButtonHCarousel',
    component_name: 'Button Horizontal Carousel',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cButtonHCarousel.png',
  },
  {
    component_id: 'cScoreBoardRecap',
    component_name: 'Scoreboard Recap',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cScoreBoardRecap.png',
  },
  {
    component_id: 'cNewsView',
    component_name: 'News View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cNewsView.png',
  },
  {
    component_id: 'cTableHeader',
    component_name: 'Table Header',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cTableHeader.png',
  },
  {
    component_id: 'cTableDetails',
    component_name: 'Table Details',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cTableDetails.png',
  },
  {
    component_id: 'cSimpleScoreView',
    component_name: 'Simple Score View',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cSimpleScoreView.png',
  },
  {
    component_id: 'cGameStats',
    component_name: 'Game Stats',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cGameStats.png',
  },
  {
    component_id: 'cLiveRadio',
    component_name: 'Live Radio',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cLiveRadio.png',
  },
  {
    component_id: 'cNewsList',
    component_name: 'News List',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cNewsList.png',
  },
  {
    component_id: 'cAuthorView',
    component_name: 'Author View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cAuthorView.png',
  },
  {
    component_id: 'cTeamMembers',
    component_name: 'Team Members',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cTeamMembers.png',
  },
  {
    component_id: 'cTeamPlayerInfo',
    component_name: 'Team Player Info',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cTeamPlayerInfo.png',
  },
  {
    component_id: 'cKeyValue',
    component_name: 'Key Value',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cKeyValue.png',
  },
  {
    component_id: 'cVideoVCarousel',
    component_name: 'Video Vertical Carousel',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cVideoVCarousel.png',
  },
  {
    component_id: 'cDesc',
    component_name: 'Description',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cDesc.png',
  },
  {
    component_id: 'cCardImage',
    component_name: 'Card Image',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cCardImage.png',
  },
  {
    component_id: 'cWorkingHours',
    component_name: 'Working Hours',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cWorkingHours.png',
  },
  {
    component_id: 'cMonthSegment',
    component_name: 'Month Segment',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cMonthSegment.png',
  },
  {
    component_id: 'cEventInfo',
    component_name: 'Event Info',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cEventInfo.png',
  },
  {
    component_id: 'cChipSetView',
    component_name: 'Chip Set View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cChipSetView.png',
  },
  {
    component_id: 'cEventsCarousel',
    component_name: 'Events Carousel',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cEventsCarousel.png',
  },
  {
    component_id: 'cSegmentControl',
    component_name: 'Segment Control',
    image_url:
      'https://files-dev-westus-lths-mms-2.azureedge.net/files-lths-dev/files-lths-mok-dev/cSegmentControl.png',
  },
];
//generate notifications data
for (let i = 0; i < components.length; i++) {
  db.components.create(components[i]);
}
export default db;
