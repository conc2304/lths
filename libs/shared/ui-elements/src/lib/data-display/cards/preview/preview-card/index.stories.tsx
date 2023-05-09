import { PreviewCard } from './index';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

const Story: ComponentMeta<typeof PreviewCard> = {
  component: PreviewCard,
  title: 'Data Display/ Cards/ Preview / Preview Card',
};
export default Story;

const Template: ComponentStory<typeof PreviewCard> = (args) => <PreviewCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Tickets',
  hero: 5687,
  span: {
    unit: '%',
    value: 31,
    direction: 'up',
  },
  median: {
    unit: '%',
    value: 7,
    direction: null,
  },
};
