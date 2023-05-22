import { KpiRolloverCard } from './index'

import type { ComponentStory, ComponentMeta } from '@storybook/react';

const Story: ComponentMeta<typeof KpiRolloverCard> = {
  component: KpiRolloverCard,
  title: 'Data Display/ Cards/ Kpi / Kpi Roolover Card',
};
export default Story;

const Template: ComponentStory<typeof KpiRolloverCard> = (args) => (
  <KpiRolloverCard {...args} />
);

const trendProp = {
    duration: 7,
    span: {
      title: "Prev 7 days",
      unit: "%",
      value: 31,
      direction: "up"
    },
    median: {
      title: "Median",
      unit: "%",
      value: 7,
      direction: "down"
    }
};

const roloverDataList = [	
    {	
      duration: 7,	
      span: {	
        title: "Prev 7 days",	
        unit: "%",	
        value: 31,	
        direction: "up"	
      },	
      median: {	
        title: "Median",	
        unit: "%",	
        value: 1,	
        direction: "down"
      }	    
    },
    {	
      duration: 30,	
      span: {	
        title: "Prev 30 days",	
        unit: "%",	
        value: 27,	
        direction: "up"	
      },	
      median: {	
        title: "Median",	
        unit: "%",	
        value: 3,	
        direction: "down"	
      }	
    },	
  ]

export const Primary = Template.bind({});
Primary.args = {
  title: "Retention", 
  hero: 799,
  heroUnit: "SECS",
  trends: trendProp,
  tooltip: { 
    description: "The ratio of users who return to continue using the app. If retention is low, it means that users are not engaging with the app and steps must be taken to attract usage.",
    action: { 
      url: "https://en.wikipedia.org/wiki/Retention",
      title: "Learn More",
    }, 
    title: "Retention"
  },
  sparkLine: (<div>react Spark1 line</div>),
  rolloverData: roloverDataList,
  rolloverTitle: "Retention Average",
};