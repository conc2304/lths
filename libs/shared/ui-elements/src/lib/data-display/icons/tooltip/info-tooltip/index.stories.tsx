import InfoTooltip from './index'

import type { ComponentStory, ComponentMeta } from '@storybook/react';

const Story: ComponentMeta<typeof InfoTooltip> = {
  component: InfoTooltip,
  title: 'Data Display/ icons/ tooltip / info-tooltip',
};
export default Story;

const Template: ComponentStory<typeof InfoTooltip> = (args) => (
  <InfoTooltip {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Retention", 
  tooltipDesc: "The ratio of users who return to continue using the app. If retention is low, it means that users are not engaging with the app and steps must be taken to attract usage.",
  tooltipActionUrl : "https://en.wikipedia.org/wiki/Retention",
};
