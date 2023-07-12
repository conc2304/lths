import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';
import { format } from 'date-fns';

type Page = {
  page_id: string;
  name: string;
};

const defaultPages: Page[] = [
  { page_id: 'adrequirements', name: 'AdRequirements' },
  { page_id: 'arena', name: 'Arena' },
  { page_id: 'arenahistory', name: 'ArenaHistory' },
  { page_id: 'buildingpolicies', name: 'BuildingPolicies' },
  { page_id: 'concessions', name: 'Concessions' },
  { page_id: 'contactus', name: 'ContactUs' },
  { page_id: 'dashboard', name: 'Dashboard' },
  { page_id: 'ducks', name: 'Ducks' },
  { page_id: 'duckshighlights', name: 'DucksHighlights' },
  { page_id: 'ducksnews', name: 'DucksNews' },
  { page_id: 'duckstatssegment', name: 'DuckStatsSegment' },
  { page_id: 'duckstatssegmentdata', name: 'DuckStatsSegmentData' },
  { page_id: 'eventdetail', name: 'EventDetail' },
  { page_id: 'eventsegment', name: 'EventSegment' },
  { page_id: 'eventsegmentdata', name: 'EventSegmentData' },
  { page_id: 'exploredistrict', name: 'ExploreDistrict' },
  { page_id: 'explorehondacenter', name: 'ExploreHondaCenter' },
  { page_id: 'faq', name: 'FAQ' },
  { page_id: 'fooddrink', name: 'FoodDrink' },
  { page_id: 'gamecenterradio', name: 'GameCenterRadio' },
  { page_id: 'gamecenterrecapsegment', name: 'GameCenterRecepSegment' },
  { page_id: 'gamecenterrecapsegmentdata', name: 'GameCenterRecepSegmentData' },
  { page_id: 'gamecentersegment', name: 'GameCenterSegment' },
  { page_id: 'gamecentersegmentdata', name: 'GameCenterSegmentData' },
  { page_id: 'home', name: 'Home' },
  { page_id: 'memberdetailsegment', name: 'MemberDetailSegment' },
  { page_id: 'more', name: 'More' },
  { page_id: 'navigatetohondacenter', name: 'NavigateToHondaCenter' },
  { page_id: 'newsdetail', name: 'NewsDetail' },
  { page_id: 'newslist', name: 'NewsDetailList' },
  { page_id: 'parkingdirection', name: 'ParkingAndDirection' },
  { page_id: 'parkingplusdirection', name: 'ParkingPlusDirection' },
  { page_id: 'planyourvisit', name: 'PlanYourVisit' },
  { page_id: 'policies', name: 'Policies' },
  { page_id: 'premiumloungesseats', name: 'PremiumLoungesSeats' },
  { page_id: 'reportanissue', name: 'ReportAnIssue' },
  { page_id: 'schedulesegment', name: 'ScheduleSegment' },
  { page_id: 'schedulesegmentdata', name: 'ScheduleSegmentData' },
  { page_id: 'standingdata', name: 'StandingData' },
  { page_id: 'standingsegments', name: 'StandingSegments' },
  { page_id: 'support', name: 'Support' },
  { page_id: 'teammemberoverview', name: 'TeamMemberOverView' },
  { page_id: 'teammembers', name: 'TeamMembers' },
  { page_id: 'tickets', name: 'Tickets' },
  { page_id: 'transportation', name: 'TransportationOptions' },
  { page_id: 'vendordetails', name: 'VendorDetails' },
];

const db = factory({
  pages: {
    id: primaryKey(nanoid),
    name: String,
    pageId: String,
    type: String,
    constraints: String,
    lastEditor: String,
    status: String,
    lastModified: String,
  },
  default: {
    id: primaryKey(nanoid),
    page_id: String,
    name: String,
  },
});

const createPageData = (page: Page) => {
  const type = faker.helpers.arrayElement(['Pre-Defined', 'Static']);
  const constraints = faker.random.words().split(' ').join(',');
  const lastEditor = faker.name.fullName();
  const status = faker.helpers.arrayElement([
    'Draft',
    'Published',
    'Pending approval',
    'Changes requested',
    'Scheduled',
    'Expired',
    'Archived',
  ]);
  const lastModified = format(faker.date.recent(), 'MM.dd.yyyy KK:mm a');

  return {
    name: page.name,
    pageId: page.page_id,
    type,
    constraints,
    lastEditor,
    status,
    lastModified,
  };
};

//generate pages data
for (let i = 0; i < defaultPages.length; i++) {
  db.pages.create(createPageData(defaultPages[i]));
}

for (let i = 0; i < defaultPages.length; i++) {
  db.default.create(defaultPages[i]);
}

export default db;
