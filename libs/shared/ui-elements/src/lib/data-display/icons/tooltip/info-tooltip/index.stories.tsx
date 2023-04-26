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
    description: "The ratio of users who return to continue using the app. If retention is low, it means that users are not engaging with the app and steps must be taken to attract usage.",
    action: { 
      url: "https://en.wikipedia.org/wiki/Retention",
      title: "Learn More",
    }, 
    title: "Retention"
  };
