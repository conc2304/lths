import { KpiVerticalCard } from './index'

import type { ComponentStory, ComponentMeta } from '@storybook/react';

const Story: ComponentMeta<typeof KpiVerticalCard> = {
  component: KpiVerticalCard,
  title: 'Data Display/ Cards/ Kpi / Kpi Vertical Card',
};
export default Story;

const Template: ComponentStory<typeof KpiVerticalCard> = (args) => (
  <KpiVerticalCard {...args} />
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

export const Primary = Template.bind({});
Primary.args = {
  title: "Retention", 
  hero: 799,
  heroUnit: "SECS",
  trends: trendProp,
};
