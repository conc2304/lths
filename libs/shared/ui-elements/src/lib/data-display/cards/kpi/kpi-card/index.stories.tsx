import { Meta, StoryFn } from '@storybook/react';

import { KpiCard } from './index';

const Story: Meta<typeof KpiCard> = {
  component: KpiCard,
  title: 'Data Display/ Cards/ Kpi / Kpi Card',
};
export default Story;

const Template: StoryFn<typeof KpiCard> = (args) => <KpiCard {...args} />;

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
};
