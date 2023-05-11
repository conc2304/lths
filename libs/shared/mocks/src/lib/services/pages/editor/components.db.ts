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
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/images/cQuickLinkView.png',
  },
  {
    component_id: 'cCardView',
    component_name: 'Card View',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/images/cCardView.png',
  },
  {
    component_id: 'cHeader',
    component_name: 'Header',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/images/cHeader.png',
  },
  {
    component_id: 'cEventVCarousel',
    component_name: 'Event Vertical Carousel',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/images/cEventVCarousel.png',
  },
  {
    component_id: 'cButton',
    component_name: 'Button',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/images/cButton.png',
  },
  {
    component_id: 'cNewsCarousel',
    component_name: 'News Carousel',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/images/cNewsCarousel.png',
  },
  {
    component_id: 'cPromotion',
    component_name: 'Promotion',
    image_url: 'https://files-dev-westus-lths-mms-2.azureedge.net/images/cPromotion.png',
  },
  {
    component_id: 'cScoreBoard',
    component_name: 'Score Board',
    image_url: 'https://picsum.photos/seed/scoreboard/300/200',
  },
  {
    component_id: 'cVideoCarousel',
    component_name: 'Video Carousel',
    image_url: 'https://picsum.photos/seed/videocarousel/300/200',
  },
  {
    component_id: 'cEventHCarousel',
    component_name: 'Event Horizontal Carousel',
    image_url: 'https://picsum.photos/seed/eventhcarousel/300/200',
  },
  {
    component_id: 'cVideoView',
    component_name: 'Video View',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cNavCellView',
    component_name: 'Nav Cell View',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cTitleDesc',
    component_name: 'Title Description',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cExpandCollapseView',
    component_name: 'Expand Collapse View',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cFilterView',
    component_name: 'Filter View',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cVendorVCarousel',
    component_name: 'Vendor Vertical Carousel',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cImage',
    component_name: 'Image',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cNavListView',
    component_name: 'Nav List View',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cQuickLinks',
    component_name: 'Quick Links',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cPhoneInquiry',
    component_name: 'Phone Inquiry',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cMapPath',
    component_name: 'Map Path',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cLinkButton',
    component_name: 'Link Button',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cHyperLinkText',
    component_name: 'Hyper Link Text',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cButtonsView',
    component_name: 'Buttons View',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cButtonHCarousel',
    component_name: 'Button Horizontal Carousel',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cScoreBoardRecap',
    component_name: 'Scoreboard Recap',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cNewsView',
    component_name: 'News View',
    image_url: 'https://via.placeholder.com/350x150',
  },
  {
    component_id: 'cTableHeader',
    component_name: 'Table Header',
    image_url: 'https://via.placeholder.com/350x150',
  },

  {
    component_id: 'cTableDetails',
    component_name: 'Table Details',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cSimpleScoreView',
    component_name: 'Simple Score View',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cGameStats',
    component_name: 'Game Stats',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cLiveRadio',
    component_name: 'Live Radio',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cNewsList',
    component_name: 'News List',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cAuthorView',
    component_name: 'Author View',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cTeamMembers',
    component_name: 'Team Members',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cTeamPlayerInfo',
    component_name: 'Team Player Info',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cKeyValue',
    component_name: 'Key Value',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cVideoVCarousel',
    component_name: 'Video Vertical Carousel',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cDesc',
    component_name: 'Description',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cCardImage',
    component_name: 'Card Image',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cWorkingHours',
    component_name: 'Working Hours',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cMonthSegment',
    component_name: 'Month Segment',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cEventInfo',
    component_name: 'Event Info',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cChipSetView',
    component_name: 'Chip Set View',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cEventsCarousel',
    component_name: 'Events Carousel',
    image_url: 'https://via.placeholder.com/300',
  },
  {
    component_id: 'cSegmentControl',
    component_name: 'Segment Control',
    image_url: 'https://via.placeholder.com/300',
  },
];
//generate notifications data
for (let i = 0; i < components.length; i++) {
  const component = components[i];
  //if (!component.image_url?.startsWith('https://files-dev-westus-lths-mms-2.azureedge.net'))
  //component.image_url = `https://files-dev-westus-lths-mms-2.azureedge.net/images/${component.component_id}.png`;
  db.components.create(component);
}

export default db;
