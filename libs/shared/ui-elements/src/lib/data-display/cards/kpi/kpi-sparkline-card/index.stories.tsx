import { KpiSparklineCard } from './index'

import type { ComponentStory, ComponentMeta } from '@storybook/react';

const Story: ComponentMeta<typeof KpiSparklineCard> = {
  component: KpiSparklineCard,
  title: 'Data Display/ Cards/ Kpi / Kpi Sparkline Card',
};
export default Story;

const Template: ComponentStory<typeof KpiSparklineCard> = (args) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    spacing={3}
  >
    <KpiSparklineCard {...args} />
    <KpiSparklineCard {...args} />
    <KpiSparklineCard {...args} />
    <KpiSparklineCard {...args} />
  </Stack>
);

const trendProp = {
    //types of trens: Time duration, Median
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

export const Primary = Template.bind({});
Primary.args = {
  title: "Retention", 
  hero: 799, // comp format to add commas
  heroUnit: "SECS",
  trends: trendProp,
  tooltipDesc: "The ratio of users who return to continue using the app. If retention is low, it means that users are not engaging with the app and steps must be taken to attract usage.",
  tooltipActionUrl : "https://en.wikipedia.org/wiki/Retention",
  sparkLine: (<div>react Spark1 line</div>),
  routeUrl: "https://en.wikipedia.org/wiki/Retention",
};

