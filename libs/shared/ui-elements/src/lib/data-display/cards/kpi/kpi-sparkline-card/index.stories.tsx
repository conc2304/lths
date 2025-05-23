import { Stack } from '@mui/material/';

import { KpiSparklineCard } from './index';

import type { StoryFn, Meta } from '@storybook/react';

const Story: Meta<typeof KpiSparklineCard> = {
  component: KpiSparklineCard,
  title: 'Data Display/ Cards/ Kpi / Kpi Sparkline Card',
};
export default Story;

const Template: StoryFn<typeof KpiSparklineCard> = (args) => (
  <Stack direction="row" spacing={2}>
    <KpiSparklineCard {...args} hero={77} heroUnit="%" />
    <KpiSparklineCard {...args} />
    <KpiSparklineCard {...args} heroUnit="" />
    <KpiSparklineCard {...args} />
  </Stack>
);

const trendProp = {
  duration: 7,
  span: {
    title: 'Prev 7 days',
    unit: '%',
    value: 31,
    direction: 'up',
  },
  median: {
    title: 'Median',
    unit: '%',
    value: 7,
    direction: 'down',
  },
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'Retention',
  hero: 799,
  heroUnit: 'SECS',
  trends: trendProp,
  tooltip: {
    description:
      'The ratio of users who return to continue using the app. If retention is low, it means that users are not engaging with the app and steps must be taken to attract usage.',
    action: {
      url: 'https://en.wikipedia.org/wiki/Retention',
      title: 'Learn More',
    },
    title: 'Retention',
  },
  sparkLine: <div>react Spark1 line</div>,
  detail: {
    url: 'https://en.wikipedia.org/wiki/Retention',
  },
};
